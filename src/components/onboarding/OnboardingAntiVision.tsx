/**
 * LIFE RESET PROTOCOL - Onboarding Anti-Vision
 * El infierno que quieres evitar (dolor como propulsor)
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, TextArea, GlassCard } from '../ui';

interface OnboardingAntiVisionProps {
  initialValue: string;
  onContinue: (antiVision: string) => void;
  onBack: () => void;
}

export const OnboardingAntiVision = ({ initialValue, onContinue, onBack }: OnboardingAntiVisionProps) => {
  const [antiVision, setAntiVision] = useState(initialValue);
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (antiVision.trim().length < 20) {
      setError('Describe tu anti-visión con más detalle (mínimo 20 caracteres)');
      return;
    }
    onContinue(antiVision.trim());
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col px-6 py-12 safe-area-top safe-area-bottom"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      {/* Header */}
      <div className="mb-8">
        <motion.div
          className="flex items-center gap-2 text-neon-red mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-2xl">⚠️</span>
          <span className="text-sm font-semibold uppercase tracking-wide">Paso 1 de 6</span>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-text-primary mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Tu Anti-Visión
        </motion.h1>

        <motion.p
          className="text-text-secondary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          El infierno que quieres evitar. El dolor es tu propulsor más poderoso.
        </motion.p>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Ejemplo/Inspiración */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard variant="default" className="border-neon-red/20">
            <p className="text-sm text-text-muted mb-2">Ejemplo:</p>
            <p className="text-text-secondary text-sm italic">
              "Dentro de 5 años, si sigo igual: sobrepeso, sin ahorros, en un trabajo que odio,
              sin energía para jugar con mis hijos, arrepentido de no haber intentado nada diferente,
              viendo cómo otros viven la vida que yo quería..."
            </p>
          </GlassCard>
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex-1"
        >
          <TextArea
            label="Describe el futuro que DEBES evitar"
            placeholder="Si dentro de 5 años no cambio nada, mi vida será..."
            value={antiVision}
            onChange={(e) => {
              setAntiVision(e.target.value);
              setError('');
            }}
            error={error}
            hint="Sé específico. El dolor detallado es combustible."
            className="min-h-[200px]"
          />
        </motion.div>

        {/* Quote motivacional */}
        <motion.div
          className="text-center py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-neon-purple text-sm italic">
            "El dolor de la disciplina pesa gramos. El dolor del arrepentimiento pesa toneladas."
          </p>
        </motion.div>
      </div>

      {/* Navegación */}
      <motion.div
        className="flex gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Atrás
        </Button>
        <Button onClick={handleContinue} className="flex-1">
          Continuar
        </Button>
      </motion.div>
    </motion.div>
  );
};
