"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production RSC navigation is incompatible with next/link in this deployment. */

import Image from "next/image";
import { ArrowRight, BookOpen, ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PrivacyChoicesButton } from "@/components/privacy-choices-button";

const nav = [["Home","/home"],["About","/about"],["The Lean Nervous System","/lean-nervous-system"],["Blogs","/blogs"],["Literary Lounge",""],["Let's Connect","/contact"]];
const literaryNav = [["Book Review","/book-review"],["Leadership, Learning & Growth","/leadership-learning-growth"],["Exchanging Ideas & Perspectives","/exchanging-ideas-perspectives"],["Industry & Campus Dialogues","/industry-campus-dialogues"]];
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
  const isActive=(href:string)=>currentPath===href||currentPath.startsWith(`${href}/`);
  const literaryActive=isActive("/literary-lounge")||literaryNav.some(([,subHref])=>isActive(subHref));
  return <header className="site-header">
    <a className="logo" href="/home" aria-label="Rajesh Koul — Home"><Wordmark/></a>
    <button className="menu-button" type="button" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} onClick={()=>{setOpen(!open);if(open)setLiteraryOpen(false)}}>{open?<X/>:<Menu/>}</button>
    <nav className={open?"open":""} aria-label="Primary navigation">{nav.map(([label,href])=>label==="Literary Lounge"?<div className={`nav-dropdown${literaryOpen?" is-open":""}`} key={label}><button type="button" className={literaryActive?"active":""} aria-haspopup="true" aria-expanded={literaryOpen} onClick={()=>setLiteraryOpen(value=>!value)}>{label}<ChevronDown aria-hidden="true"/></button><div className="nav-submenu" aria-label="Literary Lounge submenu">{literaryNav.map(([subLabel,subHref])=><a key={subLabel} href={subHref} className={isActive(subHref)?"active":""} aria-current={isActive(subHref)?"page":undefined} onClick={()=>{setOpen(false);setLiteraryOpen(false)}}>{subLabel}</a>)}</div></div>:<a key={label} href={href} className={`${isActive(href)?"active ":""}${href==="/contact"?"nav-contact":""}`.trim()} aria-current={isActive(href)?"page":undefined} onClick={()=>{setOpen(false);setLiteraryOpen(false)}}>{label}</a>)}</nav>
  </header>
}

export function SiteFooter(){
  const explore=[["Home","/home"],["About","/about"],["The Lean Nervous System","/lean-nervous-system"],["Blogs","/blogs"],["Let's Connect","/contact"]];
  const currentYear=new Date().getFullYear();
  const socialLinks:[SocialBrand,string,string][]=[
    ["facebook","Facebook","https://www.facebook.com/share/1J1BFq8xid/"],
    ["instagram","Instagram","https://www.instagram.com/author.rajeshkoul/"],
    ["linkedin","LinkedIn","https://www.linkedin.com/in/rajeshkoul74/"],
    ["twitter","X","https://x.com/rkoulfms"],
    ["youtube","YouTube","https://www.youtube.com/@author.rajeshkoul"],
    ["email","Email","mailto:author.rajeshkoul@gmail.com"],
  ];
  return <><MobileActionDock/><footer id="site-footer" className="site-footer"><div className="intent-row"><div className="signature"><Image src="/art/rajesh-koul-wordmark.svg" alt="Rajesh Koul — Building Human-Centered Systems" width={1200} height={420}/></div><div className="intent"><b>MY PHILOSOPHY</b><h2>Move Beyond Tools. <span>Diagnose Maturity.</span> <br className="intent-break"/>Design Organisations That <span>Run, Learn, <br className="intent-break"/>And Improve</span> — By Themselves.</h2><p>Helping organisations evolve from fragmented improvements to connected, adaptive, and future-ready systems.</p></div><div className="connect social-connect" id="connect"><b>LET’S CONNECT</b><p>Follow, engage and be part of the conversation.</p><nav className="social-links" aria-label="Social media">{socialLinks.map(([brand,label,href])=><a className={`social-link social-link-${brand}`} href={href} {...(href.startsWith("http")?{target:"_blank",rel:"noopener noreferrer"}:{})} aria-label={brand==="email"?"Email author.rajeshkoul@gmail.com":brand==="phone"?"Call +91 98732 98421":`Visit ${label}`} title={brand==="email"?"author.rajeshkoul@gmail.com":brand==="phone"?"+91 98732 98421":label} key={brand} onPointerUp={event=>event.currentTarget.blur()}><SocialIcon brand={brand}/></a>)}</nav></div></div>
    <div className="footer-dark"><div className="footer-columns"><FooterList title="EXPLORE" links={explore}/><FooterList title="FOCUS AREAS" links={[["Enterprise Transformation","/"],["Industry 4.0","/"],["Lean Systems","/lean-nervous-system"],["Leadership Advisory","/leadership-learning-growth"],["Organisational Maturity","/"]]}/><FooterList title="KNOWLEDGE & INSIGHTS" links={[["Books I Recommend","/book-review"],["Podcast","/literary-lounge/podcast"],["Ideas & Perspectives","/blogs"],["Tools & Frameworks","/exchanging-ideas-perspectives"],["Case Examples","/"]]}/><FooterAbout/></div>
      <div className="copyright"><span>© {currentYear} Rajesh Koul. All rights reserved.</span><span><a href="/privacy-policy">Privacy Policy</a>　 |　 <a href="/terms-of-use">Terms of Use</a>　 |　 <PrivacyChoicesButton/></span><em>Keep Learning. Keep Improving.</em></div>
    </div></footer></>
}

