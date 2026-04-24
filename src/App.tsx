/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, KeyboardEvent } from "react";
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
  Eye,
  EyeOff,
  Shield,
  UserCog,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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

const ADMIN_PASSWORD = "Nihad123v";

export default function App() {
  const [selectedYear, setSelectedYear] = useState<"2025" | "2026">("2026");
  const [selectedSemester, setSelectedSemester] = useState<"payiz" | "yaz" | "mini-yaz" | "yay">("yaz");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dersler, setDersler] = useState<Ders[]>(INITIAL_DERSLER);
  const [filteredDersler, setFilteredDersler] = useState<Ders[]>(INITIAL_DERSLER);
  const [adminOpen, setAdminOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [tempDersler, setTempDersler] = useState<Ders[]>(INITIAL_DERSLER);
  const [saveMessage, setSaveMessage] = useState("");
  const [sorgulaActive, setSorgulaActive] = useState(false);
  const [activeTab, setActiveTab] = useState<"araliq" | "fen" | "notlar">("araliq");
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const semesterOptions = [
    { id: "payiz" as const, label: "Payız" },
    { id: "yaz" as const, label: "Yaz" },
    { id: "mini-yaz" as const, label: "Mini Yaz" },
    { id: "yay" as const, label: "Yay" },
  ];

  // Sorğula funksiyası
  const handleSorgula = () => {
    setSorgulaActive(true);
    setFilteredDersler([...dersler]);
    setTimeout(() => setSorgulaActive(false), 600);
  };

  // Login aç
  const openLogin = () => {
    setLoginOpen(true);
    setLoginError("");
    setPassword("");
    setTimeout(() => passwordInputRef.current?.focus(), 100);
  };

  // Login yoxla
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginOpen(false);
      setLoginError("");
      setTempDersler(JSON.parse(JSON.stringify(dersler)));
      setAdminOpen(true);
      setSaveMessage("");
    } else {
      setLoginError("❌ Yanlış parol! Yenidən cəhd edin.");
      setPassword("");
      passwordInputRef.current?.focus();
    }
  };

  // Enter ilə login
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  // Çıxış
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminOpen(false);
    setPassword("");
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

  // Notları dəyiş (5-1)
  const handleNotChange = (dersIndex: number, notIndex: number, value: string) => {
    const numValue = value === "" ? null : parseFloat(value);
    const updated = [...tempDersler];
    const newNotlar = [...updated[dersIndex].notlar];
    newNotlar[notIndex] = numValue;
    updated[dersIndex] = { ...updated[dersIndex], notlar: newNotlar };
    setTempDersler(updated);
  };

  // Final balını dəyiş
  const handleFinalChange = (index: number, value: string) => {
    const numValue = value === "" ? null : parseFloat(value);
    const updated = [...tempDersler];
    updated[index] = { ...updated[index], final: numValue };
    setTempDersler(updated);
  };

  // Orta balını hesabla
  const calculateOrta = (ders: Ders): number | null => {
    const validNotlar = ders.notlar.filter((n): n is number => n !== null);
    const araliqVal = ders.araliq;
    const finalVal = ders.final;
    
    if (validNotlar.length === 0 && araliqVal === null && finalVal === null) return null;
    
    let total = 0;
    let count = 0;
    
    validNotlar.forEach(n => { total += n; count++; });
    if (araliqVal !== null) { total += araliqVal; count++; }
    if (finalVal !== null) { total += finalVal; count++; }
    
    return count > 0 ? parseFloat((total / count).toFixed(1)) : null;
  };

  // Yadda saxla
  const handleSave = () => {
    const withOrta = tempDersler.map(d => ({
      ...d,
      orta: calculateOrta(d)
    }));
    setDersler(JSON.parse(JSON.stringify(withOrta)));
    setFilteredDersler(JSON.parse(JSON.stringify(withOrta)));
    setSaveMessage("✓ Dəyişikliklər yadda saxlanıldı!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  // Reset
  const handleReset = () => {
    setTempDersler(JSON.parse(JSON.stringify(INITIAL_DERSLER)));
    setSaveMessage("✓ İlkin dəyərlərə qaytarıldı");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  // Tətbiq et
  const handleApply = () => {
    handleSave();
    setAdminOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans relative overflow-hidden text-gray-900 border-gray-200">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-20 md:w-24" : "w-0"
        } bg-[#003366] flex flex-col items-center py-8 transition-all duration-300 relative shrink-0 z-20`}
      >
        {sidebarOpen && (
          <>
            <div className="mb-8 select-none">
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
                id="close-sidebar-btn"
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
            id="open-sidebar-btn"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col h-screen relative">
        {/* Top bar */}
        <div className="bg-white px-8 py-3 border-b flex justify-between items-center shrink-0">
          <div className="bg-[#8b1a8b] text-white px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
            TƏDBİR TƏ
          </div>
          <div className="flex gap-4 items-center">
             {isAuthenticated && (
              <span className="text-red-600 text-[10px] font-bold animate-pulse flex items-center gap-1">
                <Shield size={10} /> ADMIN_MODE-ON
              </span>
            )}
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full bg-[#003366] shadow-sm"></div>
              <div className="w-5 h-5 rounded-full bg-red-600 shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 flex items-center justify-center overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-5xl border border-gray-200"
            id="main-card-container"
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
                id="search-btn"
              >
                <Search className={`w-4 h-4 ${sorgulaActive ? "animate-spin" : ""}`} />
                <span className="text-sm">{sorgulaActive ? "Yüklənir..." : "Sorğula"}</span>
              </button>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse" id="grades-table">
                <thead>
                  <tr className="bg-gray-100/80 text-gray-700 border-b border-gray-200">
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
                      className={index % 2 === 0 ? "bg-white hover:bg-blue-50/20 transition-colors" : "bg-gray-50/50 hover:bg-blue-50/20 transition-colors"}
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
                        >
                           {ders.notlar[i] !== null ? (
                            <span className="font-bold text-[#1e3a5f]">{ders.notlar[i]}</span>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
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
                        {ders.final !== null ? (
                          <span className="font-bold text-[#1e3a5f]">{ders.final}</span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-4 py-4 border border-gray-200 text-center text-gray-400 font-bold">
                        {ders.orta !== null ? (
                          <span className="font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded shadow-sm">
                            {ders.orta}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="bg-[#1e3a5f] text-gray-400 text-[10px] py-1.5 px-6 flex justify-between uppercase tracking-wider font-mono shrink-0 relative">
          <span>Khazar University OBIS | System Online</span>
          <span>Sessiya Aktivdir</span>
          {/* Hidden Admin Toggle - tiny dot */}
          <div className="absolute right-0 bottom-0">
             <button
              onClick={openLogin}
              className="w-8 h-8 bg-transparent hover:bg-white/5 transition-colors flex items-center justify-center group"
              title="Sistem Ayarları"
              id="hidden-admin-toggle"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400/20 group-hover:bg-red-500/50 transition-colors"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Panel Floating Button (Visible only if authenticated) */}
       <AnimatePresence>
        {isAuthenticated && (
          <motion.button
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -45 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setAdminOpen(true)}
            className="fixed bottom-12 right-6 w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white shadow-2xl shadow-red-900/40 z-40 hover:from-red-500 hover:to-red-700 transition-all border-2 border-white/20"
            title="Admin Paneli Aç"
            id="admin-panel-btn"
          >
            <Lock className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {loginOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLoginOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              id="login-backdrop"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative z-50 border border-gray-200"
              id="login-modal"
            >
              <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a7f] px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-lg tracking-tight">Admin Girişi</h2>
                    <p className="text-xs text-white/70">Məlumat redaktə sistemi</p>
                  </div>
                </div>
                <button
                  onClick={() => setLoginOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                  title="Bağla"
                  id="close-login-btn"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <AnimatePresence>
                  {loginError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2 overflow-hidden"
                      id="login-error"
                    >
                      <Lock className="w-4 h-4 shrink-0" />
                      {loginError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-gray-400" />
                      Sistem Parolu
                    </label>
                    <div className="relative">
                      <input
                        ref={passwordInputRef}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setLoginError("");
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-300"
                        id="password-input"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                        type="button"
                        id="toggle-password-visibility"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#1e3a5f] to-[#2a4a7f] text-white py-3.5 rounded-xl font-bold hover:from-[#2a4a7f] hover:to-[#3a5a8f] transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20"
                    id="submit-login-btn"
                  >
                    <Unlock className="w-5 h-5" />
                    Sistemi Aktivləşdir
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest"> Khazar University OBIS | Secure Access </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Panel Drawer */}
      <AnimatePresence>
        {adminOpen && isAuthenticated && (
          <div className="fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAdminOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              id="admin-backdrop"
            />
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl flex flex-col border-l border-gray-200"
              id="admin-panel-drawer"
            >
              {/* Drawer Header */}
              <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a7f] text-white px-6 py-5 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <UserCog className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg tracking-tight">İdarəetmə Paneli</h2>
                    <p className="text-xs text-white/70">Xüsusi Müəllim Girişi</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-[10px] uppercase font-black rounded-lg transition-all shadow-lg shadow-red-900/20"
                    id="logout-btn"
                  >
                    Çıxış
                  </button>
                  <button
                    onClick={() => setAdminOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                    title="Bağla"
                    id="close-admin-btn"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Progress Toast */}
              <AnimatePresence>
                {saveMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-700 text-sm font-medium shadow-sm"
                    id="save-success-msg"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    {saveMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tabs Container */}
              <div className="flex bg-gray-100/50 p-2 border-b border-gray-200 gap-2 overflow-x-auto no-scrollbar" id="admin-tabs">
                {[
                  { id: "araliq" as const, label: "Aralıq", icon: Edit3 },
                  { id: "fen" as const, label: "Fənlər", icon: GraduationCap },
                  { id: "notlar" as const, label: "Qiymətlər", icon: LayoutGrid },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      activeTab === tab.id
                        ? "bg-white text-[#1e3a5f] shadow-md scale-[1.02]"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                {/* Tab: Aralıq */}
                {activeTab === "araliq" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 mb-2 p-1">
                      <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                      <h3 className="font-bold text-gray-800 text-lg">Aralıq İmtahan Balları</h3>
                    </div>

                    {tempDersler.map((ders, index) => (
                      <div
                        key={ders.kodu}
                        className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                      >
                        <div className="w-20 shrink-0">
                          <span className="text-[10px] font-black tracking-tighter text-[#1e3a5f] bg-[#1e3a5f]/10 px-2 py-1 rounded inline-block">
                            {ders.kodu}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-700 truncate">{ders.adi}</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="text-[10px] text-gray-400 font-black uppercase pointer-events-none">Bal:</div>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            value={ders.araliq ?? ""}
                            onChange={(e) => handleAraliqChange(index, e.target.value)}
                            placeholder="—"
                            className="w-20 px-3 py-2.5 text-center font-bold text-[#1e3a5f] bg-gray-50 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Tab: Fənlər */}
                {activeTab === "fen" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 mb-2 p-1">
                      <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
                      <h3 className="font-bold text-gray-800 text-lg">Fənn Məlumatları</h3>
                    </div>

                    {tempDersler.map((ders, index) => (
                      <div
                        key={`name-${ders.kodu}`}
                        className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-widest">
                            {ders.kodu}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-100 px-2 py-1 rounded">Qrup {ders.qrup}</span>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider ml-1">Fənnin tam adı</label>
                           <input
                            type="text"
                            value={ders.adi}
                            onChange={(e) => handleAdiChange(index, e.target.value)}
                            className="w-full px-4 py-3 text-sm font-bold text-gray-800 bg-gray-50 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Tab: Qiymətlər */}
                {activeTab === "notlar" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 mb-2 p-1">
                      <div className="w-1 h-6 bg-green-600 rounded-full"></div>
                      <h3 className="font-bold text-gray-800 text-lg">Gündəlik Ballar & Final</h3>
                    </div>

                    {tempDersler.map((ders, dersIndex) => (
                      <div
                        key={`not-${ders.kodu}`}
                        className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-3 mb-5 p-2 bg-gray-50 rounded-xl border border-gray-100">
                          <span className="text-xs font-black text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-200">
                            {ders.kodu}
                          </span>
                          <span className="text-xs font-bold text-gray-500 truncate italic">{ders.adi}</span>
                        </div>

                        {/* Gündəlik Ballar (5-1) */}
                        <div className="space-y-3 mb-6">
                           <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest block ml-1">Gündəlik ballar (5-dən 1-dək)</label>
                           <div className="grid grid-cols-5 gap-3">
                            {[5, 4, 3, 2, 1].map((num, notIndex) => (
                              <div key={num} className="space-y-1.5">
                                <div className="text-center font-black text-[9px] text-[#1e3a5f]/50 py-1 bg-gray-100/50 rounded-lg border border-gray-100">{num}</div>
                                <input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max="100"
                                  value={ders.notlar[notIndex] ?? ""}
                                  onChange={(e) =>
                                    handleNotChange(dersIndex, notIndex, e.target.value)
                                  }
                                  placeholder="—"
                                  className="w-full px-2 py-2.5 text-center text-sm font-bold text-[#1e3a5f] bg-gray-50 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all shadow-inner"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Final İmtahanı */}
                        <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><GraduationCap size={16}/></div>
                             <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest">Final İmtahan Balı</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="100"
                              value={ders.final ?? ""}
                              onChange={(e) => handleFinalChange(dersIndex, e.target.value)}
                              placeholder="—"
                              className="w-24 px-4 py-3 text-center font-black text-[#1e3a5f] bg-gray-50 border-2 border-gray-100 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-sm"
                            />
                            <span className="text-[10px] text-gray-400 font-bold uppercase w-10">/ 100</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 bg-white border-t border-gray-200 sticky bottom-0 z-10 space-y-3">
                <button
                  onClick={handleApply}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:from-green-500 hover:to-green-600 transition-all active:scale-[0.98] shadow-xl shadow-green-900/10 border-b-4 border-green-800"
                  id="apply-changes-btn"
                >
                  <Save className="w-4 h-4" />
                  Məlumatları Təsdiqlə
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#1e3a5f] text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider hover:bg-[#2a4a7f] transition-all active:scale-[0.98] shadow-lg shadow-blue-900/10"
                    id="save-changes-btn"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Yadda Saxla
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-600 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-all active:scale-[0.98] border border-gray-200"
                    id="reset-changes-btn"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Sıfırla
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Sidebar Icon Component */
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
      className={`p-4 rounded-2xl cursor-pointer transition-all relative group flex items-center justify-center ${
        active
          ? "bg-white/15 text-white shadow-inner scale-110"
          : "text-gray-300 hover:text-white hover:bg-white/10"
      } ${color || ""}`}
    >
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
      <span className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-2xl whitespace-nowrap z-50 pointer-events-none translate-x-[-10px] group-hover:translate-x-0">
        {label}
      </span>
      {active && (
        <motion.div
          layoutId="sidebar-indicator"
          className="absolute -right-1 top-1/4 h-1/2 w-1.5 bg-white rounded-l-full shadow-[0_0_15px_white] z-10"
        />
      )}
    </div>
  );
}
