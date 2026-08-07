import { create } from 'zustand';
import {
  Cat,
  SkillProgress,
  TrainingSession,
  StreakInfo,
  WeightLog,
  VaccineLog,
  MedicationLog,
  DiaryLog,
  VetAppointment,
  AppLanguage,
  SkillStatus,
} from '../types/cat';
import { StorageService, STORAGE_KEYS } from '../services/storageService';
import { CatApiService } from '../services/catApiService';

const INITIAL_CATS: Cat[] = [];

const INITIAL_SKILLS: SkillProgress[] = [
  {
    id: 'sp_1',
    catId: 'cat_1',
    skillId: 'recall',
    skillTitle: 'Name Recall (İsmine Gelme)',
    category: 'basic',
    status: 'mastered',
    progressPercentage: 100,
    lastPracticed: new Date(Date.now() - 86400000).toISOString(),
    notes: 'Comes reliably from across the living room!',
  },
  {
    id: 'sp_2',
    catId: 'cat_1',
    skillId: 'target_stick',
    skillTitle: 'Target Stick Touch',
    category: 'basic',
    status: 'reinforcing',
    progressPercentage: 75,
    lastPracticed: new Date().toISOString(),
    notes: 'Touches nose to target stick 4/5 times.',
  },
  {
    id: 'sp_3',
    catId: 'cat_1',
    skillId: 'high_five',
    skillTitle: 'High Five (Pati Vermek)',
    category: 'tricks',
    status: 'learning',
    progressPercentage: 40,
    lastPracticed: new Date(Date.now() - 172800000).toISOString(),
    notes: 'Lifts right paw on verbal cue.',
  },
  {
    id: 'sp_4',
    catId: 'cat_1',
    skillId: 'carrier_entry',
    skillTitle: 'Voluntary Carrier Entry',
    category: 'care',
    status: 'learning',
    progressPercentage: 30,
    lastPracticed: new Date(Date.now() - 259200000).toISOString(),
    notes: 'Enters carrier willingly when treat inside.',
  },
  {
    id: 'sp_5',
    catId: 'cat_2',
    skillId: 'recall',
    skillTitle: 'Name Recall (İsmine Gelme)',
    category: 'basic',
    status: 'learning',
    progressPercentage: 45,
    lastPracticed: new Date().toISOString(),
  },
];

const INITIAL_STREAK: StreakInfo = {
  currentStreak: 0,
  bestStreak: 0,
  lastActiveDate: '',
  weeklyGoalDays: 5,
  completedDaysThisWeek: 0,
};

const INITIAL_WEIGHT_LOGS: WeightLog[] = [
  { id: 'w_1', catId: 'cat_1', weightKg: 3.9, date: '2026-05-01', notes: 'Vet checkup weight' },
  { id: 'w_2', catId: 'cat_1', weightKg: 4.0, date: '2026-06-01', notes: 'Healthy growth' },
  { id: 'w_3', catId: 'cat_1', weightKg: 4.1, date: '2026-07-01', notes: 'Post spay check' },
  { id: 'w_4', catId: 'cat_1', weightKg: 4.2, date: '2026-08-01', notes: 'Current optimal weight' },
  { id: 'w_5', catId: 'cat_2', weightKg: 3.5, date: '2026-06-15', notes: 'Initial weight' },
  { id: 'w_6', catId: 'cat_2', weightKg: 3.8, date: '2026-08-01', notes: 'Gaining healthy weight' },
];

const INITIAL_VACCINE_LOGS: VaccineLog[] = [
  {
    id: 'vac_1',
    catId: 'cat_1',
    vaccineName: 'FVRCP (Triple Vaccine)',
    dateAdministered: '2026-01-15',
    nextDueDate: '2027-01-15',
    vetName: 'Dr. Sarah Connor',
    status: 'completed',
  },
  {
    id: 'vac_2',
    catId: 'cat_1',
    vaccineName: 'Rabies Booster',
    dateAdministered: '2026-03-10',
    nextDueDate: '2027-03-10',
    vetName: 'Dr. Sarah Connor',
    status: 'completed',
  },
  {
    id: 'vac_3',
    catId: 'cat_1',
    vaccineName: 'FeLV (Leukemia)',
    dateAdministered: '2025-09-01',
    nextDueDate: '2026-09-01',
    vetName: 'Dr. Sarah Connor',
    status: 'scheduled',
  },
];

