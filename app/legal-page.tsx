import type {ReactNode} from 'react';
import {ArrowLeft} from 'lucide-react';
import Link from 'next/link';
import styles from './legal.module.css';

type LegalPageProps={
  eyebrow:string;
  title:string;
  lead:string;
  children:ReactNode;
};

export default function LegalPage({eyebrow,title,lead,children}:LegalPageProps){
  return <div className={styles.page}>
    <header className={styles.header}>
      <Link className={styles.brand} href="/" aria-label="NADAV home">NADAV<span className={styles.brandSymbol}>✳</span></Link>
      <Link className={styles.back} href="/"><ArrowLeft size={15}/> Back to website</Link>
    </header>
    <main className={styles.main}>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <h1>{title}</h1>
      <p className={styles.lead}>{lead}</p>
      {children}
    </main>
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} NADAV. All rights reserved.</span>
      <nav className={styles.legalLinks} aria-label="Legal links"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></nav>
    </footer>
  </div>;
}

export function LegalSection({title,children}:{title:string;children:ReactNode}){
  return <section className={styles.section}><h2>{title}</h2>{children}</section>;
}
