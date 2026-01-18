/**
 * LIFE RESET PROTOCOL - App Principal
 * Tu sistema operativo para cambiar de identidad
 */

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { usePlayerStore, useGameStore } from './stores';
import { Onboarding } from './components/onboarding';
import { Dashboard } from './components/dashboard';
import { StateShifter } from './components/state-shifter';

function App() {
  const { player } = usePlayerStore();
  const { startNewDay } = useGameStore();

  // Verificar si es un nuevo día al cargar
  useEffect(() => {
    if (player?.onboardingCompleted) {
      startNewDay();
    }
  }, [player?.onboardingCompleted, startNewDay]);

  // Determinar qué mostrar
  const showOnboarding = !player?.onboardingCompleted;

  return (
    <div className="min-h-screen bg-void">
      <AnimatePresence mode="wait">
        {showOnboarding ? (
          <Onboarding
            key="onboarding"
            onComplete={() => {
              // El store ya actualiza el estado
            }}
          />
        ) : (
          <div key="main">
            <Dashboard />
            <StateShifter />
          </div>
        )}
      </AnimatePresence>
      <Analytics />
    </div>
  );
}

export default App;
