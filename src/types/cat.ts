export type SkillStatus = 'learning' | 'reinforcing' | 'mastered';
export type SkillCategory = 'basic' | 'care' | 'tricks' | 'behavior';
export type DiaryType = 'food' | 'litter' | 'behavior';
export type DiaryStatus = 'normal' | 'alert';
export type VaccineStatus = 'completed' | 'scheduled' | 'overdue';
export type AppLanguage = 'tr' | 'en';

export interface Cat {
  id: string;
  name: string;
  breed: string;
  ageYears: number;
  ageMonths: number;
  gender: 'male' | 'female';
  weightKg: number;
  photoUrl?: string;
  avatarBg: string;
  microchipId?: string;
  birthDate?: string;
  notes?: string;
  createdAt: string;
}

export interface SkillProgress {
  id: string;
  catId: string;
  skillId: string;
  skillTitle: string;
  category: SkillCategory;
  status: SkillStatus;
  progressPercentage: number;
  lastPracticed: string;
  notes?: string;
}

export interface TrainingSession {
  id: string;
  catId: string;
  skillId: string;
  skillTitle: string;
  date: string;
  durationSeconds: number;
  treatCount: number;
  rating: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export interface StreakInfo {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string;
  weeklyGoalDays: number;
  completedDaysThisWeek: number;
}

export interface WeightLog {
  id: string;
  catId: string;
  weightKg: number;
  date: string;
  notes?: string;
}

export interface VaccineLog {
  id: string;
  catId: string;
  vaccineName: string;
  dateAdministered: string;
  nextDueDate: string;
  vetName?: string;
  status: VaccineStatus;
  batchNumber?: string;
  notes?: string;
}

export interface MedicationLog {
  id: string;
  catId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  timeOfDay: string[];
  startDate: string;
  endDate?: string;
  isActive: boolean;
  notes?: string;
}

export interface DiaryLog {
  id: string;
  catId: string;
  type: DiaryType;
  title: string;
  notes: string;
  date: string;
  status: DiaryStatus;
  portionGrams?: number;
  litterType?: string;
}

export interface VetAppointment {
  id: string;
  catId: string;
  title: string;
  vetName: string;
  clinicAddress?: string;
  phone?: string;
  date: string;
  time: string;
  isCompleted: boolean;
  notes?: string;
  reminderScheduled?: boolean;
  notificationId?: number;
}

export interface PaywallPackage {
  id: string;
  identifier: string;
  title: string;
  period: 'monthly' | 'yearly';
  priceString: string;
  priceValue: number;
  currencyCode: string;
  trialDays?: number;
  badge?: string;
  savingsPercentage?: number;
  monthlyEquivalentPrice?: string;
}
