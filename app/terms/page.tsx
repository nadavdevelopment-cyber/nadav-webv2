import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { LegalSection } from '../legal-page';

export const metadata: Metadata = {
  title: 'Terms of Use — NADAV',
  description: 'General terms for using the NADAV public website.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return <LegalPage eyebrow="LEGAL INFORMATION" title="Terms of Use" lead="These terms govern access to and use of NADAV’s public website.">
    <LegalSection title="Using this website"><p>This website provides information about NADAV’s services, work, and contact options. By using it, you agree to do so lawfully and without interfering with its operation.</p></LegalSection>
    <LegalSection title="Inquiries and proposals"><p>Submitting an inquiry does not create a contract or confirm that NADAV has accepted a project. Scope, timing, pricing, deliverables, and other commercial terms are agreed separately in writing.</p></LegalSection>
    <LegalSection title="Content and intellectual property"><p>NADAV owns, licenses, or has permission to use the text, visuals, identity, and other original content on this site. That content may not be reproduced or reused for commercial purposes without permission.</p></LegalSection>
    <LegalSection title="Availability and external links"><p>We work to keep the website available and accurate, but interruptions and changes may occur. Links to external websites are provided for reference; each destination is responsible for its own content and policies.</p></LegalSection>
    <LegalSection title="Contact"><p>Questions about these terms can be sent to <a href="mailto:nadavdevelopment@gmail.com">nadavdevelopment@gmail.com</a> or through the website’s <Link href="/#contact">contact form</Link>.</p></LegalSection>
  </LegalPage>;
}
