# The Lean Nervous System page — theme switch

The page has two looks:

- **original** — the teal / gold / sage design.
- **ehs** — navy, cream & gold (matching ehs.rajeshkoul.com) with Poppins headings (matching the Home page).

## Switch theme
In `app/lean-nervous-system/page.tsx`, change one word:

```ts
const LNS_THEME: "ehs" | "original" = "ehs";   // or "original"
```

The original design's CSS is never edited. The "ehs" look lives only in
`components/lns-theme-ehs.css`, and it applies only when the page has `data-theme="ehs"`.

## Regenerate the ehs theme (only needed after changing the page's original CSS)
From the website folder:

```
python3 scripts/lns-theme/gen_lns_theme.py components/lns-theme-ehs.css app/globals.css app/mobile-polish.css app/mobile-refine.css components/lns-book-story-mobile.css components/lns-purchase.css components/youtube-feed.css app/site-polish.css
```

Hand-tuned adjustments (hero navy wash, heading sizes, header/footer navy, gold buttons) are in
`scripts/lns-theme/lns_theme_extras.css` and are appended automatically.
