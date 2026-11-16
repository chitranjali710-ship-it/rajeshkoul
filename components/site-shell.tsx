"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production RSC navigation is incompatible with next/link in this deployment. */

import Image from "next/image";
import { ArrowRight, BookOpen, ChevronDown, Lightbulb, Mail, Menu, MessageCircle, Sprout, Target, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const nav = [["Home","/"],["About","/about"],["The Lean Nervous System","/lean-nervous-system"],["Blogs","/blogs"],["Literary Lounge",""],["Contact Me","/contact"]];
const literaryNav = [["Book Review","/book-review"],["Personal Leadership & Coaching","/personal-leadership-coaching"],["Courses & Frameworks","/courses"],["Industry & Campus Talks","/industry-campus-talks"]];
export function SiteHeader(){
  const [open,setOpen]=useState(false);
  const [literaryOpen,setLiteraryOpen]=useState(false);
  const pathname=usePathname();
  useEffect(()=>{
    if(!open)return;
    const close=(event:KeyboardEvent)=>{if(event.key==="Escape"){setOpen(false);setLiteraryOpen(false)}};
    window.addEventListener("keydown",close);
    return()=>window.removeEventListener("keydown",close);
  },[open]);
  const currentPath=pathname.length>1?pathname.replace(/\/$/,""):pathname;
  const isActive=(href:string)=>href==="/"?currentPath==="/":currentPath===href||currentPath.startsWith(`${href}/`);
  const literaryActive=isActive("/literary-lounge")||literaryNav.some(([,subHref])=>isActive(subHref));
  return <header className="site-header">
    <a className="logo" href="/" aria-label="Rajesh Koul — Home"><Image src="/art/rajesh-koul-wordmark.svg" alt="Rajesh Koul — Building Human-Centered Systems" width={1200} height={420} priority/></a>
    <button className="menu-button" type="button" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} onClick={()=>{setOpen(!open);if(open)setLiteraryOpen(false)}}>{open?<X/>:<Menu/>}</button>
    <nav className={open?"open":""} aria-label="Primary navigation">{nav.map(([label,href])=>label==="Literary Lounge"?<div className={`nav-dropdown${literaryOpen?" is-open":""}`} key={label}><button type="button" className={literaryActive?"active":""} aria-haspopup="true" aria-expanded={literaryOpen} onClick={()=>setLiteraryOpen(value=>!value)}>{label}<ChevronDown aria-hidden="true"/></button><div className="nav-submenu" aria-label="Literary Lounge submenu">{literaryNav.map(([subLabel,subHref])=><a key={subLabel} href={subHref} className={isActive(subHref)?"active":""} aria-current={isActive(subHref)?"page":undefined} onClick={()=>{setOpen(false);setLiteraryOpen(false)}}>{subLabel}</a>)}</div></div>:<a key={label} href={href} className={`${isActive(href)?"active ":""}${href==="/contact"?"nav-contact":""}`.trim()} aria-current={isActive(href)?"page":undefined} onClick={()=>{setOpen(false);setLiteraryOpen(false)}}>{label}</a>)}</nav>
  </header>
}

export function SiteFooter(){
  const explore=[["Home","/"],["About","/about"],["The Lean Nervous System","/lean-nervous-system"],["Blogs","/blogs"],["Contact Me","/contact"]];
  return <><MobileActionDock/><footer id="site-footer" className="site-footer"><div className="intent-row"><div className="signature"><Image src="/art/rajesh-koul-wordmark.svg" alt="Rajesh Koul — Building Human-Centered Systems" width={1200} height={420}/></div><div className="intent"><b>MY INTENT</b><h2>Move Beyond Tools. Diagnose Maturity. <br className="intent-break"/><span>Design Organisations That Run, Learn, <br className="intent-break"/>And Improve — By Themselves.</span></h2><p>Helping organisations evolve from fragmented improvements to connected, adaptive, and future-ready systems.</p></div><div className="connect" id="connect"><b>LET’S CONNECT</b><p>Insights on transformation, leadership,<br/>and the Lean way of thinking.</p><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><span className="contact-icon" aria-hidden="true">in</span>Connect on LinkedIn<ArrowRight/></a><a href="/contact"><Mail/>Get in Touch<ArrowRight/></a><a href="/contact"><MessageCircle/>Start a Conversation<ArrowRight/></a></div></div>
    <div className="footer-dark"><div className="footer-columns"><FooterList title="EXPLORE" links={explore}/><FooterList title="FOCUS AREAS" links={[["Enterprise Transformation","/"],["Industry 4.0","/"],["Lean Systems","/lean-nervous-system"],["Leadership Advisory","/personal-leadership-coaching"],["Organisational Maturity","/"]]}/><FooterList title="KNOWLEDGE & INSIGHTS" links={[["Books I Recommend","/book-review"],["Podcast","/literary-lounge/podcast"],["Ideas & Perspectives","/blogs"],["Tools & Frameworks","/courses"],["Case Examples","/"]]}/><div className="about-footer"><h3>ABOUT RAJESH KOUL</h3><p>Rajesh Koul is a global transformation leader with over three decades of experience in leading large-scale enterprise transformations, leadership development, and operational excellence.</p><p>His mission is to help mid-sized organisations — the backbone of the Indian economy — grow with confidence, compete globally, and evolve into resilient, world-class enterprises.</p></div></div>
      <div className="values"><Value icon={<Lightbulb/>} title="Thought Leadership" text="Ideas rooted in experience and real-world impact."/><Value icon={<Target/>} title="Practical Impact" text="Actionable frameworks that deliver results."/><Value icon={<Users/>} title="People First" text="Building capability and a culture of continuous improvement."/><Value icon={<Sprout/>} title="Sustainable Growth" text="For resilient organisations and a better tomorrow."/></div>
      <div className="copyright"><span>© 2025 Rajesh Koul. All rights reserved.</span><span>Privacy Policy　 |　 Terms of Use</span><em>Keep Learning. Keep Improving.</em></div>
    </div></footer></>
}

function MobileActionDock(){
  const [hidden,setHidden]=useState(false);
  useEffect(()=>{
    const footer=document.getElementById("site-footer");
    if(!footer)return;
    const observer=new IntersectionObserver(([entry])=>setHidden(entry.isIntersecting),{rootMargin:"0px 0px 72px 0px"});
    observer.observe(footer);
    return()=>observer.disconnect();
  },[]);
  return <nav className={`mobile-action-dock${hidden?" is-hidden":""}`} aria-label="Quick actions" aria-hidden={hidden}>
    <a href="/lean-nervous-system"><BookOpen aria-hidden="true"/><span>Explore the book</span></a>
    <a href="/contact"><MessageCircle aria-hidden="true"/><span>Contact</span></a>
  </nav>;
}

function FooterList({title,links}:{title:string,links:string[][]}){return <details className="footer-list"><summary><span>{title}</span><ChevronDown aria-hidden="true"/></summary><div>{links.map(([label,href])=><a key={label} href={href}>{label}<ArrowRight/></a>)}</div></details>}
function Value({icon,title,text}:{icon:React.ReactNode,title:string,text:string}){return <div className="value">{icon}<p><b>{title}</b><span>{text}</span></p></div>}
