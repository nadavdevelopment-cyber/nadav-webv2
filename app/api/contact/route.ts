import {z} from 'zod';
export const runtime = 'nodejs';
const schema=z.object({name:z.string().trim().min(2).max(100),company:z.string().trim().max(150).optional().default(''),email:z.string().email().max(150),phone:z.string().max(25).regex(/^[+0-9 ()-]*$/).optional().default(''),type:z.string().min(1).max(100),budget:z.string().min(1).max(100),message:z.string().trim().min(10).max(4000),website:z.string().max(200).optional().default('')});
export async function POST(request:Request){
 const origin=request.headers.get('origin');const requestUrl=new URL(request.url);const expectedOrigin=requestUrl.protocol+'//'+(request.headers.get('host')||requestUrl.host);if(origin&&origin!==expectedOrigin)return Response.json({error:'Solicitud no permitida.'},{status:403});
 if(Number(request.headers.get('content-length')||0)>16000)return Response.json({error:'La consulta es demasiado extensa.'},{status:413});
 let body;try{const text=await request.text();if(text.length>16000)return Response.json({error:'La consulta es demasiado extensa.'},{status:413});body=JSON.parse(text)}catch{return Response.json({error:'Revisá los datos de tu consulta.'},{status:400})}
 const parsed=schema.safeParse(body);if(!parsed.success)return Response.json({error:'Revisá los campos: nombre, email, tipo de proyecto, presupuesto y mensaje (mínimo 10 caracteres).'},{status:400});
 const d=parsed.data;if(d.website)return Response.json({error:'No se pudo procesar la consulta.'},{status:400});
 const settings=process.env;const provider=settings.CONTACT_PROVIDER;
 if(!provider)return Response.json({error:'La recepción de consultas todavía no está habilitada. Tu mensaje no fue enviado; conservamos los campos para que puedas intentarlo más adelante.'},{status:503});
 const summary=`Nombre: ${d.name}\nEmpresa: ${d.company}\nEmail: ${d.email}\nWhatsApp: ${d.phone}\nProyecto: ${d.type}\nPresupuesto: ${d.budget}\n\n${d.message}`;
 let url='',payload:unknown,headers:Record<string,string>={'Content-Type':'application/json'};
 if(provider==='resend'&&settings.RESEND_API_KEY&&settings.CONTACT_TO_EMAIL&&settings.CONTACT_FROM_EMAIL){url='https://api.resend.com/emails';headers.Authorization=`Bearer ${settings.RESEND_API_KEY}`;payload={from:settings.CONTACT_FROM_EMAIL,to:[settings.CONTACT_TO_EMAIL],reply_to:d.email,subject:`Nueva consulta NADAV: ${d.type}`,text:summary};}
 else if(provider==='formspree'&&settings.FORMSPREE_FORM_ID){url=`https://formspree.io/f/${encodeURIComponent(settings.FORMSPREE_FORM_ID)}`;headers.Accept='application/json';payload={...d,_subject:'Nueva consulta NADAV'};}
 else if(provider==='emailjs'&&settings.EMAILJS_SERVICE_ID&&settings.EMAILJS_TEMPLATE_ID&&settings.EMAILJS_PUBLIC_KEY&&settings.EMAILJS_PRIVATE_KEY){url='https://api.emailjs.com/api/v1.0/email/send';payload={service_id:settings.EMAILJS_SERVICE_ID,template_id:settings.EMAILJS_TEMPLATE_ID,user_id:settings.EMAILJS_PUBLIC_KEY,accessToken:settings.EMAILJS_PRIVATE_KEY,template_params:{...d,from_name:d.name,reply_to:d.email,message:summary}};}
 else if(provider==='webhook'&&settings.CONTACT_WEBHOOK_URL?.startsWith('https://')){url=settings.CONTACT_WEBHOOK_URL;if(settings.CONTACT_WEBHOOK_SECRET)headers.Authorization=`Bearer ${settings.CONTACT_WEBHOOK_SECRET}`;payload=d;}
 else return Response.json({error:'La recepción de consultas está temporalmente inhabilitada. Tu mensaje no fue enviado.'},{status:503});
 try{const res=await fetch(url,{method:'POST',headers,body:JSON.stringify(payload),signal:AbortSignal.timeout(12000)});if(!res.ok)throw Error('provider');return Response.json({ok:true});}catch{return Response.json({error:'No pudimos entregar tu mensaje. Intentá nuevamente en unos minutos.'},{status:502})}
}
