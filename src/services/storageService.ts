import { Cat, SkillProgress, TrainingSession, StreakInfo, WeightLog, VaccineLog, MedicationLog, DiaryLog, VetAppointment } from '../types/cat';

const STORAGE_KEYS = {
  CATS: 'cat_app_cats_v1',
  ACTIVE_CAT_ID: 'cat_app_active_cat_id_v1',
  SKILLS: 'cat_app_skills_v1',
  SESSIONS: 'cat_app_sessions_v1',
  STREAK: 'cat_app_streak_v1',
  WEIGHT_LOGS: 'cat_app_weight_logs_v1',
  VACCINE_LOGS: 'cat_app_vaccine_logs_v1',
  MEDICATION_LOGS: 'cat_app_medication_logs_v1',
  DIARY_LOGS: 'cat_app_diary_logs_v1',
  VET_APPOINTMENTS: 'cat_app_vet_appointments_v1',
  IS_PREMIUM: 'cat_app_is_premium_v1',
  LANGUAGE: 'cat_app_language_v1',
} as const;

export interface AppExportData {
  version: string;
  exportedAt: string;
  cats: Cat[];
  activeCatId: string | null;
  skills: SkillProgress[];
  sessions: TrainingSession[];
  streak: StreakInfo;
  weightLogs: WeightLog[];
  vaccineLogs: VaccineLog[];
  medicationLogs: MedicationLog[];
  diaryLogs: DiaryLog[];
  vetAppointments: VetAppointment[];
  isPremium: boolean;
  language: 'tr' | 'en';
}

export class StorageService {
  public static getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`[StorageService] Error reading key "${key}":`, error);
      return defaultValue;
    }
  }

  public static setItem<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`[StorageService] Error writing key "${key}":`, error);
      return false;
    }
  }

  public static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`[StorageService] Error removing key "${key}":`, error);
    }
  }

  public static exportAllData(currentData: Omit<AppExportData, 'version' | 'exportedAt'>): string {
    const fullData: AppExportData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      ...currentData,
    };
    return JSON.stringify(fullData, null, 2);
  }

  public static importAllData(jsonData: string): AppExportData | null {
    try {
      const parsed = JSON.parse(jsonData) as AppExportData;
      if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.cats)) {
        throw new Error('Invalid data format');
      }
      return parsed;
    } catch (error) {
      console.error('[StorageService] Error parsing import data:', error);
      return null;
    }
  }

  public static clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  }
}

export { STORAGE_KEYS };
