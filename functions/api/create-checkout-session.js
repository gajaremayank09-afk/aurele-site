// Cloudflare Pages Function — handles POST /api/create-checkout-session
// Talks to Stripe's REST API directly via fetch, so no npm packages are needed.

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    if (!env.STRIPE_SECRET_KEY) {
      return jsonResponse({ error: 'Stripe is not configured on this site yet.' }, 500);
    }

    const { items } = await request.json();
    if (!Array.isArray(items) || items.length === 0) {
      return jsonResponse({ error: 'No items provided.' }, 400);
    }

    // Always price from products.json on the server — never trust amounts sent by the browser.
    const origin = new URL(request.url).origin;
    const productsRes = await fetch(`${origin}/products.json`);
    const productsData = await productsRes.json();
    const products = (productsData && productsData.products) || [];

    const params = new URLSearchParams();
    params.append('mode', 'payment');
    params.append('success_url', `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`);
    params.append('cancel_url', `${origin}/cancel.html`);
    params.append('billing_address_collection', 'required');
    params.append('phone_number_collection[enabled]', 'true');

    const countries = ['US', 'CA', 'GB', 'FR', 'IT', 'DE', 'ES', 'JP', 'AU', 'CH'];
    countries.forEach((c, i) => {
      params.append(`shipping_address_collection[allowed_countries][${i}]`, c);
    });

    items.forEach((item, i) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) throw new Error(`Invalid product id: ${item.id}`);
      const qty = Math.max(1, Math.min(10, parseInt(item.qty, 10) || 1));
      params.append(`line_items[${i}][price_data][currency]`, 'usd');
      params.append(`line_items[${i}][price_data][product_data][name]`, product.name);
      params.append(`line_items[${i}][price_data][unit_amount]`, String(Math.round(product.price * 100)));
      params.append(`line_items[${i}][quantity]`, String(qty));
    });

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await stripeRes.json();
    if (!stripeRes.ok) {
      throw new Error((session.error && session.error.message) || 'Stripe request failed.');
    }

    return jsonResponse({ url: session.url }, 200);
  } catch (err) {
    return jsonResponse({ error: err.message || 'Checkout failed.' }, 500);
  }
}

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
