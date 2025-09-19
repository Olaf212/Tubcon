// Configuración
export const WIT_AI_TOKEN = "PU6SJVTN7UBA5TJOAUTVZWBZIHUVNXJF";
export const WIT_API_VERSION = "20250502";
export const GEMINI_API_KEY = "AIzaSyD5G2WoPDgnXC9lT4lpPPyPGchb712hg2w";

// Base de conocimientos local - ACTUALIZADA
export const knowledgeBase = {
    saludos: [
        "¡Hola! Soy tu asistente de TUBCON. ¿En qué puedo ayudarte hoy?",
        "¡Buen día! ¿Necesitas ayuda con productos de plomería?",
        "¡Hola! Expertos en tubos, conexiones y accesorios de PVC. ¿En qué te puedo ayudar?"
    ],
    respuestas: {
        'tubcon|empresa|quiénes son|quién es': "TUBCON es una empresa especializada en la distribución de material de plomería, trabajando con las mejores marcas del mercado.",
        'productos|qué venden|qué tienen|catálogo': "Ofrecemos tubos, conexiones y accesorios de PVC de la más alta calidad. Puedes ver nuestro catálogo en la sección de productos.",
        'ubicación|dónde están|local|dirección|localización|mapa|como llegar|dirección exacta': "📍 *Nuestra ubicación:*\nAvenida México No., Puxtla 25, Teotihuacan Centro, 55805 Teotihuacán de Arista, Méx.",
        'contacto|teléfono|whatsapp|email|correo': "Puedes contactarnos a través de la sección de contacto o llamarnos al 55-43-22-51-89.",
        'pvc|tubos|tuberías|conexiones|accesorios': "Contamos con una amplia variedad de productos de PVC para todos tus proyectos de plomería. Visita nuestra sección de productos para más información.",
        'precios|costos|cotización|valor': "Para obtener información sobre precios y cotizaciones, te recomendamos contactarnos directamente para brindarte la mejor atención personalizada.",
        'distribuidor|mayoreo|revender|comerciante': "Si estás interesado en ser distribuidor, contáctanos para brindarte información sobre nuestros programas de distribución.",
        'gracias|bye|adiós|chao|hasta luego': "¡De nada! Estoy aquí para ayudarte cuando lo necesites. ¡Que tengas un excelente día!",
        'ayuda|soporte|asistencia|problema': "Para soporte técnico puedes contactarnos a través de la sección de contacto.",
        'horario|abren|cierran|horas|hora abren|hora cierran|atención|cuándo abren|cuándo cierran|días abren': "Nuestro horario de atención es de lunes a viernes de 8:30 a 18:00 y sábados de 8:00 a 15:00.",
        'envíos|entrega|shipping|delivery': "Ofrecemos servicios de entrega a domicilio. Consulta los detalles en la sección de contacto.",
        'garantía|devolución|reembolso': "Todos nuestros productos cuentan con garantía del fabricante. Para devoluciones o reembolsos, contáctanos directamente.",
    },
    respuestasGenericas: [
        "No estoy seguro de entender. ¿Podrías reformular tu pregunta?",
        "¿Te refieres a algún producto o servicio específico de TUBCON?",
        "Puedo ayudarte con información sobre nuestros productos, ubicación o contacto. ¿Qué necesitas?",
        "Como asistente de TUBCON, puedo ayudarte con información sobre nuestros productos de plomería. ¿En qué te puedo ayudar?"
    ]
};

