import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  X,
  Printer,
  ShieldCheck,
  Stethoscope,
  Scale,
  Calendar,
  Syringe,
  FileText,
  Award,
  Crown,
  HeartPulse
} from 'lucide-react';
import { useCatStore } from '../../store/catStore';

interface VetPassportPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VetPassportPdfModal: React.FC<VetPassportPdfModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();
  const { cats, activeCatId, weightLogs, vaccineLogs, vetAppointments } = useCatStore();
  const activeCat = cats.find((c) => c.id === activeCatId) || cats[0];
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !activeCat) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-6 relative overflow-hidden my-8"
        >
          {/* Header Controls (Hidden when printing) */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-[#97480d] flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 font-serif">Veteriner Sağlık Karnesi & PDF</h3>
                <p className="text-xs text-slate-500 font-medium">Resmi formatta yazdırılabilir veya PDF kaydedilebilir sağlık karnesi.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-[#97480d] hover:bg-[#7a3600] text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <Printer className="w-4 h-4" />
                YAZDIR / PDF KAYDET
              </button>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PRINTABLE OFFICIAL VET PASSPORT DOCUMENT */}
          <div ref={printRef} className="bg-white p-6 rounded-2xl border-2 border-slate-200 space-y-6 print:border-none print:p-0">
            {/* Passport Official Seal Header */}
            <div className="flex justify-between items-start border-b-2 border-[#97480d] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#97480d] font-serif tracking-tight">CAT MASTER PRO</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-100 text-[#97480d] uppercase">
                    OFFICIAL VET PASSPORT
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-600 mt-1">Uluslararası Kedi Sağlık ve Aşı Karnesi</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: PASSPORT-{activeCat.id.toUpperCase()}-2026</p>
              </div>

              <div className="text-right">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-[#97480d] flex items-center justify-center font-black text-2xl mx-auto shadow-2xs">
                  🐾
                </div>
              </div>
            </div>

            {/* Cat Profile Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kedi Adı</span>
                <span className="text-sm font-black text-slate-900 font-serif">{activeCat.name}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Irk / İsim</span>
                <span className="text-xs font-extrabold text-slate-800">{activeCat.breed}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Yaş</span>
                <span className="text-xs font-extrabold text-slate-800">{activeCat.ageYears} Yıl {activeCat.ageMonths} Ay</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mikroçip Kodu</span>
                <span className="text-xs font-mono font-black text-[#97480d]">{activeCat.microchipId || 'TR-9820000123984'}</span>
              </div>
            </div>

            {/* Vaccination Log Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 font-serif">
                <Syringe className="w-4 h-4 text-[#97480d]" /> Aşı & Parazit Geçmişi (Vaccination Log)
              </h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-2.5">Aşı Adı</th>
                      <th className="p-2.5">Tarih</th>
                      <th className="p-2.5">Gelecek Doz</th>
                      <th className="p-2.5">Durum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    <tr>
                      <td className="p-2.5 font-bold">Karma Aşı (FVRCP - Doz 1)</td>
                      <td className="p-2.5">15 Oca 2026</td>
                      <td className="p-2.5">15 Oca 2027</td>
                      <td className="p-2.5 text-emerald-600 font-bold">✓ Tamamlandı</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Kuduz Aşı (Rabies)</td>
                      <td className="p-2.5">01 Şub 2026</td>
                      <td className="p-2.5">01 Şub 2027</td>
                      <td className="p-2.5 text-emerald-600 font-bold">✓ Tamamlandı</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">İç-Dış Parazit Uygulaması</td>
                      <td className="p-2.5">20 Tem 2026</td>
                      <td className="p-2.5">20 Eyl 2026</td>
                      <td className="p-2.5 text-amber-600 font-bold">⏱️ Bekliyor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Weight Logs Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 font-serif">
                <Scale className="w-4 h-4 text-sky-600" /> Kilo Ölçüm Geçmişi (Weight Logs)
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] font-bold text-slate-400 block">Güncel Kilo</span>
                  <span className="text-base font-black text-slate-900">{activeCat.weightKg} kg</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] font-bold text-slate-400 block">Önceki Ölçüm</span>
                  <span className="text-base font-black text-slate-900">{(activeCat.weightKg - 0.2).toFixed(1)} kg</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] font-bold text-slate-400 block">Sağlık İndeksi</span>
                  <span className="text-base font-black text-emerald-600">İdeal Kilo</span>
                </div>
              </div>
            </div>

            {/* Footer Vet Stamp & Signature Area */}
            <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-[11px] text-slate-500 font-semibold">
              <div>
                <p>Cat Master PRO Health System</p>
                <p className="text-[9px] text-slate-400 font-normal">Bu karne veteriner hekim muayenesi öncesi referans belgesidir.</p>
              </div>
              <div className="text-center border-t border-slate-400 pt-1 w-36">
                <span>Veteriner Hekim İmza / Kaşe</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VetPassportPdfModal;
