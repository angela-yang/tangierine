import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { to, subject, message } = await request.json();
    
    // You'll need to set up an email service like Resend, SendGrid, or similar
    // For now, this is a placeholder that logs the email
    
    console.log('📧 Email notification:', { to, subject, message });
    
    // Example with Resend (you'd need to install and configure it):
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Tangierine <noreply@tangierine.com>',
    //   to: [to],
    //   subject: subject,
    //   html: `<p>${message}</p>`
    // });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}