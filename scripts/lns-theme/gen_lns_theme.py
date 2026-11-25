"""Generate an opt-in colour/font theme for The Lean Nervous System page.

Reads every stylesheet that styles the page, keeps only the rules that target the
page (lns-*/ytc-* classes) and only their colour and font declarations, recolours
them (teal -> navy, sage -> cream, gold -> EHS gold, serif headings -> Poppins) and
scopes each copy under .lns-page[data-theme="ehs"].  The original CSS is untouched,
so setting the page's theme back to "original" restores the current design exactly.
"""
import colorsys, re, sys

SCOPE = '.lns-page[data-theme="ehs"]'
ATTR = '[data-theme="ehs"]'
RELEVANT = re.compile(r'\.(lns|ytc)[\w-]*')
BRAND = re.compile(r'lnsbuy-mark|country-flag|social-link')   # store and brand logos keep their own colours
COLOR_PROPS = re.compile(r'^(-webkit-)?(color|background(-color|-image)?|border(-[a-z-]+)?|outline(-color)?|box-shadow|text-shadow|fill|stroke|filter|text-fill-color|text-decoration(-color)?|caret-color|accent-color|column-rule(-color)?)$')
SERIF = re.compile(r'(Georgia|Times|Didot|Bodoni|Newsreader|serif)', re.I)

# ---------- tiny CSS parser ----------
def strip_comments(css):
    return re.sub(r'/\*.*?\*/', '', css, flags=re.S)

def parse(css):
    """Return list of (prelude, body) at this level; nested at-rules keep raw body."""
    out, i, n = [], 0, len(css)
    while i < n:
        j = css.find('{', i)
        if j < 0:
            break
        prelude = css[i:j].strip()
        depth, k = 1, j + 1
        q = None
        while k < n and depth:
            ch = css[k]
            if q:
                if ch == q and css[k-1] != '\\':
                    q = None
            elif ch in '"\'':
                q = ch
            elif ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
            k += 1
        body = css[j+1:k-1]
        # a prelude may contain leftover ';' statements (e.g. @import); keep the last part
        if ';' in prelude and not prelude.startswith('@media'):
            prelude = prelude.split(';')[-1].strip()
        out.append((prelude, body))
        i = k
    return out

def split_top(s, sep):
    parts, depth, cur, q = [], 0, '', None
    for ch in s:
        if q:
            cur += ch
            if ch == q:
                q = None
            continue
        if ch in '"\'':
            q = ch
        elif ch in '([':
            depth += 1
        elif ch in ')]':
            depth -= 1
        if ch == sep and depth == 0:
            parts.append(cur)
            cur = ''
        else:
            cur += ch
    if cur.strip():
        parts.append(cur)
    return parts

# ---------- colours ----------
def clamp(x):
    return max(0.0, min(1.0, x))

LINE_MODE = [False]

def transform_rgb(r, g, b):
    h, l, s = colorsys.rgb_to_hls(r/255, g/255, b/255)
    deg = h * 360
    if s < 0.04:
        # neutral greys / white / black: deepen pure blacks to navy-black, keep the rest
        if l < 0.1:
            h, s, l = 216/360, 0.55, max(l, 0.045)
        return hls(h, l, s)
    if 150 <= deg <= 232:                       # teal / blue-green / slate family -> navy
        h = 216/360
        s = clamp(s * 1.25 + 0.08) if l < 0.5 else clamp(s * 1.1 + 0.04)
        return hls(h, l, s)
    if 70 <= deg < 150:                         # sage greens
        if l > 0.75:
            if LINE_MODE[0]:
                return (228, 220, 203)          # EHS sand hairline #E4DCCB
            return (247, 244, 237) if l < 0.93 else (250, 248, 242)
        h = 216/360
        return hls(h, l, clamp(s * 1.2 + 0.08))
    if 25 <= deg <= 58 and s >= 0.3 and l < 0.86:   # golds and bronzes -> EHS gold (#D6AD62 / #9B7424)
        if l > 0.55:
            return hls(39/360, clamp(l - 0.05), min(s, 0.6))
        return hls(40/360, l, min(s, 0.62))
    return hls(h, l, s)

def hls(h, l, s):
    r, g, b = colorsys.hls_to_rgb(h, l, s)
    return (round(r*255), round(g*255), round(b*255))

def fmt(rgb, a=None, hex_out=True):
    if a is None or a >= 1:
        return '#%02x%02x%02x' % rgb
    return 'rgba(%d, %d, %d, %s)' % (*rgb, ('%.3f' % a).rstrip('0').rstrip('.'))

HEX = re.compile(r'#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b')
RGB = re.compile(r'rgba?\(\s*([\d.]+%?)[\s,]+([\d.]+%?)[\s,]+([\d.]+%?)(?:\s*[,/]\s*([\d.]+%?))?\s*\)')

