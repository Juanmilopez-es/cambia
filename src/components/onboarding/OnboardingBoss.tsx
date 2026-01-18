/**
 * LIFE RESET PROTOCOL - Onboarding Boss
 * Configuración del Boss Fight (Jefe del Mes)
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, TextInput, TextArea, GlassCard } from '../ui';

interface OnboardingBossProps {
  initialTitle: string;
  initialDescription: string;
  initialMilestones: string[];
  onContinue: (title: string, description: string, milestones: string[]) => void;
  onBack: () => void;
}

export const OnboardingBoss = ({
  initialTitle,
  initialDescription,
  initialMilestones,
  onContinue,
  onBack,
}: OnboardingBossProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [milestones, setMilestones] = useState<string[]>(
    initialMilestones.length > 0 ? initialMilestones : ['', '']
  );
  const [errors, setErrors] = useState({ title: '', milestones: '' });

  const addMilestone = () => {
    if (milestones.length < 6) {
      setMilestones([...milestones, '']);
    }
  };

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((_, i) => i !== index));
    }
  };

  const updateMilestone = (index: number, value: string) => {
    const newMilestones = [...milestones];
    newMilestones[index] = value;
    setMilestones(newMilestones);
    setErrors((prev) => ({ ...prev, milestones: '' }));
  };

  const handleContinue = () => {
    const newErrors = { title: '', milestones: '' };

    if (title.trim().length < 3) {
      newErrors.title = 'Nombra a tu Boss';
    }

    const validMilestones = milestones.filter((m) => m.trim().length > 0);
    if (validMilestones.length < 2) {
      newErrors.milestones = 'Añade al menos 2 hitos para derrotar al Boss';
    }

    if (newErrors.title || newErrors.milestones) {
      setErrors(newErrors);
      return;
    }

    onContinue(title.trim(), description.trim(), validMilestones);
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
          <span className="text-2xl">👹</span>
          <span className="text-sm font-semibold uppercase tracking-wide">Paso 5 de 6</span>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-text-primary mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Tu Boss Fight
        </motion.h1>

        <motion.p
          className="text-text-secondary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          El proyecto clave de este mes. El Jefe Final que debes derrotar.
        </motion.p>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col gap-6 overflow-auto">
        {/* Concepto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard variant="default" className="border-neon-red/20">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">⚔️</span>
              <p className="text-sm font-medium text-neon-red">BOSS FIGHT</p>
            </div>
            <p className="text-text-secondary text-sm">
              Divide tu mes en una batalla épica. El Boss tiene "hitos" que son sus puntos débiles.
              Cada hito completado es un golpe. Cuando todos estén, habrás derrotado al Boss.
            </p>
          </GlassCard>
        </motion.div>

        {/* Nombre del Boss */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <TextInput
            label="Nombre del Boss"
            placeholder="Ej: Lanzar la landing page"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: '' }));
            }}
            error={errors.title}
          />
        </motion.div>

        {/* Descripción opcional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <TextArea
            label="Descripción (opcional)"
            placeholder="¿Qué significa derrotar a este Boss para ti?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[80px]"
          />
        </motion.div>

        {/* Hitos / Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label className="block text-sm font-medium text-text-secondary mb-3">
            Hitos para derrotar al Boss
          </label>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex gap-2 items-center"
                >
                  <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center text-xs text-neon-purple font-bold shrink-0">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    placeholder={`Hito ${index + 1}: Ej: Diseñar wireframes`}
                    value={milestone}
                    onChange={(e) => updateMilestone(index, e.target.value)}
                    className="flex-1 glass rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-neon-purple/50"
                  />
                  {milestones.length > 1 && (
                    <button
                      onClick={() => removeMilestone(index)}
                      className="p-2 text-text-muted hover:text-neon-red transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {errors.milestones && (
              <p className="text-neon-red text-sm">{errors.milestones}</p>
            )}

            {milestones.length < 6 && (
              <Button
                variant="ghost"
                onClick={addMilestone}
                size="sm"
                className="w-full border border-dashed border-fog"
              >
                + Añadir hito
              </Button>
            )}
          </div>
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
