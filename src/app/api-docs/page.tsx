"use client";
import React from 'react';
import { Code, Terminal, Cpu, Zap, Copy, Check } from 'lucide-react';
import Link from 'next/link';

const APIDocs = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 p-6 md:p-12 font-mono">
      <div className="max-w-5xl mx-auto">
        {/* العودة */}
        <Link href="/" className="text-blue-500 hover:text-blue-400 flex items-center gap-2 mb-10 text-sm">
          <Terminal size={16} /> root@vravk:~# cd ..
        </Link>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
          VRAVK <span className="text-blue-500">API</span>_ACCESS
        </h1>
        <p className="text-slate-500 text-lg mb-12 max-w-2xl font-sans">
          قم بدمج محرك الاستخبارات الخاص بنا في تطبيقاتك. احمِ مستخدميك من الاحتيال لحظة بلحظة عبر واجهة برمجية فائقة السرعة.
        </p>

        {/* عرض الكود الاحترافي */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex justify-between items-center text-xs text-slate-500">
            <span>POST /api/v1/check-security</span>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            </div>
          </div>
          <div className="p-8 text-sm md:text-base leading-relaxed overflow-x-auto">
            <pre className="text-blue-400">
              <code>{`// مثال على استدعاء محرك VRAVK بلغة JavaScript
const checkLink = async (targetUrl) => {
  const response = await fetch('https://vravk.ai', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer YOUR_API_KEY' },
    body: JSON.stringify({ url: targetUrl })
  });
  
  const data = await response.json();
  console.log(data.riskScore); // نتيجة الذكاء الاستباقي
};`}</code>
            </pre>
          </div>
        </div>

        {/* خطط الاشتراك (بذور الملايين) */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 text-sans font-sans">
          <div className="p-8 bg-white/5 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all">
            <Zap className="text-blue-500 mb-4" />
            <h3 className="text-white font-bold text-xl mb-2">نسخة الهواة</h3>
            <p className="text-xs text-slate-500 mb-4">مجانية للأبد</p>
            <ul className="text-sm space-y-2 mb-6">
              <li>• 100 طلب / يومياً</li>
              <li>• تحليل أساسي</li>
            </ul>
            <button className="w-full py-2 bg-white/5 rounded-lg text-sm font-bold cursor-pointer">ابدأ الآن</button>
          </div>

          <div className="p-8 bg-blue-600/10 border border-blue-600/50 rounded-2xl scale-105 shadow-blue-500/10 shadow-2xl relative">
            <div className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] px-2 py-1 rounded-full font-bold">الأكثر طلباً</div>
            <Cpu className="text-blue-400 mb-4" />
            <h3 className="text-white font-bold text-xl mb-2">نسخة الأعمال</h3>
            <p className="text-xs text-slate-400 mb-4">49$ / شهرياً</p>
            <ul className="text-sm space-y-2 mb-6 text-slate-300">
              <li>• طلبات غير محدودة</li>
              <li>• أولوية الفحص العميق</li>
              <li>• دعم فني 24/7</li>
            </ul>
            <button className="w-full py-2 bg-blue-600 rounded-lg text-sm font-bold text-white cursor-pointer">اشترك في النخبة</button>
          </div>

          <div className="p-8 bg-white/5 border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all">
            <Code className="text-blue-500 mb-4" />
            <h3 className="text-white font-bold text-xl mb-2">المؤسسات الكبرى</h3>
            <p className="text-xs text-slate-500 mb-4">تواصل معنا</p>
            <ul className="text-sm space-y-2 mb-6">
              <li>• تخصيص الخوارزمية</li>
              <li>• استضافة خاصة للسيرفر</li>
            </ul>
            <button className="w-full py-2 bg-white/5 rounded-lg text-sm font-bold cursor-pointer">تواصل مع الإدارة</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default APIDocs;
