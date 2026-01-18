/**
 * LIFE RESET PROTOCOL - Onboarding Quests
 * Configuración de las Misiones Diarias (Daily Levers)
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, TextInput, GlassCard } from '../ui';

interface Quest {
  title: string;
  identityLink: string;
}

interface OnboardingQuestsProps {
  initialQuests: Quest[];
  identityStatements: string[];
  onContinue: (quests: Quest[]) => void;
  onBack: () => void;
}

const questSuggestions = [
  { title: 'Entrenar 45 minutos', link: 'entrena todos los días' },
  { title: 'Leer 30 minutos', link: 'lee al menos 30 minutos al día' },
  { title: 'Meditar 10 minutos', link: 'mantiene la calma bajo presión' },
  { title: 'Trabajar en el Boss 2 horas', link: 'cumple lo que promete' },
  { title: 'No redes sociales hasta las 12:00', link: 'controla sus impulsos' },
  { title: 'Caminar 10.000 pasos', link: 'prioriza su salud' },
];

export const OnboardingQuests = ({
  initialQuests,
  identityStatements,
  onContinue,
  onBack,
}: OnboardingQuestsProps) => {
  const [quests, setQuests] = useState<Quest[]>(
    initialQuests.length > 0 ? initialQuests : [{ title: '', identityLink: '' }]
  );
  const [error, setError] = useState('');

  const addQuest = () => {
    if (quests.length < 5) {
      setQuests([...quests, { title: '', identityLink: '' }]);
    }
  };

  const removeQuest = (index: number) => {
    if (quests.length > 1) {
      setQuests(quests.filter((_, i) => i !== index));
    }
  };

  const updateQuest = (index: number, field: keyof Quest, value: string) => {
    const newQuests = [...quests];
    newQuests[index] = { ...newQuests[index], [field]: value };
    setQuests(newQuests);
    setError('');
  };

  const addSuggestion = (suggestion: { title: string; link: string }) => {
    const emptyIndex = quests.findIndex((q) => q.title.trim() === '');
    if (emptyIndex !== -1) {
      updateQuest(emptyIndex, 'title', suggestion.title);
      updateQuest(emptyIndex, 'identityLink', suggestion.link);
    } else if (quests.length < 5) {
      setQuests([...quests, { title: suggestion.title, identityLink: suggestion.link }]);
    }
  };

  const handleContinue = () => {
    const validQuests = quests.filter((q) => q.title.trim().length > 0);
    if (validQuests.length < 1) {
      setError('Añade al menos una misión diaria');
      return;
    }
    onContinue(validQuests);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col px-6 py-12 safe-area-top safe-area-bottom"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      {/* Header */}
      <div className="mb-6">
        <motion.div
          className="flex items-center gap-2 text-neon-green mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-2xl">⚡</span>
          <span className="text-sm font-semibold uppercase tracking-wide">Paso 6 de 6</span>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-text-primary mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Tus Misiones Diarias
        </motion.h1>

        <motion.p
          className="text-text-secondary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Las acciones críticas que realizarás cada día. Máximo 5, calidad sobre cantidad.
        </motion.p>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col gap-5 overflow-auto">
        {/* Concepto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard variant="default" className="border-neon-green/20">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">🎯</span>
              <p className="text-sm font-medium text-neon-green">DAILY LEVERS</p>
            </div>
            <p className="text-text-secondary text-sm">
              Cada misión completada es una confirmación de tu identidad.
              No son tareas, son pruebas de que eres quien dices ser.
            </p>
          </GlassCard>
        </motion.div>

        {/* Lista de Quests */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <AnimatePresence mode="popLayout">
            {quests.map((quest, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="glass rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-green to-neon-cyan flex items-center justify-center text-sm text-void font-bold shrink-0">
                    {index + 1}
                  </div>
                  <TextInput
                    placeholder="Ej: Entrenar 45 minutos"
                    value={quest.title}
                    onChange={(e) => updateQuest(index, 'title', e.target.value)}
                    className="flex-1"
                  />
                  {quests.length > 1 && (
                    <button
                      onClick={() => removeQuest(index)}
                      className="p-2 text-text-muted hover:text-neon-red transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Conexión con identidad */}
                <div className="pl-11">
                  <label className="text-xs text-text-muted mb-1 block">
                    Conecta con tu identidad (opcional):
                  </label>
                  <select
                    value={quest.identityLink}
                    onChange={(e) => updateQuest(index, 'identityLink', e.target.value)}
                    className="w-full glass rounded-lg px-3 py-2 text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-neon-purple/50 bg-transparent"
                  >
                    <option value="">Selecciona una afirmación...</option>
                    {identityStatements.map((statement, i) => (
                      <option key={i} value={statement} className="bg-abyss">
                        ...{statement}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {error && <p className="text-neon-red text-sm">{error}</p>}

          {quests.length < 5 && (
            <Button
              variant="ghost"
              onClick={addQuest}
              className="w-full border border-dashed border-fog"
            >
              + Añadir misión ({quests.length}/5)
            </Button>
          )}
        </motion.div>

        {/* Sugerencias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-sm text-text-muted mb-3">Ideas:</p>
          <div className="flex flex-wrap gap-2">
            {questSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => addSuggestion(suggestion)}
                className="text-xs px-3 py-1.5 glass rounded-full text-text-secondary hover:text-neon-green hover:border-neon-green/30 transition-all"
              >
                {suggestion.title}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Navegación */}
      <motion.div
        className="flex gap-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Atrás
        </Button>
        <Button onClick={handleContinue} className="flex-1">
          Finalizar
        </Button>
      </motion.div>
    </motion.div>
  );
};
