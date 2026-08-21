import React, { useEffect, useRef, useState } from 'react';

// Данные вашего GitHub-репозитория — из них строится ссылка на jsDelivr.
const GITHUB_USER = 'SemiAutomaticLonelyBoy';
const GITHUB_REPO = 'english-site';
const GITHUB_BRANCH = 'main';

// Строит ссылку вида:
// https://cdn.jsdelivr.net/gh/USER/REPO@BRANCH/путь/в/репозитории
function jsDelivrUrl(pathInRepo: string) {
  return `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${GITHUB_BRANCH}/${pathInRepo}`;
}

type PhotoItem = {
  type: 'photo';
  src: string;
  alt: string;
};

type VideoItem = {
  type: 'video';
  poster: string;
  src: string;
  alt: string;
};

type GalleryItem = PhotoItem | VideoItem;

type TabKey = 'classroom' | 'remote' | 'performances';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'classroom', label: 'Занятия в классе' },
  { key: 'remote', label: 'Дистанционные занятия' },
  { key: 'performances', label: 'Выступления детей' },
];

// СКОЛЬКО ФОТО в каждой вкладке — файлы должны лежать в репозитории по путям
// src/assets/gallery/<вкладка>/1.jpg, 2.jpg, ... N.jpg (как у вас сейчас и лежат).
// Чтобы добавить фото — просто закиньте файл с следующим номером в репозиторий
// и увеличьте число здесь, ничего больше менять не нужно.
const PHOTO_COUNTS: Record<TabKey, number> = {
  classroom: 32,
  remote: 9,
  performances: 0,
};

function buildPhotos(tab: TabKey): PhotoItem[] {
  const label = TABS.find((t) => t.key === tab)?.label ?? tab;
  return Array.from({ length: PHOTO_COUNTS[tab] }, (_, i) => ({
    type: 'photo',
    src: jsDelivrUrl(`src/assets/gallery/${tab}/${i + 1}.jpg`),
    alt: `${label}, фото ${i + 1}`,
  }));
}

// ВИДЕО — свой список (их немного). Постеры у вас лежат как .png, видео — .mp4.
const VIDEOS: Record<TabKey, VideoItem[]> = {
  classroom: [],
  remote: [],
  performances: [3, 4, 5].map((n) => ({
    type: 'video',
    poster: jsDelivrUrl(`src/assets/gallery/performances/${n}.png`),
    src: jsDelivrUrl(`src/assets/gallery/performances/${n}.mp4`),
    alt: `Видео выступления ${n}`,
  })),
};

const GALLERY: Record<TabKey, GalleryItem[]> = {
  classroom: [...buildPhotos('classroom'), ...VIDEOS.classroom],
  remote: [...buildPhotos('remote'), ...VIDEOS.remote],
  performances: [...buildPhotos('performances'), ...VIDEOS.performances],
};

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('classroom');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const activeIndex = TABS.findIndex((t) => t.key === activeTab);
  const items = GALLERY[activeTab];
  const touchStartX = useRef<number | null>(null);

  const showPrev = () => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length));
  };

  const showNext = () => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % items.length));
  };

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, items.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? showPrev() : showNext();
    }
    touchStartX.current = null;
  };

  const activeItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <div className="gallery">
      <div className="gallery-tabs" role="tablist" aria-label="Галерея занятий">
        <span
          className="gallery-tab-indicator"
          style={{
            width: `${100 / TABS.length}%`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`gallery-tab${activeTab === tab.key ? ' is-active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="gallery-grid" role="tabpanel">
        {items.map((item, i) => (
          <button
            className="gallery-thumb"
            key={`${activeTab}-${i}`}
            onClick={() => setLightboxIndex(i)}
            aria-label={item.alt}
          >
            <img
              src={item.type === 'photo' ? item.src : item.poster}
              alt={item.alt}
              loading="lazy"
            />
            {item.type === 'video' && (
              <span className="gallery-play-icon" aria-hidden="true" />
            )}
          </button>
        ))}
      </div>

      {activeItem && (
        <div
          className="lightbox"
          onClick={() => setLightboxIndex(null)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            className="lightbox-close"
            onClick={() => setLightboxIndex(null)}
            aria-label="Закрыть"
          >
            ×
          </button>

          {items.length > 1 && (
            <>
              <button
                className="lightbox-nav lightbox-nav-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Предыдущее фото"
              >
                ‹
              </button>
              <button
                className="lightbox-nav lightbox-nav-next"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Следующее фото"
              >
                ›
              </button>
            </>
          )}

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {activeItem.type === 'photo' ? (
              <img src={activeItem.src} alt={activeItem.alt} />
            ) : activeItem.src ? (
              <video
                className="lightbox-video"
                src={activeItem.src}
                poster={activeItem.poster}
                controls
                autoPlay
              />
            ) : (
              <p className="lightbox-video-placeholder">
                Укажите путь к видеофайлу (src) для этого пункта в Gallery.tsx
              </p>
            )}
          </div>

          {items.length > 1 && (
            <p className="lightbox-counter">
              {lightboxIndex! + 1} / {items.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;
