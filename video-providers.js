// Registro de proveedores de generación de video con IA.
//
// Cómo conectar un proveedor real más adelante (sin tocar el resto de la app):
// 1. Busca el proveedor en la lista de abajo (o agrega uno nuevo con el mismo formato).
// 2. Cambia "connected" a true.
// 3. Implementa "generate(payload)": debe devolver una URL o Blob del video generado,
//    normalmente llamando a una Netlify Function que use la API key del proveedor
//    de forma segura en el servidor (nunca en este archivo ni en el navegador).
// La interfaz (index.html) no necesita cambios cuando se agrega o conecta un proveedor.
let hfTokenMemoria = null;
const VIDEO_PROVIDERS = [
 {
  id: 'pending',
  name: 'Selecciona un proveedor…',
  connected: false,
  free: false,
  note: '',
  generate: null
 },
 {
  id: 'local-free',
  name: 'LTX Video Fast - Gratis (Hugging Face)',
  connected: true,
  free: true,
  note: 'Generación gratuita de prueba con LTX Video Fast usando Hugging Face ZeroGPU.',
  generate: async function(payload) {
    const { Client, handle_file } = await import(
      'https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js'
    );

  
const app = await Client.connect(
  'Lightricks/ltx-video-distilled'
);

    const duration = Math.min(8.5, Math.max(0.3, parseFloat(payload.duration) || 2));

    let height = 512;
    let width = 512;

    if (String(payload.format).startsWith('9:16')) {
      height = 896;
      width = 512;
  } else if (String(payload.format).startsWith('16:9')) {
      height = 512;
      width = 896;
    }

    const negativePrompt =
      'worst quality, inconsistent motion, blurry, jittery, distorted';

    const imageMotionPrompt =
  (payload.prompt || '') +
  '. Natural motion, visible movement, the subject is alive and moving. Subtle head movement, blinking, facial expression changes, body movement, camera motion, realistic animation.';
let result;
    if (payload.photoFile) {
      result = await app.predict('/image_to_video', [
        imageMotionPrompt,
        negativePrompt,
        handle_file(payload.photoFile),
        null,
        height,
        width,
        'image-to-video',
        duration,
        9,
        42,
        true,
        3,
        false
      ]);
    } else {
      result = await app.predict('/text_to_video', [
        payload.prompt,
        negativePrompt,
        null,
        null,
        height,
        width,
        'text-to-video',
        duration,
        9,
        42,
        true,
        3,
        false
      ]);
    }

    return {
      videoUrl: result.data[0]?.url || result.data[0]?.video?.url || (typeof result.data[0] === 'string' ? result.data[0] : null),
      seed: result.data[1]
    };
  }
},
 {
  id: 'runway',
  name: 'Runway ML',
  connected: false,
  free: false,
  note: 'Servicio de pago. Pendiente de conectar.',
  generate: null
 },
 {
  id: 'pika',
  name: 'Pika Labs',
  connected: false,
  free: false,
  note: 'Incluye capa gratuita limitada. Pendiente de conectar.',
  generate: null
 },
 {
  id: 'stability',
  name: 'Stability AI (Stable Video Diffusion)',
  connected: false,
  free: false,
  note: 'Pendiente de conectar.',
  generate: null
 }
];

function getVideoProvider(id) {
 return VIDEO_PROVIDERS.find(p => p.id === id) || VIDEO_PROVIDERS[0];
}
