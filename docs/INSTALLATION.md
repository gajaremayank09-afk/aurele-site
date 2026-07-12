# Installation Guide

This guide gets you from "downloaded the template" to "live on the internet" in about 10 minutes. No coding experience required.

## What you'll need
- A free [GitHub](https://github.com) account
- A free [Cloudflare](https://dash.cloudflare.com/sign-up) account
- A free [DecapBridge](https://decapbridge.com) account (powers the `/admin` content manager)
- A [Stripe](https://dashboard.stripe.com) account (only needed once you're ready to accept real payments — everything else works without it)

## Step 1 — Put the code on GitHub

1. Create a new, empty repository on GitHub (don't add a README or `.gitignore` — keep it empty)
2. On your repo's page, click **"Add file" → "Upload files"**
3. Drag in every file and folder from this template
4. Scroll down, click **"Commit changes"**

## Step 2 — Deploy to Cloudflare Pages

1. Go to **dash.cloudflare.com** → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Select your repository
3. Build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`
4. Click **Save and Deploy**

Cloudflare deploys as a Worker project by default. If your live URL shows "No URLs enabled":
1. Go to **Settings → Domains & Routes**
2. Toggle **workers.dev** on

You now have a live URL like `your-project.your-subdomain.workers.dev`.

## Step 3 — Connect the CMS (DecapBridge)

1. Sign up at **decapbridge.com**
2. Click **Add Site** → select **GitHub** → enter your repo (format: `username/repo-name`)
3. Generate a GitHub access token at **github.com/settings/tokens** → **Generate new token (classic)** → check the **`repo`** scope → generate → copy it
4. Paste that token into DecapBridge's "GitHub access token" field
5. For **"Your Decap CMS login URL"**, enter: `https://your-site-url/admin/index.html`
6. Choose **Auth type: PKCE**, fill in a Site Name, click **Create site**
7. Go to **Manage collaborators** → invite your own email → check your inbox → confirm → set up your login
8. Go to the **config.yml** tab on DecapBridge — copy the generated `backend:` block
9. In your repo, open `admin/config.yml` and replace the placeholder `backend:` section (the one with `YOUR-GITHUB-USERNAME` and `YOUR-SITE-ID`) with what DecapBridge gave you
10. Commit that change

Visit `https://your-site-url/admin/` and log in — you're now managing your store's content with no code.

## Step 4 — Connect Stripe (when you're ready to sell)

1. Get your **Secret key** from **dashboard.stripe.com → Developers → API keys**
2. In Cloudflare: your Pages project → **Settings → Environment variables**
3. Add: Key = `STRIPE_SECRET_KEY`, Value = your key, scope = Production
4. Redeploy (Cloudflare usually does this automatically after saving)

Test with Stripe's test card `4242 4242 4242 4242`, any future expiry, any CVC — while using a `sk_test_...` key.

## Step 5 — Make it yours

Head to **[CUSTOMIZATION.md](CUSTOMIZATION.md)** for renaming the brand, adding your products, and changing colors/fonts — all from the CMS.

## Troubleshooting

See **[FAQ.md](FAQ.md)** for the most common setup issues.
