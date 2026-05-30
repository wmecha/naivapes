import crypto from "node:crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({ error: "Paystack secret key is not configured." }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");
  const expected = crypto.createHmac("sha512", secretKey).update(rawBody).digest("hex");

  if (!signature || signature !== expected) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  return NextResponse.json({
    received: true,
    event: event.event,
    note: "Persist this payload in paystack_events, update payments/orders, then send Resend notifications.",
  });
}
