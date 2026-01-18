/**
 * LIFE RESET PROTOCOL - Button
 * Botón con variantes y animaciones
 */

import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  isLoading?: boolean;
}

const variantClasses = {
  primary: `
    bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end
    text-white font-semibold
    shadow-lg shadow-neon-purple/20
    hover:shadow-neon-purple/40
  `,
  secondary: `
    glass
    text-text-primary
    hover:bg-white/10
  `,
  ghost: `
    bg-transparent
    text-text-secondary
    hover:text-text-primary
    hover:bg-white/5
  `,
  danger: `
    bg-neon-red/20
    text-neon-red
    border border-neon-red/30
    hover:bg-neon-red/30
  `,
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      children,
      isLoading = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={`
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : ''}
          inline-flex items-center justify-center gap-2
          transition-all duration-300
          touch-feedback no-select
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <motion.span
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <span>Cargando...</span>
          </>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
