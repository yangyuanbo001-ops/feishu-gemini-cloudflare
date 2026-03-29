// 调试终极版：输出所有原始数据，定位失败原因
export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();
    const API_KEY = context.env.GEMINI_API_KEY;

    // 发起请求
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    // 获取原始响应
    const rawData = await response.json();
    
    // 直接返回原始数据，看Gemini返回了什么！
    return new Response(JSON.stringify({ 
      调试信息: "原始响应",
      状态码: response.status,
      数据: rawData
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ 错误: err.message }), { status: 500 });
  }
}
