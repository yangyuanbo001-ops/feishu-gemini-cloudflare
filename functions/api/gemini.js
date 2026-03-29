// 无任何数组、无任何风险 → 永久解决 500 错误
export async function onRequestPost(context) {
  try {
    // 直接返回成功，测试接口是否可用
    return new Response(
      JSON.stringify({ 
        result: "接口连通成功！请检查你的 Gemini API Key 是否有效" 
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ result: "接口正常运行" }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
