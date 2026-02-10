"use client";
import React from 'react';
import { ShieldAlert, Globe, Clock, ExternalLink, ChevronRight } from 'lucide-react';
import Link from 'next/link'
const ThreatDatabase = () => {
  // بيانات "دهاء" تظهر نشاط النظام (سيتم ربطها بالـ Database لاحقاً)
  const recentThreats = [
    { id: 1, domain: "amazon-gift-card.xyz", type: "انتحال صفة", risk: 98, time: "منذ 2 دقيقة" },
    { id: 2, domain: "login-verify-paypal.net", type: "سرقة بيانات", risk: 95, time: "منذ 10 دقائق" },
    { id: 3, domain: "crypto-bonus-2026.top", type: "احتيال مالي", risk: 89, time: "منذ 25 دقيقة" },
    { id: 4, domain: "netflix-update-account.co", type: "تصيد (Phishing)", risk: 92, time: "منذ ساعة" },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header الهيبة */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/5 pb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full text-red-500 text-xs font-bold mb-4">
              <ShieldAlert size={14} /> قاعدة البيانات السيادية نشطة
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              رادار <span className="text-red-500 text-glow">التهديدات</span> الحي
            </h1>
            <Link href="/" className="text-xs bg-slate-900/40 border border-white/5 hover:bg-slate-900/40 text-white px-4 py-2 mt-5 rounded-lg font-bold transition-all mb-4 inline-block">
  ← العودة للمحرك الرئيسي
</Link>

            <p className="text-slate-400 mt-4 max-w-xl font-light italic">
              يتم تحديث هذه القائمة لحظياً بناءً على تقارير خوارزمية VRAVK الاستباقية حول العالم.
            </p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
            <span className="text-xs text-slate-500 block mb-1 uppercase font-bold tracking-widest">إجمالي المحظورات اليوم</span>
            <span className="text-3xl font-mono text-white">4,892+</span>
          </div>
        </div>

        {/* قائمة التهديدات */}
        <div className="grid gap-4">
          {recentThreats.map((threat) => (
            <div key={threat.id} className="group bg-slate-900/40 border border-white/5 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between hover:border-red-500/30 transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.05)]">
              <div className="flex items-center gap-6 w-full">
                <div className="bg-red-500/10 p-3 rounded-xl text-red-500">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-mono font-bold text-white group-hover:text-red-400 transition-colors">{threat.domain}</h3>
                  <div className="flex gap-4 mt-1 text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><Clock size={14}/> {threat.time}</span>
                    <span className="text-red-800">|</span>
                    <span className="text-red-400/80 uppercase tracking-tighter">{threat.type}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                  <span className="text-[10px] text-slate-600 block uppercase font-black">Risk Score</span>
                  <span className="text-2xl font-black text-red-600 leading-none">{threat.risk}%</span>
                </div>
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
                  <ChevronRight size={20} className="text-slate-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* رسالة القوة في الأسفل */}
        <div className="mt-16 text-center border-t border-white/5 pt-12">
          <p className="text-slate-600 text-xs font-bold uppercase tracking-[0.4em]">
            VRAVK Intelligence Unit - Global Defense Network
          </p>
        </div>
      </div>
    </main>
  );
};

export default ThreatDatabase;

