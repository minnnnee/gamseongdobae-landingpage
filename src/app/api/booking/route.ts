export async function POST(req: Request) {
  const { name, phone, date, msg } = await req.json();

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json({ ok: false, error: "Webhook not configured" }, { status: 500 });
  }

  const content = [
    "📋 **새 상담 신청**",
    `👤 이름: ${name}`,
    `📞 연락처: ${phone}`,
    `📅 시공 희망일: ${date || "미입력"}`,
    `💬 문의내용: ${msg || "없음"}`,
  ].join("\n");

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    return Response.json({ ok: false }, { status: 500 });
  }

  return Response.json({ ok: true });
}
