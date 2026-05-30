import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2025-01-27.acacia', // using latest stable or specific version
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { classId, title, price, chef, slug, date, time } = body;

    // If there is no real Stripe key configured yet, mock the success redirect
    // so the host can see how the flow works without signing up for Stripe yet.
    if (!process.env.STRIPE_SECRET_KEY) {
      console.log('MOCK STRIPE: Redirecting to success page');
      // Adding a fake delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      return NextResponse.json({ url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id=mock_session_123&slug=${slug}` });
    }

    // Real Stripe Integration
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${title} (Live Masterclass)`,
              description: `Hosted by ${chef}. You will receive the private Zoom link after checkout.`,
            },
            unit_amount: price, // price in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}&slug=${slug}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/live/${slug}`,
      metadata: {
        classId,
        chef,
        slug,
        title,
        date,
        time
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Error:', err.message);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
