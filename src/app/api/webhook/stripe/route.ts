import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27.acacia',
});

const resend = new Resend(process.env.RESEND_API_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    if (endpointSecret && signature) {
      event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
    } else {
      // Fallback for local testing if webhook secret isn't set
      event = JSON.parse(payload) as Stripe.Event;
    }
  } catch (err: any) {
    console.error(`⚠️  Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const customerEmail = session.customer_details?.email;
    const { title, chef, date, time } = session.metadata || {};

    if (customerEmail) {
      try {
        await resend.emails.send({
          from: 'Book A Cooking Class <bookings@bookacookingclass.com>',
          to: customerEmail,
          subject: `Your ticket for ${title || 'your cooking class'} is confirmed!`,
          html: `
            <div style="font-family: sans-serif; max-w-xl; margin: 0 auto;">
              <h2>You're officially booked!</h2>
              <p>Hi there,</p>
              <p>Your payment was successful and your spot is secured for <strong>${title}</strong> with Chef ${chef || 'your host'}.</p>
              <p><strong>Date:</strong> ${date || 'Check class page'}</p>
              <p><strong>Time:</strong> ${time || 'Check class page'}</p>
              <br/>
              <h3>Your Private Zoom Link:</h3>
              <p><a href="https://zoom.us/j/mock-link-12345" style="background-color: #FF5A5F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Join the Class</a></p>
              <br/>
              <p>We will send you a printable grocery list 48 hours before the class begins.</p>
              <p>Happy cooking!</p>
              <p>- BookACookingClass Team</p>
            </div>
          `,
        });
        console.log(`✅ Confirmation email sent to ${customerEmail}`);
      } catch (emailErr) {
        console.error('Failed to send email:', emailErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}
