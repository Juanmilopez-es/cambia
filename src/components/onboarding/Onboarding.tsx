/**
 * LIFE RESET PROTOCOL - Onboarding Container
 * Gestiona el flujo completo de "La Excavación"
 */

import { useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePlayerStore, useGameStore } from '../../stores';
import type { OnboardingStep } from '../../types';

import { OnboardingWelcome } from './OnboardingWelcome';
import { OnboardingAntiVision } from './OnboardingAntiVision';
import { OnboardingVision } from './OnboardingVision';
import { OnboardingIdentity } from './OnboardingIdentity';
import { OnboardingMission } from './OnboardingMission';
import { OnboardingBoss } from './OnboardingBoss';
import { OnboardingQuests } from './OnboardingQuests';
import { OnboardingComplete } from './OnboardingComplete';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const {
    player,
    onboarding,
    initializePlayer,
    setOnboardingStep,
    completeOnboardingStep,
    setAntiVision,
    setVision,
    addIdentityStatement,
    completeOnboarding,
  } = usePlayerStore();

  const { setAnnualMission, setBossFight, addMilestone, addQuest, setPhase } = useGameStore();

  // Inicializar jugador si no existe
  useEffect(() => {
    if (!player) {
      initializePlayer();
    }
  }, [player, initializePlayer]);

  const currentStep = onboarding.currentStep;

  // Navegación
  const goToStep = useCallback((step: OnboardingStep) => {
    setOnboardingStep(step);
  }, [setOnboardingStep]);

  const goNext = useCallback((nextStep: OnboardingStep) => {
    completeOnboardingStep(currentStep);
    setOnboardingStep(nextStep);
  }, [currentStep, completeOnboardingStep, setOnboardingStep]);

  // Handlers de cada paso
  const handleWelcomeContinue = () => {
    goNext('anti-vision');
  };

  const handleAntiVisionContinue = (antiVision: string) => {
    setAntiVision(antiVision);
    goNext('vision');
  };

  const handleVisionContinue = (vision: string) => {
    setVision(vision);
    goNext('identity');
  };

  const handleIdentityContinue = (statements: string[]) => {
    // Limpiar y añadir nuevas afirmaciones
    statements.forEach((statement) => {
      addIdentityStatement(statement);
    });
    goNext('mission');
  };

  const handleMissionContinue = (title: string, description: string) => {
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() + 1);
    setAnnualMission(title, description, targetDate.toISOString());
    goNext('boss');
  };

  const handleBossContinue = (title: string, description: string, milestones: string[]) => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 1);
    setBossFight(title, description, targetDate.toISOString());

    milestones.forEach((milestone) => {
      addMilestone(milestone);
    });

    goNext('rules');
  };

  const handleQuestsContinue = (quests: { title: string; identityLink: string }[]) => {
    quests.forEach((quest) => {
      addQuest(quest.title, quest.identityLink, true);
    });
    goNext('complete');
  };

  const handleStart = () => {
    completeOnboarding();
    setPhase('battle');
    onComplete();
  };

  // Render del paso actual
  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <OnboardingWelcome onContinue={handleWelcomeContinue} />;

      case 'anti-vision':
        return (
          <OnboardingAntiVision
            initialValue={player?.antiVision || ''}
            onContinue={handleAntiVisionContinue}
            onBack={() => goToStep('welcome')}
          />
        );

      case 'vision':
        return (
          <OnboardingVision
            initialValue={player?.vision || ''}
            onContinue={handleVisionContinue}
            onBack={() => goToStep('anti-vision')}
          />
        );

      case 'identity':
        return (
          <OnboardingIdentity
            initialStatements={player?.identityStatements || []}
            onContinue={handleIdentityContinue}
            onBack={() => goToStep('vision')}
          />
        );

      case 'mission':
        return (
          <OnboardingMission
            initialTitle=""
            initialDescription=""
            onContinue={handleMissionContinue}
            onBack={() => goToStep('identity')}
          />
        );

      case 'boss':
        return (
          <OnboardingBoss
            initialTitle=""
            initialDescription=""
            initialMilestones={[]}
            onContinue={handleBossContinue}
            onBack={() => goToStep('mission')}
          />
        );

      case 'rules':
        return (
          <OnboardingQuests
            initialQuests={[]}
            identityStatements={player?.identityStatements || []}
            onContinue={handleQuestsContinue}
            onBack={() => goToStep('boss')}
          />
        );

      case 'complete':
        return (
          <OnboardingComplete
            identityStatement={player?.identityStatements[0] || ''}
            onStart={handleStart}
          />
        );

      default:
        return <OnboardingWelcome onContinue={handleWelcomeContinue} />;
    }
  };

  return (
    <div className="min-h-screen bg-void">
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </div>
  );
};
