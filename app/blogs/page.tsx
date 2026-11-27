"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production RSC navigation is incompatible with next/link in this deployment. */
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { LinkedInFeed } from "@/components/linkedin-feed";
import { BookBuyCard } from "@/components/book-buy-card";
import newsletterIssues from "./_data/newsletters.json";

export const latest = [
  {
    category: "GCC Leadership",
    title: "GCCs Reimagined Part II: A Leadership Narrative on Enabling GCC Maturity",
    excerpt: "How leaders enable the journey from earned credibility and local reinvention to enterprise-wide intelligence and strategic influence.",
    image: "/art/blog-editorial/gcc-maturity.webp",
    href: "/blogs/gccs-reimagined-part-ii-enabling-gcc-maturity/",
    topics: ["leadership", "digital", "growth"],
    featured: true,
    popularity: 101,
    preserveFullImage: true,
  },
  {
    category: "GCC Strategy",
    title: "GCCs Reimagined: From Extended Enterprise to Intelligence Conduits",
    excerpt: "How Global Capability Centres can evolve from execution engines into intelligence conduits that sense, synthesize, and steer the global enterprise.",
    image: "/art/blog-editorial/gcc-intelligence-conduits.webp",
    href: "/blogs/gccs-reimagined-from-extended-enterprise-to-intelligence-conduits/",
    topics: ["leadership", "digital", "growth"],
    featured: true,
    popularity: 100,
    preserveFullImage: true,
  },
  {
    category: "Innovation Management",
    title: "Project Management and Innovation: A Synthesis for Success",
    excerpt: "From visionary ideas to purposeful execution: how project and programme management can transform innovation into sustainable value.",
    image: "/art/blog-editorial/project-innovation.webp",
    href: "/blogs/project-management-and-innovation-a-synthesis-for-success",
    featured: true,
    popularity: 97,
    topics: ["leadership", "growth"],
  },
  {
    category: "Lean Leadership",
    title: "How to Establish a Lean Thinking Mindset in Organizations",
    excerpt: "Building a culture where purpose guides decisions, people solve problems, and continuous improvement becomes part of everyday work.",
    image: "/art/blog-editorial/lean-mindset.webp",
    href: "/blogs/how-to-establish-a-lean-thinking-mindset-in-organizations",
    featured: true,
    popularity: 95,
    topics: ["lean", "leadership"],
    preserveFullImage: true,
  },
  {
    category: "Lean Thinking",
    title: "Lean Thinking: Customer Value, People First, A Better Tomorrow",
    excerpt: "Building a purpose-driven organisation through continuous improvement, mutual respect, and a relentless focus on customer value.",
    image: "/art/blog-editorial/customer-value.webp",
    href: "/blogs/lean-thinking-customer-value-people-first-a-better-tomorrow",
    featured: true,
    popularity: 94,
    topics: ["lean", "leadership"],
    preserveFullImage: true,
  },
  {
    category: "Quality 4.0",
    title: "Evolution of Quality 4.0: From Inspection to Intelligent Quality Management",
    excerpt: "How quality has evolved from detecting defects to designing intelligent, connected, and continuously improving systems.",
    image: "/art/blog-editorial/quality-4.webp",
    href: "/blogs/evolution-of-quality-4-0",
    featured: true,
    popularity: 93,
    topics: ["digital", "lean"],
    preserveFullImage: true,
  },
  {
    category: "Enterprise Lean",
    title: "Enterprise-Level Lean Design: Moving Beyond Silos to End-to-End Value Creation",
    excerpt: "Why sustainable transformation requires organisations to optimise the whole enterprise, rather than individual processes in isolation.",
    image: "/art/blog-editorial/enterprise-lean.webp",
    href: "/blogs/enterprise-level-lean-design",
    featured: true,
    popularity: 92,
    topics: ["lean", "growth"],
    preserveFullImage: true,
  },
  {
    category: "Lean + Digital",
    title: "Technology and Lean Integration: Setting the Foundation",
    excerpt: "A practical roadmap for SMEs and MSMEs to build stable processes first, then scale with digital technologies and Industry 4.0.",
    image: "/art/blog-editorial/lean-digital.webp",
    href: "/blogs/technology-and-lean-integration-setting-the-foundation",
    featured: true,
    popularity: 91,
    topics: ["lean", "digital"],
    preserveFullImage: true,
  },
  {
    category: "Sustainable Growth",
    title: "Reimagining Sustainable Growth and Transformation Mindset",
    excerpt: "Four strategic shifts for building a more sustainable, agile, and globally integrated organisation.",
    image: "/art/blog-editorial/sustainable-growth.webp",
    href: "/blogs/reimagining-sustainable-growth-and-transformation-mindset",
    featured: true,
    popularity: 90,
    topics: ["growth", "leadership", "digital"],
    preserveFullImage: true,
  },
  {
    category: "GCC Maturity",
    title: "From Execution Engines to Enterprise Intelligence",
    excerpt: "A leadership narrative on how Global Capability Centres evolve from efficient delivery engines into systems that sense, learn and influence enterprise outcomes.",
    image: "/art/blog-editorial/execution-intelligence.webp",
    href: "/blogs/from-execution-engines-to-enterprise-intelligence",
    featured: true,
    popularity: 98,
    topics: ["leadership", "growth"],
  },
  {
    category: "Lean Systems",
    title: "Building an Organisation That Learns by Design",
    excerpt: "Resilient organisations do not rely on heroic problem-solving. They create clear feedback loops that help teams sense, respond, and improve.",
    image: "/art/blog-editorial/learning-organisation.webp",
    featured: false,
    popularity: 87,
    topics: ["lean", "leadership"],
  },
  {
    category: "Digital Leadership",
    title: "The Real Work of AI-Led Transformation",
    excerpt: "Technology creates value only when leaders redesign decisions, capabilities, and ways of working around it.",
    image: "/art/blog-editorial/execution-intelligence.webp",
    featured: true,
    popularity: 93,
    topics: ["digital", "leadership"],
  },
];