// MEJORAR la función de procesamiento local
export const procesarRespuestaLocal = (mensaje) => {
    const input = mensaje.toLowerCase().trim();
    
    // Detección MEJORADA para horarios
    const horarioPatterns = [
        /\b(horario|horarios|hora)\b/,
        /\b(a qué hora|cuándo)\s*(abren|abrimos|cierran|cerramos)\b/,
        /\b(abren|cierran)\s*(a\s*qué\s*hora|cuándo)\b/,
        /\b(días\s*de\s*atención|días\s*abierto)\b/,
        /\b(atención\s*al\s*público|horario\s*de\s*atención)\b/
    ];
    
    for (const pattern of horarioPatterns) {
        if (pattern.test(input)) {
            return "Nuestro horario de atención es de lunes a viernes de 8:30 a 18:00 y sábados de 8:00 a 15:00.";
        }
    }
    
    // Detección MEJORADA para ubicación
    const ubicacionPatterns = [
        /\b(ubicación|ubicacion|donde\s*estan|dónde\s*están|localización|localizacion)\b/,
        /\b(dirección|direccion|dirreción|dirreccion)\b/,
        /\b(como\s*llegar|cómo\s*llegar|mapa|google\s*maps|waze)\b/,
        /\b(dirección\s*exacta|direccion\s*exacta)\b/,
        /\b(teotihuacán|teotihuacan|teotihuacan\s*de\s*arista)\b/,
        /\b(avenida\s*méxico|avenida\s*mexico|puxtla)\b/
    ];
    
    for (const pattern of ubicacionPatterns) {
        if (pattern.test(input)) {
            return "📍 *Nuestra ubicación:*\nAvenida México No., Puxtla 25, Teotihuacan Centro, 55805 Teotihuacán de Arista, Méx.";
        }
    }
    
    // Búsqueda normal en el conocimiento base
    for (const [claves, respuesta] of Object.entries(knowledgeBase.respuestas)) {
        const patrones = claves.split('|');
        for (const patron of patrones) {
            // Usar una expresión regular más flexible
            if (new RegExp(patron, 'i').test(input)) {
                return respuesta;
            }
        }
    }
    
    return knowledgeBase.respuestasGenericas[
        Math.floor(Math.random() * knowledgeBase.respuestasGenericas.length)
    ];
};

// El resto del código se mantiene igual...
export const consultarWitAI = async (mensaje) => {
    try {
        const url = `https://api.wit.ai/message?v=${WIT_API_VERSION}&q=${encodeURIComponent(mensaje)}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${WIT_AI_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) return false;
        
        const data = await response.json();
        
        if (data.intents && data.intents.length > 0) {
            const intent = data.intents[0].name;
            const confidence = data.intents[0].confidence;
            
            if (confidence > 0.6) {
                switch(intent) {
                    case 'saludo':
                        return "¡Hola! Soy tu asistente de TUBCON. ¿En qué puedo ayudarte hoy?";
                    case 'despedida':
                        return "¡Hasta luego! No dudes en volver si necesitas más ayuda con nuestros productos de plomería.";
                    case 'ayuda':
                        return "Puedo ayudarte con información sobre nuestros productos de tubería, conexiones y accesorios de PVC. ¿Qué necesitas saber?";
                    default:
                        const respuestaEntidades = procesarEntidadesWit(data.entities);
                        return respuestaEntidades || "Entendido. ¿Necesitas algo más específico sobre nuestros productos de plomería?";
                }
            }
        }
        
        return false;
        
    } catch (error) {
        console.error("Error con Wit.ai:", error);
        return false;
    }
};

export const procesarEntidadesWit = (entities) => {
    if (!entities) return null;
    
    if (entities.producto) {
        const producto = entities.producto[0].value.toLowerCase();
        switch(producto) {
            case 'tubos':
            case 'tuberías':
            case 'tubo':
                return "Contamos con una amplia variedad de tubos de PVC en diferentes medidas y especificaciones. ¿Te interesa algún diámetro en particular?";
            case 'conexiones':
            case 'conexión':
            case 'accesorios':
                return "Tenemos todo tipo de conexiones y accesorios de PVC para tus proyectos de plomería. ¿Qué tipo de conexión necesitas?";
            case 'pvc':
                return "Trabajamos con los mejores materiales de PVC del mercado. ¿Necesitas información sobre algún producto específico?";
        }
    }
    
    return null;
};

export const consultarGemini = async (mensaje) => {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
        
        const prompt = `Eres un asistente especializado en TUBCON. Responde concisamente: ${mensaje}`;
        
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 300, temperature: 0.7 }
        };
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) return false;
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        }
        
        return false;
        
    } catch (error) {
        console.error("Error con Gemini:", error);
        return false;
    }
};

export const procesarMensaje = async (mensaje) => {
    const respuestaWit = await consultarWitAI(mensaje);
    
    if (respuestaWit && respuestaWit !== "Entendido. ¿Necesitas algo más específico sobre nuestros productos de plomería?") {
        return respuestaWit;
    }
    
    const respuestaLocal = procesarRespuestaLocal(mensaje);
    
    if (knowledgeBase.respuestasGenericas.includes(respuestaLocal)) {
        const respuestaGemini = await consultarGemini(mensaje);
        if (respuestaGemini) {
            return respuestaGemini;
        }
    }
    
    return respuestaLocal;
};