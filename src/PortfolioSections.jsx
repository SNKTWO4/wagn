import { useEffect, useRef, useState } from 'react';
import {
  Aperture,
  BadgeCheck,
  Clapperboard,
  Factory,
  Image,
  Palette,
  Play,
  Radio,
  Sparkles,
  UserRound,
  Video,
  X,
} from 'lucide-react';
import { caseSections } from './caseData.js';
import GlowCard from './GlowCard.jsx';

const caseDecor = {
  promo: [[Clapperboard, '长视频'], [Factory, '企业质感'], [Video, '多平台']],
  'founder-ip': [[UserRound, '人物口播'], [BadgeCheck, '信任背书'], [Video, '短视频']],
  documentary: [[Aperture, '现场感'], [Image, '布景'], [Clapperboard, '纪实']],
  'color-grade': [[Palette, '色彩'], [Aperture, '光影'], [Video, 'DaVinci']],
  'overseas-tiktok': [[Radio, '账号'], [Factory, '工厂'], [BadgeCheck, '数据']],
};

function CaseMedia({ item, onPreview }) {
  const isVideo = item.type === 'video';
  const className = `caseMedia ${item.portrait ? 'isPortrait' : ''}`;

  const handleClick = (event) => {
    event.preventDefault();
    onPreview(item);
  };

  return (
    <GlowCard className={`${className} revealBlock`}>
      <button className="caseMediaLink" type="button" onClick={handleClick} aria-label={`查看 ${item.title}`}>
        <div className="caseFrame">
          {isVideo ? (
            <video
              poster={item.poster}
              muted
              playsInline
              preload="none"
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              onContextMenu={(event) => event.preventDefault()}
            />
          ) : (
            <img src={item.src} alt={item.title} />
          )}
          <span className="casePlay">
            {isVideo ? <Play size={16} fill="currentColor" /> : <Image size={16} />}
          </span>
        </div>
        <div className="caseMediaMeta">
          <span>{isVideo ? 'Video' : 'Screenshot'}</span>
          <strong>{item.title}</strong>
          <p>{item.meta}</p>
        </div>
      </button>
    </GlowCard>
  );
}

function ProtectedVideo({ item }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  return (
    <div className="lightboxVideoFrame">
      <video
        ref={videoRef}
        className="lightboxVideo"
        src={item.src}
        autoPlay
        playsInline
        controls={false}
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onContextMenu={(event) => event.preventDefault()}
      />
      <button
        className={`lightboxVideoToggle ${isPlaying ? 'isPlaying' : ''}`}
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? '暂停视频' : '播放视频'}
      >
        <Play size={18} fill="currentColor" />
      </button>
    </div>
  );
}

function MediaLightbox({ item, isClosing, onClose }) {
  if (!item) return null;
  const isVideo = item.type === 'video';

  return (
    <div
      className={`lightboxBackdrop ${isClosing ? 'isClosing' : ''}`}
      onClick={onClose}
      role="presentation"
    >
      <button
        className="lightboxClose"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="关闭预览"
      >
        <X size={18} />
      </button>
      <figure
        className={`lightboxFigure ${isVideo ? 'isVideo' : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        {isVideo ? (
          <ProtectedVideo item={item} />
        ) : (
          <img src={item.src} alt={item.title} />
        )}
        <figcaption>
          <strong>{item.title}</strong>
          <span>{item.meta}</span>
        </figcaption>
      </figure>
    </div>
  );
}

export default function PortfolioSections() {
  const [previewItem, setPreviewItem] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef(null);

  const closePreview = () => {
    if (!previewItem || isClosing) return;
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setPreviewItem(null);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (!previewItem) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closePreview();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, [previewItem]);

  return (
    <section className="portfolioSection" id="portfolio">
      <div className="sectionShell">
        <div className="sectionLead">
          <p>案例领域</p>
          <h2>精选影像作品</h2>
        </div>
        <div className="caseStack">
          {caseSections.map((section) => (
            <article className="caseModule" id={section.id} key={section.id}>
              <div className="caseIntro revealBlock">
                <div className="caseKicker">
                  <span>{section.title}</span>
                  <em>{section.eyebrow}</em>
                </div>
                <h3>{section.title}</h3>
                <p>{section.summary}</p>
                <div className="casePoints">
                  {section.points.map((point) => (
                    <span key={point}>
                      <Sparkles size={14} />
                      {point}
                    </span>
                  ))}
                </div>
                <div className="caseDecorGrid" aria-hidden="true">
                  {caseDecor[section.id].map(([Icon, label]) => (
                    <span key={label}>
                      <Icon size={22} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="caseMediaGrid">
                {section.items.map((item) => (
                  <CaseMedia item={item} onPreview={setPreviewItem} key={`${section.id}-${item.src}`} />
                ))}
              </div>
              <div className="caseModuleMark" aria-hidden="true">
                <Video size={22} />
                <span>{section.eyebrow}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <MediaLightbox item={previewItem} isClosing={isClosing} onClose={closePreview} />
    </section>
  );
}
