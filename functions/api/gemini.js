// 调试版：返回 Gemini 原始响应，定位问题
export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();
    const API_KEY = context.env.GEMINI_API_KEY;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );

    const data = await res.json();
    // 直接返回原始数据，看 Gemini 到底返回了什么
    return new Response(
      JSON.stringify({
        原始响应: data,
        你输入的prompt: prompt
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ 错误: e.message }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
