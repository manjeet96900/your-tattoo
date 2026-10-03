import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  badge,
  title,
  description,
  align = 'left',
  className = '',
}) => {
  const displayEyebrow = badge || eyebrow;
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {displayEyebrow && (
        <div className={`flex items-center gap-3 mb-3.5 ${isCenter ? 'justify-center' : 'justify-start'}`}>
          <span className="w-6 h-[1px] bg-amber-400/80" />
          <span className="text-[10px] tracking-[0.28em] uppercase text-amber-400 font-mono font-medium">
            {displayEyebrow}
          </span>
        </div>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.04em] text-white leading-[1.18] uppercase">
        {title}
      </h2>
      {description && (
        <p className="mt-3.5 text-xs sm:text-sm md:text-base text-[#A3A3A0] font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
