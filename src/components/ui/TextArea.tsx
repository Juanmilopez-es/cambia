/**
 * LIFE RESET PROTOCOL - TextArea
 * Campo de texto con estilo glassmorphism
 */

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, hint, className = '', ...props }, ref) => {
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
          <textarea
            ref={ref}
            className={`
              w-full
              glass
              rounded-xl
              px-4 py-3
              text-text-primary
              placeholder:text-text-muted
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-neon-purple/50
              focus:border-neon-purple/50
              transition-all duration-300
              min-h-[120px]
              ${error ? 'ring-2 ring-neon-red/50 border-neon-red/50' : ''}
              ${className}
            `}
            {...props}
          />
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

TextArea.displayName = 'TextArea';
