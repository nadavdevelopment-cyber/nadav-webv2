import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Code2, ShoppingBag, Utensils, Workflow, Wrench } from 'lucide-react';
import { services } from '@/app/site-config';

export const metadata: Metadata = {
  title: 'Services — NADAV Custom Web Development & Digital Studio',
  description: 'Custom websites, booking systems, e-commerce, restaurant ordering systems, and business software designed around how your company works.',
  alternates: { canonical: '/services' },
};

const icons = [Code2, ShoppingBag, CalendarDays, Utensils, Workflow, Wrench];

export default function ServicesPage() {
  return <>
    <Link href="#content" className="skip-link">Skip to content</Link>
    <header className="nav-shell scrolled"><nav aria-label="Primary navigation" className="nav"><Link className="wordmark" href="/" aria-label="NADAV home">NADAV<span>✳</span></Link><div className="nav-links"><Link href="/projects">Projects</Link><Link href="/#process">Process</Link></div><Link className="nav-cta" href="/#contact">Start a project <ArrowUpRight size={15} /></Link></nav></header>
    <main id="content"><section className="services section-pad">
      <div className="section-heading"><div><div className="eyebrow">WHAT WE BUILD</div><h1>Services<span className="period">.</span></h1></div><p>Focused digital experiences for selling, scheduling, ordering, and running your business.</p></div>
      <div className="service-grid">{services.map(([title, description], index) => { const Icon = icons[index]; return <Link href="/#contact" className="service" key={title}><div className="service-top"><Icon size={25} strokeWidth={1.25} /><span>0{index + 1}</span></div><h3>{title}</h3><p>{description}</p><ArrowUpRight className="service-arrow" size={20} /></Link>; })}</div>
    </section></main>
    <footer><div className="footer-top"><Link href="/" className="wordmark">NADAV<span>✳</span></Link><p>Custom digital products for growing businesses.</p><Link href="/#contact" className="back-top">Start a project <ArrowUpRight size={16} /></Link></div></footer>
  </>;
}
