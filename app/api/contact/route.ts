import { z } from 'zod';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  company: z.string().trim().max(150).optional().default(''),
  email: z.string().email().max(150),
  phone: z.string().max(25).regex(/^[+0-9 ()-]*$/).optional().default(''),
  type: z.string().min(1).max(100),
  budget: z.string().min(1).max(100),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(200).optional().default(''),
});

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const requestUrl = new URL(request.url);
  const expectedOrigin = requestUrl.protocol + '//' + (request.headers.get('host') || requestUrl.host);
  if (origin && origin !== expectedOrigin) return Response.json({ error: 'Request not allowed.' }, { status: 403 });
  if (Number(request.headers.get('content-length') || 0) > 16000) return Response.json({ error: 'Your inquiry is too long.' }, { status: 413 });

  let body;
  try {
    const text = await request.text();
    if (text.length > 16000) return Response.json({ error: 'Your inquiry is too long.' }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: 'Check the information in your inquiry and try again.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Check the required fields: name, email, project type, budget, and a message of at least 10 characters.' }, { status: 400 });
  }

  const data = parsed.data;
  if (data.website) return Response.json({ error: 'We could not process this inquiry.' }, { status: 400 });

  const settings = process.env;
  const provider = settings.CONTACT_PROVIDER;
  if (!provider) {
    return Response.json({ error: 'Online inquiries are temporarily unavailable. Your message was not sent; you can email us at nadavdevelopment@gmail.com.' }, { status: 503 });
  }

  const summary = `Name: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nPhone: ${data.phone}\nProject: ${data.type}\nBudget: ${data.budget}\n\n${data.message}`;
  let url = '';
  let payload: unknown;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (provider === 'resend' && settings.RESEND_API_KEY && settings.CONTACT_TO_EMAIL && settings.CONTACT_FROM_EMAIL) {
    url = 'https://api.resend.com/emails';
    headers.Authorization = `Bearer ${settings.RESEND_API_KEY}`;
    payload = { from: settings.CONTACT_FROM_EMAIL, to: [settings.CONTACT_TO_EMAIL], reply_to: data.email, subject: `New NADAV inquiry: ${data.type}`, text: summary };
  } else if (provider === 'formspree' && settings.FORMSPREE_FORM_ID) {
    url = `https://formspree.io/f/${encodeURIComponent(settings.FORMSPREE_FORM_ID)}`;
    headers.Accept = 'application/json';
    payload = { ...data, _subject: 'New NADAV inquiry' };
  } else if (provider === 'emailjs' && settings.EMAILJS_SERVICE_ID && settings.EMAILJS_TEMPLATE_ID && settings.EMAILJS_PUBLIC_KEY && settings.EMAILJS_PRIVATE_KEY) {
    url = 'https://api.emailjs.com/api/v1.0/email/send';
    payload = {
      service_id: settings.EMAILJS_SERVICE_ID,
      template_id: settings.EMAILJS_TEMPLATE_ID,
      user_id: settings.EMAILJS_PUBLIC_KEY,
      accessToken: settings.EMAILJS_PRIVATE_KEY,
      template_params: { ...data, from_name: data.name, reply_to: data.email, message: summary },
    };
  } else if (provider === 'webhook' && settings.CONTACT_WEBHOOK_URL?.startsWith('https://')) {
    url = settings.CONTACT_WEBHOOK_URL;
    if (settings.CONTACT_WEBHOOK_SECRET) headers.Authorization = `Bearer ${settings.CONTACT_WEBHOOK_SECRET}`;
    payload = data;
  } else {
    return Response.json({ error: 'Online inquiries are temporarily unavailable. Your message was not sent.' }, { status: 503 });
  }

  try {
    const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(payload), signal: AbortSignal.timeout(12000) });
    if (!response.ok) throw Error('provider');
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'We could not deliver your message. Please try again in a few minutes or email us directly.' }, { status: 502 });
  }
}
