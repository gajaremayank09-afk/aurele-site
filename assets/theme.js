/* AURÈLE theme + content loader — runs on every page.
   Applies colors/fonts from theme.json and the logo/text from content.json
   so the whole site can be restyled and rewritten from the CMS, no code edits needed. */

// Pre-matched color combinations, so no CMS choice can ever produce unreadable text.
const COLOR_PRESETS = {
  "Midnight Gold":  { ink: '#0A0A0A', bone: '#F5F2EB', gold: '#D4AF37' },
  "Charcoal Rose":  { ink: '#151515', bone: '#F5F0ED', gold: '#C99383' },
  "Ink Navy":       { ink: '#0A0E1A', bone: '#F0F2F5', gold: '#C9A227' },
  "Espresso Gold":  { ink: '#1C1510', bone: '#F5EDE0', gold: '#D4AF37' },
  "Ivory Light":    { ink: '#F5F2EB', bone: '#171512', gold: '#9C7A3C' }
};

async function applyThemeAndContent() {
  const [theme, content] = await Promise.all([
    loadJSON('/theme.json'),
    loadJSON('/content.json')
  ]);

  if (theme) {
    const root = document.documentElement.style;
    const preset = COLOR_PRESETS[theme.color_theme];
    if (preset) {
      root.setProperty('--ink', preset.ink);
      root.setProperty('--bone', preset.bone);
      root.setProperty('--gold', preset.gold);
    }
    if (theme.heading_font) root.setProperty('--font-heading', `'${theme.heading_font}', serif`);
    if (theme.body_font) root.setProperty('--font-body', `'${theme.body_font}', sans-serif`);
  }

  if (content) {
    // Logo — applies on every page's header (and footer, on the homepage)
    const logoSlots = document.querySelectorAll('#site-logo-slot, #foot-logo-slot');
    logoSlots.forEach(slot => {
      if (content.site_logo) {
        slot.innerHTML = `<img src="${content.site_logo}" alt="${content.site_name || 'Logo'}" style="height:36px; width:auto; display:block;">`;
      } else if (content.site_name) {
        slot.textContent = content.site_name;
      }
    });

    // Homepage-only text blocks — safe to skip if the element isn't on this page
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el && value) el.textContent = value;
    };
    const setHTML = (id, value) => {
      const el = document.getElementById(id);
      if (el && value) el.innerHTML = value;
    };

    setText('hero-subtext', content.hero_subtext);
    setText('atelier-heading', content.atelier_heading);
    setText('atelier-para1', content.atelier_paragraph);
    setText('private-heading', content.private_heading);
    setText('private-para', content.private_paragraph);
    setText('footer-tagline', content.footer_tagline);
    setText('footer-copyright', content.footer_copyright);

    // Hero eyebrow keeps its little gold rule element, so only replace the text part
    const eyebrowEl = document.getElementById('hero-eyebrow');
    if (eyebrowEl && content.hero_eyebrow) {
      eyebrowEl.innerHTML = `<span class="rule"></span>${content.hero_eyebrow}`;
    }

    // Hero headline needs special handling — it's animated word-by-word, so we
    // update the text FIRST, then let the page's own splitIntoWords() run on it.
    const headlineEl = document.getElementById('hero-headline');
    if (headlineEl && content.hero_headline) {
      setHTML('hero-headline', content.hero_headline.split('\n').join('<br>'));
    }
  }
}
