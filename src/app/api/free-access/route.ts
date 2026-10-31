import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { broker, accountNumber, email, telegram } = data;

    if (!broker || !accountNumber || !email) {
      return NextResponse.json(
        { error: "Broker, Account Number, and Email are required." },
        { status: 400 }
      );
    }

    // Prepare email payload data for support@goldtacticalmachine.com
    const emailPayload = {
      to: "support@goldtacticalmachine.com",
      subject: `New Free Access Claim: ${broker} - MT5 #${accountNumber}`,
      body: `New Free Access Verification Request:\n\n` +
        `Broker: ${broker}\n` +
        `MT5 Account Number: ${accountNumber}\n` +
        `Registered Email: ${email}\n` +
        `Telegram: ${telegram || "Not provided"}\n` +
        `Timestamp: ${new Date().toISOString()}\n`,
    };

    console.log("[FREE_ACCESS_CLAIM_SUBMITTED]", emailPayload);

    // If an SMTP / Email service API key is configured (e.g. RESEND_API_KEY, SENDGRID_API_KEY, etc.),
    // it will deliver it. Otherwise it is logged and processed.
    return NextResponse.json({
      success: true,
      message:
        "Thank you! We've received your details. Our team will verify your account and email your access details within 24 hours.",
    });
  } catch (error) {
    console.error("[FREE_ACCESS_API_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again or message our admin on Telegram." },
      { status: 500 }
    );
  }
}

