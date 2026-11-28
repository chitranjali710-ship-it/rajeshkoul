import { LegalPage, type LegalSection } from "@/components/legal-page";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy | Rajesh Koul",
  description: "How rajeshkoul.com collects, uses, protects and deletes personal data, and how to exercise your rights under India's Digital Personal Data Protection Act, 2023.",
  path: "/privacy-policy",
});

const EMAIL = "author.rajeshkoul@gmail.com";
const UPDATED = "27 November 2026";

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who is responsible for your data",
    body: <>
      <p>This website, <strong>rajeshkoul.com</strong>, is the personal website of <strong>Rajesh Koul</strong>, author of <em>The Lean Nervous System</em>. In this policy, “I”, “me” and “my” refer to Rajesh Koul, and “you” refers to anyone who visits or uses the website.</p>
      <p>For the purposes of the <strong>Digital Personal Data Protection Act, 2023</strong> (“DPDP Act”) and the <strong>Digital Personal Data Protection Rules, 2025</strong> (“DPDP Rules”), I am the <strong>Data Fiduciary</strong> for the personal data described in this policy, and you are the <strong>Data Principal</strong>.</p>
      <div className="legal-contact">
        <p><strong>Data Fiduciary:</strong> Rajesh Koul</p>
        <p><strong>Contact for privacy matters:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
      </div>
    </>,
  },
  {
    id: "data-we-collect",
    title: "Personal data I collect",
    body: <>
      <p>I collect only the personal data needed for the purposes listed in this policy. You can browse the website without giving me any personal data.</p>
      <table className="legal-table">
        <thead><tr><th>When</th><th>What is collected</th><th>Why</th></tr></thead>
        <tbody>
          <tr>
            <td>You send an enquiry through the contact form</td>
            <td>First and last name, email address, phone number (optional), the topic you choose, your message, and a record that you gave consent (with its date and time)</td>
            <td>To read and reply to your enquiry and continue the conversation you started</td>
          </tr>
          <tr>
            <td>You email me or message me directly</td>
            <td>Your name, email address and anything you choose to include in your message</td>
            <td>To reply to you</td>
          </tr>
          <tr>
            <td>You visit any page</td>
            <td>Technical data recorded automatically by the website’s hosting provider, such as IP address, browser and device type, the pages requested and the date and time</td>
            <td>To deliver the website, keep it secure, and detect and prevent misuse</td>
          </tr>
          <tr>
            <td>You visit a page <strong>after choosing “Accept”</strong> in the visitor statistics notice</td>
            <td>The page visited, the website that linked to it, browser and device type, country, and page-loading times. No cookies are set and no name, email or account is linked to it.</td>
            <td>To count visits and understand which pages are useful, so the website can be improved</td>
          </tr>
        </tbody>
      </table>
      <p>I do not ask for, and ask you not to send, sensitive information such as financial account details, government ID numbers, passwords or health information through the website.</p>
    </>,
  },
  {
    id: "purposes",
    title: "How and why I use your data",
    body: <>
      <h3>With your consent</h3>
      <p>When you submit the contact form, I process your data on the basis of the consent you give by ticking the consent box, for the specific purpose of responding to your enquiry. This includes enquiries about the book, the Enterprise Health Lab, talks, coaching, campus sessions or anything else you ask about.</p>
      <h3 id="visitor-statistics">Visitor statistics, only if you allow them</h3>
      <p>When you first visit, a notice asks whether you allow visitor statistics. They are collected with <strong>Cloudflare Web Analytics</strong> only if you choose “Accept”, and only for counting visits and improving the website. If you choose “Decline” or ignore the notice, nothing is counted, and the whole website works the same either way.</p>
      <p>You can change or withdraw this choice at any time, as easily as you gave it, from <strong>“Privacy choices”</strong> at the bottom of every page. Your choice and the date you made it are saved in your own browser so that the notice isn’t shown on every page.</p>
      <h3>For certain legitimate uses</h3>
      <p>As permitted by Section 7 of the DPDP Act, I may process limited data without separate consent where it is necessary to comply with a law, a court order or a lawful request from a government authority, or to respond to a medical emergency or threat to safety.</p>
      <h3>What I do not do</h3>
      <ul>
        <li>I do not sell, rent or trade your personal data.</li>
        <li>I do not use your data for advertising or profiling.</li>
        <li>I do not add you to a newsletter or mailing list unless you separately and clearly ask to be added.</li>
        <li>I do not use your enquiry for any purpose other than the one you contacted me about, unless I ask for and receive your consent first.</li>
      </ul>
    </>,
  },
  {
    id: "consent",
    title: "Your consent and how to withdraw it",
    body: <>
      <p>Consent is free, specific, informed and unambiguous. The consent box on the contact form is not ticked in advance, and you can use the rest of the website without giving consent.</p>
      <p>You can <strong>withdraw your consent at any time</strong>, as easily as you gave it, by emailing <a href={`mailto:${EMAIL}?subject=Withdraw%20consent`}>{EMAIL}</a> with the subject “Withdraw consent”. Once you withdraw consent, I will stop processing your data for that purpose and erase it within a reasonable time, unless a law requires me to keep it.</p>
      <p>Withdrawing consent does not affect processing that took place before you withdrew it. If you withdraw consent while an enquiry is still open, I may not be able to continue responding to it.</p>
    </>,
  },
  {
    id: "sharing",
    title: "Who your data is shared with",
    body: <>
      <p>Your data is seen by me and, only where needed, by service providers who help run the website. These providers act as <strong>Data Processors</strong> on my behalf and may use the data only to provide their service to me. They are:</p>
      <ul>
        <li><strong>Website hosting</strong>, which stores the website and records the technical data described above;</li>
        <li><strong>Web3Forms</strong>, which receives what you type into the contact form and forwards it to my email inbox;</li>
        <li><strong>Email</strong> (Google Gmail), which delivers your enquiry to me and my replies to you;</li>
        <li><strong>Cloudflare Web Analytics</strong>, which counts visits for me, only if you have allowed visitor statistics. Cloudflare states that it does not use this data to track individuals or for advertising.</li>
      </ul>
      <p>I may also disclose data where the law requires it, for example to comply with a court order or a lawful request from a government authority.</p>
    </>,
  },
  {
    id: "transfers",
    title: "Processing outside India",
    body: <>
      <p>Some service providers may store or process data on servers outside India. Section 16 of the DPDP Act allows this, except to countries that the Government of India restricts by notification. I will not transfer your data to any such restricted country, and I will follow any conditions set by the Government for transfers.</p>
    </>,
  },
  {
    id: "retention",
    title: "How long I keep your data",
    body: <>
      <ul>
        <li><strong>Enquiries and related emails:</strong> kept while we are in conversation and for up to <strong>12 months after our last exchange</strong>, so that I can refer back to it if you contact me again. After that they are erased.</li>
        <li><strong>Consent records:</strong> kept for as long as the related data is kept, and longer only where needed to show that consent was given.</li>
        <li><strong>Technical logs:</strong> kept by the hosting provider for its standard period, and for any minimum period that the DPDP Rules or other laws require.</li>
      </ul>
    </>,
  },
  {
    id: "security",
    title: "How your data is protected",
    body: <>
      <p>I take reasonable security safeguards to protect your data from unauthorised access, use, change, disclosure or loss. These include:</p>
      <ul>
        <li>an encrypted connection (HTTPS) for the whole website;</li>
        <li>access to enquiries limited to me, through password-protected accounts;</li>
        <li>collecting only what is needed, and erasing it when it is no longer needed.</li>
      </ul>
      <p><strong>If a personal data breach happens</strong>, I will inform affected Data Principals without delay, in plain language, explaining what happened, the likely impact, what I am doing about it and what you can do. I will also report the breach to the <strong>Data Protection Board of India</strong> within the time required by the DPDP Rules.</p>
    </>,
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: <>
      <p>Under the DPDP Act, you have the right to:</p>
      <ul>
        <li><strong>Access</strong>: a summary of the personal data I hold about you, how it is being processed, and who it has been shared with;</li>
        <li><strong>Correction, completion and updating</strong> of inaccurate, incomplete or out-of-date data;</li>
        <li><strong>Erasure</strong> of your data once it is no longer needed for its purpose, or when you withdraw consent;</li>
        <li><strong>Grievance redressal</strong>, as described in the next section;</li>
        <li><strong>Nomination</strong>: to name another person who can exercise these rights for you if you die or become unable to do so.</li>
      </ul>
      <p>To use any of these rights, email <a href={`mailto:${EMAIL}?subject=Data%20rights%20request`}>{EMAIL}</a> with the subject “Data rights request”, say which right you want to use, and give the name and email address you used to contact me. I may ask you to confirm your identity before acting on the request.</p>
      <p>The DPDP Act also asks Data Principals not to file false or frivolous complaints and to give accurate information when exercising their rights.</p>
    </>,
  },
  {
    id: "grievances",
    title: "Complaints and grievances",
    body: <>
      <p>If you have a concern about how your data is handled, please contact me first:</p>
      <div className="legal-contact">
        <p><strong>Grievance contact:</strong> Rajesh Koul</p>
        <p><strong>Email:</strong> <a href={`mailto:${EMAIL}?subject=Privacy%20grievance`}>{EMAIL}</a> (subject: “Privacy grievance”)</p>
      </div>
      <p>I will acknowledge your grievance within <strong>7 days</strong> and resolve it as soon as possible, and in any case within <strong>90 days</strong> of receiving it, as the DPDP Rules require.</p>
      <p>If you are not satisfied with the outcome, you may file a complaint with the <strong>Data Protection Board of India</strong>, after first using this grievance process.</p>
    </>,
  },
  {
    id: "children",
    title: "Children",
    body: <>
      <p>This website is meant for adults. I do not knowingly collect personal data from anyone under 18 without <strong>verifiable consent from their parent or lawful guardian</strong>, and I do not track, profile or target advertising at children.</p>
      <p>If you are under 18, please ask a parent or guardian to contact me on your behalf. If you believe a child has sent me personal data without such consent, email me and I will erase it.</p>
    </>,
  },
  {
    id: "cookies",
    title: "Cookies, storage and embedded content",
    body: <>
      <ul>
        <li><strong>No cookies for advertising or tracking.</strong> The website does not use advertising cookies or tracking pixels.</li>
        <li><strong>Visitor statistics.</strong> Cloudflare Web Analytics sets no cookies and runs only after you choose “Accept”. You can change your choice from “Privacy choices” at the bottom of every page.</li>
        <li><strong>Your privacy choice.</strong> Your answer to the visitor statistics notice, and the date you gave it, are saved in your own browser (local storage) so the notice isn’t repeated on every page. It never leaves your device.</li>
        <li><strong>Display preferences.</strong> If you switch the Blogs or Book Review list between grid and list view, that choice is saved in your own browser (local storage) so it is remembered next time. It contains no personal data and never leaves your device. You can clear it at any time through your browser settings.</li>
        <li><strong>YouTube videos.</strong> Videos are embedded using YouTube’s privacy-enhanced mode and load only when you press play. Once a video plays, YouTube (Google) may collect data under its own privacy policy.</li>
      </ul>
    </>,
  },
  {
    id: "third-parties",
    title: "Links to other websites",
    body: <>
      <p>The website links to services run by others, including Amazon, Flipkart and Kindle (to buy the book), LinkedIn, YouTube, Facebook, Instagram and X, and the Enterprise Health Scan. When you follow these links, the other service’s own privacy policy applies, and I do not control what data it collects. Please read their policies before sharing information with them.</p>
    </>,
  },
  {
    id: "language",
    title: "Language of this notice",
    body: <>
      <p>This notice is in English. Under the DPDP Act, you can ask to receive it in any language listed in the Eighth Schedule to the Constitution of India. Email me with the language you would like and I will provide it.</p>
    </>,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: <>
      <p>I may update this policy, for example when the website changes or the law changes. The “Last updated” date at the top shows when it was last revised. If a change affects how I use data you have already given me, I will tell you and, where required, ask for your consent again before the change applies to your data.</p>
    </>,
  },
  {
    id: "contact",
    title: "Contact",
    body: <>
      <p>For any question about this policy or your personal data, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, or use the <a href="/contact#contact-form">contact form</a>.</p>
    </>,
  },
];

export default function PrivacyPolicyPage() {
  return <LegalPage
    eyebrow="Your data, your choice"
    title="Privacy Policy"
    updated={UPDATED}
    intro={<p>This policy explains what personal data this website collects, why, how long it is kept, and how you can use your rights under India’s Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025.</p>}
    summary={{
      title: "At a glance",
      points: [
        <>You can browse the whole website without sharing any personal data.</>,
        <>If you use the contact form, I use your details only to reply to you, with your consent.</>,
        <>I don’t sell your data, run advertising trackers or add you to mailing lists.</>,
        <>Visitor statistics are collected only if you allow them, without cookies, and you can change your mind at any time from “Privacy choices” at the bottom of every page.</>,
        <>You can access, correct or erase your data, or withdraw consent, by emailing <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</>,
        <>Grievances are resolved within 90 days.</>,
      ],
    }}
    sections={sections}
    related={{ href: "/terms-of-use", label: "Read the Terms of Use" }}
  />;
}
