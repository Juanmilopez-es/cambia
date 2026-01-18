/**
 * LIFE RESET PROTOCOL - Onboarding Mission
 * Configuración de la Misión Anual (objetivo a 1 año)
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, TextInput, TextArea, GlassCard } from '../ui';

interface OnboardingMissionProps {
  initialTitle: string;
  initialDescription: string;
  onContinue: (title: string, description: string) => void;
  onBack: () => void;
}

export const OnboardingMission = ({ initialTitle, initialDescription, onContinue, onBack }: OnboardingMissionProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [errors, setErrors] = useState({ title: '', description: '' });

  const handleContinue = () => {
    const newErrors = { title: '', description: '' };

    if (title.trim().length < 5) {
      newErrors.title = 'El título debe tener al menos 5 caracteres';
    }
    if (description.trim().length < 10) {
      newErrors.description = 'Describe tu misión con más detalle';
    }

    if (newErrors.title || newErrors.description) {
      setErrors(newErrors);
      return;
    }

    onContinue(title.trim(), description.trim());
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
          className="flex items-center gap-2 text-neon-amber mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-2xl">🎮</span>
          <span className="text-sm font-semibold uppercase tracking-wide">Paso 4 de 6</span>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-text-primary mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Tu Misión Anual
        </motion.h1>

        <motion.p
          className="text-text-secondary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          El gran objetivo a conquistar en los próximos 12 meses. Tu Norte.
        </motion.p>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Concepto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard variant="default" className="border-neon-amber/20">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🗺️</span>
              <p className="text-sm font-medium text-neon-amber">LA MISIÓN</p>
            </div>
            <p className="text-text-secondary text-sm">
              Es el objetivo macro que define tu año. Todo lo demás (Boss Fights y Quests diarias)
              debe estar alineado con esta misión.
            </p>
          </GlassCard>
        </motion.div>

        {/* Inputs */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <TextInput
            label="Nombre de la Misión"
            placeholder="Ej: Conquistar mi libertad financiera"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: '' }));
            }}
            error={errors.title}
          />

          <TextArea
            label="Descripción de la Misión"
            placeholder="Describe qué significa completar esta misión para ti. ¿Cómo será tu vida cuando lo logres?"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: '' }));
            }}
            error={errors.description}
            className="min-h-[150px]"
          />
        </motion.div>

        {/* Ejemplos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-sm text-text-muted mb-3">Ejemplos de Misiones:</p>
          <div className="space-y-2">
            {[
              'Lanzar mi negocio online y facturar 50K€',
              'Transformar mi cuerpo: -15kg y ganar músculo',
              'Dominar programación y conseguir trabajo remoto',
              'Publicar mi primer libro',
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setTitle(example);
                  setErrors((prev) => ({ ...prev, title: '' }));
                }}
                className="block w-full text-left text-sm px-4 py-2 glass rounded-lg text-text-secondary hover:text-neon-amber transition-colors"
              >
                → {example}
              </button>
            ))}
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
