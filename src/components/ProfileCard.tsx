import React, { useState } from 'react';
import tutorImage from '../assets/profile/tutor.jpg'
import tgImage from '../assets/profile/tg_qr.jpg'
import whImage from '../assets/profile/wh_qr.jpg'
import maxImage from '../assets/profile/max_qr.jpg'

const TUTOR_NAME = 'Лучинина Лариса Владимировна';

const PHONE_DISPLAY = '+7 (953) 872-25-82';

const SOCIAL_LINKS: {
  label: string;
  url: string;
  qrImage: string | null;
}[] = [
  { label: 'Telegram', url: 'https://t.me/luttchina', qrImage: tgImage },
  { label: 'WhatsApp', url: 'https://wa.me/qr/HVODILZIZVMAA1', qrImage: whImage },
  { label: 'Max', url: 'https://max.ru/u/f9LHodD0cOKl8gHndAm7FQn5gs10C32ItGYUiI7RbIKGkJj1LddOWUi5rWs', qrImage: maxImage },
];

const ProfileCard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PHONE_DISPLAY);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Буфер обмена недоступен (старый браузер/нет разрешения) — просто игнорируем.
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-photo-wrap">
            <img src={tutorImage} alt={TUTOR_NAME} />
      </div>

      <div className="profile-info">
        <h2 className="section-heading profile-name">{TUTOR_NAME}</h2>

        <button
          className="phone-copy"
          onClick={handleCopyPhone}
          aria-label="Скопировать номер телефона"
        >
          <span>{PHONE_DISPLAY}</span>
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <rect
              x="7"
              y="7"
              width="10"
              height="10"
              rx="1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M4.5 13.5H3.5A1.5 1.5 0 0 1 2 12V3.5A1.5 1.5 0 0 1 3.5 2H12a1.5 1.5 0 0 1 1.5 1.5v1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        </button>
        {copied && <span className="phone-copied">Скопировано</span>}

        <div className="qr-list">
          {SOCIAL_LINKS.map((social) => (
            <div className="qr-item" key={social.label}>
              <a
                className="qr-image-link"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`QR-код: ${social.label}`}
              >
                {social.qrImage ? (
                  <img src={social.qrImage} alt={`QR-код: ${social.label}`} />
                ) : (
                  <div className="qr-placeholder">QR</div>
                )}
              </a>
              <a
                className="qr-label"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;