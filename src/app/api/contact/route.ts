// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, phone, email, enquiry, productName, productUrl, productPrice } = body;

        if (!name || !email || !enquiry) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailText = `
New enquiry received:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Enquiry: ${enquiry}

${productName ? `--- Product Details ---
Product Name: ${productName}
Product Price: ${productPrice}
Product URL: ${productUrl}
` : ''}
    `;

        await transporter.sendMail({
            to: process.env.CONTACT_EMAIL,
            from: process.env.EMAIL_FROM,
            replyTo: email,
            subject: 'New Contact/Enquiry from Chalk & Chino',
            text: mailText,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
    }
}
