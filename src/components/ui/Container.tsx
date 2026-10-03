import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full' | 'md';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'default',
  ...props
}) => {
  const maxWidths = {
    narrow: 'max-w-4xl',
    md: 'max-w-3xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1536px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 md:px-12 lg:px-16 ${maxWidths[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
