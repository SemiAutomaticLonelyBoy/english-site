import React, { useEffect, useRef } from 'react';

// Яндекс сейчас выдаёт ОТДЕЛЬНЫЕ ключи под разные продукты — один для
// JavaScript API (показ самой карты), другой для API Геокодера (адрес → координаты).
// Оба берутся из .env в корне проекта (CRA подхватывает переменные с префиксом REACT_APP_).
const YANDEX_MAPS_API_KEY = process.env.REACT_APP_YANDEX_MAPS_API_KEY;
const YANDEX_GEOCODER_API_KEY = process.env.REACT_APP_YANDEX_GEOCODER_API_KEY;

// Адрес, который будет превращён в координаты через Яндекс.Геокодер.
// При необходимости уточните формулировку — чем точнее адрес, тем точнее маркер.
const STUDIO_ADDRESS =
  'Новосибирск, микрорайон Дивногорский, улица Романтиков, 18';

// Запасные координаты (центр мкр. Дивногорский) — используются, только если
// геокодер не смог найти адрес (например, нет интернета или неверный ключ).
const FALLBACK_COORDINATES: [number, number] = [82.808509, 55.025256];

declare global {
  interface Window {
    ymaps3: any;
  }
}

let scriptLoadingPromise: Promise<void> | null = null;

function loadYandexMapsScript(apiKey: string): Promise<void> {
  if (window.ymaps3) {
    return Promise.resolve();
  }

  if (!scriptLoadingPromise) {
    scriptLoadingPromise = new Promise((resolve, reject) => {
      console.log(`https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`)
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Не удалось загрузить Яндекс.Карты'));
      document.head.appendChild(script);
    });
  }

  return scriptLoadingPromise;
}

// Превращает адрес в координаты [долгота, широта] через HTTP Geocoder API.
async function geocodeAddress(
  address: string,
  apiKey: string
): Promise<[number, number] | null> {
  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&lang=ru_RU&geocode=${encodeURIComponent(
    address
  )}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Геокодер ответил с ошибкой: ${response.status}`);
  }

  const data = await response.json();
  const found = data?.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject;

  if (!found) {
    return null;
  }

  // Geocoder возвращает "долгота широта" строкой через пробел.
  const [lon, lat] = found.Point.pos.split(' ').map(Number);
  return [lon, lat];
}

const StudioMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!YANDEX_MAPS_API_KEY || !YANDEX_GEOCODER_API_KEY) {
      return;
    }

    let cancelled = false;

    Promise.all([
      loadYandexMapsScript(YANDEX_MAPS_API_KEY).then(() => window.ymaps3.ready),
      geocodeAddress(STUDIO_ADDRESS, YANDEX_GEOCODER_API_KEY).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Не удалось определить координаты по адресу:', error);
        return null;
      }),
    ])
      .then(([, geocodedCoordinates]) => {
        if (cancelled || !containerRef.current || mapInstanceRef.current) {
          return;
        }

        const coordinates = geocodedCoordinates ?? FALLBACK_COORDINATES;

        const { YMap, YMapDefaultSchemeLayer, YMapDefaultMarker } = window.ymaps3;

        const map = new YMap(containerRef.current, {
          location: {
            center: coordinates,
            zoom: 16,
          },
        });

        map.addChild(new YMapDefaultSchemeLayer());
        map.addChild(
          new YMapDefaultMarker({
            coordinates,
            title: 'Английский язык, мкр. Дивногорский',
          })
        );

        mapInstanceRef.current = map;
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!YANDEX_MAPS_API_KEY || !YANDEX_GEOCODER_API_KEY) {
    return (
      <div className="map-placeholder">
        Карта появится здесь после подключения ключей Яндекс.Карт
        <br />
        (переменные REACT_APP_YANDEX_MAPS_API_KEY и
        REACT_APP_YANDEX_GEOCODER_API_KEY в .env)
      </div>
    );
  }

  return <div className="map-container" ref={containerRef} />;
};

export default StudioMap;
