"use client";
import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, Globe, Zap, Lock, Users, BarChart } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';


const Counter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // ثانيتين
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
  }, []); // القوس الفارغ هنا هو "السر"؛ يعني اشتغل مرة واحدة فقط عند التحميل

  return <span>{count.toLocaleString()}</span>;
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [stats, setStats] = useState({ total: 12450, blocked: 3120 });


  const handleScan = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await axios.post('/api/check', { url });
      setResult(response.data);
    } catch (error) {
      console.error("Error scanning", error);
    } finally {
      setLoading(false);
    }
  };
  // ضعه هنا في نهاية الملف تماماً
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
    }, 6000); 

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

  return (
    <main className="min-h-screen w-full bg-[#020617] text-slate-200 overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white italic">F</div>
            <span className="text-xl font-black tracking-tighter text-white">FRAVK <span className="text-blue-500">CORE</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
           <Link href="/threats" className="hover:text-blue-400 transition-colors">قاعدة التهديدات</Link> 
            <Link href="/api-docs" className="hover:text-blue-400 transition-colors">المطورين API</Link>
            <Link href="/elite" className="hover:text-blue-400 transition-colors">عن النظام</Link>

          </div>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs font-bold transition-all">دخول النخبة</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-400 text-xs font-bold mb-6 animate-fade-in">
            <Zap size={14} /> الإصدار الاستخباراتي 1.0 نشط الآن
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            حماية <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">2 مليار</span> إنسان من الاحتيال الرقمي.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            FRAVK ليس مجرد أداة فحص، بل هو نظام تعلم ذاتي يطارد الروابط المشبوهة ويحمي هويتك الرقمية بذكاء استباقي.
          </p>

          {/* Search Box */}
          <div className="relative max-w-3xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-2xl p-2 shadow-2xl">
            {loading && (
  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
    <div className="w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] absolute animate-scan"></div>
  </div>
)}

              <input 
                type="text"
                placeholder="ألصق الرابط المشبوه (amazon-gift.xyz...)"
                className="w-full bg-transparent border-none focus:ring-0 px-6 py-4 text-white placeholder:text-slate-600 md:text-xl"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                // --- إضافة ميزة الـ Enter هنا ---
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleScan();
    }
  }}
              />
              <button 
                onClick={handleScan}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-black text-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "يتم الفحص..." : "كشف الحقيقة"}
              </button>
            </div>
          </div>

          {/* Real-time Stats */}
         <div className="flex justify-center gap-12 mt-12 text-slate-500 text-sm font-bold uppercase tracking-widest">
  <div className="flex flex-col items-center gap-1">
    <span className="text-white text-2xl font-mono">
      <Counter target={12450} />+
    </span>
    <span>روابط مفحوصة</span>
  </div>
  <div className="flex flex-col items-center gap-1">
    <span className="text-red-500 text-2xl font-mono">
      <Counter target={3120} />+
    </span>
    <span>تهديد محظور</span>
  </div>
</div>

        </div>
  
        {/* Results Render */}
        {result && (
          <div className={`max-w-3xl mx-auto mt-12 p-8 rounded-3xl border animate-in zoom-in-95 duration-500 ${
            result.riskScore > 60 ? 'border-red-500/30 bg-red-500/5' : 'border-emerald-500/30 bg-emerald-500/5'
          }`}>
             <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    {result.riskScore > 60 ? <ShieldAlert className="text-red-500"/> : <ShieldCheck className="text-emerald-500"/>}
                    <h2 className="text-xl font-bold">تقرير VRAVK الاستخباري</h2>
                  </div>
                  <p className="text-slate-400 text-sm font-mono mb-4">{result.domain}</p>
                  <p className="text-lg font-medium leading-relaxed italic">"{result.message}"</p>
                </div>
                <div className="relative w-32 h-32 flex items-center justify-center">
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * result.riskScore) / 100}
                        className={`transition-all duration-1000 ${result.riskScore > 60 ? 'text-red-500' : 'text-emerald-500'}`} 
                      />
                   </svg>
                   <span className="absolute text-3xl font-black">{result.riskScore}%</span>
                </div>
             </div>
          </div>
        )}
          <div className="mt-6 grid grid-cols-2 gap-3">
  {[
    { label: "تحليل النطاق", status: "نشط" },
    { label: "بصمة البراند", status: "مكتمل" },
    { label: "كاشف التحويلات", status: "مكتمل" },
    { label: "فحص الأكواد", status: "نشط" }
  ].map((item, i) => (
    <div key={i} className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
      <span className="text-[10px] text-slate-400 uppercase tracking-widest">{item.label}</span>
    </div>
  ))}
</div>
      </section>


      {/* Footer Branding */}
      <footer className="border-t border-white/5 py-12 text-center cursor-pointer">
        <p className="text-slate-400 text-xs font-bold tracking-[0.3em] uppercase">Powered by FRAVK Cyber Intelligence Group</p>
      </footer>
         {/* استدعاء النبض العالمي هنا */}
      <LivePulse /> 
    </main>
  );
}
