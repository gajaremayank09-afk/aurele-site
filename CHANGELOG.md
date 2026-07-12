# Changelog

All notable changes to this template are documented here.

## [1.1.0] — Marketplace Release

### Added
- Loading skeleton states on the home and category product grids
- Distinct error states with a "Try Again" retry action, separate from genuine empty-category states
- Full accessibility pass: skip-to-content link, visible keyboard focus states, `aria-label`s on all icon-only buttons (cart close, quantity +/−, gallery arrows)
- SEO meta descriptions, canonical tag, and Open Graph / Twitter Card tags on every page, with per-product dynamic descriptions on product pages
- Favicon set (16px, 32px, 180px Apple touch icon, 512px, and multi-size `.ico`)
- Social preview image (1200×630) for link previews on social/messaging apps
- Semantic `<main>` landmark added to every page
- Card hover lift + shadow depth, and press feedback on all buttons
- Complete documentation set: Installation Guide, Customization Guide, FAQ, this Changelog, and LICENSE

### Fixed
- Product links previously depended on a redirect rule that didn't apply reliably, causing "piece not found" errors — links now go directly to `product.html?id=` and `category.html?cat=`
- A stray escaped character was breaking the Google Fonts URL on every page, silently falling back to system fonts for several font weights
- Cart state now persists correctly across all pages via browser storage

### Changed
- Migrated Stripe checkout from a Netlify Function to a dependency-free Cloudflare Pages Function
- All French-language decorative phrases replaced with English equivalents (brand name unchanged)
- `admin/config.yml` credentials reset to placeholders for template distribution — buyers configure their own DecapBridge/GitHub connection during install

## [1.0.0] — Initial Build

- Home, Category, and Product pages
- Product catalogue and category management via Decap CMS
- Multi-image product galleries
- Homepage hero slideshow, lookbook, and "House Architecture" section, all CMS-editable
- Stripe Checkout integration with server-side price verification
- Shipping, Returns, Privacy, and Terms pages
- Site-wide color theme and font picker via CMS
