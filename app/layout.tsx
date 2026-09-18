import type {Metadata} from 'next';
import './globals.css';
import './projects.css';
import './mobile-footer.css';
export const metadata:Metadata={title:'NADAV — Diseño y desarrollo web a medida',description:'Diseñamos y desarrollamos sitios web, e-commerce y sistemas a medida. Tecnología, diseño y estrategia para hacer crecer tu negocio.',icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'},openGraph:{title:'NADAV — De una idea a un producto real.',description:'Diseño y desarrollo web a medida.',locale:'es_AR',type:'website'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
