import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

// Initialize SDKs gracefully
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-05-27.dahlia' as any,
});
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature');

    let event;

    // Verify Stripe signature if we have a real secret
    if (endpointSecret && signature) {
      try {
        event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
      } catch (err: any) {
        console.error(`⚠️ Webhook signature verification failed:`, err.message);
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
      }
    } else {
      // Mock mode for local testing without keys
      event = JSON.parse(rawBody);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Extract metadata we passed during checkout creation
      const { classId, chef, slug } = session.metadata || {};
      const customerEmail = session.customer_details?.email;
      const customerName = session.customer_details?.name;

      console.log(`✅ Payment successful for ${customerEmail} (Class: ${classId})`);

      // 1. Log to Supabase (Record for the Host)
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        const { error } = await supabase.from('bookings').insert({
          class_id: classId,
          customer_email: customerEmail,
          customer_name: customerName,
          amount_paid: session.amount_total,
          status: 'paid',
        });
        if (error) console.error('Supabase logging error:', error);
      }

      // 2. Send Email Notification to Host via Resend
      if (resend) {
        await resend.emails.send({
          from: 'BookACookingClass <notifications@bookacookingclass.com>',
          to: 'host-email-placeholder@example.com', // In a real app, fetch the host's email from the DB using classId
          subject: '🎉 Cha-ching! You just sold a ticket!',
          html: `
            <h2>New Ticket Sold!</h2>
            <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
            <p><strong>Class:</strong> ${slug}</p>
            <p><strong>Amount:</strong> $${(session.amount_total / 100).toFixed(2)}</p>
            <p>This booking has been securely saved to your dashboard.</p>
          `,
        });
        console.log('📧 Host notification email sent via Resend.');
      } else {
        console.log('MOCK EMAIL: Would have sent email to host about sale to', customerEmail);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 500 });
  }
}
