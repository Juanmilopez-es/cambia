/**
 * LIFE RESET PROTOCOL - State Shifter
 * Botón flotante de "pánico" para resetear el estado mental
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BreathingExercise } from './BreathingExercise';
import { TruthReminder } from './TruthReminder';

type ShifterMode = null | 'menu' | 'breathing' | 'truth';

export const StateShifter = () => {
  const [mode, setMode] = useState<ShifterMode>(null);

  const openMenu = () => setMode('menu');
  const closeAll = () => setMode(null);

  return (
    <>
      {/* Botón flotante */}
      <motion.button
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan shadow-lg shadow-neon-purple/30 flex items-center justify-center z-40 safe-area-bottom"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={openMenu}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.5 }}
      >
        <motion.div
          animate={mode === null ? { rotate: 0 } : { rotate: 45 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-7 h-7 text-void" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </motion.div>

        {/* Efecto de pulso */}
        <motion.div
          className="absolute inset-0 rounded-full bg-neon-purple/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.button>

      {/* Menú de opciones */}
      <AnimatePresence>
        {mode === 'menu' && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-void/80 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAll}
            />

            {/* Opciones */}
            <motion.div
              className="fixed bottom-28 right-6 z-50 flex flex-col gap-3 items-end safe-area-bottom"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
            >
              {/* Opción: Respiración */}
              <motion.button
                className="flex items-center gap-3 px-5 py-3 glass-strong rounded-2xl hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode('breathing')}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-text-primary font-medium">Respiración de Coherencia</span>
                <span className="text-2xl">🌬️</span>
              </motion.button>

              {/* Opción: Recordatorio de Verdad */}
              <motion.button
                className="flex items-center gap-3 px-5 py-3 glass-strong rounded-2xl hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode('truth')}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <span className="text-text-primary font-medium">Recordatorio de Verdad</span>
                <span className="text-2xl">💡</span>
              </motion.button>
            </motion.div>

            {/* Botón cerrar transformado */}
            <motion.button
              className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-mist flex items-center justify-center z-50 safe-area-bottom"
              onClick={closeAll}
              initial={{ rotate: 0 }}
              animate={{ rotate: 45 }}
            >
              <svg className="w-7 h-7 text-text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Pantallas completas */}
      <AnimatePresence>
        {mode === 'breathing' && <BreathingExercise onClose={closeAll} />}
        {mode === 'truth' && <TruthReminder onClose={closeAll} />}
      </AnimatePresence>
    </>
  );
};
