// 最终稳定版 Gemini 接口（无依赖、不报错）
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
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini 未返回内容";
    
    return new Response(JSON.stringify({ result: text }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ result: "API Key 无效，请检查密钥" }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
