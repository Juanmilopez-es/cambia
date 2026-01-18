/**
 * LIFE RESET PROTOCOL - Truth Reminder
 * Recordatorio de verdad: frases de sabiduría y visión vs anti-visión
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '../../stores';
import { getRandomQuote, type WisdomQuote } from '../../data/wisdom';
import { Button, GlassCard } from '../ui';

interface TruthReminderProps {
  onClose: () => void;
}

type ReminderMode = 'quote' | 'vision' | 'antiVision';

export const TruthReminder = ({ onClose }: TruthReminderProps) => {
  const { player } = usePlayerStore();
  const [mode, setMode] = useState<ReminderMode>('quote');
  const [currentQuote, setCurrentQuote] = useState<WisdomQuote | null>(null);

  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

  const getNewQuote = () => {
    setCurrentQuote(getRandomQuote());
  };

  const authorColors: Record<WisdomQuote['author'], string> = {
    Naval: 'text-neon-cyan',
    Dispenza: 'text-neon-purple',
    Protocol: 'text-neon-amber',
    Custom: 'text-neon-green',
  };

  return (
    <motion.div
      className="fixed inset-0 bg-void/95 backdrop-blur-xl z-50 flex flex-col px-6 py-12 safe-area-top safe-area-bottom"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-text-muted hover:text-text-primary transition-colors"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 -mx-6 px-6">
        {[
          { mode: 'quote' as ReminderMode, label: '💡 Sabiduría', color: 'neon-cyan' },
          { mode: 'vision' as ReminderMode, label: '✨ Tu Visión', color: 'neon-green' },
          { mode: 'antiVision' as ReminderMode, label: '⚠️ Anti-Visión', color: 'neon-red' },
        ].map((tab) => (
          <button
            key={tab.mode}
            onClick={() => setMode(tab.mode)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
              ${mode === tab.mode
                ? `bg-${tab.color}/20 text-${tab.color} border border-${tab.color}/30`
                : 'text-text-muted hover:text-text-primary'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {mode === 'quote' && currentQuote && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-sm"
            >
              <GlassCard variant="gradient" className="mb-6">
                <motion.p
                  key={currentQuote.text}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl font-medium text-text-primary leading-relaxed mb-4"
                >
                  "{currentQuote.text}"
                </motion.p>
                <p className={`text-sm font-semibold ${authorColors[currentQuote.author]}`}>
                  — {currentQuote.author === 'Protocol' ? 'Life Reset Protocol' : currentQuote.author}
                </p>
              </GlassCard>

              <Button variant="secondary" onClick={getNewQuote}>
                Otra frase
              </Button>
            </motion.div>
          )}

          {mode === 'vision' && (
            <motion.div
              key="vision"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-sm w-full"
            >
              <div className="text-6xl mb-6">✨</div>
              <h3 className="text-sm font-semibold text-neon-green uppercase tracking-wider mb-4">
                Tu Visión - El Destino
              </h3>
              <GlassCard variant="default" className="border-neon-green/20">
                <p className="text-lg text-text-primary leading-relaxed">
                  {player?.vision || 'No has definido tu visión aún.'}
                </p>
              </GlassCard>

              <motion.p
                className="mt-6 text-sm text-text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Este es el futuro que estás creando cada día.
              </motion.p>
            </motion.div>
          )}

          {mode === 'antiVision' && (
            <motion.div
              key="antiVision"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-sm w-full"
            >
              <div className="text-6xl mb-6">⚠️</div>
              <h3 className="text-sm font-semibold text-neon-red uppercase tracking-wider mb-4">
                Tu Anti-Visión - El Infierno a Evitar
              </h3>
              <GlassCard variant="default" className="border-neon-red/20">
                <p className="text-lg text-text-primary leading-relaxed">
                  {player?.antiVision || 'No has definido tu anti-visión aún.'}
                </p>
              </GlassCard>

              <motion.p
                className="mt-6 text-sm text-neon-red/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                ¿Quieres acabar aquí? Cada acción cuenta.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Botón volver */}
      <div className="mt-8">
        <Button onClick={onClose} fullWidth variant="secondary">
          Volver al juego
        </Button>
      </div>
    </motion.div>
  );
};
