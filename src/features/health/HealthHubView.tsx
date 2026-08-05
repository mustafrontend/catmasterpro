import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Scale,
  Calendar,
  Syringe,
  Plus,
  ArrowDown,
  ArrowUp,
  Clock as ClockIcon,
  MapPin,
  CheckCircle2,
  Trash2,
  X,
  Bell,
  FileText,
} from 'lucide-react';
import { useCatStore } from '../../store/catStore';
import { NotificationService } from '../../services/notificationService';
import { VetPassportPdfModal } from './VetPassportPdfModal';

interface HealthHubViewProps {
  onUnlockPremium?: () => void;
  isPremiumUser?: boolean;
}

export const HealthHubView: React.FC<HealthHubViewProps> = ({
  onUnlockPremium,
  isPremiumUser = false,
}) => {
  const { t } = useTranslation();
  const {
    getActiveCat,
    weightLogs,
    addWeightLog,
    deleteWeightLog,
    vaccineLogs,
    addVaccineLog,
    deleteVaccineLog,
    vetAppointments,
    addVetAppointment,
    deleteVetAppointment,
  } = useCatStore();

  const activeCat = getActiveCat();

  // Modals
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showVetModal, setShowVetModal] = useState(false);
  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  // Form states
  const [newWeight, setNewWeight] = useState(activeCat?.weightKg || 4.2);
  const [weightDate, setWeightDate] = useState(new Date().toISOString().split('T')[0]);

  const [vetTitle, setVetTitle] = useState('');
  const [vetClinic, setVetClinic] = useState('Mutlu Patiler Vet.');
  const [vetDate, setVetDate] = useState(new Date().toISOString().split('T')[0]);
  const [vetTime, setVetTime] = useState('14:30');

  const [vacName, setVacName] = useState('');
  const [vacDueDate, setVacDueDate] = useState('');

  const lastWeight = weightLogs[weightLogs.length - 1];
  const prevWeight = weightLogs[weightLogs.length - 2];
  const weightDiff =
    lastWeight && prevWeight
      ? (lastWeight.weightKg - prevWeight.weightKg).toFixed(1)
      : '-0.1';

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCat) return;
    addWeightLog({
      catId: activeCat.id,
      weightKg: Number(newWeight),
      date: weightDate,
    });
    setShowWeightModal(false);
  };

  const handleAddVet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCat) return;
    addVetAppointment({
      catId: activeCat.id,
      title: vetTitle || 'Veteriner Kontrolü',
      vetName: vetClinic || 'Mutlu Patiler Vet.',
      clinicAddress: vetClinic,
      date: vetDate,
      time: vetTime,
      isCompleted: false,
    });
    setShowVetModal(false);
  };

  const handleAddVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCat) return;
    addVaccineLog({
      catId: activeCat.id,
      vaccineName: vacName || 'Karma Aşı',
      dateAdministered: new Date().toISOString().split('T')[0],
      nextDueDate: vacDueDate || '2026-09-01',
      status: 'scheduled',
    });
    setShowVaccineModal(false);
  };

  const handleScheduleVaccineReminder = (title: string, body: string) => {
    NotificationService.scheduleNotification({
      id: Math.floor(Math.random() * 10000),
      title,
      body,
      scheduleAt: new Date(Date.now() + 5000),
    });
  };

  if (!activeCat) {
    return (
      <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center">
        <p className="text-sm font-semibold text-slate-500">Lütfen üst taraftan bir kedi seçin.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6 animate-fade-in font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#97480d] tracking-tight font-serif">
            {t('health.title')}
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
            {t('health.subtitle')}
          </p>
        </div>

        <button
          onClick={() => setShowPdfModal(true)}
          className="px-4 py-2.5 bg-[#97480d] hover:bg-[#7a3600] text-white rounded-2xl text-xs font-black shadow-md flex items-center gap-2 active:scale-95 transition-all self-start sm:self-auto"
        >
          <FileText className="w-4 h-4 text-amber-300" />
          <span>VET SAĞLIK KARNESİ PDF 📄</span>
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="space-y-6 md:grid md:grid-cols-12 md:gap-5 md:space-y-0">
        
        {/* SECTION 1: Kilo Takibi (Bento Card - Spans 8 cols on tablet/desktop) */}
        <section className="col-span-12 md:col-span-8 bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 sm:p-6 relative overflow-hidden group">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 font-serif">{t('health.weightTracker')}</h3>
            </div>
            <button
              onClick={() => setShowWeightModal(true)}
              className="text-xs font-bold text-[#97480d] hover:bg-amber-50 px-3 py-1.5 rounded-xl transition-colors"
            >
              {t('health.addMeasurement')}
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end border-b border-slate-100 pb-3">
              <div>
                <p className="text-xs font-medium text-slate-500">Son Ölçüm ({lastWeight ? lastWeight.date : 'Bugün'})</p>
                <p className="text-3xl font-black text-[#97480d] tracking-tight mt-0.5">
                  {lastWeight ? lastWeight.weightKg : activeCat.weightKg} <span className="text-base font-semibold text-slate-600">kg</span>
                </p>
              </div>

              <div className="flex items-center text-sky-700 font-bold text-xs gap-1 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
                {Number(weightDiff) < 0 ? (
                  <ArrowDown className="w-3.5 h-3.5 text-sky-600" />
                ) : (
                  <ArrowUp className="w-3.5 h-3.5 text-rose-600" />
                )}
                <span>{weightDiff} kg</span>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="h-32 mt-4 relative w-full flex items-end justify-between px-3 gap-2">
              <div className="w-1/5 bg-sky-100 h-[60%] rounded-t-xl opacity-70 group-hover:opacity-100 transition-all flex items-center justify-center text-[10px] font-bold text-sky-800">4.0 kg</div>
              <div className="w-1/5 bg-sky-100 h-[65%] rounded-t-xl opacity-70 group-hover:opacity-100 transition-all flex items-center justify-center text-[10px] font-bold text-sky-800">4.1 kg</div>
              <div className="w-1/5 bg-sky-100 h-[72%] rounded-t-xl opacity-70 group-hover:opacity-100 transition-all flex items-center justify-center text-[10px] font-bold text-sky-800">4.3 kg</div>
              <div className="w-1/5 bg-sky-100 h-[68%] rounded-t-xl opacity-70 group-hover:opacity-100 transition-all flex items-center justify-center text-[10px] font-bold text-sky-800">4.2 kg</div>
              <div className="w-1/5 bg-[#97480d] h-[70%] rounded-t-xl relative shadow-md flex items-center justify-center text-[10px] font-black text-white">
                {lastWeight ? `${lastWeight.weightKg} kg` : '4.2 kg'}
              </div>
            </div>

            <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-2 px-2">
              <span>Oca</span>
              <span>Şub</span>
              <span>Mar</span>
              <span>Nis</span>
              <span>May</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowWeightModal(true)}
            className="mt-4 w-full bg-[#97480d] hover:bg-[#7a3600] text-white font-extrabold text-xs py-3 rounded-2xl shadow-sm transition-all flex justify-center items-center gap-2 active:scale-98"
          >
            <Plus className="w-4 h-4" /> Yeni Ölçüm Ekle
          </button>
        </section>

        {/* RIGHT COLUMN STACK (Spans 4 cols on tablet/desktop) */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-5">
          
          {/* SECTION 2: Veteriner Ajandası */}
          <section className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900 font-serif">Veteriner Ajandası</h3>
              </div>
              <button
                onClick={() => setShowVetModal(true)}
                className="text-xs font-bold text-purple-600 hover:underline"
              >
                + Ekle
              </button>
            </div>

            {vetAppointments.length > 0 ? (
              <div className="space-y-3">
                {vetAppointments.slice(0, 2).map((appt) => (
                  <div key={appt.id} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex gap-3.5 items-center">
                    <div className="bg-white p-2.5 rounded-xl text-center min-w-[55px] shadow-2xs border border-slate-200">
                      <p className="text-[10px] font-black text-purple-600 uppercase">MAY</p>
                      <p className="text-base font-black text-slate-900 leading-none mt-0.5">15</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-extrabold text-slate-900 truncate">{appt.title}</p>
                      <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                        <ClockIcon className="w-3 h-3 text-slate-400" /> {appt.time}
                      </p>
                      <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {appt.vetName || 'Mutlu Patiler Vet.'}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteVetAppointment(appt.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex gap-3.5 items-center">
                <div className="bg-white p-2.5 rounded-xl text-center min-w-[55px] shadow-2xs border border-slate-200">
                  <p className="text-[10px] font-black text-purple-600 uppercase">MAY</p>
                  <p className="text-base font-black text-slate-900 leading-none mt-0.5">15</p>
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Genel Kontrol</p>
                  <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                    <ClockIcon className="w-3 h-3 text-slate-400" /> 14:30
                  </p>
                  <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" /> Mutlu Patiler Vet.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowVetModal(true)}
              className="w-full border border-slate-300 text-slate-700 hover:bg-slate-50 font-extrabold text-xs py-2.5 rounded-2xl transition-colors flex justify-center items-center gap-2"
            >
              Randevu Ekle / Değiştir
            </button>
          </section>

          {/* SECTION 3: Aşı Takvimi */}
          <section className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
                  <Syringe className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900 font-serif">Aşı Takvimi</h3>
              </div>
              <button
                onClick={() => setShowVaccineModal(true)}
                className="text-xs font-bold text-rose-600 hover:underline"
              >
                + Aşı Ekle
              </button>
            </div>

            <div className="space-y-3">
              {/* Vaccine Item 1 */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                <div className="flex gap-3 items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div>
                    <p className="text-xs font-extrabold text-slate-900">Karma Aşı (2. Doz)</p>
                    <p className="text-[11px] font-medium text-slate-500">Son tarih: 20 Mayıs</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleScheduleVaccineReminder('Karma Aşı Zamanı!', '20 Mayıs Karma aşı randevunuzu unutmayın.')}
                  className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-700 shadow-2xs hover:bg-slate-50 flex items-center gap-1"
                >
                  <Bell className="w-3 h-3 text-amber-500 inline" /> Hatırlat
                </button>
              </div>

              {/* Vaccine Item 2 */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                <div className="flex gap-3 items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <div>
                    <p className="text-xs font-extrabold text-slate-900">Kuduz Aşısı</p>
                    <p className="text-[11px] font-medium text-slate-500">Son tarih: 15 Haziran</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleScheduleVaccineReminder('Kuduz Aşısı Zamanı!', '15 Haziran Kuduz aşısı randevunuzu unutmayın.')}
                  className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-700 shadow-2xs hover:bg-slate-50 flex items-center gap-1"
                >
                  <Bell className="w-3 h-3 text-slate-400 inline" /> Hatırlat
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Add Weight Modal */}
      <AnimatePresence>
        {showWeightModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowWeightModal(false)} className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl z-10 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-base text-slate-900">Yeni Kilo Ölçümü Ekle</h3>
                <button onClick={() => setShowWeightModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <form onSubmit={handleAddWeight} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Ağırlık (kg)</label>
                  <input type="number" step="0.1" value={newWeight} onChange={(e) => setNewWeight(Number(e.target.value))} className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Tarih</label>
                  <input type="date" value={weightDate} onChange={(e) => setWeightDate(e.target.value)} className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold" required />
                </div>
                <button type="submit" className="w-full bg-[#97480d] text-white font-extrabold py-3 rounded-2xl text-xs shadow-md">Kaydet</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Vet Modal */}
      <AnimatePresence>
        {showVetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowVetModal(false)} className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl z-10 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-base text-slate-900">Veteriner Randevusu Ekle</h3>
                <button onClick={() => setShowVetModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <form onSubmit={handleAddVet} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Randevu Başlığı</label>
                  <input type="text" value={vetTitle} onChange={(e) => setVetTitle(e.target.value)} placeholder="Genel Kontrol / Aşı" className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Klinik Adı</label>
                  <input type="text" value={vetClinic} onChange={(e) => setVetClinic(e.target.value)} className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">Tarih</label>
                    <input type="date" value={vetDate} onChange={(e) => setVetDate(e.target.value)} className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold" required />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">Saat</label>
                    <input type="time" value={vetTime} onChange={(e) => setVetTime(e.target.value)} className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold" required />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#97480d] text-white font-extrabold py-3 rounded-2xl text-xs shadow-md">Randevuyu Kaydet</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Vaccine Modal */}
      <AnimatePresence>
        {showVaccineModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowVaccineModal(false)} className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl z-10 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-base text-slate-900">Aşı Kaydı Ekle</h3>
                <button onClick={() => setShowVaccineModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <form onSubmit={handleAddVaccine} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Aşı Adı</label>
                  <input type="text" value={vacName} onChange={(e) => setVacName(e.target.value)} placeholder="Karma / Kuduz / Parazit" className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold" required />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Son Aşı Tarihi</label>
                  <input type="date" value={vacDueDate} onChange={(e) => setVacDueDate(e.target.value)} className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold" required />
                </div>
                <button type="submit" className="w-full bg-[#97480d] text-white font-extrabold py-3 rounded-2xl text-xs shadow-md">Aşıyı Kaydet</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <VetPassportPdfModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
      />
    </div>
  );
};

export default HealthHubView;
