// 无依赖版 Gemini 接口（兼容所有 Cloudflare 环境）
export async function onRequestPost(context) {
  try {
    // 读取请求参数
    const { prompt } = await context.request.json();
    const API_KEY = context.env.GEMINI_API_KEY;

    // 直接原生调用 Gemini 官方 API（无任何依赖）
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();
    const result = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ result }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
