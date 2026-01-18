/**
 * LIFE RESET PROTOCOL - Dashboard
 * El HUD principal del juego
 */

import { motion } from 'framer-motion';
import { DashboardHeader } from './DashboardHeader';
import { BossProgress } from './BossProgress';
import { DailyQuests } from './DailyQuests';

export const Dashboard = () => {
  return (
    <motion.div
      className="min-h-screen bg-void pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Fondo con gradiente sutil */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-neon-cyan/5 rounded-full blur-3xl" />
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        <DashboardHeader />

        <div className="space-y-2">
          <BossProgress />
          <DailyQuests />
        </div>
      </div>
    </motion.div>
  );
};
