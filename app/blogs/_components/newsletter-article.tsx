import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { articleJsonLd, jsonLdGraph } from "@/lib/seo";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import newsletterData from "../_data/newsletters.json";

type NewsletterSection = {
  number: string;
  title: string;
  paragraphs: string[];
};

export type Newsletter = {
  slug: string;
  category: string;
  issue: string;
  image: string;
  readTime: string;
  cardTitle: string;
  title: string;
  subtitle: string;
  excerpt: string;
  sections: NewsletterSection[];
};

export function getNewsletter(slug: string) {
  return (newsletterData as Newsletter[]).find((newsletter) => newsletter.slug === slug)!;
}

export function NewsletterArticle({ newsletter }: { newsletter: Newsletter }) {
  return <>
    <SiteHeader />
    <main className="article-page source-article-page newsletter-article-page">
      <JsonLd data={jsonLdGraph(articleJsonLd({ title: newsletter.title, description: newsletter.excerpt, path: `/blogs/${newsletter.slug}`, image: newsletter.image }))} />
      <div className="article-hero-stage">
        <section className="article-hero source-article-hero source-article-hero--editorial newsletter-article-hero">
          <Image src={newsletter.image} alt="" fill priority sizes="100vw" />
          <div className="article-image-label">
            <p>{newsletter.issue}</p>
            <strong>{newsletter.cardTitle}</strong>
          </div>
          <h1 className="sr-only">{newsletter.title}</h1>
          <a className="article-back source-article-back" href="/blogs"><ArrowLeft aria-hidden="true" /> Back to Blogs</a>
          <div className="source-article-meta">
            <span>{newsletter.category}</span><i />
            <span>By <b>Rajesh Koul</b></span><i />
            <span><Clock3 aria-hidden="true" /> {newsletter.readTime}</span>
          </div>
        </section>
      </div>

      <div className="article-shell source-article-shell">
        <aside className="article-toc">
          <p>IN THIS ISSUE</p>
          <nav>{newsletter.sections.map((section, index) =>
            <a key={`${section.number}-${section.title}`} href={`#section-${index + 1}`}>
              <i>{section.number}</i><span>{section.title}</span>
            </a>
          )}</nav>
        </aside>

        <article className="article-content">
          <section className="article-summary newsletter-summary">
            <p className="article-eyebrow">{newsletter.issue}</p>
            <h2>{newsletter.title}</h2>
            <p>{newsletter.subtitle}</p>
          </section>

          {newsletter.sections.map((section, index) =>
            <section className="article-section" id={`section-${index + 1}`} key={`${section.number}-${section.title}`}>
              <header><span>{section.number}</span><h2>{section.title}</h2></header>
              {section.paragraphs.map((paragraph, paragraphIndex) =>
                <NewsletterParagraph key={paragraphIndex} text={paragraph} />
              )}
            </section>
          )}

          <section className="article-related newsletter-related">
            <div>
              <p className="article-eyebrow">THE ORGANISATION LENS</p>
              <h2>Continue exploring ideas on organisational health and maturity</h2>
              <p>Return to the full collection of articles, perspectives and newsletters.</p>
            </div>
            <a href="/blogs">All insights <ArrowUpRight aria-hidden="true" /></a>
          </section>

          <footer className="article-author">
            <div className="article-author-mark">RK</div>
            <div><p>Written by</p><h2>Rajesh Koul</h2><span>Transformation, Innovation and DigiLean Thought Leadership</span></div>
          </footer>
        </article>
      </div>
    </main>
    <SiteFooter />
  </>;
}

function NewsletterParagraph({ text }: { text: string }) {
  const colon = text.indexOf(":");
  const labelled = colon > 0 && colon < 48 && text.length > 70;
  const short = text.length < 72 && !/[.!?]$/.test(text);

  if (text.startsWith("— ")) return <p className="newsletter-signature">{text}</p>;
  if (short) return <h3 className="article-subheading">{text}</h3>;
  if (labelled) return <div className="article-labelled-point"><strong>{text.slice(0, colon)}</strong><p>{text.slice(colon + 1).trim()}</p></div>;
  if (text.endsWith("?") && text.length < 180) return <blockquote className="article-pullquote"><span>“</span><p>{text}</p></blockquote>;
  return <p>{text}</p>;
}
