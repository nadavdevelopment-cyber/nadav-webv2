'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Code2,
  Mail,
  Menu,
  Minus,
  Plus,
  Send,
  ShoppingBag,
  Utensils,
  Workflow,
  Wrench,
  X,
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { answerQuestion, faqs, services, siteConfig } from './site-config';
import HeroScene from './hero-scene';

const icons = [Code2, ShoppingBag, CalendarDays, Utensils, Workflow, Wrench];
const navItems = [
  ['Home', 'home'],
  ['Work', 'work'],
  ['Services', 'services'],
  ['Process', 'process'],
  ['Contact', 'contact'],
] as const;
const processSteps = [
  ['Discovery', 'We learn how your business works, who you need to reach, and what the product needs to accomplish.'],
  ['Direction', 'We define the structure, priorities, functionality, and clearest path for your customers.'],
  ['Design', 'We create a visual system and user experience that feels specific to your business.'],
  ['Development', 'We turn the approved direction into a fast, responsive, dependable product.'],
  ['Launch', 'We test the complete experience, launch it, and make sure your team knows what comes next.'],
] as const;

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: reduced ? 0 : .7 }}>{children}</motion.div>;
}

function ProjectPreview({ theme }: { theme: string }) {
  if (theme === 'booking') {
    return <div className="booking-preview" aria-hidden="true">
      <div className="booking-brand">NADAV <span>✳ BOOKING</span></div>
      <div className="booking-message">Your website.<br />Your calendar.<br /><em>One experience.</em></div>
      <div className="booking-widget">
        <span className="widget-label">BOOK AN APPOINTMENT</span>
        <strong>Choose a service</strong>
        <div className="booking-service"><span>New patient visit<small>60 min</small></span><b>›</b></div>
        <div className="booking-days"><i>MON<small>12</small></i><i className="active">TUE<small>13</small></i><i>WED<small>14</small></i></div>
        <div className="booking-times"><span>9:00 AM</span><span>10:30 AM</span></div>
      </div>
    </div>;
  }
  if (theme === 'food') {
    return <div className="food-preview" aria-hidden="true">
      <div className="food-brand">nadav <span>food.</span></div>
      <div className="food-copy"><small>YOUR MENU. YOUR BRAND.</small><strong>Orders,<br />without the<br /><em>friction.</em></strong></div>
      <div className="food-order">
        <span>ORDER #1049</span>
        <strong>Ready for pickup</strong>
        <div><i /> Double burger <b>$14.00</b></div>
        <div><i /> House fries <b>$5.00</b></div>
        <small>Pickup · 18 min</small>
      </div>
    </div>;
  }
  if (theme === 'burgerhouse') {
    return <div className="burgerhouse-preview">
      <div className="burgerhouse-copy"><span>SMASHED FRESH</span><strong>BURGERS<br />THAT HIT<br /><em>DIFFERENT.</em></strong><small>SMASH · CHEESE · REPEAT</small></div>
      <div className="burgerhouse-photo"><img src="/burgerhouse-hero-smash.png" alt="Double smash cheeseburger with cheddar, pickles, and onion" width="1254" height="1254" loading="lazy" /></div>
      <div className="burgerhouse-wordmark">BURGER<span>HOUSE</span></div>
    </div>;
  }
  if (theme === 'vera') {
    return <div className="vera-preview" aria-hidden="true"><span>vera studio</span><strong>Dress like<br /><em>yourself.</em></strong><small>THE EDIT · SHOP NOW</small></div>;
  }
  if (theme === 'aurelia') {
    return <div className="aurelia-preview" aria-hidden="true">
      <img src="/casa-aurelia-preview.jpg" alt="" width="1672" height="941" loading="lazy" />
      <div className="aurelia-copy"><span>PATAGONIA · ARGENTINA</span><strong>A quiet place<br />to <em>disappear.</em></strong><small>42° SOUTH — TWELVE-SUITE RETREAT</small></div>
    </div>;
  }
  return <div className="carpimono-preview">
    <img src="/carpimono-preview.jpg" alt="Carpimono custom woodworking website shown on a desktop screen" width="1348" height="926" loading="lazy" />
    <span className="preview-browser"><i /><i /><i /><b>webcarpimono.vercel.app</b></span>
  </div>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [chat, setChat] = useState(false);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hi! I’m NADAV’s automated assistant. What are you looking to build?' }]);
  const [notice, setNotice] = useState(false);
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [type, setType] = useState('');
  const [budget, setBudget] = useState('');
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [success, setSuccess] = useState(false);
  const chatEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    addEventListener('scroll', update, { passive: true });
    return () => removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const buttons = document.querySelectorAll<HTMLElement>('.button,.nav-cta');
    const move = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      element.style.translate = `${(event.clientX - rect.left - rect.width / 2) * .06}px ${(event.clientY - rect.top - rect.height / 2) * .1}px`;
    };
    const reset = (event: PointerEvent) => { (event.currentTarget as HTMLElement).style.translate = '0px 0px'; };
    buttons.forEach((button) => {
      button.addEventListener('pointermove', move);
      button.addEventListener('pointerleave', reset);
    });
    return () => buttons.forEach((button) => {
      button.removeEventListener('pointermove', move);
      button.removeEventListener('pointerleave', reset);
    });
  }, []);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const nodes = document.querySelectorAll('.section-heading, .intro h2, .service');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    }), { threshold: .1 });
    nodes.forEach((node) => {
      node.classList.add('reveal-ready');
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => { chatEnd.current?.scrollIntoView({ block: 'nearest' }); }, [messages]);

  const whatsapp = siteConfig.whatsapp
    ? `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
    : '';

  function contactWhatsapp() {
    if (whatsapp) window.open(whatsapp, '_blank', 'noopener,noreferrer');
    else setNotice(true);
  }

  function ask(question: string) {
    if (!question.trim()) return;
    setMessages((current) => [
      ...current,
      { role: 'user', text: question.trim().slice(0, 500) },
      { role: 'assistant', text: answerQuestion(question) },
    ]);
    setText('');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!type || !budget) {
      setFeedback('Choose a project type and estimated budget.');
      return;
    }
    setSending(true);
    setSuccess(false);
    setFeedback('');
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type, budget }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw Error(result.error || 'We could not send your inquiry. Please try again.');
      setSuccess(true);
      setFeedback('Thank you—your inquiry is in. We’ll follow up by email.');
      form.reset();
      setType('');
      setBudget('');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'We could not connect. Check your connection and try again.');
    } finally {
      setSending(false);
    }
  }

  function showFieldError(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.currentTarget;
    if (field.validity.valueMissing) field.setCustomValidity('Please complete this field.');
    else if (field.validity.typeMismatch) field.setCustomValidity('Enter a valid email address.');
    else if (field.validity.patternMismatch) field.setCustomValidity('Enter a valid phone number.');
  }

  function clearFieldError(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    event.currentTarget.setCustomValidity('');
  }

  return <>
    <a href="#content" className="skip-link">Skip to content</a>
    <header className={scrolled ? 'nav-shell scrolled' : 'nav-shell'}>
      <nav aria-label="Primary navigation" className="nav">
        <a className="wordmark" href="#home" aria-label="NADAV home">NADAV<span>✳</span></a>
        <div className="nav-links">{navItems.map(([label, anchor]) => <a key={anchor} href={`#${anchor}`}>{label}</a>)}</div>
        <a className="nav-cta" href="#contact">Start a project <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      </nav>
      {menu && <div className="mobile-nav">{navItems.map(([label, anchor]) => <a key={anchor} href={`#${anchor}`} onClick={() => setMenu(false)}>{label}<ArrowUpRight size={18} /></a>)}</div>}
    </header>

    <main id="content">
      <section id="home" className="hero">
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}><span className="tiny-cross">✳</span> DIGITAL DESIGN & DEVELOPMENT STUDIO</motion.div>
          <h1>Websites,<br />stores, and<br />systems <span>built</span><br />around your<br />business.</h1>
          <p>Custom design. Purpose-built technology.<br />Digital experiences that turn interest into action.</p>
          <div className="hero-actions">
            <a className="button dark" href="#contact">Start a project <ArrowUpRight size={18} /></a>
            <a className="text-button" href="#work">View selected work <ArrowRight size={17} /></a>
          </div>
        </div>
        <div className="hero-art">
          <div className="art-caption">MADE FOR YOUR BUSINESS.<br /><span>BUILT TO PERFORM.</span></div>
          <HeroScene />
          <div className="art-foot"><span><i /> DESIGN × TECHNOLOGY</span><span>01 — PURPOSE-BUILT DIGITAL PRODUCTS</span></div>
        </div>
        <div className="hero-bottom"><span>Thoughtful from the first pixel.</span><a href="#approach">Explore NADAV <ArrowDown size={15} /></a></div>
      </section>

      <div className="expertise-strip"><span>WHAT WE BUILD</span><b>Custom websites</b><Plus /><b>E-commerce</b><Plus /><b>Booking & ordering</b><Plus /><b>Business software</b></div>

      <section id="approach" className="intro section-pad">
        <Reveal>
          <div className="eyebrow">01 / OUR APPROACH</div>
          <h2>Not another template.<br /><span>A digital product built<br />around your business.</span></h2>
          <div className="intro-bottom">
            <span className="asterisk">✳</span>
            <p>A strong website does more than look good. It helps people understand, decide, book, order, or buy. NADAV combines strategy, design, and custom development to make those actions feel simple.</p>
          </div>
        </Reveal>
      </section>

      <section id="work" className="projects section-pad">
        <Reveal>
          <div className="section-heading">
            <div><div className="eyebrow">02 / SELECTED WORK</div><h2>Products with a job to do<span className="period">.</span></h2></div>
            <span className="muted small">NADAV products and custom work across service, retail, and hospitality businesses.</span>
          </div>
          <div className="project-grid">
            {siteConfig.projects.map((project, index) => {
              const external = Boolean(project.url);
              const href = external ? project.url : '#contact';
              return <article key={project.name} className={`project project-${project.theme}${index < 2 ? ' product-feature' : ''}`}>
                <a className={`project-visual ${project.theme}`} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} aria-label={external ? `View ${project.name} in a new tab` : `Ask about ${project.name}`}>
                  <span className="project-kicker">{project.label}</span>
                  <ProjectPreview theme={project.theme} />
                  <span className="project-open"><ArrowUpRight size={22} /></span>
                </a>
                <div className="project-info">
                  <div><span className="category">{project.category}</span><h3>{project.name}</h3><p>{project.description}</p></div>
                  <a className={`view-project${external ? '' : ' is-pending'}`} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{external ? 'View project' : 'Ask about this project'} <ArrowUpRight size={16} /></a>
                </div>
              </article>;
            })}
          </div>
        </Reveal>
      </section>

      <section id="services" className="services section-pad">
        <Reveal>
          <div className="section-heading">
            <div><div className="eyebrow">03 / WHAT WE DO</div><h2>One partner for the website<br />and the system behind it.</h2></div>
            <p>Clear customer experiences.<br />Practical tools for your team.</p>
          </div>
          <div className="service-grid">{services.map(([title, description], index) => {
            const Icon = icons[index];
            return <a href="#contact" onClick={() => setType(title)} className="service" key={title}>
              <div className="service-top"><Icon size={25} strokeWidth={1.25} /><span>0{index + 1}</span></div>
              <h3>{title}</h3><p>{description}</p><ArrowUpRight className="service-arrow" size={20} />
            </a>;
          })}</div>
        </Reveal>
      </section>

      <section id="process" className="process section-pad">
        <div className="process-intro">
          <div className="eyebrow">04 / HOW WE WORK</div>
          <h2>From business<br />need to working<br /><span>product.</span></h2>
          <p>A clear process.<br />Direct communication.<br />No mystery between idea and launch.</p>
          <a href="#contact" className="text-button">Tell us what you need <ArrowUpRight size={18} /></a>
        </div>
        <div className="steps">{processSteps.map(([title, description], index) => {
          const isOpen = openStep === index;
          const panelId = `process-step-${index}`;
          const triggerId = `process-trigger-${index}`;
          return <motion.div initial={{ borderColor: '#303136' }} whileInView={{ borderColor: '#b1b4bb' }} viewport={{ once: true, amount: .8 }} className={`step${isOpen ? ' is-open' : ''}`} key={title}>
            <button id={triggerId} className="step-trigger" type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenStep(isOpen ? null : index)}>
              <span className="step-number">0{index + 1}</span><h3>{title}</h3><span className="step-toggle" aria-hidden="true">{isOpen ? <Minus size={18} /> : <Plus size={18} />}</span>
            </button>
            <div id={panelId} className="step-panel" role="region" aria-labelledby={triggerId} aria-hidden={!isOpen}><div className="step-panel-inner"><p>{description}</p></div></div>
          </motion.div>;
        })}</div>
      </section>

      <section id="contact" className="contact section-pad">
        <div className="contact-copy">
          <div className="eyebrow">05 / START A CONVERSATION</div>
          <h2>Have a project?<br /><span>Let’s make it<br />useful.</span></h2>
          <p>Tell us what you need, what is not working, or what you want to launch. We’ll review it and follow up by email.</p>
          <div className="contact-channels">
            <a className="button dark" href={`mailto:${siteConfig.email}`}><Mail size={17} /> Email NADAV <ArrowUpRight size={18} /></a>
            <button type="button" className="secondary-contact" onClick={contactWhatsapp}>WhatsApp <ArrowUpRight size={15} /></button>
          </div>
          <a className="direct-email" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <div className="contact-note"><span>Good work starts with<br />a clear conversation.</span><span className="asterisk">✳</span></div>
        </div>
        <form onSubmit={submit} className="contact-form">
          <h3>Tell us about your project.</h3>
          <div className="form-grid">
            <label>Name *<input required name="name" autoComplete="name" minLength={2} maxLength={100} placeholder="Your name" onInvalid={showFieldError} onInput={clearFieldError} /></label>
            <label>Company<input name="company" autoComplete="organization" maxLength={150} placeholder="Company or organization" /></label>
            <label>Work email *<input required type="email" name="email" autoComplete="email" maxLength={150} placeholder="you@company.com" onInvalid={showFieldError} onInput={clearFieldError} /></label>
            <label>Phone (optional)<input type="tel" name="phone" autoComplete="tel" pattern="[+0-9 ()-]{6,25}" maxLength={25} placeholder="(555) 123-4567" onInvalid={showFieldError} onInput={clearFieldError} /></label>
            <label>Project type *<Select value={type} onValueChange={setType}><SelectTrigger className="form-select" aria-label="Project type"><SelectValue placeholder="What do you need?" /></SelectTrigger><SelectContent>{services.map(([service]) => <SelectItem key={service} value={service}>{service}</SelectItem>)}</SelectContent></Select></label>
            <label>Estimated budget (USD) *<Select value={budget} onValueChange={setBudget}><SelectTrigger className="form-select" aria-label="Estimated project budget in US dollars"><SelectValue placeholder="Choose a range" /></SelectTrigger><SelectContent>{['$3,000–$6,000 USD', '$6,000–$12,000 USD', '$12,000–$25,000 USD', '$25,000–$50,000 USD', '$50,000+ USD', 'Not sure yet'].map((range) => <SelectItem key={range} value={range}>{range}</SelectItem>)}</SelectContent></Select></label>
            <label className="full">Project details *<textarea name="message" required minLength={10} maxLength={4000} rows={3} placeholder="What are you building, improving, or replacing?" onInvalid={showFieldError} onInput={clearFieldError} /></label>
            <label className="honeypot" aria-hidden="true">Current website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>
          <p className="privacy-note"><a href="/privacy">We only use your information to respond to this inquiry.</a></p>
          <button className="button submit" disabled={sending}>{sending ? 'Sending…' : 'Send project inquiry'} {success ? <Check size={18} /> : <ArrowUpRight size={18} />}</button>
          {feedback && <p role="status" className={success ? 'feedback success' : 'feedback'}>{feedback}</p>}
        </form>
      </section>
    </main>

    <footer>
      <div className="footer-top"><a href="#home" className="wordmark">NADAV<span>✳</span></a><p>Custom digital products, designed with purpose.</p><a href="#home" className="back-top">Back to top <ArrowUpRight size={16} /></a></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} NADAV. All rights reserved.</span><nav className="footer-legal" aria-label="Legal links"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></nav></div>
    </footer>

    <div className={`floating${chat ? ' chat-is-open' : ''}`}><button className="chat-launch" onClick={() => setChat(!chat)} aria-expanded={chat} aria-label="Open NADAV Assistant"><span className="assistant-symbol">✳</span><span>NADAV Assistant</span>{chat ? <X size={16} /> : <Plus size={16} />}</button></div>

    <Dialog open={chat} onOpenChange={setChat}>
      <DialogContent className="chat-panel">
        <DialogTitle className="chat-title"><span className="assistant-symbol">✳</span> NADAV Assistant</DialogTitle>
        <DialogDescription className="chat-subtitle">Automated FAQ assistant · Available anytime</DialogDescription>
        <div className="chat-messages" role="log" aria-live="polite">{messages.map((message, index) => <div key={index} className={`bubble ${message.role}`}>{message.text}</div>)}<div ref={chatEnd} /></div>
        <div className="quick-questions">{faqs.slice(0, 3).map((faq) => <button key={faq.q} onClick={() => ask(faq.q)}>{faq.q}</button>)}</div>
        <a className="chat-contact" href="#contact" onClick={() => setChat(false)}>Contact the team <ArrowUpRight size={14} /></a>
        <form className="chat-input" onSubmit={(event) => { event.preventDefault(); ask(text); }}>
          <input autoComplete="off" aria-label="Type your question" placeholder="Type your question…" maxLength={500} value={text} onChange={(event) => setText(event.target.value)} />
          <button type="submit" disabled={!text.trim()} aria-label="Send message"><Send size={18} /></button>
        </form>
      </DialogContent>
    </Dialog>

    <Dialog open={notice} onOpenChange={setNotice}>
      <DialogContent>
        <DialogTitle>Tell us about your project</DialogTitle>
        <DialogDescription>WhatsApp is not available right now. Send your inquiry through the form or email us at {siteConfig.email}.</DialogDescription>
        <a className="button dark" href="#contact" onClick={() => setNotice(false)}>Go to contact <ArrowUpRight size={18} /></a>
      </DialogContent>
    </Dialog>
  </>;
}
