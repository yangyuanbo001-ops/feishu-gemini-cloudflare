// 终极稳定版：自动捕获所有错误，适配飞书多维表格
export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();
    const API_KEY = context.env.GEMINI_API_KEY;

    // 调用 Gemini 原生接口
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await res.json();
    
    // 错误处理：如果 Gemini 返回错误，直接抛出
    if (data.error) {
      throw new Error(`Gemini API错误: ${data.error.message}`);
    }
    // 安全取值，防止空数组报错
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("Gemini未返回任何结果");
    }

    const text = data.candidates[0].content.parts[0].text;
    return new Response(JSON.stringify({ result: text }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
