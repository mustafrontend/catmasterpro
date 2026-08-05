import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Sparkles, Cat as CatIcon, Check, Heart, ShieldAlert } from 'lucide-react';
import { Cat } from '../../types/cat';
import { useCatStore } from '../../store/catStore';

interface AddCatModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCat?: Cat | null;
}

const AVATAR_BG_OPTIONS = [
  { label: 'Indigo', value: 'bg-indigo-500 text-white' },
  { label: 'Emerald', value: 'bg-emerald-500 text-white' },
  { label: 'Rose', value: 'bg-rose-500 text-white' },
  { label: 'Amber', value: 'bg-amber-500 text-white' },
  { label: 'Violet', value: 'bg-violet-500 text-white' },
  { label: 'Sky', value: 'bg-sky-500 text-white' },
];

const CAT_BREEDS = [
  'Tekir (Tabby)',
  'British Shorthair',
  'Scottish Fold',
  'Siamese',
  'Maine Coon',
  'Persian (İran Kedisi)',
  'Ragdoll',
  'Sphynx',
  'Ankara Kedisi (Turkish Angora)',
  'Van Kedisi',
  'Mixed Breed / Karma',
];

export const AddCatModal: React.FC<AddCatModalProps> = ({ isOpen, onClose, editingCat }) => {
  const { addCat, updateCat } = useCatStore();

  const [name, setName] = useState('');
  const [breed, setBreed] = useState(CAT_BREEDS[0]);
  const [ageYears, setAgeYears] = useState(1);
  const [ageMonths, setAgeMonths] = useState(0);
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [weightKg, setWeightKg] = useState(4.0);
  const [avatarBg, setAvatarBg] = useState(AVATAR_BG_OPTIONS[0].value);
  const [microchipId, setMicrochipId] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ name?: string }>({});

  useEffect(() => {
    if (editingCat) {
      setName(editingCat.name);
      setBreed(editingCat.breed);
      setAgeYears(editingCat.ageYears);
      setAgeMonths(editingCat.ageMonths);
      setGender(editingCat.gender);
      setWeightKg(editingCat.weightKg);
      setAvatarBg(editingCat.avatarBg || AVATAR_BG_OPTIONS[0].value);
      setMicrochipId(editingCat.microchipId || '');
      setNotes(editingCat.notes || '');
    } else {
      setName('');
      setBreed(CAT_BREEDS[0]);
      setAgeYears(1);
      setAgeMonths(0);
      setGender('female');
      setWeightKg(4.0);
      setAvatarBg(AVATAR_BG_OPTIONS[0].value);
      setMicrochipId('');
      setNotes('');
    }
    setErrors({});
  }, [editingCat, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrors({ name: 'Kedi ismi boş bırakılamaz.' });
      return;
    }

    if (editingCat) {
      updateCat(editingCat.id, {
        name: name.trim(),
        breed,
        ageYears: Number(ageYears),
        ageMonths: Number(ageMonths),
        gender,
        weightKg: Number(weightKg),
        avatarBg,
        microchipId: microchipId.trim() || undefined,
        notes: notes.trim() || undefined,
      });
    } else {
      addCat({
        name: name.trim(),
        breed,
        ageYears: Number(ageYears),
        ageMonths: Number(ageMonths),
        gender,
        weightKg: Number(weightKg),
        avatarBg,
        microchipId: microchipId.trim() || undefined,
        notes: notes.trim() || undefined,
      });
    }

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border-[0.5px] border-slate-200 overflow-hidden z-10 my-8"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <CatIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {editingCat ? 'Kedi Profilini Düzenle' : 'Yeni Kedi Ekle'}
                  </h3>
                  <p className="text-xs font-normal text-slate-500">
                    Kedinizin profil bilgilerini ve sağlık verilerini yönetin.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Color & Avatar Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Profil Renk Teması
                </label>
                <div className="flex items-center space-x-3">
                  {AVATAR_BG_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAvatarBg(opt.value)}
                      className={`w-10 h-10 rounded-xl ${opt.value} flex items-center justify-center transition-transform active:scale-95 border-2 ${
                        avatarBg === opt.value ? 'border-slate-900 ring-2 ring-indigo-300' : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                    >
                      {avatarBg === opt.value && <Check className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Kedi İsmi *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({});
                  }}
                  placeholder="Örn: Pamuk, Duman, Luna"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-semibold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-red-300 focus:ring-red-200 bg-red-50/20'
                      : 'border-slate-200 focus:ring-indigo-200 focus:border-indigo-500'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-normal">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Breed */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Irk / Cins
                </label>
                <select
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                >
                  {CAT_BREEDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age Years & Months Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Yaş (Yıl)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={ageYears}
                    onChange={(e) => setAgeYears(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Ay
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={ageMonths}
                    onChange={(e) => setAgeMonths(Math.min(11, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Gender & Weight Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Cinsiyet
                  </label>
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        gender === 'female' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Dişi ♀
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        gender === 'male' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Erkek ♂
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Ağırlık (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="25"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0.1)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Microchip ID */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Mikroçip Numarası (İsteğe Bağlı)
                </label>
                <input
                  type="text"
                  value={microchipId}
                  onChange={(e) => setMicrochipId(e.target.value)}
                  placeholder="985141000000000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Özel Notlar & Beslenme Tercihleri
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Sevdiği ödül maması, alerjiler veya özel davranış notları..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-medium bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Modal Footer Buttons */}
              <div className="pt-3 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors active:scale-98"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-sm active:scale-98 flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  {editingCat ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
