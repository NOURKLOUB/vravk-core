"use client";
import React, { useEffect, useState } from 'react';
import { ShieldAlert, Globe, Clock, ChevronRight } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import Link from 'next/link';

export default function ThreatDatabase() {
  const [threats, setThreats] = useState<any[]>([]);

  useEffect(() => {
    fetchGlobalThreats();
  }, []);

  async function fetchGlobalThreats() {
    // جلب الروابط التي تتجاوز نسبة خطرها 70% فقط (الفلتر الاستخباراتي)
    const { data } = await supabase
      .from('scans')
      .select('*')
      .gt('risk_score', 70)
      .order('created_at', { ascending: false })
      .limit(10);
    
    setThreats(data || []);
  }

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-blue-500 hover:text-blue-400 flex items-center gap-2 mb-10 text-xs font-bold uppercase tracking-widest">
           ← العودة للمحرك الرئيسي
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/5 pb-10">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              رادار <span className="text-red-500">التهديدات</span> الحي
            </h1>
            <p className="text-slate-400 mt-4 max-w-xl font-light italic">
              يتم تحديث هذه القائمة لحظياً بناءً على تقارير مستخدمي VRAVK حول العالم.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {threats.length > 0 ? threats.map((threat) => (
            <div key={threat.id} className="group bg-slate-900/40 border border-white/5 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between hover:border-red-500/30 transition-all shadow-xl">
              <div className="flex items-center gap-6 w-full">
                <div className="bg-red-500/10 p-3 rounded-xl text-red-500">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-mono font-bold text-white">{threat.domain}</h3>
                  <div className="flex gap-4 mt-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Clock size={12}/> {new Date(threat.created_at).toLocaleTimeString('ar-JO')}</span>
                    <span className="text-red-500/60 uppercase font-black tracking-tighter">Threat Detected</span>
                  </div>
                </div>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <span className="text-[10px] text-slate-600 block uppercase font-black tracking-widest">Risk Level</span>
                <span className="text-2xl font-black text-red-600">{threat.risk_score}%</span>
              </div>
            </div>
          )) : (
            <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-white/5">
                <p className="text-slate-600 italic">الرادار يمسح الآن... لا توجد تهديدات نشطة في هذه اللحظة.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
