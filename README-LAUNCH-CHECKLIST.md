# AURÈLE — Launch Checklist (Cloudflare Pages)

## Already done for you
- ✅ Stripe checkout rebuilt for Cloudflare Pages Functions (no npm install needed — it's dependency-free)
- ✅ CMS connected via DecapBridge with your real repo and site ID
- ✅ Shipping, Returns, Privacy, and Terms pages, linked in the footer
- ✅ Full Site Design controls — logo, colors, fonts, and homepage text, all editable at `/admin`
- ✅ Category pages and product gallery pages
- ✅ All English wording throughout

## Setting up Cloudflare Pages

1. Go to **dash.cloudflare.com** and sign up (or log in)
2. In the left sidebar, click **Workers & Pages**
3. Click **Create** → **Pages** → **Connect to Git**
4. Authorize Cloudflare to access GitHub, then select your repo: `gajaremayank09-afk/aurele-site`
5. On the build settings screen:
   - **Framework preset**: None
   - **Build command**: leave empty
   - **Build output directory**: `/`
6. Click **Save and Deploy**

Cloudflare will give you a URL like `aurele-site-abc.pages.dev` — that's your new live site.

## Connect Stripe (only when you're ready to accept real payments)
1. Create a Stripe account at https://dashboard.stripe.com if you don't have one
2. Go to **Developers → API keys** and copy your **Secret key**
3. In Cloudflare: go to your Pages project → **Settings** → **Environment variables**
4. Add a variable:
   - Key: `STRIPE_SECRET_KEY`
   - Value: your Stripe secret key
   - Make sure it's added for **Production**
5. Redeploy (Cloudflare usually does this automatically after saving env vars — if not, go to **Deployments** and retrigger the latest one)

## Update DecapBridge with your new URL
Since your site now lives at a `.pages.dev` address instead of `.netlify.app`:
1. Go to your DecapBridge dashboard → your site → **Settings**
2. Update the **Decap CMS login URL** to your new address, e.g.:
   ```
   https://aurele-site-abc.pages.dev/admin/index.html
   ```
3. Save

## Replace the placeholder email
Search the project for `contact@aurele.luxury` (in `index.html`, `shipping.html`, `returns.html`, `privacy.html`, `terms.html`) and swap in your real order/contact email.

## Review legal pages
`shipping.html`, `returns.html`, `privacy.html`, and `terms.html` are solid starting points, but not legal advice — have a lawyer review them before taking real orders.

## Using the CMS at `/admin`
- **Site Design (Logo, Colors, Fonts)** — pick from 5 pre-matched color themes, heading/body fonts, upload a logo, and edit every major homepage headline/paragraph
- **Categories** — add, rename, or remove categories (each needs a lowercase ID like `manteaux`)
- **Products** — multiple photos per product, category, price, description
  - ⚠️ New categories need their ID added to the `options:` list under the product Category field in `admin/config.yml`
- **Homepage Photos** — hero slideshow, lookbook photos, and the "House Architecture" section photo

## How the pages work
- `/category.html?cat={id}` — one category's products
- `/product.html?id={id}` — one product with its full photo gallery
- `/api/create-checkout-session` — the Stripe checkout function (Cloudflare Pages Function, not Netlify)
- Cart persists across all pages via browser storage
