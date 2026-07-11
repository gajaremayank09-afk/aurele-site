# AURÈLE — Launch Checklist

## Already done for you
- ✅ Real Stripe Checkout wiring — just needs your API key (see below)
- ✅ CMS connected via DecapBridge with your real repo and site ID
- ✅ Shipping, Returns, Privacy, and Terms pages, linked in the footer
- ✅ Full Site Design controls — logo, colors, fonts, and homepage text, all editable at `/admin`
- ✅ Category pages and product gallery pages, with a fixed link bug
- ✅ Security headers and `robots.txt`

## Still to do

### 1. Connect Stripe (only when you're ready to accept real payments)
1. Create a Stripe account at https://dashboard.stripe.com
2. Go to **Developers → API keys** and copy your **Secret key**
3. In Netlify: **Site settings → Environment variables → Add a variable**
   - Key: `STRIPE_SECRET_KEY`
   - Value: your Stripe secret key
4. Redeploy the site after adding the variable

### 2. Replace the placeholder email
Search the project for `concierge@aurele.luxury` (in `index.html`, `shipping.html`, `returns.html`, `privacy.html`, `terms.html`) and swap in your real order/contact email.

### 3. Update robots.txt
Replace `YOUR-SITE-DOMAIN` in `robots.txt` with your real Netlify domain.

### 4. Review legal pages
`shipping.html`, `returns.html`, `privacy.html`, and `terms.html` are solid starting points, but not legal advice — have a lawyer review them before taking real orders, especially for international shipping or EU/UK customers (GDPR).

## Using the CMS at `/admin`

- **Site Design (Logo, Colors, Fonts)**
  - *Colors & Fonts* — pick from 5 pre-matched color themes (always readable, no risk of an unreadable combination), plus a heading font and body font from a curated, pre-loaded list.
  - *Logo & Site Text* — upload a logo (replaces the text "Aurèle" wordmark everywhere), and edit every major headline/paragraph on the homepage.
- **Categories** — add, rename, or remove categories. Each needs a short lowercase **ID** (e.g. `manteaux`).
- **Products** — multiple photos per product, category assignment, price, description.
  - ⚠️ If you add a brand-new category, also add its ID to the `options:` list under the product **Category** field in `admin/config.yml`, or it won't show up as a choice.
- **Homepage Photos** — hero slideshow, the two lookbook photos, and the "House Architecture" section photo.

## How the pages work
- `/category.html?cat={id}` — one category's products
- `/product.html?id={id}` — one product with its full photo gallery
- Cart persists across all pages via browser storage