def recolor(value):
    def hx(m):
        v = m.group(1)
        if len(v) in (3, 4):
            v = ''.join(c*2 for c in v)
        r, g, b = int(v[0:2], 16), int(v[2:4], 16), int(v[4:6], 16)
        a = int(v[6:8], 16)/255 if len(v) == 8 else None
        return fmt(transform_rgb(r, g, b), a)
    def rg(m):
        def ch(x):
            return float(x[:-1])*2.55 if x.endswith('%') else float(x)
        r, g, b = ch(m.group(1)), ch(m.group(2)), ch(m.group(3))
        a = m.group(4)
        a = (float(a[:-1])/100 if a and a.endswith('%') else float(a)) if a else None
        return fmt(transform_rgb(r, g, b), a)
    value = HEX.sub(hx, value)
    return RGB.sub(rg, value)

# ---------- selectors ----------
def scope_selector(sel):
    sel = sel.strip()
    if re.search(r'\.lns-page(?![\w-])', sel):
        return re.sub(r'\.lns-page(?![\w-])', SCOPE, sel, count=1)
    m = re.match(r'^((?:html)?\s*(?:body(?::not\(#_\))?)?)\s*(.*)$', sel)
    lead, rest = (m.group(1).strip(), m.group(2)) if m else ('', sel)
    # every copy gains exactly one attribute selector of specificity, so the original
    # cascade order between rules is preserved; only .lns-page carries data-theme
    if lead:
        return f'{lead} {ATTR} {rest}'.strip()
    return f'{ATTR} {sel}'

HEADING_HINT = re.compile(r'(h1|h2|h3|title|heading|mantra|quote|statement|deck-message|lead)', re.I)

def convert_rule(prelude, body):
    sels = [s for s in split_top(prelude, ',') if s.strip()]
    if not any(RELEVANT.search(s) for s in sels):
        return None
    sels = [s for s in sels if RELEVANT.search(s) and not BRAND.search(s)]
    if not sels:
        return None
    decls = []
    serif_swapped = False
    changed = False
    for d in split_top(body, ';'):
        if ':' not in d:
            continue
        prop, val = d.split(':', 1)
        prop, val = prop.strip().lower(), val.strip()
        if prop == 'font-family':
            imp = ' !important' if '!important' in val else ''
            if SERIF.search(val.split(',')[0]):
                decls.append(f'font-family: Poppins, Arial, Helvetica, sans-serif{imp}')
                decls.append(f'font-style: normal{imp}')
                serif_swapped = changed = True
            else:
                decls.append(f'font-family: {val}')
            continue
        if COLOR_PROPS.match(prop) or prop.startswith('--'):
            # copy every colour declaration (changed or not) so the themed cascade
            # resolves exactly like the original one
            LINE_MODE[0] = ('border' in prop or 'outline' in prop or 'line' in prop or 'rule' in prop)
            new = recolor(val)
            LINE_MODE[0] = False
            decls.append(f'{prop}: {new}')
            changed = changed or new != val
    if serif_swapped and any(HEADING_HINT.search(s) for s in sels):
        imp = ' !important'
        decls.append('letter-spacing: -0.015em' + imp)
    if not decls:
        return None
    # rules whose copies would be identical still matter for the cascade only if a
    # changed rule could otherwise beat them, so keep them all
    scoped = ',\n'.join(scope_selector(s) for s in sels)
    return scoped + ' {\n  ' + ';\n  '.join(decls) + ';\n}'

def walk(css, indent=''):
    out = []
    for prelude, body in parse(css):
        if prelude.startswith('@media') or prelude.startswith('@supports'):
            inner = walk(body, indent + '  ')
            if inner:
                out.append(prelude + ' {\n' + '\n'.join('  ' + line for blk in inner for line in blk.split('\n')) + '\n}')
        elif prelude.startswith('@'):
            continue
        else:
            r = convert_rule(prelude, body)
            if r:
                out.append(r)
    return out

def main(paths, dest):
    blocks = []
    for p in paths:
        css = strip_comments(open(p, encoding='utf-8').read())
        got = walk(css)
        if got:
            blocks.append(f'/* ---- from {p.split("/website/")[-1]} ({len(got)} rules) ---- */')
            blocks.extend(got)
    header = '''/* =====================================================================
   The Lean Nervous System — "EHS" theme (navy, cream & gold; Poppins)
   Generated from the page's own stylesheets: only colours and fonts are
   changed, layout is untouched. Active only when the page root has
   data-theme="ehs" (see LNS_THEME in app/lean-nervous-system/page.tsx).
   Set LNS_THEME to "original" to restore the current design exactly.
   ===================================================================== */
'''
    extras = open(__file__.replace('gen_lns_theme.py', 'lns_theme_extras.css'), encoding='utf-8').read()
    open(dest, 'w', encoding='utf-8').write(header + '\n\n'.join(blocks) + '\n\n' + extras)
    print('rules:', sum(1 for b in blocks if not b.startswith('/*')), 'bytes:', len(header + '\n\n'.join(blocks)))

if __name__ == '__main__':
    main(sys.argv[2:], sys.argv[1])
