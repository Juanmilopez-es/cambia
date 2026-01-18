/**
 * LIFE RESET PROTOCOL - Breathing Exercise
 * Respiración de coherencia 4-4-4-4 (Box Breathing)
 */

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui';

interface BreathingExerciseProps {
  onClose: () => void;
}

type BreathingPhase = 'inhale' | 'holdIn' | 'exhale' | 'holdOut';

const phases: { phase: BreathingPhase; label: string; instruction: string }[] = [
  { phase: 'inhale', label: 'Inhala', instruction: 'Llena tus pulmones lentamente' },
  { phase: 'holdIn', label: 'Mantén', instruction: 'Retén el aire con calma' },
  { phase: 'exhale', label: 'Exhala', instruction: 'Libera el aire suavemente' },
  { phase: 'holdOut', label: 'Pausa', instruction: 'Permanece vacío un momento' },
];

const PHASE_DURATION = 4; // segundos por fase
const TOTAL_CYCLES = 4;

export const BreathingExercise = ({ onClose }: BreathingExerciseProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(PHASE_DURATION);
  const [cycle, setCycle] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const currentPhase = phases[currentPhaseIndex];

  const startExercise = () => {
    setIsRunning(true);
    setCurrentPhaseIndex(0);
    setCountdown(PHASE_DURATION);
    setCycle(1);
    setIsComplete(false);
  };

  const stopExercise = () => {
    setIsRunning(false);
    setCurrentPhaseIndex(0);
    setCountdown(PHASE_DURATION);
    setCycle(1);
  };

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          // Cambiar a siguiente fase
          setCurrentPhaseIndex((prevPhase) => {
            const nextPhase = (prevPhase + 1) % 4;

            // Si completamos un ciclo
            if (nextPhase === 0) {
              setCycle((prevCycle) => {
                if (prevCycle >= TOTAL_CYCLES) {
                  setIsRunning(false);
                  setIsComplete(true);
                  return prevCycle;
                }
                return prevCycle + 1;
              });
            }

            return nextPhase;
          });
          return PHASE_DURATION;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // Calcular el tamaño del círculo basado en la fase
  const getCircleScale = useCallback(() => {
    if (!isRunning && !isComplete) return 1;

    switch (currentPhase.phase) {
      case 'inhale':
        return 1.5;
      case 'holdIn':
        return 1.5;
      case 'exhale':
        return 1;
      case 'holdOut':
        return 1;
      default:
        return 1;
    }
  }, [isRunning, isComplete, currentPhase]);

  return (
    <motion.div
      className="fixed inset-0 bg-void/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-text-muted hover:text-text-primary transition-colors safe-area-top"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Título */}
      <motion.h2
        className="text-2xl font-bold text-text-primary mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Respiración de Coherencia
      </motion.h2>

      <motion.p
        className="text-text-secondary mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        4 segundos inhalar • 4 mantener • 4 exhalar • 4 pausa
      </motion.p>

      {/* Círculo de respiración */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        {/* Círculo exterior (guía) */}
        <div className="absolute inset-0 rounded-full border border-fog/30" />

        {/* Círculo animado */}
        <motion.div
          className="absolute rounded-full bg-gradient-to-br from-neon-cyan/30 to-neon-purple/30"
          animate={{
            scale: getCircleScale(),
            opacity: isRunning ? 1 : 0.5,
          }}
          transition={{
            duration: PHASE_DURATION,
            ease: 'easeInOut',
          }}
          style={{ width: '60%', height: '60%' }}
        />

        {/* Centro con contador o instrucciones */}
        <div className="relative z-10 text-center">
          {!isRunning && !isComplete ? (
            <motion.p
              className="text-text-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Pulsa para comenzar
            </motion.p>
          ) : isComplete ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <span className="text-4xl">✨</span>
              <p className="text-neon-green font-bold mt-2">Completo</p>
            </motion.div>
          ) : (
            <>
              <motion.p
                key={currentPhase.phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-gradient mb-1"
              >
                {currentPhase.label}
              </motion.p>
              <p className="text-5xl font-bold text-text-primary">{countdown}</p>
              <motion.p
                key={`instruction-${currentPhase.phase}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-text-muted mt-2"
              >
                {currentPhase.instruction}
              </motion.p>
            </>
          )}
        </div>
      </div>

      {/* Indicador de ciclo */}
      {isRunning && (
        <motion.div
          className="flex gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(TOTAL_CYCLES)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < cycle ? 'bg-neon-cyan' : 'bg-fog'
              }`}
            />
          ))}
        </motion.div>
      )}

      {/* Botones de control */}
      <div className="flex gap-4">
        {!isRunning && !isComplete ? (
          <Button onClick={startExercise} size="lg">
            Comenzar
          </Button>
        ) : isComplete ? (
          <Button onClick={onClose} size="lg">
            Volver al juego
          </Button>
        ) : (
          <Button variant="secondary" onClick={stopExercise} size="lg">
            Detener
          </Button>
        )}
      </div>

      {/* Quote */}
      <motion.p
        className="absolute bottom-8 text-xs text-text-muted text-center max-w-xs safe-area-bottom"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        "Cuando respiras conscientemente, sales del piloto automático."
      </motion.p>
    </motion.div>
  );
};
