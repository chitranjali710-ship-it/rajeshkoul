import { SiteFooter, SiteHeader } from "@/components/site-shell";
import "./legal-page.css";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

type Props = {
  eyebrow: string;
  title: string;
  intro: React.ReactNode;
  updated: string;
  summary?: { title: string; points: React.ReactNode[] };
  sections: LegalSection[];
  related: { href: string; label: string };
};

/* Shared layout for the Privacy Policy and Terms of Use pages. */
export function LegalPage({ eyebrow, title, intro, updated, summary, sections, related }: Props) {
  return <>
    <SiteHeader />
    <main className="legal-page">
      <header className="legal-hero">
        <p className="legal-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="legal-intro">{intro}</div>
        <p className="legal-meta">Last updated: {updated} <i aria-hidden="true" /> <a href={related.href}>{related.label}</a></p>
      </header>

      <div className="legal-body">
        <nav className="legal-toc" aria-label="On this page">
          <details open>
            <summary>On this page</summary>
            <ol>
              {sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}
            </ol>
          </details>
        </nav>

        <article className="legal-content">
          {summary && <aside className="legal-summary" aria-label={summary.title}>
            <h2>{summary.title}</h2>
            <ul>{summary.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </aside>}

          {sections.map((s, i) => <section className="legal-section" id={s.id} key={s.id} aria-labelledby={`${s.id}-title`}>
            <h2 id={`${s.id}-title`}><span>{String(i + 1).padStart(2, "0")}</span>{s.title}</h2>
            {s.body}
          </section>)}
        </article>
      </div>
    </main>
    <SiteFooter />
  </>;
}
