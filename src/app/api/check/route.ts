import { NextResponse } from 'next/server';
import axios from 'axios';

const scanHistory = new Map();
// المعيار العاشر: قاعدة بيانات التهديدات السيادية
const globalBlacklist = new Set(['://bitly.com', 'test-nasp.top']); 

export async function POST(req: Request) {
  try {
    let { url } = await req.json();
    if (!url || url.length < 4) return NextResponse.json({ status: "error", message: "الرابط قصير جداً أو غير صالح" });

    // 1. "فلتر الجدية" - كشف الكلام الفارغ
    // إذا كان المدخل لا يحتوي على نقطة (.) أو مسافات، فهو ليس رابطاً
    if (!url.includes('.') || url.includes(' ')) {
      return NextResponse.json({ 
        status: "error", 
        message: "هذا ليس رابطاً صالحاً للفحص. يرجى إدخال عنوان موقع حقيقي : google.com)" 
      });
    }

    // 2. تنظيف الرابط واستخراج الدومين بشكل أدق
    let hostname = "";
    try {
      const cleanUrl = url.includes('://') ? url : 'https://' + url;
      hostname = new URL(cleanUrl).hostname.toLowerCase();
    } catch (e) {
      return NextResponse.json({ status: "error", message: "تنسيق الرابط غير مدعوم" });
    }

    // 3. خوارزمية الشك (لماذا يظهر 5% دائماً؟)
    // سنرفع درجة "الشك المبدئي" ونضيف فحوصات أكثر صرامة
    let riskScore = 10; // نبدأ بـ 10 بدل 5
    let factors = [];

    // فحص إذا كان الدومين مجرد أرقام (IP Address) - غالباً نصابين
    if (/^[0-9.]+$/.test(hostname)) {
      riskScore = 85;
      factors.push("عنوان IP مباشر مشبوه");
    }

    // فحص النطاقات المجانية والرخيصة (تحديث القائمة)
    const suspiciousTLDs = ['.xyz', '.top', '.buzz', '.tk', '.ml', '.ga', '.cf', '.gq', '.win'];
    if (suspiciousTLDs.some(tld => hostname.endsWith(tld))) {
      riskScore = Math.max(riskScore, 75);
      factors.push("نطاق رخيص عالي الخطورة");
    }

    // فحص الكلمات الاحتيالية في الدومين
    const scamKeywords = ['login', 'verify', 'account', 'update', 'secure', 'gift', 'prize', 'free'];
    if (scamKeywords.some(word => hostname.includes(word))) {
      riskScore += 40;
      factors.push("كلمات مفتاحية احتيالية");
    }

    // فحص الانتحال (البراندات)
    const brands = ['google', 'amazon', 'paypal', 'apple', 'facebook', 'netflix', 'microsoft'];
    if (brands.some(b => hostname.includes(b) && !hostname.endsWith(b + '.com') && !hostname.endsWith(b + '.net'))) {
      riskScore = 99;
      factors.push("انتحال هوية علامة تجارية");
    }

    // النتيجة النهائية
    let finalRisk = Math.min(riskScore, 100);
    let message = finalRisk > 70 
      ? `⚠️ خطر: تم رصد (${factors.join(" + ")})` 
      : "الموقع يبدو مستقراً برمجياً، ولكن كن حذراً دائماً.";

    return NextResponse.json({
      status: "success",
      domain: hostname,
      riskScore: finalRisk,
      message
    });

  } catch (error) {
    return NextResponse.json({ status: "error", message: "خطأ في محرك الفحص" });
  }
}
