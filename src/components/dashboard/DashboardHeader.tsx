/**
 * LIFE RESET PROTOCOL - Dashboard Header
 * Muestra la identidad actual y estadísticas rápidas
 */

import { motion } from 'framer-motion';
import { usePlayerStore, useGameStore } from '../../stores';

export const DashboardHeader = () => {
  const { player, getRandomIdentityStatement } = usePlayerStore();
  const { currentStreak, totalQuestsCompleted } = useGameStore();

  const primaryIdentity = player?.identityStatements[0] || '';
  const greeting = getGreeting();

  return (
    <motion.header
      className="px-6 pt-6 pb-4 safe-area-top"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Saludo y fecha */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-text-muted text-sm">{greeting}</p>
          <p className="text-text-secondary text-sm">{formatDate(new Date())}</p>
        </div>

        {/* Stats rápidas */}
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-neon-amber font-bold text-lg">{currentStreak}</p>
            <p className="text-text-muted text-xs">Racha</p>
          </div>
          <div className="text-right">
            <p className="text-neon-cyan font-bold text-lg">{totalQuestsCompleted}</p>
            <p className="text-text-muted text-xs">Total</p>
          </div>
        </div>
      </div>

      {/* Identidad principal */}
      <motion.div
        className="glass-strong rounded-2xl p-4"
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          // Podría mostrar una afirmación aleatoria al tocar
          const random = getRandomIdentityStatement();
          if (random) {
            // TODO: Mostrar toast o modal con la afirmación
          }
        }}
      >
        <p className="text-xs text-neon-purple font-semibold uppercase tracking-wider mb-1">
          Yo soy el tipo de persona que
        </p>
        <p className="text-lg font-semibold text-text-primary leading-snug">
          {primaryIdentity}
        </p>
      </motion.div>
    </motion.header>
  );
};

// Helpers
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return 'Noche de guerrero';
  if (hour < 12) return 'Buenos días, guerrero';
  if (hour < 18) return 'Buenas tardes, guerrero';
  return 'Buenas noches, guerrero';
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}