function MobileActionDock(){
  const [atFooter,setAtFooter]=useState(false);
  const [scrollingDown,setScrollingDown]=useState(false);
  useEffect(()=>{
    const footer=document.getElementById("site-footer");
    if(!footer)return;
    const observer=new IntersectionObserver(([entry])=>setAtFooter(entry.isIntersecting),{rootMargin:"0px 0px 72px 0px"});
    observer.observe(footer);
    return()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    // Slide the dock away while reading down the page; bring it back on any scroll up.
    let last=window.scrollY;
    let frame=0;
    const onScroll=()=>{
      if(frame)return;
      frame=window.requestAnimationFrame(()=>{
        frame=0;
        const y=window.scrollY;
        if(Math.abs(y-last)<8)return;
        setScrollingDown(y>last&&y>160);
        last=y;
      });
    };
    window.addEventListener("scroll",onScroll,{passive:true});
    return()=>{window.removeEventListener("scroll",onScroll);if(frame)window.cancelAnimationFrame(frame);};
  },[]);
  const hidden=atFooter||scrollingDown;
  return <nav className={`mobile-action-dock${hidden?" is-hidden":""}`} aria-label="Quick actions" aria-hidden={hidden}>
    <a href="/lean-nervous-system"><BookOpen aria-hidden="true"/><span>Explore the book</span></a>
    <a href="/contact"><MessageCircle aria-hidden="true"/><span>Contact</span></a>
  </nav>;
}

function FooterAbout(){
  const [open,setOpen]=useState(true);

  useEffect(()=>{
    const desktop=window.matchMedia("(min-width: 769px)");
    const syncOpenState=()=>setOpen(desktop.matches);
    syncOpenState();
    desktop.addEventListener("change",syncOpenState);
    return()=>desktop.removeEventListener("change",syncOpenState);
  },[]);

  return <details className="about-footer footer-about-fold" open={open} onToggle={event=>setOpen(event.currentTarget.open)}><summary><h3>ABOUT THE AUTHOR</h3><ChevronDown aria-hidden="true"/></summary><p>RAJESH KOUL is a global transformation leader with nearly three decades of experience in enterprise transformation, leadership development, and operational excellence.</p><p>His mission is to help mid-sized organizations—the backbone of the Indian economy—grow with confidence, compete globally, and evolve into resilient world-class enterprises through disciplined, human-centred transformation.</p></details>
}

function FooterList({title,links}:{title:string,links:string[][]}){
  const [open,setOpen]=useState(true);

  useEffect(()=>{
    const desktop=window.matchMedia("(min-width: 769px)");
    const syncOpenState=()=>setOpen(desktop.matches);
    syncOpenState();
    desktop.addEventListener("change",syncOpenState);
    return()=>desktop.removeEventListener("change",syncOpenState);
  },[]);

  return <details className="footer-list" open={open} onToggle={event=>setOpen(event.currentTarget.open)}><summary><span>{title}</span><ChevronDown aria-hidden="true"/></summary><div>{links.map(([label,href])=><a key={label} href={href}>{label}<ArrowRight/></a>)}</div></details>
}

type SocialBrand="facebook"|"instagram"|"linkedin"|"twitter"|"youtube"|"email"|"phone";

function SocialIcon({brand}:{brand:SocialBrand}){
  const paths:Record<SocialBrand,string>={
    facebook:"M13.5 8H16l.5-3h-3c-3 0-4.5 1.8-4.5 4.7V12H6.5v3H9v9h3.5v-9h3l.5-3h-3.5v-2c0-1.2.4-2 1-2z",
    instagram:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.012-4.849-.069c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.013-3.583.07-4.849C2.181 3.924 3.696 2.38 6.951 2.232 8.217 2.175 8.596 2.163 12 2.163zM12 0C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947C23.73 2.695 21.309.273 16.948.073 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    linkedin:"M20.45 20.45H16.9v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.56 9h3.56v11.45H3.56V9z",
    twitter:"M18.244 2.25h3.308l-7.227 8.26 8.501 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z",
    email:"M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2.4V17h16V7.4l-7.4 5.2a1 1 0 0 1-1.2 0L4 7.4zM5.6 7l6.4 4.5L18.4 7H5.6z",
    phone:"M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8z",
    youtube:"M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z",
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={paths[brand]}/></svg>
}

/* The Rajesh Koul wordmark as live text (same fonts and colours as /art/rajesh-koul-wordmark.svg),
   so the tagline stays legible at header size. */
export function Wordmark(){return <span className="wordmark" aria-hidden="true"><span className="wordmark-name"><span className="wordmark-first">Rajesh</span> <span className="wordmark-last">Koul</span></span><span className="wordmark-tag">Building Human-Centered Systems</span></span>}
