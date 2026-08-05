import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Zap, CheckCircle2, BookOpen, Clock, Star, Flame, Trophy } from 'lucide-react';
import { useCatStore } from '../../store/catStore';
import { SkillStatus } from '../../types/cat';

interface CatSkillProgressProps {
  onStartTraining?: (skillId: string) => void;
}

export const CatSkillProgress: React.FC<CatSkillProgressProps> = ({ onStartTraining }) => {
  const { getActiveCat, skills, streak, updateSkillStatus } = useCatStore();
  const activeCat = getActiveCat();

  if (!activeCat) {
    return (
      <div className="bg-white rounded-2xl p-6 border-[0.5px] border-slate-200 text-center text-slate-500">
        Henüz bir kedi profili seçilmedi.
      </div>
    );
  }

  const catSkills = skills.filter((s) => s.catId === activeCat.id);

  const masteredCount = catSkills.filter((s) => s.status === 'mastered').length;
  const reinforcingCount = catSkills.filter((s) => s.status === 'reinforcing').length;
  const learningCount = catSkills.filter((s) => s.status === 'learning').length;
  const totalSkills = Math.max(1, catSkills.length);

  const statusColors: Record<SkillStatus, { bg: string; text: string; border: string; label: string }> = {
    mastered: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Öğrenildi' },
    reinforcing: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', label: 'Pekiştiriliyor' },
    learning: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Öğreniliyor' },
  };

  const handleNextStatus = (skillId: string, currentStatus: SkillStatus, currentProgress: number) => {
    let nextStatus: SkillStatus = 'learning';
    let nextProgress = 30;

    if (currentStatus === 'learning') {
      nextStatus = 'reinforcing';
      nextProgress = 75;
    } else if (currentStatus === 'reinforcing') {
      nextStatus = 'mastered';
      nextProgress = 100;
    } else {
      nextStatus = 'learning';
      nextProgress = 25;
    }

    updateSkillStatus(activeCat.id, skillId, nextStatus, nextProgress);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Streak & Skill Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Streak Summary Card */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-2xl p-5 border-[0.5px] border-slate-200 shadow-2xs relative overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Eğitim Serisi (Streak)
              </span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  {streak.currentStreak} Gün
                </span>
                <span className="text-xs font-semibold text-amber-600 flex items-center gap-0.5">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" />
                  Aktif
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
              <Trophy className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>En İyi Seri: <strong className="text-slate-800">{streak.bestStreak} Gün</strong></span>
            <span>Bu Hafta: <strong className="text-slate-800">{streak.completedDaysThisWeek}/{streak.weeklyGoalDays} Gün</strong></span>
          </div>

          {/* Weekly Progress Bar */}
          <div className="mt-2 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (streak.completedDaysThisWeek / streak.weeklyGoalDays) * 100)}%` }}
            />
          </div>
        </motion.div>

        {/* Mastered & Active Skills Overview */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-2xl p-5 border-[0.5px] border-slate-200 shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Tamamlanan Beceri
              </span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  {masteredCount}
                </span>
                <span className="text-xs font-medium text-slate-500">/ {totalSkills} Beceri</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Award className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span>Genel Başarı Oranı</span>
              <span>{Math.round((masteredCount / totalSkills) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(masteredCount / totalSkills) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Learning Status Counters */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-2xl p-5 border-[0.5px] border-slate-200 shadow-2xs flex flex-col justify-between"
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Eğitim Durum Dağılımı
          </span>

          <div className="grid grid-cols-3 gap-2 my-2 text-center">
            <div className="bg-emerald-50/60 p-2 rounded-xl border border-emerald-100">
              <p className="text-xs font-bold text-emerald-800">Öğrenildi</p>
              <p className="text-lg font-black text-emerald-900">{masteredCount}</p>
            </div>
            <div className="bg-indigo-50/60 p-2 rounded-xl border border-indigo-100">
              <p className="text-xs font-bold text-indigo-800">Pekiştirme</p>
              <p className="text-lg font-black text-indigo-900">{reinforcingCount}</p>
            </div>
            <div className="bg-amber-50/60 p-2 rounded-xl border border-amber-100">
              <p className="text-xs font-bold text-amber-800">Başlangıç</p>
              <p className="text-lg font-black text-amber-900">{learningCount}</p>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Düzenli 3-5 dakikalık seanslar başarıyı artırır.
          </p>
        </motion.div>
      </div>

      {/* Skills Detail List */}
      <div className="bg-white rounded-2xl p-6 border-[0.5px] border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              {activeCat.name} — Beceriler & İlerleme
            </h3>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Beceri durumunu değiştirmek için karta tıklayın.
            </p>
          </div>

          {onStartTraining && (
            <button
              type="button"
              onClick={() => onStartTraining('recall')}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 fill-white" />
              Hızlı Seans Başlat
            </button>
          )}
        </div>

        {catSkills.length === 0 ? (
          <div className="text-center py-10">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600">Henüz kayıtlı beceri verisi yok.</p>
            <p className="text-xs text-slate-400 mt-1">Eğitim modülünden yeni bir ders başlatabilirsiniz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {catSkills.map((skill) => {
              const statusMeta = statusColors[skill.status];
              return (
                <motion.div
                  key={skill.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleNextStatus(skill.skillId, skill.status, skill.progressPercentage)}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{skill.skillTitle}</h4>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {skill.category}
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusMeta.bg} ${statusMeta.text} ${statusMeta.border}`}
                    >
                      {statusMeta.label}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                      <span>İlerleme Seviyesi</span>
                      <span className="font-bold text-slate-700">{skill.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          skill.status === 'mastered'
                            ? 'bg-emerald-500'
                            : skill.status === 'reinforcing'
                            ? 'bg-indigo-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${skill.progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {skill.notes && (
                    <p className="text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-100 italic">
                      "{skill.notes}"
                    </p>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(skill.lastPracticed).toLocaleDateString('tr-TR')}
                    </span>
                    <span className="text-indigo-600 font-semibold hover:underline">
                      Durumu Değiştir →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
