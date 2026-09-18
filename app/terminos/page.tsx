import type {Metadata} from 'next';
import LegalPage,{LegalSection} from '../legal-page';

export const metadata:Metadata={title:'Términos de Uso — NADAV',description:'Términos generales de uso del sitio web de NADAV.'};

export default function TermsPage(){
  return <LegalPage eyebrow="INFORMACIÓN LEGAL" title="Términos de Uso" lead="Estas condiciones regulan el acceso y uso del sitio público de NADAV.">
    <LegalSection title="Uso del sitio"><p>El contenido del sitio tiene fines informativos y presenta los servicios, trabajos y formas de contacto de NADAV. Al navegarlo, te comprometés a utilizarlo de manera lícita y sin afectar su funcionamiento.</p></LegalSection>
    <LegalSection title="Consultas y propuestas"><p>Enviar una consulta no crea por sí solo una relación contractual ni implica la aceptación de un proyecto. El alcance, los plazos, los valores y cualquier condición comercial se definirán por separado entre las partes.</p></LegalSection>
    <LegalSection title="Contenido y propiedad intelectual"><p>Los textos, recursos visuales, identidad y demás contenidos propios de este sitio pertenecen a NADAV o se utilizan con autorización. No pueden reproducirse o reutilizarse con fines comerciales sin permiso.</p></LegalSection>
    <LegalSection title="Disponibilidad y enlaces"><p>Trabajamos para mantener el sitio disponible y actualizado, aunque pueden existir interrupciones o cambios. Los enlaces a sitios externos se ofrecen como referencia y cada destino administra sus propios contenidos y políticas.</p></LegalSection>
    <LegalSection title="Contacto"><p>Si tenés una consulta sobre estos términos, podés comunicarte mediante el <a href="/#contacto">formulario de contacto</a> del sitio.</p></LegalSection>
  </LegalPage>;
}
