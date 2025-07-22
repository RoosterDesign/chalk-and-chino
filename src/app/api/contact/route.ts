import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (body.website) return NextResponse.json({ ok: true });

        const delta = Date.now() - Number(body.renderedAt || 0);
        if (delta < 2000) {
            return NextResponse.json({ error: 'Too fast' }, { status: 400 });
        }

        const token: string | undefined = body.turnstileToken;
        if (!token) {
            return NextResponse.json({ error: "CAPTCHA missing" }, { status: 400 });
        }

        if (!process.env.TURNSTILE_SECRET_KEY) {
            console.error("TURNSTILE_SECRET_KEY not set");
            return NextResponse.json({ error: "Server mis-config" }, { status: 500 });
        }

        const params = new URLSearchParams({
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: token,
        });

        const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: params } );

        if (!verifyRes.ok) {
            return NextResponse.json({ error: "CAPTCHA upstream error" }, { status: 502 } );
        }

        const { success } = await verifyRes.json();
        if (!success) {
            return NextResponse.json({ error: "CAPTCHA failed" }, { status: 400 });
        }

        const {
            name,
            phone,
            email,
            enquiry,
            productName,
            productUrl,
            productPrice,
        } = body;

        if (!name || !email || !enquiry) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const year = new Date().getFullYear();

        const mailText = `
New enquiry received:

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Enquiry: ${enquiry}

${
    productName
        ? `--- Product Details ---
Product Name: ${productName}
Product Price: £${productPrice}
Product URL: ${productUrl}
`
        : ""
}
    `;

        const mailHtml = `<table
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      border-collapse: collapse;
      font-family: sans-serif;
      color: #333;
    "
  >
    <tr style="background-color: #f5f5f5;">
      <th
        colspan="2"
        style="
          padding: 16px;
          text-align: left;
          font-size: 18px;
          border-bottom: 2px solid #ddd;
        "
      >
        New Enquiry Received
      </th>
    </tr>

  <tr>
    <td colspan="2" height="20">&nbsp;</td>
  </tr>

    <tr>
      <td style="padding: 10px; font-weight: bold; width: 30%;">Name</td>
      <td style="padding: 10px;">${name}</td>
    </tr>
    <tr>
      <td style="padding: 10px; font-weight: bold;">Email</td>
      <td style="padding: 10px;">
        <a href="mailto:${email}" style="color: #1a73e8;">${email}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 10px; font-weight: bold;">Phone</td>
      <td style="padding: 10px;">${phone || "Not provided"}</td>
    </tr>
    <tr>
      <td style="padding: 10px; font-weight: bold; vertical-align: top;">Enquiry</td>
      <td style="padding: 10px; white-space: pre-wrap;">${enquiry}</td>
    </tr>

    ${
        productName
            ? `
    <tr>
    <td colspan="2" height="40">&nbsp;</td>
  </tr>

  <tr style="background-color: #f5f5f5;">
      <th
        colspan="2"
        style="
          padding: 16px;
          text-align: left;
          font-size: 18px;
          border-bottom: 2px solid #ddd;
        "
      >
        Product Details
      </th>
    </tr>

    <tr>
    <td colspan="2" height="20">&nbsp;</td>
  </tr>
    <tr>
      <td style="padding: 10px; font-weight: bold;">Product Name</td>
      <td style="padding: 10px;">${productName}</td>
    </tr>
    <tr>
      <td style="padding: 10px; font-weight: bold;">Price</td>
      <td style="padding: 10px;">£${productPrice}</td>
    </tr>
    <tr>
      <td style="padding: 10px; font-weight: bold;">Product URL</td>
      <td style="padding: 10px;">
        <a href="${productUrl}" style="color: #1a73e8; word-break: break-all;">
          ${productUrl}
        </a>
      </td>
    </tr>
    `
            : ""
    }

    <tr>
      <td colspan="2" style="padding: 24px 8px 8px; text-align: center; font-size: 12px; color: #888;">
        &copy; ${year} Chalk &amp; Chino
      </td>
    </tr>
  </table>
`;

        await transporter.sendMail({
            to: process.env.CONTACT_EMAIL,
            from: process.env.EMAIL_FROM,
            replyTo: email,
            subject: "New Contact/Enquiry from Chalk & Chino",
            html: mailHtml,
            text: mailText,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Email send failed" },
            { status: 500 }
        );
    }
}
