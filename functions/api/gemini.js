// 飞书多维表格 + Gemini 最终完美版（稳定gemini-pro模型）
export async function onRequestPost(context) {
  try {
    // 获取飞书传来的提示词
    const { prompt } = await context.request.json();
    const API_KEY = context.env.GEMINI_API_KEY;

    // 调用 Gemini 官方接口（稳定模型，永不404）
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await res.json();
    // 安全获取AI回答（核心修复）
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // 返回结果给飞书
    return new Response(
      JSON.stringify({ result: answer || "AI 未返回内容，请重试" }),
      { headers: { "Content-Type": "application/json" } }
    );
    
  } catch (err) {
    // 错误友好提示
    return new Response(
      JSON.stringify({ result: `错误：${err.message}` }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
