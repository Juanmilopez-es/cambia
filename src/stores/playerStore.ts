/**
 * LIFE RESET PROTOCOL - Player Store
 * Gestiona la identidad del jugador y su configuración
 * "No haces cosas, confirmas quién eres"
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { PlayerIdentity, OnboardingStep, OnboardingProgress, AppSettings } from '../types';

interface PlayerStore {
  // Estado
  player: PlayerIdentity | null;
  onboarding: OnboardingProgress;
  settings: AppSettings;

  // Acciones de Identidad
  initializePlayer: () => void;
  setAntiVision: (antiVision: string) => void;
  setVision: (vision: string) => void;
  addIdentityStatement: (statement: string) => void;
  removeIdentityStatement: (index: number) => void;
  updateIdentityStatement: (index: number, statement: string) => void;
  addRule: (rule: string) => void;
  removeRule: (index: number) => void;

  // Acciones de Onboarding
  setOnboardingStep: (step: OnboardingStep) => void;
  completeOnboardingStep: (step: OnboardingStep) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;

  // Acciones de Configuración
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Utilidades
  resetPlayer: () => void;
  getRandomIdentityStatement: () => string | null;
}

const defaultSettings: AppSettings = {
  notificationsEnabled: false,
  hapticsEnabled: true,
  soundsEnabled: true,
};

const defaultOnboarding: OnboardingProgress = {
  currentStep: 'welcome',
  completedSteps: [],
};

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      player: null,
      onboarding: defaultOnboarding,
      settings: defaultSettings,

      // Inicializar jugador
      initializePlayer: () => {
        const now = new Date().toISOString();
        set({
          player: {
            id: uuidv4(),
            createdAt: now,
            updatedAt: now,
            antiVision: '',
            vision: '',
            identityStatements: [],
            rules: [],
            onboardingCompleted: false,
          },
        });
      },

      // Anti-Visión: El infierno que quieres evitar
      setAntiVision: (antiVision: string) => {
        set((state) => ({
          player: state.player
            ? {
                ...state.player,
                antiVision,
                updatedAt: new Date().toISOString(),
              }
            : null,
        }));
      },

      // Visión: Tu realidad ideal
      setVision: (vision: string) => {
        set((state) => ({
          player: state.player
            ? {
                ...state.player,
                vision,
                updatedAt: new Date().toISOString(),
              }
            : null,
        }));
      },

      // Afirmaciones de identidad
      addIdentityStatement: (statement: string) => {
        set((state) => ({
          player: state.player
            ? {
                ...state.player,
                identityStatements: [...state.player.identityStatements, statement],
                updatedAt: new Date().toISOString(),
              }
            : null,
        }));
      },

      removeIdentityStatement: (index: number) => {
        set((state) => ({
          player: state.player
            ? {
                ...state.player,
                identityStatements: state.player.identityStatements.filter((_, i) => i !== index),
                updatedAt: new Date().toISOString(),
              }
            : null,
        }));
      },

      updateIdentityStatement: (index: number, statement: string) => {
        set((state) => ({
          player: state.player
            ? {
                ...state.player,
                identityStatements: state.player.identityStatements.map((s, i) =>
                  i === index ? statement : s
                ),
                updatedAt: new Date().toISOString(),
              }
            : null,
        }));
      },

      // Reglas del juego
      addRule: (rule: string) => {
        set((state) => ({
          player: state.player
            ? {
                ...state.player,
                rules: [...state.player.rules, rule],
                updatedAt: new Date().toISOString(),
              }
            : null,
        }));
      },

      removeRule: (index: number) => {
        set((state) => ({
          player: state.player
            ? {
                ...state.player,
                rules: state.player.rules.filter((_, i) => i !== index),
                updatedAt: new Date().toISOString(),
              }
            : null,
        }));
      },

      // Onboarding
      setOnboardingStep: (step: OnboardingStep) => {
        set((state) => ({
          onboarding: {
            ...state.onboarding,
            currentStep: step,
          },
        }));
      },

      completeOnboardingStep: (step: OnboardingStep) => {
        set((state) => ({
          onboarding: {
            ...state.onboarding,
            completedSteps: state.onboarding.completedSteps.includes(step)
              ? state.onboarding.completedSteps
              : [...state.onboarding.completedSteps, step],
          },
        }));
      },

      completeOnboarding: () => {
        set((state) => ({
          player: state.player
            ? {
                ...state.player,
                onboardingCompleted: true,
                updatedAt: new Date().toISOString(),
              }
            : null,
          onboarding: {
            currentStep: 'complete',
            completedSteps: [
              'welcome',
              'anti-vision',
              'vision',
              'identity',
              'mission',
              'boss',
              'rules',
              'complete',
            ],
          },
        }));
      },

      resetOnboarding: () => {
        set({ onboarding: defaultOnboarding });
      },

      // Configuración
      updateSettings: (newSettings: Partial<AppSettings>) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      // Reset completo
      resetPlayer: () => {
        set({
          player: null,
          onboarding: defaultOnboarding,
          settings: defaultSettings,
        });
      },

      // Obtener afirmación aleatoria
      getRandomIdentityStatement: () => {
        const { player } = get();
        if (!player || player.identityStatements.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * player.identityStatements.length);
        return player.identityStatements[randomIndex];
      },
    }),
    {
      name: 'life-reset-player',
      version: 1,
    }
  )
);
