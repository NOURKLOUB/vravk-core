import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const { url } = await req.json();

    // 1. فحص مفتاح النخبة (Authentication)
    // حالياً سنضع مفتاحاً تجريبياً، لاحقاً سيسحب من قاعدة البيانات للمشتركين
    if (!authHeader || authHeader !== 'Bearer VRAVK_ELITE_2026') {
      return NextResponse.json({ status: "error", message: "Unauthorized: مفتاح API غير صالح" }, { status: 401 });
    }

    if (!url || !url.includes('.')) {
      return NextResponse.json({ status: "error", message: "رابط غير صالح للفحص" }, { status: 400 });
    }

    // 2. استدعاء محرك الفحص الذكي (نفس المنطق الذي بنيناه)
    // [ملاحظة: هنا نضع منطق الفحص الذي كتبناه سابقاً في المحرك الرئيسي]
    let riskScore = 15; // مثال للنتيجة
    let domain = new URL(url.includes('://') ? url : 'https://' + url).hostname;

    // 3. تسجيل الفحص في قاعدة البيانات كـ "استخدام API" لفوترته لاحقاً
    await supabase.from('scans').insert([{ 
      url, 
      domain, 
      risk_score: riskScore, 
      message: "API Scan Request",
      country: "API_ACCESS" 
    }]);

    return NextResponse.json({
      status: "success",
      domain,
      riskScore,
      message: "تم الفحص عبر بوابة VRAVK API الرسمية"
    });

  } catch (error) {
    return NextResponse.json({ status: "error", message: "Internal Server Error" }, { status: 500 });
  }
}
