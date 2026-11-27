import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, GraduationCap, Layers, Lightbulb, MessagesSquare, Users } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Industry & Campus Dialogues | Rajesh Koul", description: "A forum to exchange ideas and perspectives on leadership, transformation, operational excellence and the Lean way of thinking.", path: "/industry-campus-dialogues" });

const outcomes = [
  { icon: GraduationCap, title: "Industry Perspectives", text: "Real-world experiences, challenges and lessons." },
  { icon: Users, title: "Campus Conversations", text: "Interactions with students, faculty and young professionals." },
  { icon: Lightbulb, title: "Key Takeaways", text: "Actionable insights, ideas and questions to reflect on." },
  { icon: Layers, title: "Future Readiness", text: "Building capabilities for a more resilient and equitable future." },
];

export default function Page(){return <><SiteHeader/><main className="talks-page-v2">
  <section className="talks-hero-v2" aria-labelledby="talks-title">
    <div className="talks-copy-v2">
      <p className="talks-eyebrow">DIALOGUE <i/> IDEAS <i/> LEARNING</p>
      <h1 id="talks-title">Industry &amp;<br/><span>Campus Dialogues</span></h1>
      <p className="talks-lead">A forum to exchange ideas and perspectives on leadership, transformation, operational excellence and the Lean way of thinking — through conversations with industry professionals, faculty and students.</p>
      <Link className="talks-cta-v2" href="#talks-coming-soon">Explore Dialogues &amp; Conversations <ArrowRight aria-hidden="true"/></Link>
      <p className="talks-note"><BookOpen aria-hidden="true"/> Real experiences. Fresh perspectives. Shared learning.</p>
    </div>
    <div className="talks-constellation" aria-label="The dialogue framework">
      <header><span><MessagesSquare aria-hidden="true"/></span><div><small>THE DIALOGUE FRAMEWORK</small><strong>From Lived Experience<br/>to Shared Understanding.</strong></div></header>
      <div className="talks-signal-map">
        <div className="talks-signal-core"><i/><span><BookOpen aria-hidden="true"/></span><small>IDEAS IN ACTION</small></div>
        <article className="talks-signal-a"><small>01 · DISCUSS</small><p>Explore real-world issues and emerging trends.</p></article>
        <article className="talks-signal-b"><small>02 · EXCHANGE</small><p>Share perspectives across industry and academia.</p></article>
        <article className="talks-signal-c"><small>03 · LEARN</small><p>Take away practical insights and new ways of thinking.</p></article>
        <article className="talks-signal-d"><small>04 · APPLY</small><p>Link ideas to real organisational and societal impact.</p></article>
      </div>
      <div className="talks-constellation-footer"><span>INDUSTRY</span><i/><span>ACADEMIA</span><i/><span>PRACTICE</span><i/><span>INSIGHTS</span></div>
    </div>
    <div className="talks-outcomes-v2" aria-label="What the dialogues offer">
      {outcomes.map(({icon:Icon,title,text},index)=><article className={index===1||index===3?"talks-outcome-v2 talks-outcome-dark-v2":"talks-outcome-v2"} key={title}><span><Icon aria-hidden="true"/></span><div><small>0{index+1}</small><h2>{title}</h2><p>{text}</p></div></article>)}
    </div>
  </section>
  <section className="talks-coming-soon-v2" id="talks-coming-soon" aria-labelledby="talks-coming-title">
    <div className="talks-coming-mark-v2"><CalendarDays aria-hidden="true"/></div>
    <div><p>THE CONVERSATION CALENDAR</p><h2 id="talks-coming-title">Upcoming industry and campus dialogues</h2></div>
    <span>Stay Informed. Join the Conversation.</span>
  </section>
</main><SiteFooter/></>}
