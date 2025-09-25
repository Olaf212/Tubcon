// answers.js - Base de respuestas locales para TUBCON

export const localAnswers = {
    // Respuestas directas
    respuestas: {
        'tubcon|empresa|quiénes son|quién es': {
            tipo: "texto",
            contenido: "TUBCON es una empresa especializada en la distribución de material de plomería, trabajando con las mejores marcas del mercado."
        },
        'productos|qué venden|qué tienen|catálogo': {
            tipo: "texto", 
            contenido: "Ofrecemos tubos, conexiones y accesorios de PVC de la más alta calidad. Puedes ver nuestro catálogo en la sección de productos."
        },
        'ubicación|dónde están|local|dirección|localización|mapa|como llegar|dirección exacta': {
            tipo: "texto",
            contenido: "📍 *Nuestra ubicación:*\nAvenida México No., Puxtla 25, Teotihuacan Centro, 55805 Teotihuacán de Arista, Méx."
        },
        'contacto|teléfono|whatsapp|email|correo': {
            tipo: "texto",
            contenido: "Puedes contactarnos a través de la sección de contacto o llamarnos al 55-43-22-51-89."
        },
        'pvc|tubos|tuberías|conexiones|accesorios': {
            tipo: "texto",
            contenido: "Contamos con una amplia variedad de productos de PVC para todos tus proyectos de plomería. Visita nuestra sección de productos para más información."
        },
        'precios|costos|cotización|valor': {
            tipo: "texto",
            contenido: "Para obtener información sobre precios y cotizaciones, te recomendamos contactarnos directamente para brindarte la mejor atención personalizada."
        },
        'horario|abren|cierran|horas|hora abren|hora cierran|atención|cuándo abren|cuándo cierran|días abren': {
            tipo: "texto",
            contenido: "Nuestro horario de atención es de lunes a viernes de 8:30 a 18:00 y sábados de 8:00 a 15:00."
        }
    },

    // Respuestas con imágenes
    respuestasImagenes: {
        'muestra tubos pvc|ver tuberías|imagen de conexiones|foto de válvulas': {
            terminoBusqueda: "PVC pipes plumbing installation",
            mensaje: "📸 Aquí tienes imágenes de nuestros productos de PVC:"
        },
        'cómo se ven los codos|imagen de tes pvc|foto de reducciones': {
            terminoBusqueda: "PVC fittings connectors",
            mensaje: "📸 Imágenes de conexiones y accesorios PVC:"
        }
    },

    // Respuestas genéricas
    respuestasGenericas: [
        "No estoy seguro de entender. ¿Podrías reformular tu pregunta?",
        "¿Te refieres a algún producto o servicio específico de TUBCON?",
        "Puedo ayudarte con información sobre nuestros productos, ubicación o contacto. ¿Qué necesitas?"
    ]
};

// Función para buscar respuestas locales
export const buscarRespuestaLocal = (mensaje) => {
    const input = mensaje.toLowerCase().trim();
    
    // Buscar en respuestas directas
    for (const [claves, respuesta] of Object.entries(localAnswers.respuestas)) {
        const patrones = claves.split('|');
        for (const patron of patrones) {
            if (new RegExp(patron, 'i').test(input)) {
                return respuesta;
            }
        }
    }
    
    // Buscar en respuestas con imágenes
    for (const [claves, respuesta] of Object.entries(localAnswers.respuestasImagenes)) {
        const patrones = claves.split('|');
        for (const patron of patrones) {
            if (new RegExp(patron, 'i').test(input)) {
                return {
                    tipo: "buscar_imagenes",
                    terminoBusqueda: respuesta.terminoBusqueda,
                    mensaje: respuesta.mensaje
                };
            }
        }
    }
    
    return null;
};