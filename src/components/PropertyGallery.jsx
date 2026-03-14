import { useState, useEffect, useCallback } from 'react';

export default function PropertyGallery({ images, title, language = 'es' }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const nextImage = useCallback((e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback((e) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  if (!images || images.length === 0) return null;

  const viewGalleryText = language === 'es' ? 'Ver galería' : 'View gallery';
  const imageAlt = language === 'es' ? 'Imagen' : 'Image';
  const ofText = language === 'es' ? 'de' : 'of';

  return (
    <>
      {/* Grid de imágenes */}
      <div className="property-gallery">
        {/* Imagen principal grande */}
        <div 
          className="property-gallery-main"
          onClick={() => openLightbox(0)}
        >
          <img 
            src={images[0]} 
            alt={`${title} - ${imageAlt} 1`}
            className="property-gallery-main-img"
          />
          <div className="property-gallery-overlay">
            <div className="property-gallery-zoom">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
                <path d="M11 8v6M8 11h6"/>
              </svg>
              <span>{viewGalleryText}</span>
            </div>
          </div>
        </div>

        {/* Grid de miniaturas */}
        <div className="property-gallery-grid">
          {images.slice(1, 5).map((img, idx) => (
            <div 
              key={idx}
              className="property-gallery-thumb"
              onClick={() => openLightbox(idx + 1)}
            >
              <img 
                src={img} 
                alt={`${title} - ${imageAlt} ${idx + 2}`}
              />
              <div className="property-gallery-thumb-overlay">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                  <path d="M11 8v6M8 11h6"/>
                </svg>
              </div>
              {idx === 3 && images.length > 5 && (
                <div className="property-gallery-more">
                  <span>+{images.length - 5}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="property-lightbox-backdrop"
          onClick={closeLightbox}
        >
          <div className="property-lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Botón cerrar */}
            <button className="property-lightbox-close" onClick={closeLightbox}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Navegación */}
            {images.length > 1 && (
              <>
                <button className="property-lightbox-nav prev" onClick={prevImage}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button className="property-lightbox-nav next" onClick={nextImage}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </>
            )}

            {/* Imagen principal */}
            <div className="property-lightbox-image-container">
              <img 
                src={images[currentImageIndex]} 
                alt={`${title} - ${imageAlt} ${currentImageIndex + 1}`}
                className="property-lightbox-image"
              />
            </div>

            {/* Info */}
            <div className="property-lightbox-info">
              <span className="property-lightbox-counter">
                {currentImageIndex + 1} {ofText} {images.length}
              </span>
              <span className="property-lightbox-title">{title}</span>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="property-lightbox-thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`property-lightbox-thumb ${idx === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img src={img} alt={`${imageAlt} ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
