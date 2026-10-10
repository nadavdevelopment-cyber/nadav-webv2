import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { LegalSection } from '../legal-page';

export const metadata: Metadata = {
  title: 'Privacy Policy — NADAV',
  description: 'How NADAV collects and uses information submitted through our contact form.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return <LegalPage eyebrow="LEGAL INFORMATION" title="Privacy Policy" lead="This policy explains what information NADAV receives when you contact us and how we use it.">
    <LegalSection title="Information we collect"><p>When you submit the contact form, we may receive your name, company, email address, phone number, project budget, and the message you send.</p></LegalSection>
    <LegalSection title="How we use it"><p>We use this information to respond to your inquiry, understand the project you are considering, and continue the business conversation you initiated.</p></LegalSection>
    <LegalSection title="How information is handled"><p>We do not sell your personal information or use it for purposes unrelated to your inquiry. Access is limited to the NADAV team and the technical services required to receive and manage your message.</p></LegalSection>
    <LegalSection title="Corrections and deletion"><p>You may ask us to correct or delete your information by emailing <a href="mailto:nadavdevelopment@gmail.com">nadavdevelopment@gmail.com</a> or using our <Link href="/#contact">contact form</Link>. We will respond within a reasonable timeframe.</p></LegalSection>
    <LegalSection title="Policy updates"><p>We may update this policy if the website or the way we handle inquiries changes. The current version will always be available on this page.</p></LegalSection>
  </LegalPage>;
}
