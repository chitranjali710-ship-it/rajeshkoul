/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production RSC navigation is incompatible with next/link in this deployment. */
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import "@/components/not-found.css";

const destinations: [string, string, string][] = [
  ["/home", "Home", "Who I am and the work I do"],
  ["/lean-nervous-system", "The Lean Nervous System", "The book, its framework and where to buy it"],
  ["/blogs", "Blogs", "Ideas and perspectives on transformation"],
  ["/book-review", "Book Review", "Reviews of the books that shaped my thinking"],
  ["/contact", "Let's Connect", "Write to me directly"],
];

export default function NotFound() {
  return <>
    <title>Page not found | Rajesh Koul</title>
    <meta name="robots" content="noindex" />
    <SiteHeader />
    <main className="nf-page" id="main">
      <div className="nf-inner">
        <p className="nf-code" aria-hidden="true">404</p>
        <h1>This page isn’t here.</h1>
        <p className="nf-lead">The link may be out of date, or the page may have moved when the website was rebuilt. Everything is still here — pick up from one of these.</p>
        <nav className="nf-links" aria-label="Main pages">
          <ul>
            {destinations.map(([href, label, note]) => <li key={href}>
              <a href={href}><strong>{label}</strong><span>{note}</span></a>
            </li>)}
          </ul>
        </nav>
        <p className="nf-help">Followed a link from somewhere else and expected something specific? <a href="mailto:author.rajeshkoul@gmail.com?subject=Broken%20link%20on%20rajeshkoul.com">Tell me which one</a> and I’ll fix it.</p>
      </div>
    </main>
    <SiteFooter />
  </>;
}
