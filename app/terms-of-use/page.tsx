import { LegalPage, type LegalSection } from "@/components/legal-page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms of Use | Rajesh Koul",
  description: "The terms that apply when you use rajeshkoul.com, including content ownership, book purchases through third-party stores, and acceptable use.",
  path: "/terms-of-use",
});

const EMAIL = "author.rajeshkoul@gmail.com";
const UPDATED = "23 November 2026";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "About these terms",
    body: <>
      <p>These Terms of Use apply to your use of <strong>rajeshkoul.com</strong> (the “website”), the personal website of <strong>Rajesh Koul</strong> (“I”, “me”, “my”). By using the website, you agree to these terms. If you do not agree, please do not use the website.</p>
      <p>How personal data is handled is explained separately in the <a href="/privacy-policy">Privacy Policy</a>, which forms part of these terms.</p>
    </>,
  },
  {
    id: "purpose",
    title: "What the website is for",
    body: <>
      <p>The website shares my work, ideas and writing on organisational transformation, Lean, leadership and enterprise excellence. It includes information about my book <em>The Lean Nervous System</em>, articles, book reviews, videos, talks and ways to get in touch.</p>
      <p>You may use the website for personal, non-commercial purposes, and to learn about and contact me regarding my work.</p>
    </>,
  },
  {
    id: "no-advice",
    title: "Information, not professional advice",
    body: <>
      <p>Content on the website, including articles, frameworks, models, diagnostic material and book reviews, is shared for general information and learning. It is not professional, legal, financial or investment advice for your particular situation. Please take appropriate professional advice before acting on it.</p>
      <p>Outcomes described in case examples depend on many factors; they are not a promise of results for your organisation.</p>
    </>,
  },
  {
    id: "ip",
    title: "Ownership of content",
    body: <>
      <p>Unless stated otherwise, the content on the website, including text, articles, frameworks and models (such as <strong>The Lean Nervous System</strong> and the <strong>Lean Maturity Model (LMM)</strong>), diagrams, designs, the logo and the overall look of the website, belongs to me and is protected by copyright and other intellectual property laws.</p>
      <p>You may:</p>
      <ul>
        <li>view, download and print pages for your own personal, non-commercial use;</li>
        <li>quote short extracts with clear credit to “Rajesh Koul” and a link to the source page.</li>
      </ul>
      <p>You may not, without my written permission:</p>
      <ul>
        <li>copy, republish, sell or distribute content, or use it in training material, courses or consulting work;</li>
        <li>present my frameworks or models as your own;</li>
        <li>use my name, logo or the book’s title in a way that suggests I endorse you or your product.</li>
      </ul>
      <p>Book covers, publisher names and other third-party trademarks shown on the website belong to their owners and are shown only to identify the books discussed. Requests for permissions can be sent to <a href={`mailto:${EMAIL}?subject=Permission%20request`}>{EMAIL}</a>.</p>
    </>,
  },
  {
    id: "book-purchases",
    title: "Buying the book",
    body: <>
      <p><em>The Lean Nervous System</em> is sold through third-party stores such as Amazon (in India and other countries), Flipkart and Kindle. I do not sell the book directly on this website and do not handle payments.</p>
      <ul>
        <li>When you follow a store link, your purchase is a contract between you and that store, under its own terms, prices, delivery, return and refund policies.</li>
        <li>Prices, availability, pre-order and delivery dates are set by the store and may change. Anything shown on this website is for guidance only.</li>
        <li>Please take questions about orders, payments, delivery or returns to the store you bought from.</li>
      </ul>
    </>,
  },
  {
    id: "enquiries",
    title: "Enquiries and communications",
    body: <>
      <p>When you contact me, please give accurate information and do not include anyone else’s personal data without their permission. Sending an enquiry does not create a professional or contractual relationship. Any engagement, such as a talk, coaching, an assessment or consulting work, will be agreed separately in writing.</p>
      <p>I try to reply to every genuine enquiry, but I cannot guarantee a reply or a particular response time.</p>
    </>,
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: <>
      <p>When using the website, you agree not to:</p>
      <ul>
        <li>break any law, or infringe anyone’s rights;</li>
        <li>send spam, abusive, defamatory, obscene or misleading messages through the contact form;</li>
        <li>try to gain unauthorised access to the website, its servers or its data, or interfere with how it works;</li>
        <li>upload or send viruses or other harmful code;</li>
        <li>scrape, copy or harvest content or data in bulk using automated tools, except for standard search-engine indexing;</li>
        <li>pretend to be someone else, or misrepresent your connection with me.</li>
      </ul>
      <p>I may block access or ignore messages that break these rules.</p>
    </>,
  },
  {
    id: "third-party",
    title: "Third-party websites and embedded content",
    body: <>
      <p>The website links to, and embeds content from, other services such as Amazon, Flipkart, LinkedIn, YouTube, Facebook, Instagram and X, and the Enterprise Health Scan. These services are run under their own terms and privacy policies. I am not responsible for their content, availability or practices, and a link is not an endorsement of everything on them.</p>
    </>,
  },
  {
    id: "reviews",
    title: "Book reviews and opinions",
    body: <>
      <p>Book reviews and takeaways on the website are my personal views. They are not paid endorsements and are not connected to the authors or publishers unless I say so.</p>
    </>,
  },
  {
    id: "availability",
    title: "Accuracy and availability",
    body: <>
      <p>I work to keep the website accurate and up to date, but content may contain errors or become out of date, and features marked “Coming soon” may change or not launch. The website is provided “as is” and “as available”. I may change, pause or remove any part of it at any time without notice.</p>
    </>,
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: <>
      <p>To the fullest extent permitted by law, I am not liable for any indirect, incidental or consequential loss, or for any loss of profit, business, data or goodwill, arising from your use of, or inability to use, the website or anything on it, or from relying on its content.</p>
      <p>Nothing in these terms limits any liability that cannot be limited under applicable law, or your rights as a consumer under Indian law.</p>
    </>,
  },
  {
    id: "indemnity",
    title: "Your responsibility",
    body: <>
      <p>If you break these terms and that causes a claim against me, you agree to cover the reasonable losses and costs that result, to the extent permitted by law.</p>
    </>,
  },
  {
    id: "law",
    title: "Governing law",
    body: <>
      <p>These terms are governed by the laws of India. Any dispute relating to the website or these terms is subject to the jurisdiction of the competent courts in India. Before going to court, I encourage you to contact me so we can try to resolve the matter informally.</p>
    </>,
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: <>
      <p>I may update these terms from time to time. The “Last updated” date at the top shows when they were last changed. By continuing to use the website after a change, you accept the updated terms.</p>
      <p>If any part of these terms is found to be unenforceable, the rest stays in effect.</p>
    </>,
  },
  {
    id: "contact",
    title: "Contact",
    body: <>
      <p>For any question about these terms, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, or use the <a href="/contact#contact-form">contact form</a>.</p>
    </>,
  },
];

export default function TermsOfUsePage() {
  return <LegalPage
    eyebrow="Using this website"
    title="Terms of Use"
    updated={UPDATED}
    intro={<p>These terms explain how you can use this website and its content, how book purchases through other stores work, and what each of us can expect from the other.</p>}
    sections={sections}
    related={{ href: "/privacy-policy", label: "Read the Privacy Policy" }}
  />;
}
