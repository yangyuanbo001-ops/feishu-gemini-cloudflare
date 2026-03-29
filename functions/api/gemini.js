// 终极调试：完整打印Gemini所有返回数据
export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();
    const API_KEY = context.env.GEMINI_API_KEY;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );

    // 直接返回全部原始数据！
    const data = await res.json();
    return new Response(JSON.stringify({ 
      状态码: res.status,
      完整响应: data
    }), { headers: { "Content-Type": "application/json" } });

  } catch (err) {
    return new Response(JSON.stringify({ 错误: err.message }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
