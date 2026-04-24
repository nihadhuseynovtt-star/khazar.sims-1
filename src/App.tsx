
page_tsx = '''"use client";

import { useState, useEffect } from "react";
import {
  Search,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Ship,
  GraduationCap,
  LayoutGrid,
  Bell,
  Settings,
  LogOut,
  Lock,
  Unlock,
  Save,
  RotateCcw,
  X,
  Edit3,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Ders {
  kodu: string;
  adi: string;
  qrup: string;
  kredit: number;
  notlar: (number | null)[];
  araliq: number | null;
  araliqYuzde: string | null;
  final: number | null;
  orta: number | null;
}

const INITIAL_DERSLER: Ders[] = [
  {
    kodu: "MGT 101",
    adi: "Karyera planlaması",
    qrup: "C",
    kredit: 3.0,
    notlar: [null, null, null, null, null],
    araliq: 25.0,
    araliqYuzde: "Aralıq % 30",
    final: null,
    orta: null,
  },
  {
    kodu: "CMS 215",
    adi: "Verilənlərin strukturu (12:30)",
    qrup: "D",
    kredit: 3.0,
    notlar: [null, null, null, null, null],
    araliq: null,
    araliqYuzde: null,
    final: null,
    orta: null,
  },
  {
    kodu: "MATH 310",
    adi: "Tətbiqi diferensial tənliklər (kəsir)",
    qrup: "A",
    kredit: 3.0,
    notlar: [null, null, null, null, null],
    araliq: null,
    araliqYuzde: null,
    final: null,
    orta: null,
  },
  {
    kodu: "MATH 318",
    adi: "Kompleks analiz",
    qrup: "B",
    kredit: 3.0,
    notlar: [null, null, null, null, null],
    araliq: 7.5,
    araliqYuzde: "Aralıq % 30",
    final: null,
    orta: null,
  },
  {
    kodu: "MATH 329",
    adi: "Ədədi təhlil",
    qrup: "B",
    kredit: 3.0,
    notlar: [null, null, null, null, null],
    araliq: 17.0,
    araliqYuzde: "Aralıq % 30",
    final: null,
    orta: null,
  },
  {
    kodu: "CMS 414",
    adi: "Qurğuların (əşyaların) interneti",
    qrup: "B",
    kredit: 3.0,
    notlar: [null, null, null, null, null],
    araliq: null,
    araliqYuzde: null,
    final: null,
    orta: null,
  },
];

export default function App() {
  const [selectedYear, setSelectedYear] = useState<"2025" | "2026">("2026");
  const [selectedSemester, setSelectedSemester] = useState<"payiz" | "yaz" | "mini-yaz" | "yay">("yaz");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dersler, setDersler] = useState<Ders[]>(INITIAL_DERSLER);
  const [filteredDersler, setFilteredDersler] = useState<Ders[]>(INITIAL_DERSLER);
  const [adminOpen, setAdminOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [tempDersler, setTempDersler] = useState<Ders[]>(INITIAL_DERSLER);
  const [saveMessage, setSaveMessage] = useState("");
  const [sorgulaActive, setSorgulaActive] = useState(false);

  const semesterOptions = [
    { id: "payiz" as const, label: "Payız" },
    { id: "yaz" as const, label: "Yaz" },
    { id: "mini-yaz" as const, label: "Mini Yaz" },
    { id: "yay" as const, label: "Yay" },
  ];

  // Sorğula funksiyası — filtrləri tətbiq edir
  const handleSorgula = () => {
    setSorgulaActive(true);
    // Burada real API çağırışı olardı, indi sadəcə state yeniləyirik
    setFilteredDersler([...dersler]);
    setTimeout(() => setSorgulaActive(false), 500);
  };

  // Admin paneli aç
  const openAdmin = () => {
    setTempDersler(JSON.parse(JSON.stringify(dersler)));
    setEditMode(true);
    setAdminOpen(true);
    setSaveMessage("");
  };

  // Aralıq balını dəyiş
  const handleAraliqChange = (index: number, value: string) => {
    const numValue = value === "" ? null : parseFloat(value);
    const updated = [...tempDersler];
    updated[index] = {
      ...updated[index],
      araliq: numValue,
      araliqYuzde: numValue !== null ? "Aralıq % 30" : null,
    };
    setTempDersler(updated);
  };

  // Fən adını dəyiş
  const handleAdiChange = (index: number, value: string) => {
    const updated = [...tempDersler];
    updated[index] = { ...updated[index], adi: value };
    setTempDersler(updated);
  };

  // Yadda saxla
  const handleSave = () => {
    setDersler(JSON.parse(JSON.stringify(tempDersler)));
    setFilteredDersler(JSON.parse(JSON.stringify(tempDersler)));
    setSaveMessage("✓ Dəyişikliklər yadda saxlanıldı!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  // Reset
  const handleReset = () => {
    setTempDersler(JSON.parse(JSON.stringify(INITIAL_DERSLER)));
    setSaveMessage("✓ İlkin dəyərlərə qaytarıldı");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  // Tətbiq et (admin paneli bağla və yadda saxla)
  const handleApply = () => {
    handleSave();
    setEditMode(false);
    setAdminOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans relative overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-20 md:w-24" : "w-0"
        } bg-[#003366] flex flex-col items-center py-8 transition-all duration-300 relative shrink-0 z-20`}
      >
        {sidebarOpen && (
          <>
            <div className="mb-8">
              <div className="w-14 h-14 bg-white rounded-full flex flex-col items-center justify-center p-1 shadow-xl border-2 border-[#003366]">
                <Ship className="w-8 h-8 text-[#003366]" />
                <span className="text-[8px] font-black leading-none text-[#003366]">KHAZAR</span>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-center">
              <SidebarIcon icon={GraduationCap} label="OBIS" active />
              <SidebarIcon icon={LayoutGrid} label="Panel" />
              <SidebarIcon icon={Bell} label="Bildirişlər" />
              <SidebarIcon icon={Settings} label="Ayarlar" />
            </div>

            <div className="mt-auto flex flex-col gap-6 items-center mb-4">
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <SidebarIcon icon={LogOut} label="Çıxış" color="text-red-400" />
            </div>
          </>
        )}

        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#003366] rounded-full flex items-center justify-center text-white hover:bg-[#004488] transition-colors shadow-lg z-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col h-screen">
        {/* Top bar */}
        <div className="bg-white px-8 py-3 border-b flex justify-between items-center shrink-0">
          <div className="bg-[#8b1a8b] text-white px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
            TƏDBİR TƏ
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full bg-[#003366] shadow-sm"></div>
              <div className="w-5 h-5 rounded-full bg-red-600 shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-5xl border border-gray-200"
          >
            {/* Card Header */}
            <div className="bg-[#8fa4c0] px-6 py-4 flex items-center justify-between border-b border-gray-300">
              <div className="flex items-center gap-3 text-[#1e3a5f]">
                <div className="bg-white/20 p-1.5 rounded">
                  <ChevronRight className="w-5 h-5 rotate-90" />
                </div>
                <h2 className="font-bold text-lg tracking-tight">Semestralıq Ballar</h2>
              </div>
              <HelpCircle className="w-6 h-6 text-[#1e3a5f] cursor-pointer hover:opacity-70 transition-opacity" />
            </div>

            {/* Filters Section */}
            <div className="p-6 bg-gray-50/50 flex flex-wrap items-center gap-6 border-b border-gray-100">
              <span className="text-sm text-gray-600 font-semibold uppercase tracking-wider">
                Tədris ili və semestr
              </span>

              {/* Year Selector */}
              <div className="flex bg-gray-200 p-1 rounded-lg">
                {(["2025", "2026"] as const).map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-5 py-2 rounded-md text-sm font-bold transition-all ${
                      selectedYear === year
                        ? "bg-white text-[#1e3a5f] shadow-md"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Semesters */}
              <div className="flex gap-5 items-center">
                {semesterOptions.map((sem) => (
                  <label key={sem.id} className="flex items-center gap-2 cursor-pointer group">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedSemester === sem.id
                          ? "border-blue-600 bg-blue-600"
                          : "border-gray-300 group-hover:border-gray-400"
                      }`}
                    >
                      {selectedSemester === sem.id && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="semester"
                      className="hidden"
                      checked={selectedSemester === sem.id}
                      onChange={() => setSelectedSemester(sem.id)}
                    />
                    <span className="text-sm font-medium text-gray-700">{sem.label}</span>
                  </label>
                ))}
              </div>

              {/* Search */}
              <button
                onClick={handleSorgula}
                disabled={sorgulaActive}
                className="ml-auto flex items-center gap-2 bg-black text-white px-8 py-2.5 rounded-lg font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-black/10 disabled:opacity-50"
              >
                <Search className={`w-4 h-4 ${sorgulaActive ? "animate-spin" : ""}`} />
                <span className="text-sm">{sorgulaActive ? "Yüklənir..." : "Sorğula"}</span>
              </button>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100/80 text-gray-700">
                    <th className="px-4 py-4 text-left font-bold border border-gray-200 uppercase text-[11px] tracking-widest w-24">
                      Dərs kodu
                    </th>
                    <th className="px-4 py-4 text-left font-bold border border-gray-200 uppercase text-[11px] tracking-widest">
                      Dərs adı
                    </th>
                    <th className="px-4 py-4 text-center font-bold border border-gray-200 uppercase text-[11px] tracking-widest w-16">
                      Qrup
                    </th>
                    <th className="px-4 py-4 text-center font-bold border border-gray-200 uppercase text-[11px] tracking-widest w-20">
                      Kredit
                    </th>
                    {[5, 4, 3, 2, 1].map((num) => (
                      <th
                        key={num}
                        className="px-3 py-4 text-center font-bold border border-gray-200 w-12 bg-gray-100/50"
                      >
                        {num}
                      </th>
                    ))}
                    <th className="px-4 py-4 text-center font-bold border border-gray-200 uppercase text-[11px] tracking-widest w-24 bg-gray-200/50">
                      Aralıq
                    </th>
                    <th className="px-4 py-4 text-center font-bold border border-gray-200 uppercase text-[11px] tracking-widest w-20">
                      Final
                    </th>
                    <th className="px-4 py-4 text-center font-bold border border-gray-200 uppercase text-[11px] tracking-widest w-20">
                      Orta
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDersler.map((ders, index) => (
                    <tr
                      key={ders.kodu}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                    >
                      <td className="px-4 py-4 border border-gray-200 font-bold text-[#1e3a5f]">
                        {ders.kodu}
                      </td>
                      <td className="px-4 py-4 border border-gray-200 text-gray-700 font-medium">
                        {ders.adi}
                      </td>
                      <td className="px-4 py-4 border border-gray-200 text-center font-bold text-gray-800">
                        {ders.qrup}
                      </td>
                      <td className="px-4 py-4 border border-gray-200 text-center text-gray-600 font-medium">
                        {ders.kredit.toFixed(1).replace(".", ",")}
                      </td>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <td
                          key={i}
                          className="px-2 py-4 border border-gray-200 text-center bg-gray-300/20"
                        ></td>
                      ))}
                      <td className="px-4 py-4 border border-gray-200 text-center bg-gray-200/20">
                        {ders.araliq !== null ? (
                          <div className="flex flex-col items-center">
                            <span className="font-bold text-[#1e3a5f]">
                              {ders.araliq.toFixed(1).replace(".", ",")}
                            </span>
                            {ders.araliqYuzde && (
                              <span className="text-[10px] text-gray-500 font-medium mt-1 leading-tight">
                                {ders.araliqYuzde}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 font-bold">-</span>
                        )}
                      </td>
                      <td className="px-4 py-4 border border-gray-200 text-center text-gray-400 font-medium">
                        {ders.final !== null ? ders.final : "-"}
                      </td>
                      <td className="px-4 py-4 border border-gray-200 text-center text-gray-400 font-bold">
                        {ders.orta !== null ? ders.orta : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="bg-[#1e3a5f] text-gray-400 text-[10px] py-1.5 px-6 flex justify-between uppercase tracking-wider font-mono shrink-0">
          <span>Khazar University OBIS | System Online</span>
          <span>Sessiya Aktivdir</span>
        </div>
      </div>

      {/* ============================================ */}
      {/* GİZLİ ADMIN PANEL — SAĞ ALT KÜNC DÜYMƏSİ    */}
      {/* ============================================ */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={openAdmin}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white shadow-2xl shadow-red-900/40 z-50 hover:from-red-500 hover:to-red-700 transition-all border-2 border-white/20"
        title="Admin Panel"
      >
        <Lock className="w-6 h-6" />
      </motion.button>

      {/* ============================================ */}
      {/* ADMIN PANEL MODAL / DRAWER                   */}
      {/* ============================================ */}
      <AnimatePresence>
        {adminOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAdminOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 overflow-y-auto"
            >
              {/* Panel Header */}
              <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a7f] text-white px-6 py-5 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Admin Panel</h2>
                    <p className="text-xs text-white/70">Məlumat redaktə sistemi</p>
                  </div>
                </div>
                <button
                  onClick={() => setAdminOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Save Message */}
              <AnimatePresence>
                {saveMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {saveMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="p-6 space-y-8">
                {/* ========================== */}
                {/* ARALIQ BALLARI REDAKTƏ ET   */}
                {/* ========================== */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                    <h3 className="font-bold text-gray-800 text-lg">Aralıq Balları</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                      {tempDersler.filter((d) => d.araliq !== null).length} aktiv
                    </span>
                  </div>

                  <div className="space-y-3">
                    {tempDersler.map((ders, index) => (
                      <motion.div
                        key={ders.kodu}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
                      >
                        <div className="w-20 shrink-0">
                          <span className="text-xs font-bold text-[#1e3a5f] bg-[#1e3a5f]/10 px-2 py-1 rounded">
                            {ders.kodu}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 truncate">{ders.adi}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            value={ders.araliq ?? ""}
                            onChange={(e) => handleAraliqChange(index, e.target.value)}
                            placeholder="—"
                            className="w-20 px-3 py-2 text-center font-bold text-[#1e3a5f] bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                          />
                          <span className="text-xs text-gray-400 w-8">/ 30</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* ========================== */}
                {/* FƏN ADLARINI REDAKTƏ ET     */}
                {/* ========================== */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
                    <h3 className="font-bold text-gray-800 text-lg">Fən Adları</h3>
                  </div>

                  <div className="space-y-3">
                    {tempDersler.map((ders, index) => (
                      <motion.div
                        key={`name-${ders.kodu}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.3 }}
                        className="bg-gray-50 p-3 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                            {ders.kodu}
                          </span>
                          <span className="text-xs text-gray-400">Qrup {ders.qrup}</span>
                        </div>
                        <input
                          type="text"
                          value={ders.adi}
                          onChange={(e) => handleAdiChange(index, e.target.value)}
                          className="w-full px-3 py-2 text-sm font-medium text-gray-800 bg-white border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* ========================== */}
                {/* ƏMƏLİYYAT DÜYMƏLƏRİ        */}
                {/* ========================== */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <button
                    onClick={handleApply}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-bold hover:from-green-500 hover:to-green-600 transition-all active:scale-[0.98] shadow-lg shadow-green-900/20"
                  >
                    <Save className="w-5 h-5" />
                    Tətbiq Et və Bağla
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#1e3a5f] text-white py-2.5 rounded-xl font-bold hover:bg-[#2a4a7f] transition-all active:scale-[0.98]"
                    >
                      <Save className="w-4 h-4" />
                      Yadda Saxla
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold hover:bg-gray-300 transition-all active:scale-[0.98]"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>

                  <button
                    onClick={() => setAdminOpen(false)}
                    className="w-full py-2 text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors"
                  >
                    Ləğv et
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================ */
/* SIDEBAR ICON KOMPONENTİ                      */
/* ============================================ */
function SidebarIcon({
  icon: Icon,
  label,
  active,
  color,
}: {
  icon: any;
  label: string;
  active?: boolean;
  color?: string;
}) {
  return (
    <div
      className={`p-4 rounded-2xl cursor-pointer transition-all relative group ${
        active
          ? "bg-white/15 text-white shadow-lg"
          : "text-gray-300 hover:text-white hover:bg-white/10"
      } ${color || ""}`}
    >
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
      <span className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-[11px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-xl whitespace-nowrap z-50 pointer-events-none">
        {label}
      </span>
      {active && (
        <motion.div
          layoutId="sidebar-indicator"
          className="absolute -right-1 top-1/4 h-1/2 w-1.5 bg-white rounded-l-full shadow-[0_0_10px_white]"
        />
      )}
    </div>
  );
}
'''

with open('/mnt/agents/output/page.tsx', 'w', encoding='utf-8') as f:
    f.write(page_tsx)

print("✅ page.tsx faylı yaradıldı!")
print(f"📏 Fayl uzunluğu: {len(page_tsx):,} simvol")
print(f"📄 Təxmini sətir sayı: {page_tsx.count(chr(10)):,}")
