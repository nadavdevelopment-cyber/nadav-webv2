export const siteConfig = {
  email: 'nadavdevelopment@gmail.com',
  whatsapp: '542216207420',
  whatsappMessage: 'Hi NADAV, I would like to discuss a digital project.',
  founders: [
    { name: 'Dante Carrizo', initials: 'DC', role: 'Co-founder', description: 'Building NADAV.', photo: '', linkedin: '' },
    { name: 'Gonzalo Gaitan', initials: 'GG', role: 'Co-founder', description: 'Building NADAV.', photo: '', linkedin: '' },
  ],
  metrics: { projects: null as number | null, clients: null as number | null, satisfaction: null as number | null, assistantHours: 24 },
  projects: [
    {
      name: 'NADAV Booking',
      category: 'Booking platform · Custom websites',
      description: 'A custom website and booking experience with services, staff, live availability, appointment scheduling, and business-specific demos.',
      technologies: ['Services', 'Staff', 'Availability', 'Scheduling'],
      theme: 'booking',
      label: 'NADAV PRODUCT',
      url: 'https://nadav-booking.vercel.app/',
      details: 'A flexible booking platform that brings services, professionals, availability, scheduling, and a custom-branded website into one seamless customer experience.',
    },
    {
      name: 'NADAV Food',
      category: 'Restaurant ordering · Operations',
      description: 'A custom restaurant storefront with menu options, pickup and delivery ordering, stock controls, and tools for managing daily orders.',
      technologies: ['Menu & options', 'Pickup & delivery', 'Order management'],
      theme: 'food',
      label: 'NADAV PRODUCT',
      url: 'https://nadav-food.vercel.app/',
      details: 'A digital ordering system with branded menus, product options, pickup and delivery workflows, stock controls, and tools for managing restaurant orders.',
    },
    {
      name: 'BurgerHouse',
      category: 'Food & beverage · E-commerce',
      description: 'A bold restaurant experience with an online catalog and a direct path to purchase.',
      technologies: ['Restaurant e-commerce'],
      theme: 'burgerhouse',
      label: 'DIGITAL PRODUCT',
      url: 'https://burgerhouse-seven.vercel.app/',
      details: 'A restaurant storefront with a contemporary diner identity and a straightforward ordering journey.',
    },
    {
      name: 'Carpimono',
      category: 'Craft & services · Business website',
      description: 'An editorial business site built to explain services, showcase work, and turn visits into inquiries.',
      technologies: ['Business website'],
      theme: 'carpimono',
      label: 'BUSINESS WEBSITE',
      url: 'https://webcarpimono.vercel.app/',
      details: 'A focused digital presence that communicates custom woodworking services and makes it easy for prospective customers to get in touch.',
    },
    {
      name: 'Vera Studio',
      category: 'Fashion · E-commerce',
      description: 'An editorial storefront with products, variants, inventory, and connected administration.',
      technologies: ['E-commerce', 'NADAV Core', 'Admin dashboard'],
      theme: 'vera',
      label: 'E-COMMERCE & IDENTITY',
      url: 'https://nadav-core-vera-studio-ten.vercel.app/',
      details: 'A warm, editorial fashion store with a live catalog and tools for managing products, inventory, orders, and content.',
    },
    {
      name: 'Casa Aurelia',
      category: 'Hospitality · Editorial website',
      description: 'A bilingual hospitality website shaped around story, atmosphere, and a direct path to stay inquiries.',
      technologies: ['Hospitality website', 'Bilingual experience', 'Stay inquiries'],
      theme: 'aurelia',
      label: 'IMMERSIVE WEBSITE',
      url: 'https://casa-aurelia-snowy.vercel.app/',
      details: 'An editorial website for a twelve-suite Patagonian retreat, with immersive storytelling, considered motion, and a focused stay-inquiry path.',
    },
  ],
};

export const services = [
  ['Custom websites', 'Fast, focused websites built around your business, customers, and goals.'],
  ['E-commerce', 'Online stores with the catalog, checkout, payments, and management tools you need.'],
  ['Booking systems', 'Branded scheduling experiences for services, staff, availability, and appointments.'],
  ['Restaurant ordering', 'Custom menus and ordering flows for pickup, delivery, and restaurant operations.'],
  ['Business software', 'Dashboards, workflows, and internal tools shaped around how your team works.'],
  ['Optimization & support', 'Ongoing improvements, maintenance, and technical support after launch.'],
] as const;

export const faqs = [
  { q: 'What does NADAV build?', keys: ['service', 'build', 'offer', 'do you do'], a: 'We design and build custom websites, e-commerce stores, booking systems, restaurant ordering systems, and business software. We also support and improve products after launch.' },
  { q: 'How much does a website cost?', keys: ['price', 'cost', 'budget', 'rate', 'charge'], a: 'Pricing depends on scope, content, integrations, and functionality. Share a few project details through the contact form and we will recommend the right starting point—without forcing your business into a preset package.' },
  { q: 'How long does a project take?', keys: ['time', 'long', 'timeline', 'deadline', 'weeks'], a: 'Timelines vary by scope and how quickly content and feedback are available. Before work begins, we define milestones and a clear delivery plan for your project.' },
  { q: 'What is included?', keys: ['include', 'domain', 'hosting', 'content'], a: 'Every proposal defines strategy, design, development, launch, revisions, and any hosting, domain, content, or support needs. You will know exactly what is included before the project starts.' },
  { q: 'Do you build online stores?', keys: ['store', 'ecommerce', 'e-commerce', 'payment', 'cart', 'shop'], a: 'Yes. We build custom online stores with catalogs, carts, checkout, payments, and management tools. The exact integrations depend on your market and operating needs.' },
  { q: 'Do you offer ongoing support?', keys: ['maintenance', 'support', 'update', 'ongoing'], a: 'Yes. We can continue with maintenance, improvements, and optimization after launch. Availability and response times are defined in your support plan.' },
  { q: 'How do I start a project?', keys: ['start', 'begin', 'hire', 'project'], a: 'Use the contact form to tell us what you are building, what needs to change, and your approximate budget. We will review it and follow up by email with the best next step.' },
  { q: 'How can I contact NADAV?', keys: ['contact', 'whatsapp', 'talk', 'human', 'email'], a: 'Send a project inquiry through the contact form or email us at nadavdevelopment@gmail.com. WhatsApp is also available as a secondary option.' },
];

export function answerQuestion(value: string) {
  const question = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/^(hi|hello|hey|good morning|good afternoon)[! .]*$/.test(question)) {
    return 'Hi! I am NADAV’s automated assistant. I can help with services, budgets, timelines, and getting started. What are you looking to build?';
  }
  return faqs.find((faq) => faq.keys.some((key) => question.includes(key)))?.a
    || 'I do not have a specific answer for that yet. I am an automated FAQ assistant, not a person. Share the details in the contact form and the NADAV team will help you directly.';
}
