"use client";
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, ShieldAlert, Activity, Globe, Eye, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  // بيانات تجريبية لمحاكاة الواقع (سنربطها بـ Database في المرحلة القادمة)
  const [serverStatus, setServerStatus] = useState("نشط");
  
  const liveScans = [
    { id: 1, url: "bank-update-secure.net", country: "الأردن", status: "محظور", time: "الآن" },
    { id: 2, url: "facebook-login-verify.xyz", country: "السعودية", status: "محظور", time: "قبل دقيقة" },
    { id: 3, url: "google.com", country: "مصر", status: "آمن", time: "قبل 3 دقائق" },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white p-6 font-sans">
      {/* Header اللوحة */}
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
        <div className="flex gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                <span className="text-xs font-bold text-emerald-500">حالة السيرفر: {serverStatus}</span>
            </div>
            <Link href="/" className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs transition-all border border-white/10">خروج آمن</Link>
        </div>
      </div>

      {/* الإحصائيات الكبرى */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: "إجمالي الزوار", value: "1,250", icon: <Users className="text-blue-500"/>, trend: "+12%" },
          { label: "عمليات الفحص", value: "842", icon: <Activity className="text-purple-500"/>, trend: "+5%" },
          { label: "روابط محظورة", value: "156", icon: <ShieldAlert className="text-red-500"/>, trend: "+20%" },
          { label: "أمان النظام", value: "99.9%", icon: <Eye className="text-emerald-500"/>, trend: "مستقر" }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl hover:border-blue-500/20 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">{stat.icon}</div>
                <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-slate-400 font-bold">{stat.trend}</span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase mb-1">{stat.label}</p>
            <p className="text-3xl font-black font-mono">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* قائمة الفحص المباشر */}
      <div className="max-w-7xl mx-auto bg-slate-900/30 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="font-bold flex items-center gap-2"><Globe size={18} className="text-blue-500"/> مراقبة الفحص المباشر (Live Feed)</h2>
            <button className="text-[10px] text-blue-500 font-bold hover:underline">عرض السجل الكامل</button>
        </div>
        <table className="w-full text-right text-sm">
            <thead className="bg-white/5 text-slate-500 uppercase text-[10px] font-black tracking-widest">
                <tr>
                    <th className="p-4">الرابط المفحوص</th>
                    <th className="p-4">الدولة</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4">التوقيت</th>
                    <th className="p-4">إجراء</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {liveScans.map((scan) => (
                    <tr key={scan.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-mono text-blue-400">{scan.url}</td>
                        <td className="p-4">{scan.country}</td>
                        <td className="p-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold ${scan.status === 'محظور' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                {scan.status}
                            </span>
                        </td>
                        <td className="p-4 text-slate-500">{scan.time}</td>
                        <td className="p-4"><ArrowUpRight size={16} className="text-slate-700 cursor-pointer hover:text-white" /></td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </main>
  );
}
