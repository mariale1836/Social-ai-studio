// Registro de proveedores de generación de video con IA.
//
// Cómo conectar un proveedor real más adelante (sin tocar el resto de la app):
// 1. Busca el proveedor en la lista de abajo (o agrega uno nuevo con el mismo formato).
// 2. Cambia "connected" a true.
// 3. Implementa "generate(payload)": debe devolver una URL o Blob del video generado,
//    normalmente llamando a una Netlify Function que use la API key del proveedor
//    de forma segura en el servidor (nunca en este archivo ni en el navegador).
// La interfaz (index.html) no necesita cambios cuando se agrega o conecta un proveedor.

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
  name: 'Modelo abierto / gratuito (por configurar)',
  connected: false,
  free: true,
  note: 'Opción pensada para costo mínimo o gratuito. Pendiente de conectar.',
  generate: null
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
