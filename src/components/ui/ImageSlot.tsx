import React, { useState } from 'react';
import { ImageConfig } from '../../types';

interface ImageSlotProps {
  image: ImageConfig;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  aspectRatio?: string;
  overlay?: boolean;
  overlayClassName?: string;
}

export const ImageSlot: React.FC<ImageSlotProps> = ({
  image,
  className = '',
  containerClassName = '',
  priority = false,
  aspectRatio,
  overlay = false,
  overlayClassName = 'bg-black/25',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Style positioning for desktop vs mobile
  const effectiveAspectRatio = aspectRatio || image.aspectRatio || 'auto';

  return (
    <div
      className={`relative overflow-hidden bg-[#0C0C0C] ${containerClassName}`}
      style={{ aspectRatio: effectiveAspectRatio }}
    >
      {/* Skeleton / Low-contrast loading state */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#0E0E0E] animate-pulse" />
      )}

      {!hasError ? (
        <img
          src={image.src}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={{
            objectPosition: image.desktopPosition || 'center center',
          }}
        />
      ) : (
        /* Graceful Branded Fallback */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#0A0A0A] border border-white/5">
          <span className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono">
            YOUR STORY TATTOO
          </span>
          <p className="mt-2 text-xs text-white/50 tracking-wide font-light max-w-[200px]">
            {image.alt || 'Editorial Visual'}
          </p>
        </div>
      )}

      {/* Optional dark mood gradient overlay */}
      {overlay && !hasError && (
        <div className={`absolute inset-0 pointer-events-none ${overlayClassName}`} />
      )}
    </div>
  );
};
