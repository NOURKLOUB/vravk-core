"use client";
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, ShieldAlert, Activity, Globe, ShieldCheck, Lock, ArrowUpRight } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [realStats, setRealStats] = useState({ total: 0, risky: 0 });
  const [history, setHistory] = useState<any[]>([]);
  
  const ADMIN_KEY = "VRAVK_X_2026";

  const fetchLiveDashboard = async () => {
    try {
      const { count: totalCount } = await supabase.from('scans').select('*', { count: 'exact', head: true });
      const { count: riskyCount } = await supabase.from('scans').select('*', { count: 'exact', head: true }).gt('risk_score', 70);
      const { data: recentScans } = await supabase.from('scans').select('*').order('created_at', { ascending: false }).limit(5);

      setRealStats({ total: totalCount || 0, risky: riskyCount || 0 });
      setHistory(recentScans || []);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLiveDashboard();
    }
  }, [isAuthenticated]);

  const checkAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_KEY) {
      setIsAuthenticated(true);
    } else {
      alert("⚠️ وصول غير مصرح!");
      window.location.href = "/";
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 border border-blue-500/20 p-10 rounded-[2.5rem] text-center shadow-2xl">
          <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/10">
            <Lock className="text-blue-500" size={40} />
          </div>
          <h2 className="text-2xl font-black text-white mb-3 italic tracking-tight uppercase">VRAVK Security</h2>
          <form onSubmit={checkAuth} className="space-y-4">
            <input 
              type="password" 
              placeholder="ENTER SECRET KEY"
              className="w-full bg-black border border-white/5 rounded-2xl py-4 px-4 text-center font-mono text-blue-500 focus:border-blue-600 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs">
              تأكيد الهوية
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-12 border-b border-white/5 pb-8">
        <div className="flex items-center gap-5">
          <div className="bg-blue-600 p-4 rounded-[1.5rem]">
            <LayoutDashboard size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">VRAVK Command</h1>
            <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-bold">غرفة العمليات الحية</p>
          </div>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-xs bg-red-500/10 text-red-500 px-4 py-2 rounded-xl border border-red-500/20">خروج آمن</button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* إجمالي الزوار الحقيقي */}
        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[2rem]">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">إجمالي الفحوصات</p>
          <p className="text-4xl font-black font-mono">{realStats.total}</p>
        </div>
        
        {/* التهديدات الحقيقية */}
        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[2rem]">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">روابط محظورة</p>
          <p className="text-4xl font-black font-mono text-red-500">{realStats.risky}</p>
        </div>

        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[2rem]">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">نشاط السيرفر</p>
          <p className="text-4xl font-black font-mono text-emerald-500">100%</p>
        </div>

        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-[2rem]">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">أمان النظام</p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-blue-500" />
            <p className="text-2xl font-black uppercase">Active</p>
          </div>
        </div>
      </div>

      {/* جدول الفحص المباشر الحقيقي */}
      <div className="max-w-7xl mx-auto bg-slate-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-xl font-bold italic flex items-center gap-3"><Globe className="text-blue-500 animate-pulse"/> سجل الفحص الحقيقي</h2>
            <button onClick={fetchLiveDashboard} className="text-[10px] bg-white/5 px-3 py-1 rounded-full hover:bg-white/10 transition-all">تحديث البيانات</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
              <thead className="bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <tr>
                      <th className="p-6">النطاق</th>
                      <th className="p-6">الخطر</th>
                      <th className="p-6">الحالة</th>
                      <th className="p-6">التوقيت</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-sm">
                  {history.map((scan: any) => (
                      <tr key={scan.id} className="hover:bg-white/[0.03] transition-colors">
                          <td className="p-6 font-mono text-blue-400">{scan.domain}</td>
                          <td className={`p-6 font-black ${scan.risk_score > 70 ? 'text-red-500' : 'text-emerald-500'}`}>{scan.risk_score}%</td>
                          <td className="p-6 text-xs uppercase">{scan.risk_score > 70 ? 'محظور' : 'آمن'}</td>
                          <td className="p-6 text-slate-500 text-xs">{new Date(scan.created_at).toLocaleTimeString('ar-JO')}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
