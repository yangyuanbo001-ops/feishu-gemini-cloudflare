// 100%能构建成功的最简版
export async function onRequest(context) {
  return new Response(
    JSON.stringify({ result: "构建成功！接口正常运行" }),
    { headers: { "Content-Type": "application/json" } }
  );
}