const featuredBlogs = latest.slice(3, 6);

const newsletters = newsletterIssues.map((newsletter) => ({
  category: newsletter.issue,
  title: newsletter.cardTitle,
  excerpt: newsletter.excerpt,
  image: newsletter.image,
  href: `/blogs/${newsletter.slug}`,
}));

// Manually maintained LinkedIn highlights. Add the newest public post here
// whenever this section is refreshed; no paid widget or external script is used.
const linkedinPosts = [
  {
    topic: "Book Launch",
    title: "The Lean Nervous System launches on 28 November 2026",
    excerpt: "What began as a question about why some organisations keep improving while others struggle has become a practical framework for organisational maturity. Pre-ordered copies ship from launch day.",
    href: "https://www.linkedin.com/posts/rajeshkoul74_theleannervoussystem-booklaunch-organisationalexcellence-share-7529218503556419586-65Ub",
  },
  {
    topic: "Transformation",
    title: "Changing the relationship between effort and outcome",
    excerpt: "When work begins to flow, the same effort creates more rhythm, learning and organisational strength—instead of more firefighting.",
    href: "https://www.linkedin.com/posts/rajeshkoul74_comingsoon-leadership-businesstransformation-activity-7504456693804843009-0NHz",
  },
  {
    topic: "The Lean Nervous System",
    title: "Making Indian manufacturing world-class again",
    excerpt: "A book-cover reveal shaped by three decades of transformation experience—and a belief that institutions can continuously improve, adapt and perform.",
    href: "https://www.linkedin.com/posts/rajeshkoul74_theleannervoussystem-independenceday-indianmanufacturing-activity-7494304560916660224-FJL6",
  },
];

/* "In the news" panel is paused for now and the book card shows in its place. Set to true to bring it back. */
const SHOW_IN_THE_NEWS = false;

const inTheNews = [
  ["Perspective", "The next era of operational excellence is adaptive"],
  ["Conversation", "Building transformation capability from the ground up"],
  ["Recognition", "Three decades of leading change across industries"],
];

