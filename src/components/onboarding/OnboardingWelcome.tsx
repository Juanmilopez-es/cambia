/**
 * LIFE RESET PROTOCOL - Onboarding Welcome
 * Pantalla de bienvenida inmersiva
 */

import { motion } from 'framer-motion';
import { Button } from '../ui';

interface OnboardingWelcomeProps {
  onContinue: () => void;
}

export const OnboardingWelcome = ({ onContinue }: OnboardingWelcomeProps) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Logo / Icono */}
      <motion.div
        className="w-24 h-24 mb-8 relative"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple to-neon-cyan rounded-2xl opacity-20 blur-xl" />
        <div className="relative w-full h-full bg-gradient-to-br from-neon-purple to-neon-cyan rounded-2xl flex items-center justify-center">
          <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
      </motion.div>

      {/* Título */}
      <motion.h1
        className="text-4xl font-bold text-gradient mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Life Reset Protocol
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
        className="text-lg text-text-secondary mb-2 max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Tu sistema operativo para cambiar de identidad
      </motion.p>

      {/* Descripción */}
      <motion.p
        className="text-text-muted mb-12 max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Bienvenido a La Excavación. Vamos a descubrir quién quieres ser y diseñar el sistema para conseguirlo.
      </motion.p>

      {/* Filosofía */}
      <motion.div
        className="glass rounded-2xl p-6 mb-8 max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <p className="text-neon-purple text-sm font-medium mb-2">PRINCIPIO FUNDAMENTAL</p>
        <p className="text-text-primary font-medium">
          "No haces cosas. Confirmas quién eres."
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          onClick={onContinue}
          fullWidth
          size="lg"
        >
          Comenzar La Excavación
        </Button>
      </motion.div>

      {/* Indicador de privacidad */}
      <motion.p
        className="text-xs text-text-muted mt-6 max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        🔒 Tus datos permanecen en tu dispositivo. Privacidad total.
      </motion.p>
    </motion.div>
  );
};
