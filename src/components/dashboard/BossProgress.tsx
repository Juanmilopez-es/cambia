/**
 * LIFE RESET PROTOCOL - Boss Progress
 * Visualización del progreso del Boss Fight del mes
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores';
import { ProgressBar, GlassCard } from '../ui';

interface BossProgressProps {
  onEdit?: () => void;
}

export const BossProgress = ({ onEdit }: BossProgressProps) => {
  const { currentBoss, toggleMilestone } = useGameStore();

  if (!currentBoss) {
    return (
      <motion.div
        className="px-6 py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <GlassCard variant="default" className="border-dashed border-fog text-center py-8">
          <p className="text-text-muted mb-2">No tienes un Boss activo</p>
          <button
            onClick={onEdit}
            className="text-neon-purple font-medium hover:underline"
          >
            + Configurar Boss Fight
          </button>
        </GlassCard>
      </motion.div>
    );
  }

  const completedMilestones = currentBoss.milestones.filter((m) => m.completed).length;
  const totalMilestones = currentBoss.milestones.length;

  return (
    <motion.section
      className="px-6 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header del Boss */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">👹</span>
          <div>
            <p className="text-xs text-neon-red font-semibold uppercase tracking-wider">
              Boss Fight del Mes
            </p>
            <h2 className="text-lg font-bold text-text-primary">{currentBoss.title}</h2>
          </div>
        </div>

        {onEdit && (
          <button
            onClick={onEdit}
            className="p-2 text-text-muted hover:text-text-primary transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        )}
      </div>

      {/* Barra de progreso */}
      <div className="mb-4">
        <ProgressBar
          progress={currentBoss.progress}
          variant="boss"
          size="lg"
          label={`${completedMilestones}/${totalMilestones} hitos conquistados`}
        />
      </div>

      {/* Milestones */}
      <GlassCard variant="default" padding="sm">
        <div className="space-y-2">
          <AnimatePresence>
            {currentBoss.milestones.map((milestone, index) => (
              <motion.button
                key={milestone.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleMilestone(milestone.id)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-lg
                  transition-all duration-200
                  ${milestone.completed ? 'bg-neon-green/10' : 'hover:bg-white/5'}
                `}
              >
                {/* Checkbox */}
                <div
                  className={`
                    w-5 h-5 rounded-md flex items-center justify-center shrink-0
                    transition-all duration-200
                    ${
                      milestone.completed
                        ? 'bg-neon-green text-void'
                        : 'border border-fog'
                    }
                  `}
                >
                  {milestone.completed && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </motion.svg>
                  )}
                </div>

                {/* Título */}
                <span
                  className={`
                    text-sm text-left flex-1
                    ${milestone.completed ? 'text-text-muted line-through' : 'text-text-primary'}
                  `}
                >
                  {milestone.title}
                </span>

                {/* Indicador de orden */}
                <span className="text-xs text-text-muted">#{index + 1}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </GlassCard>

      {/* Mensaje motivacional si está cerca de completar */}
      {currentBoss.progress >= 80 && currentBoss.progress < 100 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-neon-amber mt-3"
        >
          ⚔️ ¡Estás a punto de derrotar al Boss!
        </motion.p>
      )}

      {currentBoss.progress === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mt-3 p-3 bg-neon-green/10 rounded-xl"
        >
          <p className="text-neon-green font-bold">🏆 ¡Boss Derrotado!</p>
        </motion.div>
      )}
    </motion.section>
  );
};
