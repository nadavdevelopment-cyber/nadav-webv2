import type {ReactNode} from 'react';
import {ArrowLeft} from 'lucide-react';
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
      <a className={styles.brand} href="/" aria-label="NADAV inicio">NADAV<span className={styles.brandSymbol}>✳</span></a>
      <a className={styles.back} href="/"><ArrowLeft size={15}/> Volver al sitio</a>
    </header>
    <main className={styles.main}>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <h1>{title}</h1>
      <p className={styles.lead}>{lead}</p>
      {children}
    </main>
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} NADAV. Todos los derechos reservados.</span>
      <nav className={styles.legalLinks} aria-label="Enlaces legales"><a href="/privacidad">Privacidad</a><a href="/terminos">Términos</a></nav>
    </footer>
  </div>;
}

export function LegalSection({title,children}:{title:string;children:ReactNode}){
  return <section className={styles.section}><h2>{title}</h2>{children}</section>;
}
