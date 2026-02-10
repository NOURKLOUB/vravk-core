"use client";
import React from 'react';
import { Lock, Crown, ChevronLeft, Mail } from 'lucide-react';
import Link from 'next/link';

export default function ElitePage() {
  return (
    <main className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 text-center">
      <Link href="/" className="absolute top-10 left-10 text-slate-500 hover:text-white transition-all flex items-center gap-2 text-sm">
        <ChevronLeft size={16} /> العودة للمحرك
      </Link>

      <div className="max-w-md w-full">
        <div className="bg-blue-600/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/20 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
          <Crown size={40} className="text-blue-500" />
        </div>
        
        <h1 className="text-4xl font-black text-white mb-4 tracking-tighter italic">VRAVK ELITE</h1>
        <p className="text-slate-400 mb-10 font-light leading-relaxed">
          انضم إلى مجتمع النخبة السيبرانية. احصل على تقارير استخباراتية حصرية، وفحص عميق للأكواد، وتنبيهات أمان فورية قبل الجميع.
        </p>

        <div className="bg-slate-900 border border-white/5 p-2 rounded-2xl flex items-center gap-2 mb-6">
          <div className="pl-4 text-slate-600"><Mail size={20} /></div>
          <input 
            type="email" 
            placeholder="أدخل إيميلك للانضمام لقائمة الانتظار..." 
            className="bg-transparent border-none focus:ring-0 w-full text-sm py-3"
          />
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-xs transition-all whitespace-nowrap">
            حجز مقعد
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 text-[10px] text-slate-600 uppercase font-bold tracking-[0.2em]">
          <span className="flex items-center gap-1"><Lock size={10}/> تشفير عسكري</span>
          <span>•</span>
          <span>دخول محدود</span>
        </div>
      </div>
    </main>
  );
}
