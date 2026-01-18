/**
 * LIFE RESET PROTOCOL - Onboarding Identity
 * Cambio de identidad: "Yo soy el tipo de persona que..."
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, TextInput, GlassCard } from '../ui';

interface OnboardingIdentityProps {
  initialStatements: string[];
  onContinue: (statements: string[]) => void;
  onBack: () => void;
}

const suggestionExamples = [
  'entrena todos los días aunque llueva',
  'cumple lo que promete',
  'se levanta a las 6:00 sin excusas',
  'controla sus emociones bajo presión',
  'ahorra e invierte cada mes',
  'lee al menos 30 minutos al día',
  'prioriza su salud sobre todo',
  'mantiene relaciones de calidad',
];

export const OnboardingIdentity = ({ initialStatements, onContinue, onBack }: OnboardingIdentityProps) => {
  const [statements, setStatements] = useState<string[]>(
    initialStatements.length > 0 ? initialStatements : ['']
  );
  const [error, setError] = useState('');

  const addStatement = () => {
    if (statements.length < 5) {
      setStatements([...statements, '']);
    }
  };

  const removeStatement = (index: number) => {
    if (statements.length > 1) {
      setStatements(statements.filter((_, i) => i !== index));
    }
  };

  const updateStatement = (index: number, value: string) => {
    const newStatements = [...statements];
    newStatements[index] = value;
    setStatements(newStatements);
    setError('');
  };

  const handleContinue = () => {
    const validStatements = statements.filter((s) => s.trim().length > 0);
    if (validStatements.length === 0) {
      setError('Añade al menos una afirmación de identidad');
      return;
    }
    onContinue(validStatements);
  };

  const addSuggestion = (suggestion: string) => {
    const emptyIndex = statements.findIndex((s) => s.trim() === '');
    if (emptyIndex !== -1) {
      updateStatement(emptyIndex, suggestion);
    } else if (statements.length < 5) {
      setStatements([...statements, suggestion]);
    }
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
          className="flex items-center gap-2 text-neon-purple mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-2xl">🎯</span>
          <span className="text-sm font-semibold uppercase tracking-wide">Paso 3 de 6</span>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-text-primary mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Tu Nueva Identidad
        </motion.h1>

        <motion.p
          className="text-text-secondary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Define quién eres. Cada día confirmarás esta identidad con acciones.
        </motion.p>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col gap-6 overflow-auto">
        {/* Prefijo fijo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard variant="strong" className="text-center">
            <p className="text-lg font-medium text-gradient">
              "Yo soy el tipo de persona que..."
            </p>
          </GlassCard>
        </motion.div>

        {/* Lista de afirmaciones */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <AnimatePresence mode="popLayout">
            {statements.map((statement, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex gap-2 items-start"
              >
                <div className="flex-1">
                  <TextInput
                    placeholder="...entrena todos los días aunque llueva"
                    value={statement}
                    onChange={(e) => updateStatement(index, e.target.value)}
                    leftIcon={<span className="text-neon-purple font-bold">{index + 1}</span>}
                  />
                </div>
                {statements.length > 1 && (
                  <button
                    onClick={() => removeStatement(index)}
                    className="p-3 text-text-muted hover:text-neon-red transition-colors mt-0.5"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-neon-red text-sm"
            >
              {error}
            </motion.p>
          )}

          {statements.length < 5 && (
            <Button
              variant="ghost"
              onClick={addStatement}
              className="w-full border border-dashed border-fog"
            >
              + Añadir otra afirmación
            </Button>
          )}
        </motion.div>

        {/* Sugerencias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-sm text-text-muted mb-3">Ideas para inspirarte:</p>
          <div className="flex flex-wrap gap-2">
            {suggestionExamples.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => addSuggestion(suggestion)}
                className="text-xs px-3 py-1.5 glass rounded-full text-text-secondary hover:text-neon-purple hover:border-neon-purple/30 transition-all"
              >
                ...{suggestion}
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
