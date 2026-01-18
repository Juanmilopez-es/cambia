/**
 * LIFE RESET PROTOCOL - QuestItem
 * Elemento de misión diaria con animación satisfactoria al completar
 */

import { motion, AnimatePresence } from 'framer-motion';
import type { DailyQuest } from '../../types';

interface QuestItemProps {
  quest: DailyQuest;
  onToggle: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const QuestItem = ({ quest, onToggle, onEdit, onDelete }: QuestItemProps) => {
  const handleToggle = () => {
    onToggle(quest.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`
        glass rounded-xl p-4
        flex items-start gap-4
        transition-all duration-300
        ${quest.completed ? 'opacity-60' : ''}
        touch-feedback
      `}
    >
      {/* Checkbox animado */}
      <button
        onClick={handleToggle}
        className={`
          w-7 h-7 rounded-lg
          flex items-center justify-center
          transition-all duration-300
          shrink-0 mt-0.5
          ${
            quest.completed
              ? 'bg-gradient-to-br from-neon-green to-neon-cyan'
              : 'border-2 border-fog hover:border-neon-purple'
          }
        `}
      >
        <AnimatePresence>
          {quest.completed && (
            <motion.svg
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-4 h-4 text-void"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <motion.p
          className={`
            text-base font-medium
            transition-all duration-300
            ${quest.completed ? 'text-text-muted line-through' : 'text-text-primary'}
          `}
        >
          {quest.title}
        </motion.p>

        {quest.identityLink && (
          <p className="text-sm text-neon-purple/70 mt-1 truncate">
            → {quest.identityLink}
          </p>
        )}
      </div>

      {/* Acciones */}
      <div className="flex gap-2 shrink-0">
        {onEdit && (
          <button
            onClick={() => onEdit(quest.id)}
            className="p-2 text-text-muted hover:text-text-primary transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(quest.id)}
            className="p-2 text-text-muted hover:text-neon-red transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        )}
      </div>

      {/* Efecto de celebración al completar */}
      <AnimatePresence>
        {quest.completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 0] }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 to-neon-cyan/10 rounded-xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
