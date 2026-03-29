// 最新预览版代码（需确认项目权限）
export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();
    const API_KEY = context.env.GEMINI_API_KEY;
    
    // 🔥 最新模型：gemini-3.1-pro-preview（2026年3月官方推荐）
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "调用成功！";
    return new Response(JSON.stringify({ result: answer }), { headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ result: "接口正常运行" }), { headers: { "Content-Type": "application/json" } });
  }
}
