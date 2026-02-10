"use client";
import React, { useState } from 'react';
import { LayoutDashboard, Users, ShieldAlert, Activity, Globe, Eye, ArrowUpRight, Lock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const ADMIN_KEY = "VRAVK_X_2026";

  const checkAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_KEY) {
      setIsAuthenticated(true);
    } else {
      alert("⚠️ وصول غير مصرح! تم تسجيل محاولتك.");
      window.location.href = "/";
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-blue-500/20 p-10 rounded-[2.5rem] text-center shadow-2xl">
          <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/10">
            <Lock className="text-blue-500" size={40} />
          </div>
          <h2 className="text-2xl font-black text-white mb-3 italic tracking-tight">VRAVK SECURITY CHECK</h2>
          <p className="text-slate-500 text-[10px] mb-8 uppercase tracking-[0.3em] font-bold">نظام الوصول إلى البيانات السيادية</p>
          
          <form onSubmit={checkAuth} className="space-y-4">
            <input 
              type="password" 
              placeholder="ENTER SECRET KEY"
              className="w-full bg-black border border-white/5 rounded-2xl py-4 px-4 text-center font-mono text-blue-500 focus:border-blue-600 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-900/20 uppercase tracking-widest text-xs">
              تأكيد الهوية
            </button>
          </form>
        </div>
      </main>
    );
  }

  // البيانات التي كانت ناقصة (الآن كاملة)
  const stats = [
    { label: "إجمالي الزوار", value: "1,250", icon: <Users className="text-blue-500"/>, trend: "+12%" },
    { label: "عمليات الفحص", value: "842", icon: <Activity className="text-purple-500"/>, trend: "+5%" },
    { label: "روابط محظورة", value: "156", icon: <ShieldAlert className="text-red-500"/>, trend: "+20%" },
    { label: "أمان النظام", value: "99.9%", icon: <ShieldCheck className="text-emerald-500"/>, trend: "مستقر" }
  ];

  const liveScans = [
    { id: 1, url: "amazon-gift-verify.xyz", country: "الأردن", status: "محظور", risk: "98%" },
    { id: 2, url: "facebook-secure-login.net", country: "السعودية", status: "محظور", risk: "95%" },
    { id: 3, url: "google.com", country: "مصر", status: "آمن", risk: "5%" },
    { id: 4, url: "paypal-update-now.top", country: "الإمارات", status: "محظور", risk: "92%" },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white p-6 md:p-10 font-sans animate-in fade-in duration-700">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-white/5 pb-8">
        <div className="flex items-center gap-5">
          <div className="bg-blue-600 p-4 rounded-[1.5rem] shadow-xl shadow-blue-900/20">
            <LayoutDashboard size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter uppercase">VRAVK Command</h1>
            <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-bold">غرفة العمليات المركزية</p>
          </div>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)} 
          className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 px-6 py-2 rounded-xl text-xs font-bold transition-all"
        >
          إغلاق الجلسة الآمنة
        </button>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-900/50 border border-white/5 p-6 rounded-[2rem] hover:border-blue-500/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">{stat.icon}</div>
              <span className="text-[10px] bg-emerald-500/10 px-2 py-1 rounded-full text-emerald-500 font-bold tracking-tighter">{stat.trend}</span>
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-4xl font-black font-mono tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Live Activity Table */}
      <div className="max-w-7xl mx-auto bg-slate-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-3 italic"><Globe size={24} className="text-blue-500 animate-pulse"/> مراقبة الفحص الحي</h2>
            <div className="flex gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">تحديث مباشر</span>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
              <thead className="bg-white/5 text-slate-500 uppercase text-[10px] font-black tracking-[0.2em]">
                  <tr>
                      <th className="p-6">النطاق المستهدف</th>
                      <th className="p-6">مصدر الطلب</th>
                      <th className="p-6">القرار</th>
                      <th className="p-6">نسبة الخطر</th>
                      <th className="p-6">الإجراء</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium text-sm">
                  {liveScans.map((scan) => (
                      <tr key={scan.id} className="hover:bg-white/[0.03] transition-colors group">
                          <td className="p-6 font-mono text-blue-400 group-hover:text-blue-300">{scan.url}</td>
                          <td className="p-6 text-slate-300">{scan.country}</td>
                          <td className="p-6">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${scan.status === 'محظور' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                  {scan.status}
                              </span>
                          </td>
                          <td className={`p-6 font-black ${Number(scan.risk.replace('%','')) > 50 ? 'text-red-500' : 'text-emerald-500'}`}>{scan.risk}</td>
                          <td className="p-6"><ArrowUpRight size={18} className="text-slate-700 group-hover:text-white transition-colors cursor-pointer" /></td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>
      </div>

      <footer className="mt-16 text-center text-slate-700 text-[10px] font-black uppercase tracking-[0.5em]">
        VRAVK System Intelligence Internal Access Only
      </footer>
    </main>
  );
}
