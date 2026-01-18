/**
 * LIFE RESET PROTOCOL - Onboarding Vision
 * Tu realidad ideal - El destino
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, TextArea, GlassCard } from '../ui';

interface OnboardingVisionProps {
  initialValue: string;
  onContinue: (vision: string) => void;
  onBack: () => void;
}

export const OnboardingVision = ({ initialValue, onContinue, onBack }: OnboardingVisionProps) => {
  const [vision, setVision] = useState(initialValue);
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (vision.trim().length < 20) {
      setError('Describe tu visión con más detalle (mínimo 20 caracteres)');
      return;
    }
    onContinue(vision.trim());
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
          className="flex items-center gap-2 text-neon-cyan mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-2xl">✨</span>
          <span className="text-sm font-semibold uppercase tracking-wide">Paso 2 de 6</span>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-text-primary mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Tu Visión
        </motion.h1>

        <motion.p
          className="text-text-secondary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Tu realidad ideal. El cielo que quieres crear. Tu destino.
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
          <GlassCard variant="default" className="border-neon-cyan/20">
            <p className="text-sm text-text-muted mb-2">Ejemplo:</p>
            <p className="text-text-secondary text-sm italic">
              "Me despierto con energía. Mi cuerpo está fuerte y sano. Tengo libertad financiera
              y trabajo en proyectos que me apasionan. Mis relaciones son profundas y auténticas.
              Soy la persona que siempre quise ser: disciplinada, serena, y con propósito claro."
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
            label="Describe tu vida ideal con detalle"
            placeholder="Mi vida ideal es así: cada mañana me despierto..."
            value={vision}
            onChange={(e) => {
              setVision(e.target.value);
              setError('');
            }}
            error={error}
            hint="Visualízalo como si ya fuera real. Siente la emoción."
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
            "Cuando combinas una intención clara con una emoción elevada, produces un nuevo estado del ser."
          </p>
          <p className="text-text-muted text-xs mt-1">— Joe Dispenza</p>
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
