import { ArrowUpRight } from "lucide-react";
import "./linkedin-feed.css";

const PROFILE_URL = "https://www.linkedin.com/in/rajeshkoul74/";
const HEADLINE = "Global Transformation Leader · Author, The Lean Nervous System";

type Post = { topic: string; title: string; excerpt: string; href: string };

function LinkedInMark({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>;
}

function Avatar({ size }: { size: "lg" | "sm" }) {
  return <span className={`li-avatar li-avatar--${size}`}><img src="/art/rajesh-avatar.webp" alt="" loading="lazy" decoding="async" /></span>;
}

const hashtag = (topic: string) => `#${topic.replace(/[^A-Za-z0-9 ]/g, "").split(" ").filter(Boolean).map(w => w[0].toUpperCase() + w.slice(1)).join("")}`;

/*
 * LinkedIn highlights, laid out the way LinkedIn presents a profile and its posts.
 * Posts are maintained by hand in app/blogs/page.tsx; no LinkedIn script is loaded.
 */
export function LinkedInFeed({ posts }: { posts: Post[] }) {
  return <div className="li-feed">
    <div className="li-profile">
      <a className="li-identity" href={PROFILE_URL} target="_blank" rel="noopener noreferrer">
        <Avatar size="lg" />
        <span className="li-identity-text">
          <strong>Rajesh Koul <LinkedInMark className="li-badge" /></strong>
          <small>{HEADLINE}</small>
        </span>
      </a>
      <div className="li-profile-actions">
        <a className="li-all" href={`${PROFILE_URL}recent-activity/all/`} target="_blank" rel="noopener noreferrer">All posts <ArrowUpRight aria-hidden="true" /></a>
        <a className="li-follow" href={PROFILE_URL} target="_blank" rel="noopener noreferrer">Follow<span className="li-follow-extra"> on LinkedIn</span></a>
      </div>
    </div>

    <ul className="li-posts">
      {posts.map(post => <li key={post.title}>
        <article className="li-post">
          <header className="li-post-head">
            <Avatar size="sm" />
            <span className="li-post-author">
              <strong>Rajesh Koul</strong>
              <small>{HEADLINE}</small>
            </span>
            <LinkedInMark className="li-post-mark" />
          </header>

          <div className="li-post-body">
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <span className="li-hashtag">{hashtag(post.topic)}</span>
          </div>

          <a className="li-post-link" href={post.href} target="_blank" rel="noopener noreferrer" aria-label={`Read “${post.title}” on LinkedIn`}>
            View post on LinkedIn <ArrowUpRight aria-hidden="true" />
          </a>
        </article>
      </li>)}
    </ul>
  </div>;
}
