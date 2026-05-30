import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Missing Paystack reference." }, { status: 400 });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json({ error: "Paystack secret key is not configured." }, { status: 500 });
  }

  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  });
  const payload = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: "Paystack verification failed.", details: payload }, { status: 502 });
  }

  return NextResponse.json({
    ...payload,
    nextOrderStatus: payload?.data?.status === "success" ? "paid_or_age_review_required" : "failed",
  });
}
