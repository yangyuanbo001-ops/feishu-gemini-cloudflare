// Cloudflare 专用 Gemini 中转接口
export async function onRequestPost(context) {
  try {
    const { prompt } = await context.request.json();
    const genAI = new (await import("@google/generative-ai")).GoogleGenerativeAI(context.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return new Response(JSON.stringify({ result: text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
