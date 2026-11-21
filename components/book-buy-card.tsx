import { ArrowRight, ArrowUpRight } from "lucide-react";
import "./book-buy-card.css";

const AMAZON_INDIA_URL = "https://amzn.in/d/0iodZYXL";

/* Compact purchase card for The Lean Nervous System, sized for a sidebar slot. */
export function BookBuyCard() {
  return <aside className="book-buy-card" aria-labelledby="book-buy-card-title">
    <div className="book-buy-card-art" aria-hidden="true">
      <img src="/art/lns-book-cutout.webp" alt="" loading="lazy" decoding="async" />
    </div>

    <div className="book-buy-card-copy">
      <p className="book-buy-card-label">New book by Rajesh Koul</p>
      <h3 id="book-buy-card-title">The Lean Nervous System</h3>
      <p className="book-buy-card-sub">Building Mature, Resilient, and World-Class Organisations</p>
    </div>

    <div className="book-buy-card-actions">
      <a className="book-buy-card-primary" href={AMAZON_INDIA_URL} target="_blank" rel="noopener noreferrer">
        Buy on Amazon.in <ArrowUpRight aria-hidden="true" />
      </a>
      <a className="book-buy-card-secondary" href="/lean-nervous-system#purchase-options">
        Other countries &amp; Kindle <ArrowRight aria-hidden="true" />
      </a>
    </div>
  </aside>;
}