const INITIAL_MEDICATION_LOGS: MedicationLog[] = [
  {
    id: 'med_1',
    catId: 'cat_1',
    medicationName: 'Omega 3 Coat Supplement',
    dosage: '1 drop (0.5ml)',
    frequency: 'Daily',
    timeOfDay: ['09:00'],
    startDate: '2026-07-01',
    isActive: true,
    notes: 'Mix with wet food in the morning.',
  },
  {
    id: 'med_2',
    catId: 'cat_1',
    medicationName: 'Hairball Treatment Paste',
    dosage: '2 cm strip',
    frequency: 'Twice Weekly',
    timeOfDay: ['18:00'],
    startDate: '2026-06-15',
    isActive: true,
    notes: 'Licked off paw or spoon.',
  },
];

const INITIAL_DIARY_LOGS: DiaryLog[] = [
  {
    id: 'd_1',
    catId: 'cat_1',
    type: 'food',
    title: 'Morning Royal Canin Wet Food',
    notes: 'Ate full 85g pouch with high appetite.',
    date: new Date().toISOString(),
    status: 'normal',
    portionGrams: 85,
  },
  {
    id: 'd_2',
    catId: 'cat_1',
    type: 'litter',
    title: 'Normal Litter Box Usage',
    notes: 'Clumping normal, no signs of distress.',
    date: new Date().toISOString(),
    status: 'normal',
  },
];

const INITIAL_VET_APPOINTMENTS: VetAppointment[] = [
  {
    id: 'vet_1',
    catId: 'cat_1',
    title: 'Annual Wellness & Dental Checkup',
    vetName: 'Dr. Sarah Connor - Central Vet Clinic',
    clinicAddress: '124 Pet Care Avenue, Suite 3',
    phone: '+1 (555) 234-5678',
    date: '2026-08-20',
    time: '14:30',
    isCompleted: false,
    notes: 'Fast 2 hours prior to dental exam.',
    reminderScheduled: true,
  },
];

export interface CatState {
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
  currentLanguage: AppLanguage;
  isSyncingWithApi: boolean;
  lastSyncedAt: string | null;

  // Actions
  fetchLessonsFromApi: () => Promise<void>;
  syncWithCloudBackend: () => Promise<void>;
  setActiveCatId: (id: string) => void;
  addCat: (cat: Omit<Cat, 'id' | 'createdAt'>) => void;
  updateCat: (id: string, updates: Partial<Cat>) => void;
  deleteCat: (id: string) => void;

  // Health Actions
  addWeightLog: (log: Omit<WeightLog, 'id'>) => void;
  deleteWeightLog: (id: string) => void;
  addVaccineLog: (log: Omit<VaccineLog, 'id'>) => void;
  updateVaccineLog: (id: string, updates: Partial<VaccineLog>) => void;
  deleteVaccineLog: (id: string) => void;
  addMedicationLog: (log: Omit<MedicationLog, 'id'>) => void;
  toggleMedicationActive: (id: string) => void;
  deleteMedicationLog: (id: string) => void;
  addDiaryLog: (log: Omit<DiaryLog, 'id'>) => void;
  deleteDiaryLog: (id: string) => void;
  addVetAppointment: (appt: Omit<VetAppointment, 'id'>) => void;
  toggleVetAppointmentCompleted: (id: string) => void;
  deleteVetAppointment: (id: string) => void;

  // Skill & Training Actions
  updateSkillStatus: (catId: string, skillId: string, status: SkillStatus, progressPercentage: number) => void;
  recordTrainingSession: (session: Omit<TrainingSession, 'id'>) => void;
  
