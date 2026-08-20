import React, { useEffect, useRef, useState } from 'react';
import heroImage from '../assets/hero-book-flag.jpg';
import remoteImage1 from '../assets/gallery/remote/1.jpg'
import remoteImage2 from '../assets/gallery/remote/2.jpg'
import remoteImage3 from '../assets/gallery/remote/3.jpg'
import remoteImage4 from '../assets/gallery/remote/4.jpg'
import remoteImage5 from '../assets/gallery/remote/5.jpg'
import remoteImage6 from '../assets/gallery/remote/6.jpg'
import remoteImage7 from '../assets/gallery/remote/7.jpg'
import remoteImage8 from '../assets/gallery/remote/8.jpg'
import remoteImage9 from '../assets/gallery/remote/9.jpg'
import classroomImage1 from '../assets/gallery/classroom/1.jpg'
import classroomImage2 from '../assets/gallery/classroom/2.jpg'
import classroomImage3 from '../assets/gallery/classroom/3.jpg'
import classroomImage4 from '../assets/gallery/classroom/4.jpg'
import classroomImage5 from '../assets/gallery/classroom/5.jpg'
import classroomImage6 from '../assets/gallery/classroom/6.jpg'
import classroomImage7 from '../assets/gallery/classroom/7.jpg'
import classroomImage8 from '../assets/gallery/classroom/8.jpg'
import classroomImage9 from '../assets/gallery/classroom/9.jpg'
import classroomImage10 from '../assets/gallery/classroom/10.jpg'
import classroomImage11 from '../assets/gallery/classroom/11.jpg'
import classroomImage12 from '../assets/gallery/classroom/12.jpg'
import classroomImage13 from '../assets/gallery/classroom/13.jpg'
import classroomImage14 from '../assets/gallery/classroom/14.jpg'
import classroomImage15 from '../assets/gallery/classroom/15.jpg'
import classroomImage16 from '../assets/gallery/classroom/16.jpg'
import classroomImage17 from '../assets/gallery/classroom/17.jpg'
import classroomImage18 from '../assets/gallery/classroom/18.jpg'
import classroomImage19 from '../assets/gallery/classroom/19.jpg'
import classroomImage20 from '../assets/gallery/classroom/20.jpg'
import classroomImage21 from '../assets/gallery/classroom/21.jpg'
import classroomImage22 from '../assets/gallery/classroom/22.jpg'
import classroomImage23 from '../assets/gallery/classroom/23.jpg'
import classroomImage24 from '../assets/gallery/classroom/24.jpg'
import classroomImage25 from '../assets/gallery/classroom/25.jpg'
import classroomImage26 from '../assets/gallery/classroom/26.jpg'
import classroomImage27 from '../assets/gallery/classroom/27.jpg'
import classroomImage28 from '../assets/gallery/classroom/28.jpg'
import classroomImage29 from '../assets/gallery/classroom/29.jpg'
import classroomImage30 from '../assets/gallery/classroom/30.jpg'
import classroomImage31 from '../assets/gallery/classroom/31.jpg'
import classroomImage32 from '../assets/gallery/classroom/32.jpg'
import performance3 from '../assets/gallery/performances/3.mp4' 
import performance4 from '../assets/gallery/performances/4.mp4' 
import performance5 from '../assets/gallery/performances/5.mp4' 
import performanceImage3 from '../assets/gallery/performances/3.png'
import performanceImage4 from '../assets/gallery/performances/4.png'
import performanceImage5 from '../assets/gallery/performances/5.png'

type PhotoItem = {
  type: 'photo';
  src: string;
  alt: string;
};

type VideoItem = {
  type: 'video';
  poster: string;
  src: string; // путь к видеофайлу, например импортированному из src/assets/gallery/
  alt: string;
};

type GalleryItem = PhotoItem | VideoItem;

type TabKey = 'classroom' | 'remote' | 'performances';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'classroom', label: 'Занятия в классе' },
  { key: 'remote', label: 'Дистанционные занятия' },
  { key: 'performances', label: 'Выступления детей' },
];

