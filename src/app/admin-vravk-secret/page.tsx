"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, Users, ShieldAlert, Activity, Globe, ShieldCheck, Lock, ArrowUpRight } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [realStats, setRealStats] = useState({ total: 0, risky: 0 });
  const [history, setHistory] = useState<any[]>([]);
  
  const ADMIN_KEY = "VRAVK_X_2026";

    // 1. الدالة تبقى كما هي (useCallback)
  const fetchLiveDashboard = useCallback(async () => {
    try {
      const { count: totalCount } = await supabase.from('scans').select('*', { count: 'exact', head: true });
      const { count: riskyCount } = await supabase.from('scans').select('*', { count: 'exact', head: true }).gt('risk_score', 70);
      const { data: recentScans } = await supabase.from('scans').select('*').order('created_at', { ascending: false }).limit(5);

      setRealStats({ total: totalCount || 0, risky: riskyCount || 0 });
      setHistory(recentScans || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  // 2. الحل الذهبي: استخدام setTimeout لكسر "الحلقة اللانهائية"
  useEffect(() => {
    if (isAuthenticated) {
      // ننتظر 100 ملي ثانية لنتأكد أن الصفحة استقرت ثم نطلب البيانات
      const timer = setTimeout(() => {
        fetchLiveDashboard();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, fetchLiveDashboard]);

  const checkAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_KEY) {
      setIsAuthenticated(true);
    } else {
      alert("⚠️ وصول غير مصرح!");
      window.location.href = "/";
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  // شاشة القفل الفخمة
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-blue-500/20 p-10 rounded-[2.5rem] text-center shadow-2xl animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/10">
            <Lock className="text-blue-500" size={40} />
          </div>
          <h2 className="text-2xl font-black text-white mb-3 italic tracking-tight uppercase underline decoration-blue-600">VRAVK Security</h2>
          <p className="text-slate-500 text-[10px] mb-8 uppercase tracking-[0.3em] font-bold">بوابة الوصول للبيانات السيادية</p>
          <form onSubmit={checkAuth} className="space-y-4">
            <input 
              type="password" 
              placeholder="ENTER SECRET KEY"
              className="w-full bg-black border border-white/5 rounded-2xl py-4 px-4 text-center font-mono text-blue-500 focus:border-blue-600 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs shadow-lg shadow-blue-900/20">
              تأكيد الهوية
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white p-6 md:p-10 font-sans animate-in fade-in duration-700">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-12 border-b border-white/5 pb-8">
        <div className="flex items-center gap-5">
          <div className="bg-blue-600 p-4 rounded-[1.5rem] shadow-xl shadow-blue-900/20">
            <LayoutDashboard size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">VRAVK Command</h1>
            <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-bold">إحصائيات فورية من القاعدة</p>
          </div>
        </div>
        <button onClick={handleLogout} className="text-xs bg-red-500/10 text-red-500 px-4 py-2 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all font-bold">إغلاق الجلسة</button>
      </div>

      {/* Stats Grid - بيانات حقيقية */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/20 transition-all">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">إجمالي الفحوصات (Live)</p>
          <p className="text-5xl font-black font-mono text-blue-500">{realStats.total}</p>
        </div>
        
        <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[2rem] hover:border-red-500/20 transition-all">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">روابط محظورة (Real-time)</p>
          <p className="text-5xl font-black font-mono text-red-600">{realStats.risky}</p>
        </div>

        <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[2rem]">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">نشاط السيرفر</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <p className="text-3xl font-black font-mono text-emerald-500 italic">Online</p>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[2rem]">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">بروتوكول الأمان</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-blue-500" />
            <p className="text-2xl font-black uppercase tracking-tighter">V-Guard 1.0</p>
          </div>
        </div>
      </div>

      {/* الجدول الحقيقي */}
      <div className="max-w-7xl mx-auto bg-slate-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
            <h2 className="text-xl font-bold italic flex items-center gap-3"><Globe className="text-blue-500 animate-spin-slow"/> رادار السجل الحي</h2>
            <button onClick={fetchLiveDashboard} className="text-[10px] bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full font-bold transition-all shadow-lg shadow-blue-900/20">تحديث البيانات ⚡</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
              <thead className="bg-black/20 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <tr>
                      <th className="p-6">النطاق المكتشف</th>
                      <th className="p-6 text-center">الخطر</th>
                      <th className="p-6 text-center">الحالة</th>
                      <th className="p-6">التوقيت (محلي)</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                  {history.map((scan: any) => (
                      <tr key={scan.id} className="hover:bg-blue-600/[0.03] transition-colors group">
                          <td className="p-6 font-mono text-blue-400 group-hover:text-blue-300 transition-colors underline decoration-blue-900">{scan.domain}</td>
                          <td className={`p-6 text-center font-black text-lg ${scan.risk_score > 70 ? 'text-red-500' : 'text-emerald-500'}`}>{scan.risk_score}%</td>
                          <td className="p-6 text-center">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${scan.risk_score > 70 ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                                {scan.risk_score > 70 ? 'Block' : 'Safe'}
                            </span>
                          </td>
                          <td className="p-6 text-slate-500 text-xs font-mono">{new Date(scan.created_at).toLocaleTimeString('ar-JO')}</td>
                      </tr>
                  ))}
                  {history.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-20 text-center text-slate-600 italic font-light">لا توجد بيانات مسجلة في القاعدة حتى الآن... ابدأ بالفحص!</td>
                    </tr>
                  )}
              </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