  // App Config Actions
  setPremium: (status: boolean) => void;
  setLanguage: (lang: AppLanguage) => void;
  restorePurchases: () => Promise<boolean>;
  getActiveCat: () => Cat | null;
}

export const useCatStore = create<CatState>((set, get) => {
  const loadedCats = StorageService.getItem<Cat[]>(STORAGE_KEYS.CATS, INITIAL_CATS);
  const loadedActiveId = StorageService.getItem<string | null>(STORAGE_KEYS.ACTIVE_CAT_ID, loadedCats[0]?.id || null);
  const loadedSkills = StorageService.getItem<SkillProgress[]>(STORAGE_KEYS.SKILLS, INITIAL_SKILLS);
  const loadedSessions = StorageService.getItem<TrainingSession[]>(STORAGE_KEYS.SESSIONS, []);
  const loadedStreak = StorageService.getItem<StreakInfo>(STORAGE_KEYS.STREAK, INITIAL_STREAK);
  const loadedWeight = StorageService.getItem<WeightLog[]>(STORAGE_KEYS.WEIGHT_LOGS, INITIAL_WEIGHT_LOGS);
  const loadedVaccines = StorageService.getItem<VaccineLog[]>(STORAGE_KEYS.VACCINE_LOGS, INITIAL_VACCINE_LOGS);
  const loadedMeds = StorageService.getItem<MedicationLog[]>(STORAGE_KEYS.MEDICATION_LOGS, INITIAL_MEDICATION_LOGS);
  const loadedDiary = StorageService.getItem<DiaryLog[]>(STORAGE_KEYS.DIARY_LOGS, INITIAL_DIARY_LOGS);
  const loadedVet = StorageService.getItem<VetAppointment[]>(STORAGE_KEYS.VET_APPOINTMENTS, INITIAL_VET_APPOINTMENTS);
  const loadedPremium = StorageService.getItem<boolean>(STORAGE_KEYS.IS_PREMIUM, false);
  const loadedLang = StorageService.getItem<AppLanguage>(STORAGE_KEYS.LANGUAGE, 'tr');

  return {
    cats: loadedCats,
    activeCatId: loadedActiveId,
    skills: loadedSkills,
    sessions: loadedSessions,
    streak: loadedStreak,
    weightLogs: loadedWeight,
    vaccineLogs: loadedVaccines,
    medicationLogs: loadedMeds,
    diaryLogs: loadedDiary,
    vetAppointments: loadedVet,
    isPremium: loadedPremium,
    currentLanguage: loadedLang,
    isSyncingWithApi: false,
    lastSyncedAt: null,

    fetchLessonsFromApi: async () => {
      set({ isSyncingWithApi: true });
      try {
        const liveLessons = await CatApiService.getLessons();
        console.log('[catStore] Fetched live VPS lessons:', liveLessons.length);
      } catch (err) {
        console.error('[catStore] Failed to fetch lessons:', err);
      } finally {
        set({ isSyncingWithApi: false, lastSyncedAt: new Date().toLocaleTimeString() });
      }
    },

    syncWithCloudBackend: async () => {
      const { cats, skills, sessions, vetAppointments } = get();
      set({ isSyncingWithApi: true });
      try {
        await CatApiService.syncCloudData({
          cats,
          skills,
          sessions,
          reminders: vetAppointments,
        });
        set({ lastSyncedAt: new Date().toLocaleTimeString() });
      } catch (err) {
        console.error('[catStore] Cloud sync error:', err);
      } finally {
        set({ isSyncingWithApi: false });
      }
    },

    getActiveCat: () => {
      const { cats, activeCatId } = get();
      return cats.find((c) => c.id === activeCatId) || cats[0] || null;
    },

    setActiveCatId: (id: string) => {
      set({ activeCatId: id });
      StorageService.setItem(STORAGE_KEYS.ACTIVE_CAT_ID, id);
    },

    addCat: (catData) => {
      const newId = `cat_${Date.now()}`;
      const newCat: Cat = {
        ...catData,
        id: newId,
        createdAt: new Date().toISOString(),
      };
      const updatedCats = [...get().cats, newCat];
      set({ cats: updatedCats, activeCatId: newId });
      StorageService.setItem(STORAGE_KEYS.CATS, updatedCats);
      StorageService.setItem(STORAGE_KEYS.ACTIVE_CAT_ID, newId);
    },

    updateCat: (id, updates) => {
      const updatedCats = get().cats.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat));
      set({ cats: updatedCats });
      StorageService.setItem(STORAGE_KEYS.CATS, updatedCats);
    },

    deleteCat: (id) => {
      const updatedCats = get().cats.filter((cat) => cat.id !== id);
      const nextActiveId = get().activeCatId === id ? updatedCats[0]?.id || null : get().activeCatId;
      set({ cats: updatedCats, activeCatId: nextActiveId });
      StorageService.setItem(STORAGE_KEYS.CATS, updatedCats);
      StorageService.setItem(STORAGE_KEYS.ACTIVE_CAT_ID, nextActiveId);
    },

    addWeightLog: (logData) => {
      const newLog: WeightLog = { ...logData, id: `w_${Date.now()}` };
      const updated = [newLog, ...get().weightLogs];
      set({ weightLogs: updated });
      StorageService.setItem(STORAGE_KEYS.WEIGHT_LOGS, updated);

      // Also update latest weight on cat profile if matching active cat
      const activeCat = get().getActiveCat();
      if (activeCat && activeCat.id === logData.catId) {
        get().updateCat(activeCat.id, { weightKg: logData.weightKg });
      }
    },

    deleteWeightLog: (id) => {
      const updated = get().weightLogs.filter((w) => w.id !== id);
      set({ weightLogs: updated });
      StorageService.setItem(STORAGE_KEYS.WEIGHT_LOGS, updated);
    },

    addVaccineLog: (logData) => {
      const newLog: VaccineLog = { ...logData, id: `vac_${Date.now()}` };
      const updated = [newLog, ...get().vaccineLogs];
      set({ vaccineLogs: updated });
      StorageService.setItem(STORAGE_KEYS.VACCINE_LOGS, updated);
    },

    updateVaccineLog: (id, updates) => {
      const updated = get().vaccineLogs.map((v) => (v.id === id ? { ...v, ...updates } : v));
      set({ vaccineLogs: updated });
      StorageService.setItem(STORAGE_KEYS.VACCINE_LOGS, updated);
    },

    deleteVaccineLog: (id) => {
      const updated = get().vaccineLogs.filter((v) => v.id !== id);
      set({ vaccineLogs: updated });
      StorageService.setItem(STORAGE_KEYS.VACCINE_LOGS, updated);
    },

    addMedicationLog: (logData) => {
      const newLog: MedicationLog = { ...logData, id: `med_${Date.now()}` };
      const updated = [newLog, ...get().medicationLogs];
      set({ medicationLogs: updated });
      StorageService.setItem(STORAGE_KEYS.MEDICATION_LOGS, updated);
    },

    toggleMedicationActive: (id) => {
      const updated = get().medicationLogs.map((m) => (m.id === id ? { ...m, isActive: !m.isActive } : m));
      set({ medicationLogs: updated });
      StorageService.setItem(STORAGE_KEYS.MEDICATION_LOGS, updated);
    },

    deleteMedicationLog: (id) => {
      const updated = get().medicationLogs.filter((m) => m.id !== id);
      set({ medicationLogs: updated });
      StorageService.setItem(STORAGE_KEYS.MEDICATION_LOGS, updated);
    },

    addDiaryLog: (logData) => {
      const newLog: DiaryLog = { ...logData, id: `d_${Date.now()}` };
      const updated = [newLog, ...get().diaryLogs];
      set({ diaryLogs: updated });
      StorageService.setItem(STORAGE_KEYS.DIARY_LOGS, updated);
    },

    deleteDiaryLog: (id) => {
      const updated = get().diaryLogs.filter((d) => d.id !== id);
      set({ diaryLogs: updated });
      StorageService.setItem(STORAGE_KEYS.DIARY_LOGS, updated);
    },

    addVetAppointment: (apptData) => {
      const newAppt: VetAppointment = { ...apptData, id: `vet_${Date.now()}` };
      const updated = [newAppt, ...get().vetAppointments];
      set({ vetAppointments: updated });
      StorageService.setItem(STORAGE_KEYS.VET_APPOINTMENTS, updated);
    },

    toggleVetAppointmentCompleted: (id) => {
      const updated = get().vetAppointments.map((v) => (v.id === id ? { ...v, isCompleted: !v.isCompleted } : v));
      set({ vetAppointments: updated });
      StorageService.setItem(STORAGE_KEYS.VET_APPOINTMENTS, updated);
    },

    deleteVetAppointment: (id) => {
      const updated = get().vetAppointments.filter((v) => v.id !== id);
      set({ vetAppointments: updated });
      StorageService.setItem(STORAGE_KEYS.VET_APPOINTMENTS, updated);
    },

    updateSkillStatus: (catId, skillId, status, progressPercentage) => {
      const skills = get().skills;
      const existingIndex = skills.findIndex((s) => s.catId === catId && s.skillId === skillId);
      let updated: SkillProgress[];

      if (existingIndex >= 0) {
        updated = [...skills];
        updated[existingIndex] = {
          ...updated[existingIndex],
          status,
          progressPercentage,
          lastPracticed: new Date().toISOString(),
        };
      } else {
        const newSkill: SkillProgress = {
          id: `sp_${Date.now()}`,
          catId,
          skillId,
          skillTitle: skillId.replace('_', ' ').toUpperCase(),
          category: 'basic',
          status,
          progressPercentage,
          lastPracticed: new Date().toISOString(),
        };
        updated = [...skills, newSkill];
      }

      set({ skills: updated });
      StorageService.setItem(STORAGE_KEYS.SKILLS, updated);
    },

    recordTrainingSession: (sessionData) => {
      const newSession: TrainingSession = { ...sessionData, id: `ts_${Date.now()}` };
      const updatedSessions = [newSession, ...get().sessions];

      // Update streak
      const today = new Date().toISOString().split('T')[0];
      const streak = get().streak;
      let newCurrentStreak = streak.currentStreak;

      if (streak.lastActiveDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (streak.lastActiveDate === yesterday) {
          newCurrentStreak += 1;
        } else {
          newCurrentStreak = 1;
        }
      }

      const updatedStreak: StreakInfo = {
        ...streak,
        currentStreak: newCurrentStreak,
        bestStreak: Math.max(streak.bestStreak, newCurrentStreak),
        lastActiveDate: today,
        completedDaysThisWeek: Math.min(7, streak.completedDaysThisWeek + 1),
      };

      set({ sessions: updatedSessions, streak: updatedStreak });
      StorageService.setItem(STORAGE_KEYS.SESSIONS, updatedSessions);
      StorageService.setItem(STORAGE_KEYS.STREAK, updatedStreak);
    },

    setPremium: (status: boolean) => {
      set({ isPremium: status });
      StorageService.setItem(STORAGE_KEYS.IS_PREMIUM, status);
    },

    setLanguage: (lang: AppLanguage) => {
      set({ currentLanguage: lang });
      StorageService.setItem(STORAGE_KEYS.LANGUAGE, lang);
    },

    restorePurchases: async () => {
      // Simulate RevenueCat purchaserInfo / entitlement check
      await new Promise((res) => setTimeout(res, 800));
      const hasPreviousPurchase = localStorage.getItem('cat_app_purchased_before') === 'true';
      if (hasPreviousPurchase) {
        set({ isPremium: true });
        StorageService.setItem(STORAGE_KEYS.IS_PREMIUM, true);
        return true;
      }
      return false;
    },
  };
});
