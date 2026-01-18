/**
 * LIFE RESET PROTOCOL - GlassCard
 * Componente base con efecto glassmorphism
 */

import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'strong' | 'gradient';
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const variantClasses = {
  default: 'glass',
  strong: 'glass-strong',
  gradient: 'border-gradient',
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ variant = 'default', glow = false, padding = 'md', className = '', children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`
          ${variantClasses[variant]}
          ${paddingClasses[padding]}
          ${glow ? 'glow-hover' : ''}
          rounded-xl
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
