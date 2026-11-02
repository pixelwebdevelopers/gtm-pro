import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

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

    const timestamp = new Date().toISOString();

    const plainText =
      `New Free Access Claim Received\n\n` +
      `Broker: ${broker}\n` +
      `MT5 Account Number: ${accountNumber}\n` +
      `Registered Email: ${email}\n` +
      `Telegram: ${telegram || "Not provided"}\n` +
      `Timestamp: ${timestamp}\n`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; background-color: #0b0a07; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #C9A84C;">
        <h2 style="color: #E8C97A; margin-top: 0;">⚡ New Free Access Claim — GTM PRO</h2>
        <p style="color: #cccccc;">A new user submitted broker verification details for Free Access:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #333333; color: #888888; width: 160px;">Broker:</td>
            <td style="padding: 8px; border-bottom: 1px solid #333333; color: #ffffff; font-weight: bold;">${broker}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #333333; color: #888888;">MT5 Account #:</td>
            <td style="padding: 8px; border-bottom: 1px solid #333333; color: #E8C97A; font-weight: bold; font-family: monospace;">${accountNumber}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #333333; color: #888888;">Client Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #333333; color: #ffffff;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #333333; color: #888888;">Telegram:</td>
            <td style="padding: 8px; border-bottom: 1px solid #333333; color: #38bdf8;">${telegram || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; color: #888888;">Submitted At:</td>
            <td style="padding: 8px; color: #aaaaaa; font-size: 12px;">${timestamp}</td>
          </tr>
        </table>
      </div>
    `;

    // Send email via configured SMTP
    await sendEmail({
      subject: `[Claim] New Free Access: ${broker} - MT5 #${accountNumber}`,
      text: plainText,
      html: htmlBody,
    });

    return NextResponse.json({
      success: true,
      message:
        "Thank you! We've received your details. Our team will verify your account and email your access details within 24 hours.",
    });
  } catch (error) {
    console.error("[FREE_ACCESS_API_ERROR]", error);
    return NextResponse.json(
      {
        error:
          "Failed to process your request. Please try again or message our admin on Telegram.",
      },
      { status: 500 }
    );
  }
}
