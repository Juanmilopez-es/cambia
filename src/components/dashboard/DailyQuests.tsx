/**
 * LIFE RESET PROTOCOL - Daily Quests
 * Lista de misiones diarias con feedback satisfactorio
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores';
import { QuestItem, GlassCard, Button, TextInput } from '../ui';

export const DailyQuests = () => {
  const { dailyQuests, toggleQuestComplete, addQuest, removeQuest, getQuestsForToday } = useGameStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestTitle, setNewQuestTitle] = useState('');

  const todayQuests = getQuestsForToday();
  const completedCount = todayQuests.filter((q) => q.completed).length;
  const totalCount = todayQuests.length;
  const allCompleted = completedCount === totalCount && totalCount > 0;

  const handleAddQuest = () => {
    if (newQuestTitle.trim()) {
      addQuest(newQuestTitle.trim(), undefined, true);
      setNewQuestTitle('');
      setIsAdding(false);
    }
  };

  return (
    <motion.section
      className="px-6 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚡</span>
          <div>
            <p className="text-xs text-neon-green font-semibold uppercase tracking-wider">
              Misiones del Día
            </p>
            <p className="text-sm text-text-secondary">
              {completedCount}/{totalCount} conquistadas
            </p>
          </div>
        </div>

        {/* Indicador de racha diaria */}
        {allCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 bg-neon-green/20 rounded-full"
          >
            <span className="text-neon-green text-sm font-bold">✓ Día Perfecto</span>
          </motion.div>
        )}
      </div>

      {/* Lista de Quests */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {dailyQuests.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <GlassCard variant="default" className="text-center py-8">
                <p className="text-text-muted mb-2">No tienes misiones configuradas</p>
                <button
                  onClick={() => setIsAdding(true)}
                  className="text-neon-purple font-medium hover:underline"
                >
                  + Añadir tu primera misión
                </button>
              </GlassCard>
            </motion.div>
          ) : (
            dailyQuests.map((quest) => (
              <QuestItem
                key={quest.id}
                quest={quest}
                onToggle={toggleQuestComplete}
                onDelete={removeQuest}
              />
            ))
          )}
        </AnimatePresence>

        {/* Form para añadir nueva quest */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <GlassCard variant="default" padding="md">
                <TextInput
                  placeholder="Nueva misión..."
                  value={newQuestTitle}
                  onChange={(e) => setNewQuestTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddQuest();
                    if (e.key === 'Escape') setIsAdding(false);
                  }}
                  autoFocus
                />
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAdding(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAddQuest}
                    className="flex-1"
                  >
                    Añadir
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón para añadir quest */}
        {!isAdding && dailyQuests.length > 0 && dailyQuests.length < 5 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setIsAdding(true)}
            className="w-full py-3 glass rounded-xl text-text-muted hover:text-neon-purple border border-dashed border-fog hover:border-neon-purple/30 transition-all"
          >
            + Añadir misión
          </motion.button>
        )}
      </div>

      {/* Mensaje cuando todo está completado */}
      <AnimatePresence>
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 text-center"
          >
            <GlassCard variant="gradient" className="py-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-3"
              >
                🏆
              </motion.div>
              <p className="text-lg font-bold text-gradient mb-1">
                ¡Día Conquistado!
              </p>
              <p className="text-sm text-text-secondary">
                Has confirmado quién eres hoy
              </p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote motivacional */}
      {!allCompleted && completedCount > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-text-muted mt-4 italic"
        >
          "La impaciencia con las acciones, paciencia con los resultados."
        </motion.p>
      )}
    </motion.section>
  );
};
