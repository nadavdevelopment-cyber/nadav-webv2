import type {Metadata} from 'next';
import LegalPage,{LegalSection} from '../legal-page';

export const metadata:Metadata={title:'Política de Privacidad — NADAV',description:'Cómo NADAV recopila y utiliza los datos enviados mediante su formulario de contacto.'};

export default function PrivacyPage(){
  return <LegalPage eyebrow="INFORMACIÓN LEGAL" title="Política de Privacidad" lead="Esta política explica de forma clara qué información recibimos cuando contactás a NADAV y cómo la utilizamos.">
    <LegalSection title="Datos que recopilamos"><p>Cuando completás el formulario de contacto podemos recibir tu nombre, empresa, email, número de WhatsApp y el mensaje que nos envíes.</p></LegalSection>
    <LegalSection title="Para qué los usamos"><p>Usamos esos datos únicamente para responder tu consulta, entender el proyecto que querés desarrollar y mantener la conversación comercial que vos iniciaste.</p></LegalSection>
    <LegalSection title="Tratamiento de la información"><p>No vendemos tus datos ni los utilizamos para fines ajenos a tu consulta. Solo accede a la información el equipo de NADAV y los servicios técnicos indispensables para recibir y gestionar el mensaje.</p></LegalSection>
    <LegalSection title="Modificación o eliminación"><p>Podés solicitar que corrijamos o eliminemos tus datos escribiéndonos mediante el <a href="/#contacto">formulario de contacto</a>. Atenderemos la solicitud dentro de un plazo razonable.</p></LegalSection>
    <LegalSection title="Actualizaciones"><p>Podemos actualizar esta política si cambia la forma en que funciona el sitio. La versión vigente será siempre la publicada en esta página.</p></LegalSection>
  </LegalPage>;
}
