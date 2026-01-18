/**
 * LIFE RESET PROTOCOL - Game Store
 * Gestiona el estado del juego: misiones, boss fights, y progreso diario
 * "Gamificación de la vida: Misión > Boss > Quests"
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type {
  GameState,
  GamePhase,
  AnnualMission,
  BossFight,
  DailyQuest,
  DayRecord,
} from '../types';

interface GameStore extends GameState {
  // Acciones de Fase
  setPhase: (phase: GamePhase) => void;

  // Acciones de Misión Anual
  setAnnualMission: (title: string, description: string, targetDate: string) => void;
  updateAnnualMission: (updates: Partial<AnnualMission>) => void;
  clearAnnualMission: () => void;

  // Acciones de Boss Fight
  setBossFight: (title: string, description: string, targetDate: string) => void;
  updateBossFight: (updates: Partial<BossFight>) => void;
  addMilestone: (title: string) => void;
  toggleMilestone: (milestoneId: string) => void;
  removeMilestone: (milestoneId: string) => void;
  completeBossFight: () => void;
  clearBossFight: () => void;

  // Acciones de Daily Quests
  addQuest: (title: string, identityLink?: string, isRecurring?: boolean, recurringDays?: number[]) => void;
  updateQuest: (questId: string, updates: Partial<DailyQuest>) => void;
  removeQuest: (questId: string) => void;
  toggleQuestComplete: (questId: string) => void;
  reorderQuests: (questIds: string[]) => void;

  // Acciones de Día
  startNewDay: () => void;
  getTodayRecord: () => DayRecord | null;
  getQuestsForToday: () => DailyQuest[];

  // Estadísticas
  calculateBossProgress: () => number;
  updateStreak: () => void;

  // Reset
  resetGame: () => void;
}

const getToday = (): string => {
  return new Date().toISOString().split('T')[0];
};

const defaultGameState: GameState = {
  currentPhase: 'onboarding',
  annualMission: null,
  currentBoss: null,
  dailyQuests: [],
  dayHistory: [],
  currentStreak: 0,
  bestStreak: 0,
  totalQuestsCompleted: 0,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...defaultGameState,

      // Fase del juego
      setPhase: (phase: GamePhase) => {
        set({ currentPhase: phase });
      },

      // === MISIÓN ANUAL ===
      setAnnualMission: (title: string, description: string, targetDate: string) => {
        set({
          annualMission: {
            id: uuidv4(),
            title,
            description,
            targetDate,
            createdAt: new Date().toISOString(),
            isActive: true,
          },
        });
      },

      updateAnnualMission: (updates: Partial<AnnualMission>) => {
        set((state) => ({
          annualMission: state.annualMission
            ? { ...state.annualMission, ...updates }
            : null,
        }));
      },

      clearAnnualMission: () => {
        set({ annualMission: null });
      },

      // === BOSS FIGHT ===
      setBossFight: (title: string, description: string, targetDate: string) => {
        set({
          currentBoss: {
            id: uuidv4(),
            title,
            description,
            progress: 0,
            targetDate,
            milestones: [],
            createdAt: new Date().toISOString(),
            isActive: true,
          },
        });
      },

      updateBossFight: (updates: Partial<BossFight>) => {
        set((state) => ({
          currentBoss: state.currentBoss
            ? { ...state.currentBoss, ...updates }
            : null,
        }));
      },

      addMilestone: (title: string) => {
        set((state) => ({
          currentBoss: state.currentBoss
            ? {
                ...state.currentBoss,
                milestones: [
                  ...state.currentBoss.milestones,
                  {
                    id: uuidv4(),
                    title,
                    completed: false,
                  },
                ],
              }
            : null,
        }));
      },

      toggleMilestone: (milestoneId: string) => {
        set((state) => {
          if (!state.currentBoss) return state;

          const updatedMilestones = state.currentBoss.milestones.map((m) =>
            m.id === milestoneId
              ? {
                  ...m,
                  completed: !m.completed,
                  completedAt: !m.completed ? new Date().toISOString() : undefined,
                }
              : m
          );

          // Calcular progreso basado en milestones completados
          const completedCount = updatedMilestones.filter((m) => m.completed).length;
          const totalCount = updatedMilestones.length;
          const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

          return {
            currentBoss: {
              ...state.currentBoss,
              milestones: updatedMilestones,
              progress,
            },
          };
        });
      },

      removeMilestone: (milestoneId: string) => {
        set((state) => {
          if (!state.currentBoss) return state;

          const updatedMilestones = state.currentBoss.milestones.filter(
            (m) => m.id !== milestoneId
          );

          const completedCount = updatedMilestones.filter((m) => m.completed).length;
          const totalCount = updatedMilestones.length;
          const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

          return {
            currentBoss: {
              ...state.currentBoss,
              milestones: updatedMilestones,
              progress,
            },
          };
        });
      },

      completeBossFight: () => {
        set((state) => ({
          currentBoss: state.currentBoss
            ? {
                ...state.currentBoss,
                progress: 100,
                completedAt: new Date().toISOString(),
                isActive: false,
              }
            : null,
        }));
      },

      clearBossFight: () => {
        set({ currentBoss: null });
      },

      // === DAILY QUESTS ===
      addQuest: (
        title: string,
        identityLink?: string,
        isRecurring: boolean = true,
        recurringDays?: number[]
      ) => {
        set((state) => ({
          dailyQuests: [
            ...state.dailyQuests,
            {
              id: uuidv4(),
              title,
              identityLink,
              completed: false,
              priority: state.dailyQuests.length,
              isRecurring,
              recurringDays: recurringDays || [0, 1, 2, 3, 4, 5, 6], // Todos los días por defecto
            },
          ],
        }));
      },

      updateQuest: (questId: string, updates: Partial<DailyQuest>) => {
        set((state) => ({
          dailyQuests: state.dailyQuests.map((q) =>
            q.id === questId ? { ...q, ...updates } : q
          ),
        }));
      },

      removeQuest: (questId: string) => {
        set((state) => ({
          dailyQuests: state.dailyQuests.filter((q) => q.id !== questId),
        }));
      },

      toggleQuestComplete: (questId: string) => {
        set((state) => {
          const quest = state.dailyQuests.find((q) => q.id === questId);
          if (!quest) return state;

          const wasCompleted = quest.completed;
          const newCompleted = !wasCompleted;

          return {
            dailyQuests: state.dailyQuests.map((q) =>
              q.id === questId
                ? {
                    ...q,
                    completed: newCompleted,
                    completedAt: newCompleted ? new Date().toISOString() : undefined,
                  }
                : q
            ),
            totalQuestsCompleted: newCompleted
              ? state.totalQuestsCompleted + 1
              : state.totalQuestsCompleted - 1,
          };
        });

        // Actualizar streak después de completar
        get().updateStreak();
      },

      reorderQuests: (questIds: string[]) => {
        set((state) => ({
          dailyQuests: questIds
            .map((id, index) => {
              const quest = state.dailyQuests.find((q) => q.id === id);
              return quest ? { ...quest, priority: index } : null;
            })
            .filter(Boolean) as DailyQuest[],
        }));
      },

      // === GESTIÓN DEL DÍA ===
      startNewDay: () => {
        const today = getToday();
        const state = get();

        // Verificar si ya existe registro de hoy
        const existingRecord = state.dayHistory.find((d) => d.date === today);
        if (existingRecord) return;

        // Obtener quests para hoy basado en el día de la semana
        const dayOfWeek = new Date().getDay();
        const questsForToday = state.dailyQuests
          .filter((q) => {
            if (!q.isRecurring) return true;
            return q.recurringDays?.includes(dayOfWeek);
          })
          .map((q) => ({ ...q, completed: false, completedAt: undefined }));

        // Resetear estado de quests para el nuevo día
        set((state) => ({
          dailyQuests: state.dailyQuests.map((q) => ({
            ...q,
            completed: false,
            completedAt: undefined,
          })),
          dayHistory: [
            ...state.dayHistory,
            {
              date: today,
              quests: questsForToday,
              completedCount: 0,
              totalCount: questsForToday.length,
            },
          ],
          currentPhase: 'battle',
        }));
      },

      getTodayRecord: () => {
        const today = getToday();
        return get().dayHistory.find((d) => d.date === today) || null;
      },

      getQuestsForToday: () => {
        const dayOfWeek = new Date().getDay();
        return get().dailyQuests.filter((q) => {
          if (!q.isRecurring) return true;
          return q.recurringDays?.includes(dayOfWeek);
        });
      },

      // === ESTADÍSTICAS ===
      calculateBossProgress: () => {
        const { currentBoss } = get();
        if (!currentBoss) return 0;

        const completedMilestones = currentBoss.milestones.filter((m) => m.completed).length;
        const totalMilestones = currentBoss.milestones.length;

        return totalMilestones > 0
          ? Math.round((completedMilestones / totalMilestones) * 100)
          : 0;
      },

      updateStreak: () => {
        const state = get();
        const questsForToday = state.getQuestsForToday();
        const allCompleted = questsForToday.every((q) => q.completed);

        if (allCompleted && questsForToday.length > 0) {
          const newStreak = state.currentStreak + 1;
          set({
            currentStreak: newStreak,
            bestStreak: Math.max(newStreak, state.bestStreak),
          });
        }
      },

      // Reset completo
      resetGame: () => {
        set(defaultGameState);
      },
    }),
    {
      name: 'life-reset-game',
      version: 1,
    }
  )
);
