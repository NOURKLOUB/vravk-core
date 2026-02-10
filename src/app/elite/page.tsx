"use client";
import React, { useState } from 'react';
import { Crown, ShieldCheck, Zap, Mail, ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';

export default function ElitePage() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setJoined(true);
      // هنا سنربطها بـ Database أو Email Service لاحقاً
      console.log("Joined Elite List:", email);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* تأثيرات خلفية استخباراتية */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] -z-10"></div>
      
      <Link href="/" className="absolute top-8 left-8 text-slate-500 hover:text-white flex items-center gap-2 text-sm transition-all">
        <ArrowRight size={16} className="rotate-180" /> العودة للمحرك
      </Link>

      {!joined ? (
        <div className="max-w-md w-full animate-in fade-in zoom-in duration-700">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
            <Crown size={32} />
          </div>
          <h1 className="text-4xl font-black mb-3 tracking-tight text-center italic">ELITE ACCESS</h1>
          <p className="text-slate-400 text-center mb-10 font-light leading-relaxed">
            كن جزءاً من الـ <span className="text-blue-500 font-bold">1%</span> الذين يملكون أدوات الاستخبارات الرقمية قبل الجميع. انضم لقائمة الانتظار الحصرية الآن.
          </p>

          <form onSubmit={handleJoin} className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <Mail size={20} />
              </div>
              <input 
                type="email" 
                required
                placeholder="أدخل بريدك الإلكتروني الاحترافي..."
                className="w-full bg-slate-900 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-all shadow-lg shadow-blue-900/20 active:scale-95">
              حجز مقعد في النخبة
            </button>
          </form>

          <div className="mt-8 flex justify-center gap-6 text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
            <span className="flex items-center gap-1"><Lock size={10}/> تشفير عسكري</span>
            <span>•</span>
            <span className="text-blue-900 font-black">500 مقعد متاح فقط</span>
          </div>
        </div>
      ) : (
        <div className="text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-black text-white mb-2">تم تسجيلك بنجاح!</h2>
          <p className="text-slate-400 max-w-sm mx-auto">
            لقد حجزت مقعدك في النخبة. سنرسل لك دعوة الدفع المسبق عبر البريد الإلكتروني قريباً.
          </p>
          <Link href="/" className="mt-8 inline-block text-blue-500 font-bold text-sm underline underline-offset-4">العودة للرادار</Link>
        </div>
      )}
    </main>
  );
}
