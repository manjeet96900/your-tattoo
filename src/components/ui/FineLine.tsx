import React from 'react';

interface FineLineProps {
  className?: string;
  label?: string;
  align?: 'left' | 'center' | 'right';
}

export const FineLine: React.FC<FineLineProps> = ({
  className = '',
  label,
  align = 'center',
}) => {
  if (!label) {
    return <hr className={`border-0 h-[1px] bg-white/[0.08] w-full ${className}`} />;
  }

  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div className={`relative flex items-center w-full ${alignmentClasses[align]} ${className}`}>
      <div className="flex-grow h-[1px] bg-white/[0.08]" />
      <span className="px-4 text-[10px] tracking-[0.3em] uppercase text-white/35 font-mono select-none">
        {label}
      </span>
      <div className="flex-grow h-[1px] bg-white/[0.08]" />
    </div>
  );
};
