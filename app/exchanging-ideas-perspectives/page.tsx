import Link from "next/link";
import { ArrowRight, BarChart3, BookOpen, GraduationCap, Layers, Lightbulb, Target } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Exchanging Ideas & Perspectives | Rajesh Koul", description: "Thought-provoking insights, practical frameworks and real-world perspectives on business transformation, organisational excellence and sustainable growth.", path: "/exchanging-ideas-perspectives" });

const outcomes = [
  { icon: BookOpen, title: "Business Transformation", text: "Insights on what drives change and growth." },
  { icon: Lightbulb, title: "Leadership Perspectives", text: "Ideas to build effective and adaptive leadership." },
  { icon: Target, title: "Industry & Functional Insights", text: "Focused views across industries and functions." },
  { icon: BarChart3, title: "Frameworks in Action", text: "Practical applications of proven models." },
];

export default function Page(){return <><SiteHeader/><main className="courses-page-v2">
  <section className="courses-hero-v2" aria-labelledby="courses-title">
    <div className="courses-copy-v2">
      <p className="courses-eyebrow">LEARN <i/> REFLECT <i/> SHARE <i/> GROW</p>
      <h1 id="courses-title">Exchanging Ideas &amp;<br/><span>Perspectives</span></h1>
      <p className="courses-lead">Explore thought-provoking insights, practical frameworks and real-world perspectives on business transformation, organisational excellence and sustainable growth.</p>
      <Link className="courses-cta-v2" href="#courses-coming-soon">Explore Insights &amp; Frameworks <ArrowRight aria-hidden="true"/></Link>
      <p className="courses-note"><BookOpen aria-hidden="true"/> Ideas that inspire. Perspectives that guide.</p>
    </div>
    <div className="courses-blueprint" aria-label="The lens">
      <header><span><Layers aria-hidden="true"/></span><div><small>THE LENS</small><strong>From Concepts<br/>to Practical Application.</strong></div></header>
      <div className="courses-blueprint-flow">
        <article><b>01</b><div><h2>Understand</h2><p>Build clarity on key models and frameworks.</p></div></article>
        <article><b>02</b><div><h2>Explore</h2><p>Apply ideas to real-world business challenges.</p></div></article>
        <article><b>03</b><div><h2>Apply</h2><p>Translate concepts into practical action.</p></div></article>
        <article><b>04</b><div><h2>Grow</h2><p>Strengthen your capability for lasting impact.</p></div></article>
      </div>
      <div className="courses-blueprint-footer courses-blueprint-quote"><span>“Better thinking. Greater impact.”</span></div>
    </div>
    <div className="courses-outcomes-v2" aria-label="Areas of insight">
      {outcomes.map(({icon:Icon,title,text},index)=><article className={index===1||index===3?"courses-outcome-v2 courses-outcome-dark-v2":"courses-outcome-v2"} key={title}><span><Icon aria-hidden="true"/></span><div><small>0{index+1}</small><h2>{title}</h2><p>{text}</p></div></article>)}
    </div>
  </section>
  <section className="courses-coming-soon-v2" id="courses-coming-soon" aria-labelledby="courses-coming-title">
    <div className="courses-coming-mark-v2"><GraduationCap aria-hidden="true"/></div>
    <div><p>THE LEARNING STUDIO</p><h2 id="courses-coming-title">Explore learning notes, frameworks, and case studies.</h2></div>
    <span>Learn. Reflect. Apply.</span>
  </section>
</main><SiteFooter/></>}
