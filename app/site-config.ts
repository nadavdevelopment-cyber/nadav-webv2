export const siteConfig = {
  whatsapp: '542216207420', // Número internacional, solo dígitos. Ejemplo de formato: 549...
  whatsappMessage: 'Hola NADAV, estoy interesado/a en desarrollar un proyecto web.',
  founders: [
    { name: 'Dante Carrizo', initials: 'DC', role: 'Cofundador', description: 'Construyendo NADAV.', photo: '', linkedin: '' },
    { name: 'Gonzalo Gaitan', initials: 'GG', role: 'Cofundador', description: 'Construyendo NADAV.', photo: '', linkedin: '' },
  ],
  metrics: { projects: null as number|null, clients: null as number|null, satisfaction: null as number|null, assistantHours: 24 },
  projects: [
    {name:'BurgerHouse', category:'Gastronomía · E-commerce · NADAV Core', description:'Una experiencia gastronómica con identidad propia, catálogo online y compra directa.', technologies:['E-commerce gastronómico'], theme:'burgerhouse', label:'PRODUCTO DIGITAL', url:'https://burgerhouse-seven.vercel.app/', details:'Storefront gastronómico conectado a NADAV Core, con una identidad diner contemporánea y un recorrido de compra directo.'},
    {name:'Carpimono', category:'Carpintería · Sitio institucional · NADAV Core', description:'Sitio institucional diseñado para presentar servicios, trabajos y facilitar el contacto con potenciales clientes.', technologies:['Sitio institucional'], theme:'carpimono', label:'NEGOCIO & SERVICIOS', url:'https://webcarpimono.vercel.app/', details:'Una presencia digital editorial para comunicar servicios, mostrar trabajos y convertir visitas en consultas.'},
  ],
};
export const services = [
 ['Desarrollo web','Sitios rápidos, modernos, escalables y hechos a la medida de tu negocio.'],
 ['E-commerce','Tiendas online con catálogo, carrito, pagos y administración.'],
 ['Sistemas para gastronomía','Menús digitales, pedidos, delivery y gestión de comandas.'],
 ['Landing pages','Una experiencia enfocada en convertir visitas en oportunidades.'],
 ['Sistemas personalizados','Dashboards, automatizaciones y herramientas que simplifican tu trabajo.'],
 ['Mantenimiento','Actualizaciones, soporte y optimización para seguir creciendo.'],
];
export const faqs = [
 {q:'¿Qué servicios ofrecen?', keys:['servicio','hacen','ofrecen'], a:'Diseñamos y desarrollamos sitios web, tiendas online, sistemas para gastronomía, landing pages y sistemas personalizados. También ofrecemos mantenimiento.'},
 {q:'¿Cuánto cuesta una web?', keys:['precio','cuesta','costo','presupuesto','cobran'], a:'Cada proyecto se cotiza según su alcance, funcionalidades y contenido. Contanos tu idea en el formulario y el equipo podrá preparar una propuesta. No tenemos una tarifa única publicada.'},
 {q:'¿Cuánto tarda un proyecto?', keys:['tiempo','tarda','plazo','demora'], a:'Los plazos dependen del alcance y de los contenidos disponibles. Definimos un cronograma con vos antes de comenzar; el equipo puede estimarlo al conocer tu proyecto.'},
 {q:'¿Qué incluye el servicio?', keys:['incluye','incluido','dominio','hosting'], a:'Trabajamos en estrategia, diseño, desarrollo y lanzamiento. Las funcionalidades, revisiones, hosting, dominio y soporte incluidos se detallan en cada propuesta.'},
 {q:'¿Desarrollan tiendas online?', keys:['tienda','ecommerce','e-commerce','pago','carrito'], a:'Sí. Desarrollamos tiendas con catálogo, carrito, pagos y panel de administración, con integraciones definidas según las necesidades de tu negocio.'},
 {q:'¿Hacen mantenimiento?', keys:['mantenimiento','soporte','actualiza'], a:'Sí. Podemos acompañarte con actualizaciones, mejoras y optimización continua. La disponibilidad del equipo y los tiempos de respuesta se acuerdan en cada plan. Yo soy el asistente automático disponible 24/7.'},
 {q:'¿Cómo inicio un proyecto?', keys:['empez','inici','contrat','proyecto'], a:'Completá el formulario con tu idea, tipo de proyecto y presupuesto aproximado. Nuestro equipo podrá conversar con vos para definir los próximos pasos.'},
 {q:'¿Cómo los contacto?', keys:['contact','whatsapp','hablar','humano','email'], a:'Podés escribir desde la sección Contacto. Si el canal de WhatsApp está habilitado, su botón te lleva directamente a conversar con NADAV.'},
];
export function answerQuestion(value:string){const q=value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); if(/^(hola|buenas|buen dia|hey)[! .]*$/.test(q))return '¡Hola! Soy el asistente automático de NADAV. Puedo orientarte sobre servicios, presupuestos y cómo empezar. ¿Qué te gustaría crear?';return faqs.find(f=>f.keys.some(k=>q.includes(k)))?.a || 'No tengo una respuesta específica para esa consulta. Soy un asistente de preguntas frecuentes, no una persona. Contanos los detalles en Contacto para que el equipo pueda ayudarte.';}