export default function BlogsPage() {
  return <><SiteHeader/><main className="blogs-page">
    <div className="blogs-hero-stage"><section className="blogs-hero">
      <p className="blogs-kicker">IDEAS <i aria-hidden="true">|</i> PERSPECTIVES <i aria-hidden="true">|</i> PRACTICE</p>
      <h1>Thought Perspectives on Transformation</h1>
      <p>Practical ideas, frameworks and real-world insights on leadership, organisational excellence, operational performance and sustainable growth.</p>
      <a className="blogs-hero-cta" href="#latest">Explore Latest Insights <ArrowRight aria-hidden="true"/></a>
      <BlogHeroSearch/>
    </section></div>

    <div className="blogs-main">
      <section className="blogs-section" id="latest">
        <SectionHeading eyebrow="LATEST THINKING" title="Latest Insights" actionHref="/blogs/all/" actionLabel={`View all ${latest.length}`}/>
        <article className="blogs-feature">
          <div className="blogs-feature-copy"><p className="blogs-category">{latest[0].category}</p><h2>{latest[0].title}</h2><p>{latest[0].excerpt}</p><ReadLink href={latest[0].href}/></div>
          <a href={latest[0].href??"/blogs"} className="blogs-feature-media" aria-label={`Read ${latest[0].title}`}><Image src={latest[0].image} alt={latest[0].title} fill sizes="(max-width: 900px) 100vw, 42vw" style={{objectFit:"contain",objectPosition:"center",transform:"none",transition:"none"}} priority/><EditorialImageLabel category={latest[0].category} title={latest[0].title}/></a>
        </article>
        <div className="blogs-grid-with-news">
          <div className="blogs-card-grid">{latest.slice(1,3).map((item)=><ArticleCard key={item.title} {...item}/>)}</div>
          {SHOW_IN_THE_NEWS
            ? <aside className="blogs-news-card"><p className="blogs-category">IN THE NEWS</p><h3>Ideas making an impact</h3><div className="blogs-news-list">{inTheNews.map(([category,title])=><a href="/blogs" key={title}><small>{category}</small><span>{title}</span><ArrowRight/></a>)}</div></aside>
            : <BookBuyCard/>}
        </div>
      </section>

      <section className="blogs-section blogs-tinted">
        <SectionHeading eyebrow="CURATED INSIGHTS" title="Featured Blogs" actionHref="/blogs/all/" actionLabel="View all blogs"/>
        <div className="blogs-card-grid three">{featuredBlogs.map((item)=><ArticleCard key={item.title} {...item}/>)}</div>
      </section>

      <section className="blogs-section blogs-news-section blogs-linkedin-section">
        <div className="blogs-section-heading"><div><p>FROM LINKEDIN</p><h2>Latest Perspectives</h2></div></div>
        <LinkedInFeed posts={linkedinPosts}/>
      </section>

      <section className="blogs-section blogs-tinted">
        <SectionHeading eyebrow="MONTHLY PERSPECTIVES" title="From the Newsletter"/>
        <div className="blogs-card-grid three">{newsletters.map((item)=><ArticleCard key={item.title} {...item}/>)}</div>
      </section>
    </div>

  </main><SiteFooter/></>;
}

function SectionHeading({eyebrow,title,actionHref="/blogs",actionLabel="View all"}:{eyebrow:string,title:string,actionHref?:string,actionLabel?:string}) {
  const external=actionHref.startsWith("http");
  return <div className="blogs-section-heading"><div><p>{eyebrow}</p><h2>{title}</h2></div><a href={actionHref} target={external?"_blank":undefined} rel={external?"noreferrer":undefined}>{actionLabel} <ArrowRight/></a></div>;
}

export function ArticleCard({category,title,excerpt,image,href="/blogs"}:{category:string,title:string,excerpt:string,image:string,href?:string,preserveFullImage?:boolean}) {
  return <article className="blog-card"><a className="blog-card-media" href={href} aria-label={`Read ${title}`}><Image src={image} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" style={{objectFit:"contain",objectPosition:"center",transform:"none",transition:"none"}}/><EditorialImageLabel category={category} title={title}/></a><div><p className="blogs-category">{category}</p><h3>{title}</h3><p>{excerpt}</p><ReadLink href={href}/></div></article>;
}

function EditorialImageLabel({category,title}:{category:string,title:string}){
  return <span className="blog-image-label" aria-hidden="true"><small>{category}</small><strong>{title}</strong></span>;
}

function ReadLink({href="/blogs"}:{href?:string}){return <a className="blogs-read" href={href}>Read the article <ArrowRight/></a>}


// Keep discovery controls in the landing hero while the catalogue owns filtering.
function BlogHeroSearch(){
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("all");
  const [sort,setSort]=useState("latest");
  const categories=Array.from(new Set(latest.map(item=>item.category))).sort((a,b)=>a.localeCompare(b));
  const openCatalogue=(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const params=new URLSearchParams();
    if(query.trim())params.set("q",query.trim());
    if(category!=="all")params.set("category",category);
    if(sort!=="latest")params.set("sort",sort);
    window.location.href=`/blogs/all/${params.size?`?${params.toString()}`:""}`;
  };
  return <form className="blogs-hero-search" onSubmit={openCatalogue}>
    <label className="blogs-hero-query"><span className="sr-only">Search blogs</span><Search aria-hidden="true"/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search ideas, topics, keywords…"/></label>
    <label><span>Category</span><select value={category} onChange={event=>setCategory(event.target.value)}><option value="all">All categories</option>{categories.map(item=><option value={item} key={item}>{item}</option>)}</select></label>
    <label><span>Sort by</span><select value={sort} onChange={event=>setSort(event.target.value)}><option value="latest">Latest first</option><option value="featured">Featured</option><option value="popular">Most read</option><option value="title-asc">Title: A–Z</option></select></label>
    <button type="submit">Explore articles <ArrowRight/></button>
  </form>;
}
