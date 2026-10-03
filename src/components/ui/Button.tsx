import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-normal tracking-[0.16em] uppercase text-xs transition-all duration-300 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/80 active:translate-y-[1px] disabled:opacity-40 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-4 py-2 text-[10px] tracking-[0.18em]',
    md: 'px-7 py-3.5 text-xs',
    lg: 'px-9 py-4 text-xs tracking-[0.2em]',
  };

  const variantStyles = {
    // Solid stark off-white against dark canvas
    primary:
      'bg-[#F5F5F3] text-[#050505] hover:bg-white border border-[#F5F5F3] hover:border-white shadow-[0_2px_12px_rgba(255,255,255,0.06)]',
    // Structural dark with subtle border
    secondary:
      'bg-[#0C0C0C] text-[#F5F5F3] border border-white/15 hover:border-white/40 hover:bg-[#141414]',
    // Fine-line ghost outline
    outline:
      'bg-transparent text-[#F5F5F3] border border-white/20 hover:border-white hover:text-white',
    // Editorial minimal text link
    text:
      'bg-transparent text-[#9E9E9C] hover:text-[#F5F5F3] underline-offset-8 hover:underline p-0 border-none shadow-none tracking-[0.2em]',
  };

  return (
    <button
      className={`${baseStyles} ${variant !== 'text' ? sizeStyles[size] : ''} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </button>
  );
};
