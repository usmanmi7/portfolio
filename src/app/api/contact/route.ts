import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["Webworks456@gmail.com"],
      subject: `New message from ${name} — Portfolio`,
      replyTo: email,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #fafafa; border-radius: 16px;">
          <div style="background: linear-gradient(135deg, #ff6b35, #c084fc); width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
            <span style="color: white; font-size: 20px; font-weight: 800; font-family: sans-serif;">U</span>
          </div>
          <h2 style="margin: 0 0 8px; font-size: 22px; color: #111;">New Contact Message</h2>
          <p style="margin: 0 0 24px; font-size: 14px; color: #888;">Someone reached out through your portfolio.</p>
          <div style="background: white; border: 1px solid #e5e5e5; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 80px; vertical-align: top;">Name</td>
                <td style="padding: 8px 0; color: #111; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #ff6b35; text-decoration: none; font-weight: 500;">${email}</a></td>
              </tr>
            </table>
          </div>
          <div style="background: white; border: 1px solid #e5e5e5; border-radius: 12px; padding: 20px;">
            <p style="margin: 0 0 8px; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
            <p style="margin: 0; font-size: 15px; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin: 24px 0 0; font-size: 12px; color: #bbb; text-align: center;">Sent from usmanmilas.com contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
