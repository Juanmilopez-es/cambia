/**
 * LIFE RESET PROTOCOL - Onboarding Complete
 * Pantalla de celebración al completar la excavación
 */

import { motion } from 'framer-motion';
import { Button, GlassCard } from '../ui';

interface OnboardingCompleteProps {
  playerName?: string;
  identityStatement: string;
  onStart: () => void;
}

export const OnboardingComplete = ({ identityStatement, onStart }: OnboardingCompleteProps) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animación de celebración */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
      >
        {/* Efecto de partículas */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-neon-purple"
            initial={{ opacity: 1, x: 0, y: 0 }}
            animate={{
              opacity: [1, 0],
              x: Math.cos((i * 30 * Math.PI) / 180) * 80,
              y: Math.sin((i * 30 * Math.PI) / 180) * 80,
            }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            style={{ left: '50%', top: '50%' }}
          />
        ))}

        {/* Icono central */}
        <div className="w-28 h-28 relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-neon-green via-neon-cyan to-neon-purple rounded-3xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{ opacity: 0.2, filter: 'blur(20px)' }}
          />
          <div className="relative w-full h-full bg-gradient-to-br from-neon-green to-neon-cyan rounded-3xl flex items-center justify-center">
            <motion.svg
              className="w-14 h-14 text-void"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.path
                d="M20 6L9 17l-5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </div>
        </div>
      </motion.div>

      {/* Título */}
      <motion.h1
        className="text-3xl font-bold text-gradient mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        ¡La Excavación Completa!
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
        className="text-lg text-text-secondary mb-8 max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        Has definido quién quieres ser. Ahora es momento de demostrarlo cada día.
      </motion.p>

      {/* Identidad principal */}
      <motion.div
        className="w-full max-w-sm mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <GlassCard variant="gradient" glow className="text-center">
          <p className="text-sm text-neon-purple mb-2 font-medium">TU IDENTIDAD</p>
          <p className="text-xl font-semibold text-text-primary">
            "Yo soy el tipo de persona que {identityStatement}"
          </p>
        </GlassCard>
      </motion.div>

      {/* Mensaje final */}
      <motion.div
        className="glass rounded-2xl p-5 mb-8 max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <p className="text-text-secondary text-sm leading-relaxed">
          Recuerda: <span className="text-text-primary">no haces cosas, confirmas quién eres</span>.
          Cada misión completada es una prueba de tu nueva identidad.
          El juego comienza ahora.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Button onClick={onStart} fullWidth size="lg">
          ⚔️ Comenzar el Juego
        </Button>
      </motion.div>

      {/* Quote */}
      <motion.p
        className="text-xs text-text-muted mt-8 max-w-xs italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        "La impaciencia con las acciones, paciencia con los resultados."
        <br />
        <span className="text-neon-purple">— Naval</span>
      </motion.p>
    </motion.div>
  );
};
