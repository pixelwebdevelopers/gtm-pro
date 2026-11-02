import nodemailer from "nodemailer";

interface SendEmailOptions {
  to?: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from =
    process.env.SMTP_FROM || '"GTM PRO Support" <support@goldtacticalmachine.com>';
  const defaultTo =
    process.env.SMTP_TO || "support@goldtacticalmachine.com";

  const targetEmail = to || defaultTo;

  if (!host || !user || !pass) {
    console.log(
      "[SMTP_NOTIFICATION_SKIPPED] SMTP credentials not fully configured in .env. Logging payload instead:",
      { to: targetEmail, subject, text }
    );
    return { success: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    const info = await transporter.sendMail({
      from,
      to: targetEmail,
      subject,
      text,
      html,
    });

    console.log("[SMTP_EMAIL_SENT]", info.messageId);
    return { success: true };
  } catch (error: any) {
    console.error("[SMTP_SEND_ERROR]", error?.message || error);
    return { success: false, error: error?.message || "Failed to send email" };
  }
}

