# NADAV — código completo para GitHub y Vercel

Esta exportación conserva los archivos de presentación, textos, estilos, componentes, recursos y animación Three.js de la versión 5 de NADAV. Los cambios se limitan al entorno de ejecución: Next.js estándar en lugar de Vinext/Cloudflare, comandos de Node.js y variables del servidor mediante `process.env`.

## Ejecutar localmente

Instalá Node.js 24 LTS (incluye npm). Descomprimí el ZIP y abrí una terminal en la carpeta que contiene `package.json`.

```bash
npm ci
npm run dev
```

Abrí http://localhost:3000. Para comprobar la versión de producción, detené el servidor de desarrollo con Ctrl+C y ejecutá:

```bash
npm run build
npm start
```

`npm start` requiere haber compilado. `npm run typecheck` comprueba TypeScript. El archivo `package-lock.json` fija las dependencias; conservá ese archivo y usá `npm ci` para reproducir la instalación.

## Subir a GitHub

1. Creá un repositorio vacío en GitHub, por ejemplo `nadav`.
2. Subí el contenido descomprimido: `package.json`, `package-lock.json`, `app/`, `components/`, `public/` y los demás archivos deben quedar en la raíz del repositorio. No subas el ZIP como único archivo.
3. Incluí `.gitignore`, `.env.example` y `.nvmrc`. No subas `.env.local`, `node_modules/` ni `.next/`.

Alternativamente, desde la carpeta descomprimida, con Git instalado (reemplazá TU_USUARIO por tu usuario real):

```bash
git init
git add .
git commit -m "Importar NADAV"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/nadav.git
git push -u origin main
```

## Importar en Vercel

En Vercel elegí Add New → Project, conectá GitHub e importá el repositorio.

| Ajuste | Valor |
| --- | --- |
| Framework Preset | Next.js |
| Root Directory | `./` (la carpeta que contiene package.json) |
| Node.js Version | `24.x` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | Predeterminado de Next.js; no activar Override |

No configures `dist`, una exportación HTML ni un comando Wrangler. Vercel detecta la página y la ruta `/api/contact` de Next.js. Agregá las variables de contacto que correspondan antes de pulsar Deploy. No hacen falta variables para mostrar la página, el 3D o el asistente local.

Tras publicar, para conectar un dominio, entrá a Settings → Domains, agregalo y aplicá en tu proveedor DNS los registros exactos que indique Vercel. No se cambia el dominio automáticamente con este ZIP.

Documentación oficial: https://vercel.com/docs/frameworks/full-stack/nextjs

## Variables de entorno y contacto

El archivo `.env.example` contiene exclusivamente nombres de variables y valores vacíos. En tu computadora, copialo a `.env.local` y completá únicamente el proveedor elegido. En Vercel: Project → Settings → Environment Variables. Agregá cada nombre y valor por separado, seleccioná Production (y Preview si querés probar allí) y volvé a desplegar después de cambiar valores. No uses el prefijo `NEXT_PUBLIC_` para estas credenciales.

Elegí **un solo** proveedor:

| CONTACT_PROVIDER | Otras variables necesarias |
| --- | --- |
| `resend` | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (remitente verificado en Resend) |
| `formspree` | `FORMSPREE_FORM_ID` (solo el ID, no la URL completa) |
| `emailjs` | `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY` |
| `webhook` | `CONTACT_WEBHOOK_URL` (HTTPS); `CONTACT_WEBHOOK_SECRET` opcional |

La plantilla de EmailJS debe aceptar `from_name`, `reply_to` y `message`; también se transmiten los campos del formulario. El webhook recibe JSON y debe devolver una respuesta HTTP 2xx únicamente cuando acepta la consulta. Su secreto opcional se envía como Bearer token.

El comportamiento original se conserva: sin proveedor configurado, el formulario informa que la consulta **no fue enviada** y mantiene los campos. No se simula un envío exitoso. La entrega real requiere las credenciales y configuración de tu proveedor; debe confirmarse en la casilla o servicio receptor.

**WhatsApp:** el campo `whatsapp` de `app/site-config.ts` está vacío en la versión exportada. Por eso, los botones abren el aviso existente y ofrecen ir al formulario. Para habilitar el enlace real, completalo con el número internacional, solo dígitos. Eso requiere editar el archivo y desplegar de nuevo; esta exportación no inventa un número.

**Asistente:** conserva sus respuestas locales de preguntas frecuentes. No utiliza una API de IA ni necesita claves.

**Proyectos:** se conservan las demos y sus URLs tal como están configuradas. Si una URL está vacía, el modal ofrece solicitar un proyecto similar.

## Alcance técnico

- La web no necesita base de datos para sus funciones actuales.
- La API conserva validación, comprobación de origen, honeypot, límite de tamaño, tiempo de espera y respuestas de error.
- Se excluyen adaptadores, archivos de despliegue y utilidades exclusivas de Sites que no forman parte de las funciones de esta web.
- No se incluyen secretos, dependencias instaladas, compilaciones, historial Git ni cachés.
- Se mantiene WebGL con su fallback original y el respeto a movimiento reducido; la disponibilidad de WebGL depende del navegador y dispositivo.

## Verificación realizada antes de entregar

- Instalación limpia con `npm ci`, sin reutilizar `node_modules` de Sites.
- Compilación de producción con `npm run build`, incluido TypeScript, completada sin errores.
- Servidor de producción iniciado y página comprobada en Chromium a 1440 × 1000 y 390 × 844.
- Canvas WebGL presente en ambos tamaños, animación en movimiento, sin fallback ni desbordamiento horizontal; capturas revisadas visualmente.
- Menú móvil, anclas internas, asistente FAQ, los tres modales de proyectos y sus enlaces al formulario comprobados.
- Formulario enviado al endpoint real local: conserva los campos y muestra el aviso existente de proveedor no configurado. Validación de datos y rechazo de origen ajeno comprobados.
- Sin errores de JavaScript durante estas pruebas.
- Comparación byte a byte: 70 archivos de presentación y recursos coinciden con la versión actual de Sites.

No se realizó un despliegue en tu cuenta de Vercel ni una prueba en dispositivos físicos. No se verificó entrega real de correos ni apertura de una conversación real de WhatsApp: faltan las credenciales del proveedor y el número, respectivamente. No se sustituyeron estas funciones.

La comprobación de origen usa el encabezado Host del servidor Next.js para evitar rechazar el mismo dominio por la URL interna de ejecución; sigue rechazando otros orígenes.
