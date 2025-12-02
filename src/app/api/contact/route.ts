import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to escape HTML special characters
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char]);
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validasi input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Sanitize user inputs to prevent HTML injection
    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safePhone = escapeHtml(String(phone || "Not provided"));
    const safeMessage = escapeHtml(String(message));

    // Kirim email ke contact@kulipoly.com
    const { data, error } = await resend.emails.send({
      from: "Kulipoly Website <noreply@kulipoly.com>",
      to: ["contact@kulipoly.com"],
      replyTo: email,
      subject: `New Contact Form Submission from ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${safePhone}</p>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="white-space: pre-wrap; color: #555;">${safeMessage}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px;">
            This email was sent from the contact form on kulipoly.com
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
