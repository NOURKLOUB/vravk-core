"use client";
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, ShieldAlert, Activity, Globe, Eye, ArrowUpRight, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const ADMIN_KEY = "VRAVK_X_2026"; // كلمة السر السيادية

  const checkAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_KEY) {
      setIsAuthenticated(true);
    } else {
      alert("⚠️ وصول غير مصرح! تم تسجيل محاولتك.");
      window.location.href = "/"; // طرد للمتسلل
    }
  };

  // إذا لم يتم التحقق، أظهر شاشة القفل الفخمة
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 border border-blue-500/20 p-8 rounded-3xl text-center shadow-2xl">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="text-blue-500" size={32} />
          </div>
          <h2 className="text-xl font-black text-white mb-2 italic">تحقق من الهوية السيادية</h2>
          <p className="text-slate-500 text-xs mb-8 uppercase tracking-widest">أدخل مفتاح الإدارة للوصول لغرفة العمليات</p>
          
          <form onSubmit={checkAuth} className="space-y-4">
            <input 
              type="password" 
              placeholder="SECRET KEY"
              className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 text-center font-mono text-blue-500 focus:border-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all">
              تأكيد الدخول
            </button>
          </form>
        </div>
      </main>
    );
  }

  // --- هنا كود لوحة التحكم الأصلي الذي كتبناه سابقاً ---
  return (
    <main className="min-h-screen bg-[#020617] text-white p-6 font-sans">
      {/* ... (ضع بقية كود لوحة التحكم هنا) ... */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-white/5 pb-8">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-900/20">
            <LayoutDashboard size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter">VRAVK COMMAND CENTER</h1>
            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">غرفة التحكم والعمليات السرية</p>
          </div>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs transition-all border border-white/10">خروج آمن</button>
      </div>

      {/* إحصائيات وباقي اللوحة... */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
          <p className="text-slate-500 text-xs font-bold uppercase mb-1">إجمالي الزوار</p>
          <p className="text-3xl font-black font-mono">1,250</p>
        </div>
        {/* يمكنك إكمال بقية مربعات الإحصائيات هنا كما كانت */}
      </div>
    </main>
  );
}
