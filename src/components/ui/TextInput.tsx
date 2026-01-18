/**
 * LIFE RESET PROTOCOL - TextInput
 * Campo de texto de una línea con estilo glassmorphism
 */

import { forwardRef, type InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {label}
          </label>
        )}

        <motion.div
          className="relative"
          whileFocus={{ scale: 1.01 }}
        >
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full
              glass
              rounded-xl
              py-3
              ${leftIcon ? 'pl-12' : 'px-4'}
              ${rightIcon ? 'pr-12' : 'px-4'}
              text-text-primary
              placeholder:text-text-muted
              focus:outline-none
              focus:ring-2
              focus:ring-neon-purple/50
              focus:border-neon-purple/50
              transition-all duration-300
              ${error ? 'ring-2 ring-neon-red/50 border-neon-red/50' : ''}
              ${className}
            `}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
              {rightIcon}
            </div>
          )}
        </motion.div>

        {hint && !error && (
          <p className="mt-2 text-sm text-text-muted">{hint}</p>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm text-neon-red"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
