"use client";
import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, Globe, Zap, Lock, Users, BarChart, Mail, Crown, ArrowRight, Search } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabase';
// 1. مكون العداد المستقر (Counter)
const Counter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count.toLocaleString()}</span>;
};

// 2. مكون النبض العالمي (Live Pulse)
const LivePulse = () => {
  const [activePulse, setActivePulse] = useState<string | null>(null);
  const pulses = [
    "🛡️ مستخدم من عمان قام بفحص رابط بنجاح",
    "⚠️ تم كشف تهديد ينتحل صفة أمازون في دبي",
    "🛡️ مستخدم من الرياض انضم إلى قائمة النخبة",
    "🛡️ نظام VRAVK كشف محاولة تصيد في لندن",
    "⚠️ تحذير: اكتشاف نطاق خبيث جديد .xyz",
    "🛡️ مستخدم من القاهرة قام بتأمين حسابه الآن"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPulse = pulses[Math.floor(Math.random() * pulses.length)];
      setActivePulse(randomPulse);
      setTimeout(() => setActivePulse(null), 4000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  if (!activePulse) return null;

  return (
    <div className="fixed bottom-10 right-10 z-50 animate-in slide-in-from-right-full duration-500">
      <div className="bg-slate-900/90 border border-blue-500/30 backdrop-blur-xl p-4 rounded-2xl shadow-2xl flex items-center gap-3">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
        <span className="text-xs font-bold text-slate-200 font-sans">{activePulse}</span>
      </div>
    </div>
  );
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

const handleScan = async () => {
  if (!url) return;
  setLoading(true);
  setResult(null);

  try {
    const response = await axios.post('/api/check', { url });
    const data = response.data;

    // 1. عرض النتيجة للمستخدم (سواء كانت خطأ أو نجاح)
    setResult(data);

    // 2. الدهاء الاستخباراتي: التخزين فقط إذا كان الرابط حقيقياً (Success)
    if (data.status === "success") {
      const { error } = await supabase.from('scans').insert([
        { 
          url: url, 
          domain: data.domain, 
          risk_score: data.riskScore, 
          message: data.message,
          country: "Jordan" 
        }
      ]);

      if (error) console.error("خطأ في التخزين:", error.message);
      else console.log("✅ تم تسجيل الفحص الحقيقي بنجاح");
    } else {
      console.log("ℹ️ تم إلغاء التخزين: المدخل ليس رابطاً صالحاً.");
    }

  } catch (error) {
    console.error("خطأ فني في الاتصال", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen w-full bg-[#020617] text-slate-200 overflow-x-hidden selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white italic">V</div>
            <span className="text-xl font-black tracking-tighter text-white">VRAVK <span className="text-blue-500">CORE</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <Link href="/threats" className="hover:text-blue-400 transition-colors">قاعدة التهديدات</Link>
            <Link href="/api-docs" className="hover:text-blue-400 transition-colors">المطورين API</Link>
            <a href="#" className="hover:text-blue-400 transition-colors">عن النظام</a>
          </div>
          <Link href="/elite" className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-bold transition-all">دخول النخبة</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-400 text-xs font-bold mb-6 animate-pulse">
            <Zap size={14} /> الإصدار الاستخباراتي 1.0 نشط الآن
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
            حماية <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 text-glow">2 مليار</span> إنسان من الاحتيال.
          </h1>
          
          {/* Search Box with Radar Effect */}
          <div className="relative max-w-3xl mx-auto mt-10 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden">
              {loading && (
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
                  <div className="w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] absolute animate-scan top-0 left-0"></div>
                </div>
              )}
              <input 
                type="text"
                placeholder="ألصق الرابط المشبوه هنا..."
                className="w-full bg-transparent border-none focus:ring-0 px-6 py-4 text-white md:text-xl"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              />
              <button 
                onClick={handleScan}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-black text-lg transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? "يتم الفحص..." : "كشف الحقيقة"}
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex justify-center gap-12 mt-12 text-slate-500 text-sm font-bold uppercase tracking-widest">
            <div className="flex flex-col items-center gap-1">
              <span className="text-white text-2xl font-mono"><Counter target={12450} />+</span>
              <span>روابط مفحوصة</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-red-500 text-2xl font-mono"><Counter target={3120} />+</span>
              <span>تهديد محظور</span>
            </div>
          </div>
        </div>

        {/* Results with Warning Viral Engine */}
        {result && (
          <div className={`max-w-3xl mx-auto mt-12 p-8 rounded-3xl border animate-in zoom-in duration-500 ${
            result.riskScore > 60 ? 'border-red-500/30 bg-red-500/5' : 'border-emerald-500/30 bg-emerald-500/5'
          }`}>
             <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-right flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {result.riskScore > 60 ? <ShieldAlert className="text-red-500"/> : <ShieldCheck className="text-emerald-500"/>}
                    <h2 className="text-xl font-bold">تقرير VRAVK الاستخباري</h2>
                  </div>
                  <p className="text-slate-400 text-sm font-mono mb-4">{result.domain}</p>
                  <p className="text-lg font-medium leading-relaxed italic">"{result.message}"</p>
                  
                  {/* مقياس الشفافية */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {["تحليل النطاق", "بصمة البراند", "كاشف التحويلات", "فحص الأكواد"].map((label, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
           <div className="relative w-32 h-32 flex items-center justify-center">
   <svg className="w-full h-full transform -rotate-90">
      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
      
      {/* الدهاء الرياضي: الحماية من الـ NaN */}
      {result.status === "success" && !isNaN(result.riskScore) && (
        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
          strokeDasharray={364.4} 
          strokeDashoffset={364.4 - (364.4 * (result.riskScore || 0)) / 100}
          className={`transition-all duration-1000 ${result.riskScore > 60 ? 'text-red-500' : 'text-emerald-500'}`} 
        />
      )}
   </svg>
   
   {/* إظهار الرقم فقط في حال النجاح، أو علامة استفهام في حال الخطأ */}
   <span className="absolute text-3xl font-black">
     {result.status === "success" ? `${result.riskScore}%` : "?"}
   </span>
</div>

             </div>

             {/* زر التحذير العالمي - يظهر عند الخطر */}
             {result.riskScore >= 70 && (
               <div className="mt-10 pt-8 border-t border-white/5">
                 <button 
                  onClick={() => {
                    const message = `⚠️ تحذير أمني عاجل!\nلقد قمت بفحص الرابط: (${result.domain})\nعبر محرك VRAVK وتبين أنه احتيالي بنسبة ${result.riskScore}%.\n\nافحص أي رابط هنا:\nhttps://vravk-core.vercel.app`;
                    window.open(`https://wa.me{encodeURIComponent(message)}`, '_blank');
                  }}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95"
                 >
                   <Globe size={20} className="animate-pulse" /> حذر الجميع عبر واتساب الآن
                 </button>
               </div>
             )}
          </div>
        )}
      </section>

      {/* شريط التهديدات الحية */}
      

      <footer className="py-12 text-center">
        <p className="text-slate-600 text-[10px] font-bold tracking-[0.4em] uppercase">VRAVK Cyber Intelligence Group © 2026</p>
      </footer>

      <LivePulse />
      
      
    </main>
  );
}