const GALLERY: Record<TabKey, GalleryItem[]> = {
  classroom: [
    { type: 'photo', src: classroomImage1, alt: 'Занятие в классе, фото 1' },
    { type: 'photo', src: classroomImage2, alt: 'Занятие в классе, фото 2' },
    { type: 'photo', src: classroomImage3, alt: 'Занятие в классе, фото 3' },
    { type: 'photo', src: classroomImage4, alt: 'Занятие в классе, фото 4' },
    { type: 'photo', src: classroomImage5, alt: 'Занятие в классе, фото 5' },
    { type: 'photo', src: classroomImage6, alt: 'Занятие в классе, фото 6' },
    { type: 'photo', src: classroomImage7, alt: 'Занятие в классе, фото 7' },
    { type: 'photo', src: classroomImage8, alt: 'Занятие в классе, фото 8' },
    { type: 'photo', src: classroomImage9, alt: 'Занятие в классе, фото 9' },
    { type: 'photo', src: classroomImage10, alt: 'Занятие в классе, фото 10' },
    { type: 'photo', src: classroomImage11, alt: 'Занятие в классе, фото 11' },
    { type: 'photo', src: classroomImage12, alt: 'Занятие в классе, фото 12' },
    { type: 'photo', src: classroomImage13, alt: 'Занятие в классе, фото 13' },
    { type: 'photo', src: classroomImage14, alt: 'Занятие в классе, фото 14' },
    { type: 'photo', src: classroomImage15, alt: 'Занятие в классе, фото 15' },
    { type: 'photo', src: classroomImage16, alt: 'Занятие в классе, фото 16' },
    { type: 'photo', src: classroomImage17, alt: 'Занятие в классе, фото 17' },
    { type: 'photo', src: classroomImage18, alt: 'Занятие в классе, фото 18' },
    { type: 'photo', src: classroomImage19, alt: 'Занятие в классе, фото 19' },
    { type: 'photo', src: classroomImage20, alt: 'Занятие в классе, фото 20' },
    { type: 'photo', src: classroomImage21, alt: 'Занятие в классе, фото 21' },
    { type: 'photo', src: classroomImage22, alt: 'Занятие в классе, фото 22' },
    { type: 'photo', src: classroomImage23, alt: 'Занятие в классе, фото 23' },
    { type: 'photo', src: classroomImage24, alt: 'Занятие в классе, фото 24' },
    { type: 'photo', src: classroomImage25, alt: 'Занятие в классе, фото 25' },
    { type: 'photo', src: classroomImage26, alt: 'Занятие в классе, фото 26' },
    { type: 'photo', src: classroomImage27, alt: 'Занятие в классе, фото 27' },
    { type: 'photo', src: classroomImage28, alt: 'Занятие в классе, фото 28' },
    { type: 'photo', src: classroomImage29, alt: 'Занятие в классе, фото 29' },
    { type: 'photo', src: classroomImage30, alt: 'Занятие в классе, фото 30' },
    { type: 'photo', src: classroomImage31, alt: 'Занятие в классе, фото 31' },
    { type: 'photo', src: classroomImage32, alt: 'Занятие в классе, фото 32' },
    // { type: 'photo', src: classroomImage33, alt: 'Занятие в классе, фото 33' },
  ],
  remote: [
    { type: 'photo', src: remoteImage1, alt: 'Дистанционное занятие, фото 1' },
    { type: 'photo', src: remoteImage2, alt: 'Дистанционное занятие, фото 2' },
    { type: 'photo', src: remoteImage3, alt: 'Дистанционное занятие, фото 3' },
    { type: 'photo', src: remoteImage4, alt: 'Дистанционное занятие, фото 4' },
    { type: 'photo', src: remoteImage5, alt: 'Дистанционное занятие, фото 5' },
    { type: 'photo', src: remoteImage6, alt: 'Дистанционное занятие, фото 6' },
    { type: 'photo', src: remoteImage7, alt: 'Дистанционное занятие, фото 7' },
    { type: 'photo', src: remoteImage8, alt: 'Дистанционное занятие, фото 8' },
    { type: 'photo', src: remoteImage9, alt: 'Дистанционное занятие, фото 9' },
  ],
  performances: [
  {
    type: 'video',
    poster: performanceImage3,
    src: performance3,
    alt: 'Видео выступления 3',
  },
  {
    type: 'video',
    poster: performanceImage4,
    src: performance4,
    alt: 'Видео выступления 4',
  },
  {
    type: 'video',
    poster: performanceImage5,
    src: performance5,
    alt: 'Видео выступления 5',
  },
],
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
            key={i}
            onClick={() => setLightboxIndex(i)}
            aria-label={item.alt}
          >
            <img
              src={item.type === 'photo' ? item.src : item.poster}
              alt={item.alt}
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