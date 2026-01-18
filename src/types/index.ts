/**
 * LIFE RESET PROTOCOL - Tipos de Datos
 * Sistema de tipos para el "Jugador" y el "Juego"
 */

// =====================================================
// IDENTIDAD DEL JUGADOR
// =====================================================

/**
 * Representa la identidad completa del usuario
 * "No haces cosas, confirmas quién eres"
 */
export interface PlayerIdentity {
  /** ID único del jugador */
  id: string;

  /** Fecha de creación del perfil */
  createdAt: string;

  /** Anti-Visión: El infierno que quieres evitar (dolor como propulsor) */
  antiVision: string;

  /** Visión: Tu realidad ideal */
  vision: string;

  /** Afirmaciones de identidad: "Yo soy el tipo de persona que..." */
  identityStatements: string[];

  /** Reglas personales / Restricciones del juego */
  rules: string[];

  /** Estado del onboarding */
  onboardingCompleted: boolean;

  /** Última actualización */
  updatedAt: string;
}

// =====================================================
// SISTEMA DE MISIONES
// =====================================================

/**
 * Misión Anual - El objetivo a 1 año
 */
export interface AnnualMission {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  createdAt: string;
  isActive: boolean;
}

/**
 * Jefe Final (Boss Fight) - El proyecto del mes
 */
export interface BossFight {
  id: string;
  title: string;
  description: string;
  /** Progreso del 0 al 100 */
  progress: number;
  /** Fecha objetivo */
  targetDate: string;
  /** Subobjetivos que componen el boss */
  milestones: Milestone[];
  createdAt: string;
  completedAt?: string;
  isActive: boolean;
}

/**
 * Hito dentro de un Boss Fight
 */
export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: string;
}

/**
 * Misión Diaria (Quest/Daily Lever)
 * Las acciones críticas del día
 */
export interface DailyQuest {
  id: string;
  title: string;
  /** Conexión con la identidad */
  identityLink?: string;
  completed: boolean;
  completedAt?: string;
  /** Orden de prioridad */
  priority: number;
  /** Recurrente o única */
  isRecurring: boolean;
  /** Días de la semana si es recurrente (0=Dom, 6=Sab) */
  recurringDays?: number[];
}

/**
 * Registro del día
 */
export interface DayRecord {
  date: string;
  quests: DailyQuest[];
  completedCount: number;
  totalCount: number;
  /** Racha actual de días completando todas las misiones */
  streakDay?: number;
}

// =====================================================
// ESTADO DEL JUEGO
// =====================================================

export type GamePhase =
  | 'onboarding'     // Primera vez
  | 'morning'        // Ritual matutino
  | 'battle'         // Durante el día
  | 'reflection'     // Noche / Revisión
  | 'rest';          // Descanso

/**
 * Estado completo del juego
 */
export interface GameState {
  /** Fase actual del día */
  currentPhase: GamePhase;

  /** Misión anual activa */
  annualMission: AnnualMission | null;

  /** Boss actual del mes */
  currentBoss: BossFight | null;

  /** Misiones diarias configuradas */
  dailyQuests: DailyQuest[];

  /** Historial de días */
  dayHistory: DayRecord[];

  /** Racha actual */
  currentStreak: number;

  /** Mejor racha histórica */
  bestStreak: number;

  /** Total de misiones conquistadas */
  totalQuestsCompleted: number;
}

// =====================================================
// STATE SHIFTER (Reseteo de Estado)
// =====================================================

export type StateShifterMode =
  | 'breathing'      // Respiración de coherencia
  | 'truth'          // Recordatorio de verdad
  | 'vision';        // Visión vs Anti-Visión

export interface BreathingPhase {
  name: 'inhale' | 'hold' | 'exhale' | 'holdEmpty';
  duration: number; // en segundos
  label: string;
}

// =====================================================
// ONBOARDING
// =====================================================

export type OnboardingStep =
  | 'welcome'
  | 'anti-vision'
  | 'vision'
  | 'identity'
  | 'mission'
  | 'boss'
  | 'rules'
  | 'complete';

export interface OnboardingProgress {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
}

// =====================================================
// FRASES Y CONTENIDO
// =====================================================

export interface WisdomQuote {
  text: string;
  author: 'Naval' | 'Dispenza' | 'Protocol' | 'Custom';
}

// =====================================================
// CONFIGURACIÓN DE LA APP
// =====================================================

export interface AppSettings {
  /** Notificaciones habilitadas */
  notificationsEnabled: boolean;

  /** Hora del ritual matutino */
  morningRitualTime?: string;

  /** Hora del recordatorio nocturno */
  eveningReflectionTime?: string;

  /** Haptics habilitados */
  hapticsEnabled: boolean;

  /** Sonidos habilitados */
  soundsEnabled: boolean;
}
