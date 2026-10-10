import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/app/site-config';
import LanguageMenu from '@/app/language-menu';

export const metadata: Metadata = {
  title: 'Projects — NADAV Custom Web Development',
  description: 'Explore custom websites, booking systems, restaurant ordering, e-commerce, and business software designed and built by NADAV.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return <>
    <Link href="#content" className="skip-link">Skip to content</Link>
    <header className="nav-shell scrolled"><nav aria-label="Primary navigation" className="nav"><Link className="wordmark" href="/" aria-label="NADAV home">NADAV<span>✳</span></Link><div className="nav-links"><Link href="/#services">Services</Link><Link href="/#process">Process</Link></div><LanguageMenu locale="en" /><Link className="nav-cta" href="/#contact">Start a project <ArrowUpRight size={15} /></Link></nav></header>
    <main id="content"><section className="projects projects-directory section-pad">
      <div className="section-heading"><div><div className="eyebrow">SELECTED WORK</div><h1>Projects<span className="period">.</span></h1></div><p>Digital products built around real customer journeys and business operations.</p></div>
      <div className="project-grid">{siteConfig.projects.map((project) => <article key={project.name} className="project"><div className="project-info"><div><span className="category">{project.category}</span><h2>{project.name}</h2><p>{project.description}</p></div><a className="view-project" href={project.url} target="_blank" rel="noopener noreferrer">View project <ArrowUpRight size={16} /></a></div></article>)}</div>
    </section></main>
    <footer><div className="footer-top"><Link href="/" className="wordmark">NADAV<span>✳</span></Link><p>Custom digital products for growing businesses.</p><Link href="/#contact" className="back-top">Start a project <ArrowUpRight size={16} /></Link></div></footer>
  </>;
}
