# Frequently Asked Questions

**Do I need to know how to code?**
No. Day-to-day store management (products, photos, colors, fonts, text) is all done through the `/admin` panel. Initial setup involves some copy/paste of configuration values, but no writing code.

**Do I need Cloudflare specifically, or can I use another host?**
The template is built as static HTML/CSS/JS plus one serverless function for Stripe checkout. It will run on any static host. The checkout function is written for Cloudflare Pages Functions specifically — if you use a different host (Netlify, Vercel, etc.), that one file (`functions/api/create-checkout-session.js`) needs to be rewritten in that platform's function format. Everything else is portable as-is.

**Why does clicking checkout fail?**
You haven't added your Stripe secret key yet. See the Installation Guide, Step 4. Until that's set, the checkout button will show an error — this is expected, not a bug.

**Can I sell more than one product category?**
Yes — categories are fully CMS-managed. See CUSTOMIZATION.md for adding new ones.

**Can I use my own domain instead of the free `.pages.dev` / `.workers.dev` one?**
Yes — Cloudflare Pages supports custom domains under **Settings → Domains**. This is unrelated to the template itself.

**The CMS login isn't working.**
Double-check:
1. `admin/config.yml` has your real repo name and Site ID (not the `YOUR-GITHUB-USERNAME` / `YOUR-SITE-ID` placeholders)
2. The "Decap CMS login URL" registered in your DecapBridge dashboard exactly matches your live site's `/admin/index.html` URL
3. You've accepted your own collaborator invite in DecapBridge's "Manage collaborators" tab

**Can I change the fonts to ones not in the pre-loaded list?**
Yes — see the "Adding a new font" section in CUSTOMIZATION.md. It's a small code edit (adding a Google Fonts URL and a config option), not a redesign.

**Is the cart saved if someone closes the tab?**
Yes — the cart is stored in the browser's local storage and persists across page visits and browser restarts (on the same device/browser).

**Does this collect customer data or send anything to a third party besides Stripe?**
No backend database is included. Order/payment data is handled entirely by Stripe. There is no separate customer data collection built into the template.

**Can I resell sites built from this template to my own clients?**
Refer to the specific license you purchased — see LICENSE for what's included with your purchase.
