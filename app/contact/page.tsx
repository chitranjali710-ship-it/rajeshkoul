"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Layers, Lightbulb, List, Mail, MessageCircle, MessagesSquare, Phone, Send, User } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

const reasons = [
  { icon: BookOpen, title: "The Lean Nervous System", text: "Book discussions, reader reflections and conversations on organisational excellence.", href: "/lean-nervous-system/", label: "Learn about The Lean Nervous System" },
  { icon: Layers, title: "The Enterprise Health Lab", text: "Exploring organisational health, maturity and the systems behind performance.", href: "https://ehl.rajeshkoul.com/", label: "Visit The Enterprise Health Lab" },
  { icon: Lightbulb, title: "Ideas & Perspectives", text: "Writing and conversations on leadership, transformation and operational excellence.", href: "/blogs/", label: "Read Ideas & Perspectives" },
  { icon: MessagesSquare, title: "Speaking & Engagement", text: "Guest lectures, academic sessions, leadership forums, panels and podcasts.", href: "/industry-campus-dialogues/", label: "Explore speaking and engagement" },
];

export default function ContactPage(){
  const [sent,setSent]=useState(false);
  function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();setSent(true)}
  return <><SiteHeader/><main className="contact-page">
    <section className="contact-stage">
      <header className="contact-copy">
        <h1>Start a <span>Meaningful Conversation.</span></h1>
        <p className="contact-intro">I believe meaningful conversations often lead to new perspectives, ideas and possibilities. Whether you have read <b><i>The Lean Nervous System</i></b> and would like to share your thoughts, are curious about the Enterprise Health Lab, wish to exchange perspectives on organisational excellence and business transformation, or would like to invite me for a guest lecture, academic interaction, leadership forum, podcast or industry discussion — I’d be delighted to connect.</p>
      </header>

      <div className="contact-layout">
        <div className="contact-pathways">
          <div className="contact-reasons">{reasons.map(({icon:Icon,title,text,href,label},index)=><article key={index}>{href&&<Link className="contact-card-link" href={href} aria-label={label}/>}<i><Icon/></i><div><h2>{title}</h2><p>{text}</p></div><ArrowRight/></article>)}</div>
          <blockquote><b>“</b><p>“Ideas, when shared,<br/>have the power to create better organisations.”</p></blockquote>
        </div>

        <form className="contact-form" id="contact-form" onSubmit={submit}>
          <div className="contact-form-heading"><span/><p>START A CONVERSATION</p><Send aria-hidden="true"/></div>
          <div className="contact-field-grid">
            <label><User/><span className="sr-only">First name</span><input name="firstName" required placeholder="First Name*" autoComplete="given-name"/></label>
            <label><User/><span className="sr-only">Last name</span><input name="lastName" required placeholder="Last Name*" autoComplete="family-name"/></label>
            <label><Mail/><span className="sr-only">Email address</span><input type="email" name="email" required placeholder="Email Address*" autoComplete="email"/></label>
            <label><Phone/><span className="sr-only">Phone number</span><input type="tel" name="phone" placeholder="Phone (Optional)" autoComplete="tel"/></label>
          </div>
          <label className="contact-select"><List/><span className="sr-only">What would you like to talk about?</span><select name="topic" required defaultValue=""><option value="" disabled>What would you like to talk about?</option><option>The Lean Nervous System</option><option>The Enterprise Health Lab</option><option>Ideas &amp; Perspectives</option><option>Speaking &amp; Engagement</option><option>Something else</option></select></label>
          <label className="contact-message"><MessageCircle/><span className="sr-only">Your message</span><textarea name="message" required placeholder="Share a little about your idea, invitation or message..."/></label>
          <label className="contact-consent"><input type="checkbox" required/><span>I’ll use your details only to respond to your message. Please see the <a href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a> for more information.</span></label>
          <button className="contact-submit" type="submit">{sent?<><Check/> Message Ready</>:<>Send Message <ArrowRight/></>}</button>
          {sent&&<p className="contact-success" role="status">Thank you. Your message has been prepared successfully.</p>}
        </form>
      </div>
    </section>
  </main><SiteFooter/></>;
}
