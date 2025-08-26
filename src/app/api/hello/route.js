export async function GET() {
  console.log("hello route 호출됨!");
  return new Response("hello", { status: 200 });
}