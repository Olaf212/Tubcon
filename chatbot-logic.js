// chatbot-logic.js - Lógica reusable para HTML y React
export const knowledgeBase = {
  saludos: [
    "¡Hola! Soy tu asistente de TUBCON. ¿En qué puedo ayudarte hoy?",
    "¡Buen día! ¿Necesitas ayuda con productos de plomería?",
    "¡Hola! Expertos en tubos, conexiones y accesorios de PVC. ¿En qué te puedo ayudar?"
  ],
  respuestas: {
    'tubcon|empresa|quiénes son|quién es': "TUBCON es una empresa especializada en la distribución de material de plomería, trabajando con las mejores marcas del mercado.",
    'productos|qué venden|qué tienen|catálogo': "Ofrecemos tubos, conexiones y accesorios de PVC de la más alta calidad. Puedes ver nuestro catálogo en la sección de productos.",
    'ubicación|dónde están|local|dirección': "Puedes encontrar información sobre nuestras instalaciones en la sección de instalaciones.",
    'contacto|teléfono|whatsapp|email|correo': "Puedes contactarnos a través de la sección de contacto o llamarnos al 55-43-22-51-89.",
    'pvc|tubos|tuberías|conexiones|accesorios': "Contamos con una amplia variedad de productos de PVC para todos tus proyectos de plomería. Visita nuestra sección de productos para más información.",
    'precios|costos|cotización|valor': "Para obtener información sobre precios y cotizaciones, te recomendamos contactarnos directamente para brindarte la mejor atención personalizada.",
    'distribuidor|mayoreo|revender|comerciante': "Si estás interesado en ser distribuidor, contáctanos para brindarte información sobre nuestros programas de distribución.",
    'hola|buenos días|buenas tardes|buenas noches': "¡Hola! Soy tu asistente de TUBCON. ¿En qué puedo ayudarte hoy?",
    'gracias|bye|adiós|chao|hasta luego': "¡De nada! Estoy aquí para ayudarte cuando lo necesites. ¡Que tengas un excelente día!",
    'ayuda|soporte|asistencia|problema': "Para soporte técnico puedes contactarnos a través de la sección de contacto."
  },
  respuestasGenericas: [
    "No estoy seguro de entender. ¿Podrías reformular tu pregunta?",
    "¿Te refieres a algún producto o servicio específico de TUBCON?",
    "Puedo ayudarte con información sobre nuestros productos, ubicación o contacto. ¿Qué necesitas?",
    "Como asistente de TUBCON, puedo ayudarte con información sobre nuestros productos de plomería. ¿En qué te puedo ayudar?"
  ]
};

// Configuración de APIs
export const WIT_AI_TOKEN = "PU6SJVTN7UBA5TJOAUTVZWBZIHUVNXJF";
export const WIT_API_VERSION = "20250502";
export const GEMINI_API_KEY = "AIzaSyD5G2WoPDgnXC9lT4lpPPyPGchb712hg2w";

// Función para procesar mensajes localmente
export const procesarRespuestaLocal = (mensaje) => {
  const input = mensaje.toLowerCase().trim();
  
  for (const [claves, respuesta] of Object.entries(knowledgeBase.respuestas)) {
    const patrones = claves.split('|');
    for (const patron of patrones) {
      if (new RegExp(`\\b${patron}\\b`, 'i').test(input)) {
        return respuesta;
      }
    }
  }
  
  return knowledgeBase.respuestasGenericas[
    Math.floor(Math.random() * knowledgeBase.respuestasGenericas.length)
  ];
};

// Función simple para HTML (sin async/await complejo)
export const procesarMensajeSimple = (mensaje) => {
  const input = mensaje.toLowerCase().trim();
  
  // Detectar saludos
  if (input.includes('hola') || input.includes('buenos días') || 
      input.includes('buenas tardes') || input.includes('buenas noches')) {
    return knowledgeBase.saludos[
      Math.floor(Math.random() * knowledgeBase.saludos.length)
    ];
  }
  
  // Usar respuestas locales
  return procesarRespuestaLocal(mensaje);
};