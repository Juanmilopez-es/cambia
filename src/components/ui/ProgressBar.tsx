/**
 * LIFE RESET PROTOCOL - ProgressBar
 * Barra de progreso animada con efecto premium
 */

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'boss' | 'streak';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const variantGradients = {
  default: 'from-neon-blue to-neon-cyan',
  boss: 'from-neon-purple via-gradient-mid to-neon-red',
  streak: 'from-neon-green to-neon-cyan',
};

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export const ProgressBar = ({
  progress,
  label,
  showPercentage = true,
  variant = 'default',
  size = 'md',
  animated = true,
}: ProgressBarProps) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm text-text-secondary font-medium">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm text-text-primary font-bold">
              {Math.round(clampedProgress)}%
            </span>
          )}
        </div>
      )}

      <div
        className={`
          w-full ${sizeClasses[size]}
          bg-mist/50 rounded-full
          overflow-hidden
          backdrop-blur-sm
        `}
      >
        <motion.div
          className={`
            h-full rounded-full
            bg-gradient-to-r ${variantGradients[variant]}
            relative
          `}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{
            duration: animated ? 0.8 : 0,
            ease: 'easeOut',
          }}
        >
          {/* Efecto de brillo */}
          {clampedProgress > 0 && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};
