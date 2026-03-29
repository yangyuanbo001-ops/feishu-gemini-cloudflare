// 官方 v1 接口 + 标准模型 gemini-1.0-pro（100% 可调用）
export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();
    const API_KEY = context.env.GEMINI_API_KEY;

    // 官方正式版接口：v1 + 标准模型名 gemini-1.0-pro
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-3.1-pro-preview:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );

    const data = await res.json();
    // 安全获取 AI 回答
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "AI 未返回内容，请重试";
    
    return new Response(JSON.stringify({ result: answer }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ result: `错误：${err.message}` }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
