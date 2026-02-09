import { NextResponse } from 'next/server';
import axios from 'axios';

const scanHistory = new Map();
// المعيار العاشر: قاعدة بيانات التهديدات السيادية
const globalBlacklist = new Set(['://bitly.com', 'test-nasp.top']); 

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ status: "error", message: "الرابط فارغ" });

    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http')) cleanUrl = 'https://' + cleanUrl;

    let hostname = "";
    try {
      hostname = new URL(cleanUrl).hostname.toLowerCase();
    } catch (e) {
      return NextResponse.json({ status: "error", message: "تنسيق الرابط غير صحيح" });
    }

    // فحص الذاكرة وقاعدة بيانات التهديدات
    if (globalBlacklist.has(hostname) || globalBlacklist.has(cleanUrl)) {
      return NextResponse.json({ 
        status: "success", 
        riskScore: 100, 
        message: "⚠️ محظور: هذا الرابط مدرج في القائمة السوداء العالمية للتهديدات السيادية!",
        domain: hostname
      });
    }

    if (scanHistory.has(hostname)) {
      return NextResponse.json({ ...scanHistory.get(hostname), cached: true });
    }

    let riskScore = 5;
    let factors: string[] = [];
    let finalDestination = hostname;

    try {
      const response = await axios.get(cleanUrl, {
        timeout: 5000,
        maxRedirects: 5,
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...' }
      });
      
      const finalUrlObj = new URL(response.request.res.responseUrl || cleanUrl);
      finalDestination = finalUrlObj.hostname.toLowerCase();

      const html = response.data.toLowerCase();
      
      // كشف ملفات التجسس (المعيار التاسع)
      const maliciousPatterns = ['document.cookie', 'eval(atob', 'onkeypress'];
      if (maliciousPatterns.some(p => html.includes(p))) {
        riskScore = 92;
        factors.push("أكواد تجسس وسرقة جلسات");
      }
    } catch (e) { }

    // خوارزمية الدهاء النهائية
    const badTLDs = ['.xyz', '.top', '.buzz', '.win', '.cf', '.ga'];
    const brands = ['amazon', 'google', 'paypal', 'binance', 'netflix', 'apple', 'facebook'];
    
    if (badTLDs.some(tld => finalDestination.endsWith(tld))) {
      riskScore = Math.max(riskScore, 85);
      factors.push("نطاق مشبوه");
    }

    if (brands.some(b => finalDestination.includes(b) && !finalDestination.endsWith(b + '.com'))) {
      riskScore = 99;
      factors.push("انتحال علامة تجارية");
    }

    // دهاء التنبؤ: إذا كانت النتيجة > 80، أضفه تلقائياً للقائمة السوداء
    if (riskScore >= 90) {
      globalBlacklist.add(hostname);
    }

    let finalMessage = riskScore >= 90 ? `⚠️ خطر مدمر: كشف (${factors.join(" + ")})` : "الموقع يبدو آمناً.";

    const finalResult = {
      status: "success",
      domain: finalDestination,
      riskScore: Math.min(riskScore, 100),
      message: finalMessage
    };

    scanHistory.set(hostname, finalResult);
    return NextResponse.json(finalResult);

  } catch (error) {
    return NextResponse.json({ status: "error", message: "خطأ في محرك الفحص" }, { status: 500 });
  }
}
