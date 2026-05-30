import { NextResponse } from "next/server";
import { paystackInitializeSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = paystackInitializeSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payment initialization payload." }, { status: 400 });
  }

  if (process.env.PAYSTACK_ENABLED !== "true") {
    return NextResponse.json(
      {
        error: "Paystack is currently disabled. The store can run in catalogue-only or contact-to-order mode.",
      },
      { status: 503 },
    );
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({ error: "Paystack secret key is not configured." }, { status: 500 });
  }

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: parsed.data.email,
      amount: Math.round(parsed.data.amount * 100),
      metadata: {
        order_id: parsed.data.orderId,
      },
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: "Paystack initialization failed.", details: payload }, { status: 502 });
  }

  return NextResponse.json(payload);
}
