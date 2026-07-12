# Customization Guide

Everything below is done from `/admin` — no code editing required, unless noted.

## Renaming your brand

The brand name "Aurèle" appears in a few places:
- `admin/config.yml` → **Logo & Site Text** → **Text Wordmark** field (this is CMS-editable, changes the header/footer instantly)
- Page `<title>` tags in `index.html`, `category.html`, `product.html` (requires editing the HTML directly — search for "AURÈLE")
- The `<h1>`/copyright text is pulled from `content.json`, editable via the CMS

## Colors and fonts

Go to `/admin` → **Site Design → Colors & Fonts**:
- **Color Theme**: pick from 5 pre-matched palettes (Midnight Gold, Charcoal Rose, Ink Navy, Espresso Gold, Ivory Light). Each is chosen so text always stays readable — there's no way to accidentally pick an unreadable combination.
- **Heading Font** / **Body Font**: pick from a curated, pre-loaded list. Because these fonts are already loaded in every page's `<head>`, switching is instant with no extra network request.

**Adding a new font**: open the Google Fonts `<link>` tag in `index.html`, `category.html`, and `product.html` (search for `fonts.googleapis.com`), add your font family to the URL, then add it as an option in `admin/config.yml` under `heading_font` or `body_font`.

**Adding a new color theme**: open `assets/theme.js`, find the `COLOR_PRESETS` object near the top, and add a new named entry with `ink` (background), `bone` (text), and `gold` (accent) hex values. Then add that name as an option in `admin/config.yml` under `color_theme`.

## Logo

`/admin` → **Site Design → Logo & Site Text** → **Logo Image**. Upload an image to replace the text wordmark in the header and footer everywhere on the site. Leave it empty to keep the text version.

## Homepage text

`/admin` → **Site Design → Logo & Site Text** covers every major homepage headline and paragraph: the hero eyebrow/headline/subtext, the "House Architecture" section, the "Private Consultation" section, and the footer tagline/copyright.

## Products

`/admin` → **Products**:
- Each product has a name, category, price, description, and a list of photos (the first photo is used as the cover image everywhere; all of them appear in a gallery on the product's own page)
- **Adding a product**: click "Add" in the Products list, fill in the fields
- **Removing a product**: open it, click the trash/delete icon

## Categories

`/admin` → **Categories**:
- Each category needs a short lowercase **ID** (used in the page URL, e.g. `manteaux` → `/category.html?cat=manteaux`), a **Display Name**, and an optional **Tagline**

**Important**: after adding a new category, its ID needs to be added as an option in `admin/config.yml`, under the product `cat` field's `options:` list — this is a Decap CMS limitation (dropdown options can't be pulled dynamically from another file), so this one step needs a direct edit to `admin/config.yml`.

## Homepage photos

`/admin` → **Homepage Photos**:
- **Hero Slideshow Photos**: one or more images that auto-crossfade behind the homepage headline. Leave empty to keep the dark gradient look.
- **Lookbook Image 1 / 2**: the two large photos below the product grid
- **"House Architecture" Section Image**: the photo next to that section's text

## Legal pages

`shipping.html`, `returns.html`, `privacy.html`, `terms.html` are plain HTML with placeholder policies written in. Edit the text directly in each file. These are starting points, not legal advice — have them reviewed by a lawyer before relying on them for a real store.

## Contact email

Search the project for `contact@aurele.luxury` and replace it with your real address (appears in the legal pages and homepage footer).
