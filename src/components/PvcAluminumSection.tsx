import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Cog,
  Expand,
  Film,
  Layers,
  MessageCircle,
  Play,
  Volume2,
  X,
} from 'lucide-react';
import {
  PVC_ALUMINUM_GALLERY,
  PVC_ALUMINUM_SERVICES,
  PVC_ALUMINUM_VIDEOS,
  getWhatsAppUrl,
  type PvcAluminumVideo,
} from '../data/erkanData';
import { ArchitecturalImage } from './ArchitecturalImage';

interface PvcAluminumSectionProps {
  compact?: boolean;
  onViewPage?: () => void;
}

const CARD_ICONS = {
  'egepen-pvc': Layers,
  'aluminyum-cephe': Building2,
  'modern-uretim-atolyesi': Cog,
} as const;

export function PvcAluminumSection({
  compact = false,
  onViewPage,
}: PvcAluminumSectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  const activePhoto =
    lightboxIndex !== null && PVC_ALUMINUM_GALLERY[lightboxIndex]
      ? PVC_ALUMINUM_GALLERY[lightboxIndex]
      : null;

  const activeVideo =
    activeVideoIndex !== null && PVC_ALUMINUM_VIDEOS[activeVideoIndex]
      ? PVC_ALUMINUM_VIDEOS[activeVideoIndex]
      : null;

  const handleClosePhoto = useCallback(() => setLightboxIndex(null), []);

  const handlePrevPhoto = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + PVC_ALUMINUM_GALLERY.length) % PVC_ALUMINUM_GALLERY.length
    );
  }, []);

  const handleNextPhoto = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % PVC_ALUMINUM_GALLERY.length
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClosePhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, handleClosePhoto, handlePrevPhoto, handleNextPhoto]);

  useEffect(() => {
    if (activeVideoIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVideoIndex(null);
      if (e.key === 'ArrowLeft') {
        setActiveVideoIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + PVC_ALUMINUM_VIDEOS.length) % PVC_ALUMINUM_VIDEOS.length
        );
      }
      if (e.key === 'ArrowRight') {
        setActiveVideoIndex((prev) =>
          prev === null ? null : (prev + 1) % PVC_ALUMINUM_VIDEOS.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeVideoIndex]);

  return (
    <section
      id="pvc-aluminyum-bolumu"
      className="py-16 lg:py-24 bg-[#F7F7F7] text-[#0B0B0B] border-t border-[#0B0B0B]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Distinct Visual Division Header (Separating PVC & Aluminum from Furniture) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#0B0B0B]/12">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.22em] uppercase text-[#EA580C] font-bold">
              Yeni Hizmet Alanlarımız · PVC &amp; Cephe Sistemleri
            </p>
            <h2
              className="mt-3 font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold leading-[1.12] text-[#0B0B0B]"
              style={{ textWrap: 'balance' }}
            >
              Egepen PVC, Alüminyum Cephe ve Otomasyonlu Üretim
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#333333] leading-relaxed">
              Mobilya ve iç mimari üretimimizin yanı sıra, tam donanımlı ve otomasyonlu işleme
              merkezine sahip atölyemizde Egepen PVC pencere-kapı sistemleri ve modern alüminyum
              cephe çözümleri üretiyoruz.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={getWhatsAppUrl(
                'Merhaba EFM Interiors, Egepen PVC ve Alüminyum Cephe Sistemleri hakkında keşif ve fiyat teklifi almak istiyorum.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-white" aria-hidden="true" />
              <span>PVC &amp; Cephe Teklifi Al</span>
            </a>

            {compact && onViewPage && (
              <button
                type="button"
                onClick={onViewPage}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-[#0B0B0B] text-white hover:bg-[#EA580C] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>PVC &amp; Alüminyum Sayfası</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* 3 Core Service Cards with Real Uploaded Application Photos */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7">
          {PVC_ALUMINUM_SERVICES.map((item, idx) => {
            const IconComponent =
              CARD_ICONS[item.id as keyof typeof CARD_ICONS] || Layers;

            return (
              <article
                key={item.id}
                className="group bg-white border border-[#0B0B0B]/12 hover:border-[#F97316] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={`${item.title} fotoğrafını büyüt`}
                    className="relative block w-full aspect-[4/3] bg-[#0B0B0B] overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F97316]"
                  >
                    <ArchitecturalImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fallbackTitle={item.title}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/60 via-transparent to-transparent"
                    />
                    <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md bg-[#0B0B0B]/85 border border-white/15 text-[11px] font-bold text-[#F97316] tabular-nums">
                      {item.number}
                    </span>
                    <span className="absolute top-3.5 right-3.5 w-9 h-9 rounded-lg bg-[#0B0B0B]/80 border border-white/20 text-white group-hover:bg-[#F97316] group-hover:border-[#F97316] flex items-center justify-center transition-colors">
                      <Expand className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </button>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#0B0B0B] text-[#F97316] flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <p className="text-xs font-bold tracking-wide text-[#EA580C]">
                        {item.subtitle}
                      </p>
                    </div>

                    <h3 className="mt-3 font-display text-2xl font-bold text-[#0B0B0B] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#404040] leading-relaxed">
                      {item.description}
                    </p>

                    <ul className="mt-5 pt-4 border-t border-[#0B0B0B]/10 space-y-2.5 text-xs sm:text-[13px] font-semibold text-[#1A1A1A]">
                      {item.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <Check
                            className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* WhatsApp CTA Footer */}
                <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-[#0B0B0B]/10">
                  <a
                    href={getWhatsAppUrl(
                      `Merhaba EFM Interiors, "${item.title}" hizmetiniz hakkında bilgi ve fiyat teklifi almak istiyorum.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-white" aria-hidden="true" />
                    <span>WhatsApp’tan Teklif Al</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* PVC & Aluminum Video Showcase Strip (2 Real Uploaded Videos) */}
        <div className="mt-14 pt-12 border-t border-[#0B0B0B]/12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#EA580C] font-bold">
                <Film className="w-4 h-4" aria-hidden="true" />
                <span>PVC &amp; Alüminyum Videoları</span>
              </div>
              <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold text-[#0B0B0B]">
                Uygulamalarımızdan Gerçek Videolar
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#525252]">
              Sesli ve tam ekran izlemek için videolara dokunun
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PVC_ALUMINUM_VIDEOS.map((vid, idx) => (
              <PvcVideoCard
                key={vid.id}
                video={vid}
                index={idx}
                isHovered={hoveredVideoId === vid.id}
                onHoverChange={(hovering) => setHoveredVideoId(hovering ? vid.id : null)}
                onOpen={() => setActiveVideoIndex(idx)}
              />
            ))}
          </div>
        </div>

        {/* 4-Photo PVC & Aluminum Application Strip */}
        <div className="mt-14 pt-12 border-t border-[#0B0B0B]/12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#EA580C] font-bold">
                Uygulama Örnekleri
              </p>
              <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold text-[#0B0B0B]">
                PVC, Alüminyum &amp; Cam Uygulamalarımızdan Kareler
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#525252]">
              Büyütmek için fotoğraflara tıklayın
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PVC_ALUMINUM_GALLERY.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group bg-white border border-[#0B0B0B]/12 hover:border-[#F97316] rounded-2xl overflow-hidden text-left flex flex-col transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F97316]"
              >
                <div className="aspect-[4/5] w-full bg-[#0B0B0B] relative overflow-hidden">
                  <ArchitecturalImage
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fallbackTitle={photo.title}
                  />
                  <span className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#0B0B0B]/80 border border-white/20 text-white group-hover:bg-[#F97316] flex items-center justify-center transition-colors">
                    <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-display text-sm font-bold text-[#0B0B0B] leading-snug">
                    {photo.title}
                  </p>
                  <p className="mt-1 text-xs text-[#525252] leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for PVC & Aluminum Photos */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-50 bg-[#0B0B0B]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={handleClosePhoto}
        >
          <div
            className="relative w-full max-w-5xl bg-[#141414] border border-[#F97316]/40 rounded-2xl overflow-hidden text-white grid grid-cols-1 md:grid-cols-12 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClosePhoto}
              aria-label="Görseli kapat"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-lg bg-[#0B0B0B]/90 border border-[#F97316]/50 text-white hover:bg-[#F97316] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:col-span-8 bg-[#0B0B0B] relative flex items-center justify-center p-4 sm:p-6 min-h-[320px] md:min-h-[520px]">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
              />
              <button
                type="button"
                onClick={handlePrevPhoto}
                aria-label="Önceki fotoğraf"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#141414]/85 border border-white/20 text-white hover:bg-[#F97316] flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextPhoto}
                aria-label="Sonraki fotoğraf"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#141414]/85 border border-white/20 text-white hover:bg-[#F97316] flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/12">
              <div>
                <p className="text-xs tracking-[0.16em] uppercase text-[#F97316] font-bold pr-10">
                  PVC &amp; Alüminyum · {lightboxIndex + 1} / {PVC_ALUMINUM_GALLERY.length}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-white leading-snug">
                  {activePhoto.title}
                </h3>
                <p className="mt-3 text-sm text-[#D4D4D4] leading-relaxed">
                  {activePhoto.caption}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/12">
                <a
                  href={getWhatsAppUrl(
                    `Merhaba EFM Interiors, "${activePhoto.title}" çalışmanız hakkında bilgi ve fiyat teklifi almak istiyorum.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>Benzer İş İçin Teklif Al</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Theater Video Player Modal for PVC & Aluminum Videos */}
      {activeVideo && activeVideoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.title}
          className="fixed inset-0 z-50 bg-[#0B0B0B]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveVideoIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#141414] border border-[#F97316]/45 rounded-2xl overflow-hidden text-white grid grid-cols-1 md:grid-cols-12 shadow-2xl max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveVideoIndex(null)}
              aria-label="Videoyu kapat"
              className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-lg bg-[#0B0B0B]/90 border border-white/25 text-white hover:border-[#F97316] hover:text-[#F97316] flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="md:col-span-7 bg-[#000000] relative flex items-center justify-center min-h-[360px] md:min-h-[520px]">
              <video
                key={activeVideo.videoSrc}
                src={activeVideo.videoSrc}
                controls
                autoPlay
                playsInline
                className="max-h-[76vh] w-full object-contain"
              />
            </div>

            <div className="md:col-span-5 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <p className="text-xs tracking-[0.16em] uppercase text-[#F97316] font-bold pr-10">
                  {activeVideo.category} · Video {activeVideoIndex + 1} / {PVC_ALUMINUM_VIDEOS.length}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white leading-snug">
                  {activeVideo.title}
                </h3>
                <p className="mt-3 text-sm text-[#D4D4D4] leading-relaxed">
                  {activeVideo.summary}
                </p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#A3A3A3]">
                  <Volume2 className="w-3.5 h-3.5 text-[#F97316]" aria-hidden="true" />
                  <span>Ses kontrollerini video üzerinden açıp kapatabilirsiniz.</span>
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/12 flex flex-col gap-3">
                <a
                  href={getWhatsAppUrl(
                    `Merhaba EFM Interiors, "${activeVideo.title}" videonuzdaki PVC / Alüminyum uygulaması hakkında bilgi ve fiyat teklifi almak istiyorum.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-bold bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Bu Çalışma İçin Fiyat Al</span>
                </a>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveVideoIndex(
                        (activeVideoIndex - 1 + PVC_ALUMINUM_VIDEOS.length) %
                          PVC_ALUMINUM_VIDEOS.length
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white/85 hover:text-[#F97316] border border-white/20 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Önceki Video</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveVideoIndex((activeVideoIndex + 1) % PVC_ALUMINUM_VIDEOS.length)
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white/85 hover:text-[#F97316] border border-white/20 cursor-pointer"
                  >
                    <span>Sonraki Video</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

interface PvcVideoCardProps {
  video: PvcAluminumVideo;
  index: number;
  isHovered: boolean;
  onHoverChange: (hovering: boolean) => void;
  onOpen: () => void;
}

function PvcVideoCard({
  video,
  index,
  isHovered,
  onHoverChange,
  onOpen,
}: PvcVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isHovered) {
      vid.play().catch(() => {
        /* ignore autoplay rejection */
      });
    } else {
      vid.pause();
    }
  }, [isHovered]);

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className="group bg-[#121212] border border-[#0B0B0B]/15 hover:border-[#F97316] rounded-2xl overflow-hidden text-left flex flex-col sm:flex-row transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F97316]"
    >
      <div className="relative w-full sm:w-52 aspect-[9/12] sm:aspect-auto sm:h-64 shrink-0 bg-[#0B0B0B] overflow-hidden">
        <video
          ref={videoRef}
          src={`${video.videoSrc}#t=0.5`}
          muted
          playsInline
          loop
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-transparent to-[#0B0B0B]/25"
        />
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#0B0B0B]/80 text-[11px] font-bold text-[#F97316] tabular-nums">
          0{index + 1}
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`w-12 h-12 rounded-full bg-[#0B0B0B]/75 border border-[#F97316] text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
              isHovered ? 'scale-110 bg-[#F97316]' : 'group-hover:scale-110'
            }`}
          >
            <Play className="w-4 h-4 fill-current translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <p className="text-xs tracking-[0.14em] uppercase text-[#F97316] font-bold">
            {video.category}
          </p>
          <h4 className="mt-2 font-display text-xl font-bold text-white leading-snug">
            {video.title}
          </h4>
          <p className="mt-2.5 text-sm text-[#D4D4D4] leading-relaxed">
            {video.summary}
          </p>
        </div>

        <p className="mt-5 text-xs font-bold text-[#F97316] group-hover:text-white transition-colors">
          Videoyu Tam Ekran İzle →
        </p>
      </div>
    </button>
  );
}
