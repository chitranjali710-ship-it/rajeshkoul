import { ArrowRight, BookOpen } from "lucide-react";
import "./library-hero.css";

type Cover = { cover: string; title: string };

/* Light thumbnails of each cover live in /art/covers/<name>.webp */
const thumb = (cover: string) => `/art/covers/${cover.split("/").pop()!.replace(/\.(jpe?g|png|webp)$/i, "")}.webp`;

function CoverImage({ book, eager }: { book: Cover; eager?: boolean }) {
  return <span className="lh-cover">
    <img src={thumb(book.cover)} alt="" loading={eager ? "eager" : "lazy"} decoding="async" />
  </span>;
}

/*
 * Book Review hero — "the reading wall": the real covers of every reviewed book
 * drift past in slow columns (rows on phones). Decorative only; the list below
 * links each book. Motion stops for visitors who prefer reduced motion.
 */
export function LibraryHero({ books }: { books: Cover[] }) {
  const columns = [0, 1, 2, 3].map(c => books.filter((_, i) => i % 4 === c));
  const half = Math.ceil(books.length / 2);
  const rows = [books.slice(0, half), books.slice(half)];

  return <section className="lh" aria-labelledby="book-review-title">
    <div className="lh-inner">
      <div className="lh-copy">
        <p className="lh-kicker">BOOKS WORTH SHARING</p>
        <h1 id="book-review-title">Ideas That Deserve <span>to Be Passed On</span></h1>
        <p className="lh-lead">A curated collection of books that have influenced my thinking on Lean, Strategy, Transformation, Leadership, Innovation, and Business.</p>
        <div className="lh-actions">
          <a className="lh-cta" href="#book-review-list">Explore My Library <ArrowRight aria-hidden="true" /></a>
          <div className="lh-count" aria-label={`${books.length} books reviewed`}>
            <BookOpen aria-hidden="true" />
            <strong>{books.length}</strong>
            <span>Books<br />Reviewed</span>
          </div>
        </div>
      </div>

      <div className="lh-wall" aria-hidden="true">
        <div className="lh-wall-tilt">
          {columns.map((column, c) => <div className={`lh-col lh-col-${c}`} key={c}>
            <div className="lh-track">
              {[...column, ...column].map((book, i) => <CoverImage book={book} eager={i < 4} key={`${book.cover}-${i}`} />)}
            </div>
          </div>)}
        </div>
      </div>

      <div className="lh-rows" aria-hidden="true">
        {rows.map((row, r) => <div className={`lh-row lh-row-${r}`} key={r}>
          <div className="lh-track">
            {[...row, ...row].map((book, i) => <CoverImage book={book} key={`${book.cover}-${i}`} />)}
          </div>
        </div>)}
      </div>
    </div>
  </section>;
}
