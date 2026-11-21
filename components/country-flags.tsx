/*
 * Hand-drawn national flags (60 × 40 viewBox) for the worldwide store picker.
 * SVG rather than emoji, because Windows renders flag emoji as plain letters.
 * Flags are simplified for small sizes; detailed coats of arms are reduced to
 * a mark that reads at 20–40px.
 */

type FlagCode =
  | "IN" | "US" | "GB" | "CA" | "AU" | "DE" | "FR" | "IT" | "ES" | "NL" | "SE" | "PL"
  | "BE" | "IE" | "JP" | "SG" | "AE" | "SA" | "BR" | "MX" | "TR" | "EG" | "ZA";

function star(cx: number, cy: number, r: number, points = 5, innerRatio = 0.4, rotation = -90) {
  const coords: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? r : r * innerRatio;
    const angle = ((rotation + (i * 180) / points) * Math.PI) / 180;
    coords.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`);
  }
  return coords.join(" ");
}

const vertical = (a: string, b: string, c: string) => <>
  <rect width="20" height="40" fill={a} />
  <rect x="20" width="20" height="40" fill={b} />
  <rect x="40" width="20" height="40" fill={c} />
</>;

const horizontal = (a: string, b: string, c: string) => <>
  <rect width="60" height="13.34" fill={a} />
  <rect y="13.33" width="60" height="13.34" fill={b} />
  <rect y="26.66" width="60" height="13.34" fill={c} />
</>;

const unionJack = <>
  <rect width="60" height="40" fill="#012169" />
  <path d="M0 0 60 40M60 0 0 40" stroke="#fff" strokeWidth="8" />
  <path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" strokeWidth="2.6" />
  <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="12" />
  <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="7" />
</>;

const usStars = (() => {
  const dots: React.ReactNode[] = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 6; col++) {
      const offset = row % 2 ? 2 : 0;
      if (row % 2 && col === 5) continue;
      dots.push(<polygon key={`${row}-${col}`} points={star(2.4 + col * 3.9 + offset, 2.4 + row * 4.15, 1.05)} fill="#fff" />);
    }
  }
  return dots;
})();

const indiaSpokes = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * Math.PI) / 12;
  const dx = Math.cos(angle) * 4.6;
  const dy = Math.sin(angle) * 4.6;
  return <path key={i} d={`M${30 - dx} ${20 - dy}L${30 + dx} ${20 + dy}`} />;
});

const flags: Record<FlagCode, React.ReactNode> = {
  IN: <>
    {horizontal("#FF9933", "#FFFFFF", "#138808")}
    <g stroke="#000080" fill="none" strokeWidth="0.55">
      <circle cx="30" cy="20" r="5" strokeWidth="0.9" />
      {indiaSpokes}
    </g>
    <circle cx="30" cy="20" r="1" fill="#000080" />
  </>,
  US: <>
    <rect width="60" height="40" fill="#fff" />
    {Array.from({ length: 7 }, (_, i) => <rect key={i} y={i * (40 / 6.5)} width="60" height={40 / 13} fill="#B22234" />)}
    <rect width="25" height={(40 / 13) * 7} fill="#3C3B6E" />
    {usStars}
  </>,
  GB: unionJack,
  CA: <>
    <rect width="60" height="40" fill="#fff" />
    <rect width="15" height="40" fill="#D52B1E" />
    <rect x="45" width="15" height="40" fill="#D52B1E" />
    <path
      fill="#D52B1E"
      d="M30 9.5l1.7 3.4 2-1-.9 5 3.3-3.6.8 1.7 3.2-.6-1.1 3.6 1.5.8-5.2 4.3.6 1.9-5.2-.6.1 5.3h-1.6l.1-5.3-5.2.6.6-1.9-5.2-4.3 1.5-.8-1.1-3.6 3.2.6.8-1.7 3.3 3.6-.9-5 2 1z"
    />
  </>,
  AU: <>
    <rect width="60" height="40" fill="#012169" />
    <svg width="30" height="20" viewBox="0 0 60 40">{unionJack}</svg>
    <polygon points={star(15, 30.5, 5, 7, 0.45)} fill="#fff" />
    <polygon points={star(45, 32.5, 2.6, 7, 0.45)} fill="#fff" />
    <polygon points={star(37.5, 18, 2.6, 7, 0.45)} fill="#fff" />
    <polygon points={star(45, 7, 2.6, 7, 0.45)} fill="#fff" />
    <polygon points={star(51.5, 15.5, 2.6, 7, 0.45)} fill="#fff" />
    <polygon points={star(48, 22.5, 1.5, 5, 0.45)} fill="#fff" />
  </>,
  DE: horizontal("#000000", "#DD0000", "#FFCE00"),
  FR: vertical("#002654", "#FFFFFF", "#CE1126"),
  IT: vertical("#009246", "#FFFFFF", "#CE2B37"),
  ES: <>
    <rect width="60" height="40" fill="#AA151B" />
    <rect y="10" width="60" height="20" fill="#F1BF00" />
    <rect x="15" y="14.5" width="6" height="11" rx="1.5" fill="#AA151B" opacity="0.85" />
  </>,
  NL: horizontal("#AE1C28", "#FFFFFF", "#21468B"),
  SE: <>
    <rect width="60" height="40" fill="#006AA7" />
    <rect x="18.75" width="7.5" height="40" fill="#FECC00" />
    <rect y="16.25" width="60" height="7.5" fill="#FECC00" />
  </>,
  PL: <>
    <rect width="60" height="20" fill="#FFFFFF" />
    <rect y="20" width="60" height="20" fill="#DC143C" />
  </>,
  BE: vertical("#000000", "#FAE042", "#ED2939"),
  IE: vertical("#169B62", "#FFFFFF", "#FF883E"),
  JP: <>
    <rect width="60" height="40" fill="#FFFFFF" />
    <circle cx="30" cy="20" r="12" fill="#BC002D" />
  </>,
  SG: <>
    <rect width="60" height="20" fill="#EF3340" />
    <rect y="20" width="60" height="20" fill="#FFFFFF" />
    <circle cx="12.5" cy="10" r="6.6" fill="#fff" />
    <circle cx="15.2" cy="10" r="6.2" fill="#EF3340" />
    {[0, 1, 2, 3, 4].map(i => {
      const angle = ((-90 + i * 72) * Math.PI) / 180;
      return <polygon key={i} points={star(20 + 3.4 * Math.cos(angle), 10.2 + 3.4 * Math.sin(angle), 1.15)} fill="#fff" />;
    })}
  </>,
  AE: <>
    <rect width="60" height="13.34" fill="#00732F" />
    <rect y="13.33" width="60" height="13.34" fill="#FFFFFF" />
    <rect y="26.66" width="60" height="13.34" fill="#000000" />
    <rect width="15" height="40" fill="#FF0000" />
  </>,
  SA: <>
    <rect width="60" height="40" fill="#006C35" />
    <g fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 18c2-3 3 2 5-1s2-4 4-1 2 3 4 0 3-3 4 0 2 2 4-1 3-2 4 1 2 2 4-1" />
      <path d="M17 13.5v4M24 12.5v4.5M33 13v4M40 12.5v4" />
    </g>
    <path d="M16 27h26" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M42 25.5v3M44 27h-2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
  </>,
  BR: <>
    <rect width="60" height="40" fill="#009C3B" />
    <polygon points="30,4.5 55,20 30,35.5 5,20" fill="#FFDF00" />
    <circle cx="30" cy="20" r="8.6" fill="#002776" />
    <path d="M21.6 18.2c5.6-1.4 11.4-.6 16.6 2.5" stroke="#fff" strokeWidth="1.5" fill="none" />
  </>,
  MX: <>
    {vertical("#006847", "#FFFFFF", "#CE1126")}
    <ellipse cx="30" cy="20.5" rx="4.2" ry="4" fill="#8C5A2B" opacity="0.9" />
    <path d="M26.3 23.2c2.4 1.6 5 1.6 7.4 0" stroke="#006847" strokeWidth="1.1" fill="none" strokeLinecap="round" />
  </>,
  TR: <>
    <rect width="60" height="40" fill="#E30A17" />
    <circle cx="22" cy="20" r="10" fill="#fff" />
    <circle cx="24.5" cy="20" r="8" fill="#E30A17" />
    <polygon points={star(34, 20, 4.4, 5, 0.4, 180)} fill="#fff" />
  </>,
  EG: <>
    {horizontal("#CE1126", "#FFFFFF", "#000000")}
    <path d="M30 15.5l2.6 1.6v4.2L30 24l-2.6-2.7v-4.2z" fill="#C09300" />
    <path d="M27.4 17.6l-2.8 1.4 2.8 1.2M32.6 17.6l2.8 1.4-2.8 1.2" stroke="#C09300" strokeWidth="1" fill="none" />
  </>,
  ZA: <>
    <rect width="60" height="20" fill="#E03C31" />
    <rect y="20" width="60" height="20" fill="#001489" />
    <path d="M-2 -1.5 28 20h34M-2 41.5 28 20" stroke="#fff" strokeWidth="13" fill="none" />
    <path d="M-2 -1.5 28 20h34M-2 41.5 28 20" stroke="#007749" strokeWidth="8" fill="none" />
    <polygon points="0,6.5 19,20 0,33.5" fill="#FFB81C" />
    <polygon points="0,10 14.5,20 0,30" fill="#000" />
  </>,
};

export type { FlagCode };

export function CountryFlag({ code, className }: { code: FlagCode; className?: string }) {
  return <span className={`country-flag${className ? ` ${className}` : ""}`} aria-hidden="true">
    <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" focusable="false">{flags[code]}</svg>
  </span>;
}
