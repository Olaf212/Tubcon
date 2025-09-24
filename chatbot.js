// Configuración
export const WIT_AI_TOKEN = "PU6SJVTN7UBA5TJOAUTVZWBZIHUVNXJF";
export const WIT_API_VERSION = "20250502";
export const GEMINI_API_KEY = "AIzaSyD5G2WoPDgnXC9lT4lpPPyPGchb712hg2w";
export const UNSPLASH_ACCESS_KEY = "wtEzyz_eYhND7kjWxBmLj_DQILUePcx-nxXVdv3t4tc";

// Base de conocimientos local - MEJORADA PARA BÚSQUEDAS PRECISAS
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
    
    // MEJORADO: Comandos para detectar solicitudes de imágenes
    comandosImagenes: {
        'muestra|muéstrame|ver|mostrar|imagen|foto|fotografía|gráfico|diagrama|visual|cómo se ve|aspecto|quiero ver|necesito ver|deseo ver': true
    },
    
    // CORREGIDO: Mapeo más preciso y eliminación del término predeterminado
    terminosBusquedaImagenes: {
        // Tuberías y tubos
        'tubos pvc|tuberías pvc|tubo pvc|tubería pvc|pvc tubo|pvc tubería': "PVC pipes plumbing installation",
        'tubos|tuberías|tubería|tubo|caños|cañerías': "water pipes plumbing system",
        'tubo de agua|tubería de agua|tubos agua|tuberías agua': "water supply pipes installation",
        'tubo drenaje|tubería drenaje|drenaje pvc': "PVC drainage pipes system",
        
        // Conexiones y accesorios
        'conexiones pvc|accesorios pvc|conexión pvc|accesorio pvc': "PVC fittings connectors plumbing",
        'codos pvc|codo pvc|codos 90|curvas pvc': "PVC elbows 90 degree fittings",
        'tes pvc|tee pvc|tes tubería|uniones pvc': "PVC tee fittings plumbing unions",
        'reducciones pvc|reductores pvc|reducción pvc': "PVC reducers pipe fittings",
        'tapones pvc|tapón pvc|caps pvc': "PVC caps pipe plugs",
        
        // Válvulas y controles
        'válvulas pvc|válvula pvc|llaves pvc|válvula agua': "PVC valves water control plumbing",
        'válvula compuerta|válvula globo|válvula check': "gate valve globe valve check valve plumbing",
        
        // Instalaciones y sistemas
        'instalación pvc|instalar tuberías|sistema pvc|instalación tuberías': "PVC plumbing installation system",
        'sistema drenaje|instalación drenaje|drenaje sanitario': "drainage system installation plumbing",
        
        // Materiales y herramientas
        'pegamento pvc|cemento pvc|adhesivo pvc|soldadura pvc': "PVC glue cement solvent welding",
        'cinta teflón|cinta selladora|teflón pvc': "Teflon tape plumbing sealant",
        
        // General
        'plomería|fontanería|instalación hidráulica|sistema plomería': "plumbing system installation tools",
        'material plomería|productos plomería|insumos plomería': "plumbing materials supplies tools"
    },
    
    respuestasGenericas: [
        "No estoy seguro de entender. ¿Podrías reformular tu pregunta?",
        "¿Te refieres a algún producto o servicio específico de TUBCON?",
        "Puedo ayudarte con información sobre nuestros productos, ubicación o contacto. ¿Qué necesitas?",
        "Como asistente de TUBCON, puedo ayudarte con información sobre nuestros productos de plomería. ¿En qué te puedo ayudar?"
    ]
};

// MEJORADA: Función para extraer el término específico del mensaje
export const extraerTerminoEspecifico = (input) => {
    const palabrasClave = [
        'tubos', 'tuberías', 'codos', 'tes', 'válvulas', 'conexiones', 
        'accesorios', 'pegamento', 'cemento', 'drenaje', 'instalación',
        'pvc', 'plomería', 'fontanería', 'sistema', 'materiales'
    ];
    
    const palabras = input.toLowerCase().split(/\s+/);
    
    // Buscar palabras clave específicas
    for (const palabra of palabras) {
        if (palabrasClave.includes(palabra)) {
            return palabra;
        }
    }
    
    return null;
};

// MEJORADA: Detección de solicitudes de imágenes
export const detectarSolicitudImagenes = (input) => {
    const comandos = Object.keys(knowledgeBase.comandosImagenes);
    return comandos.some(cmd => {
        const patrones = cmd.split('|');
        return patrones.some(patron => new RegExp(patron, 'i').test(input));
    });
};

// CORREGIDA: Obtención del término de búsqueda - SIN TÉRMINO PREDETERMINADO
export const obtenerTerminoBusquedaImagenes = (input) => {
    const terminoEspecifico = extraerTerminoEspecifico(input);
    
    // Buscar coincidencias exactas primero
    for (const [claves, term] of Object.entries(knowledgeBase.terminosBusquedaImagenes)) {
        const patrones = claves.split('|');
        for (const patron of patrones) {
            if (new RegExp(`\\b${patron}\\b`, 'i').test(input)) {
                return term;
            }
        }
    }
    
    // Si hay un término específico, buscar el mapeo más apropiado
    if (terminoEspecifico) {
        for (const [claves, term] of Object.entries(knowledgeBase.terminosBusquedaImagenes)) {
            if (claves.includes(terminoEspecifico)) {
                return term;
            }
        }
    }
    
    // NUEVO: Si no se encuentra un término específico, devolver null para evitar búsqueda genérica
    return null;
};

// MEJORADA: Búsqueda en Unsplash
export const buscarImagenesUnsplash = async (query) => {
    if (!query) return [];

    try {
        const searchQuery = encodeURIComponent(query);
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=6&orientation=squarish`, {
                headers: {
                    'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
                    'Accept-Version': 'v1'
                }
            }
        );
        
        if (!response.ok) {
            console.error("Error Unsplash:", response.status);
            return [];
        }
        
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            return data.results.map(photo => ({
                url: photo.urls.regular,
                title: `Productos PVC - ${query}`,
                photographer: photo.user.name,
                source: "Unsplash",
                original: photo.links.html,
                description: photo.alt_description || `Imagen de ${query}`
            }));
        }
        
        return [];
        
    } catch (error) {
        console.error("Error con Unsplash:", error);
        return [];
    }
};

// CORREGIDA: Función para buscar en ambos servicios (fallback)
export const buscarImagenesMultiples = async (query) => {
    // Si no hay query específico, no buscar imágenes
    if (!query) {
        return [];
    }
    
    const imagenesUnsplash = await buscarImagenesUnsplash(query);
    
    // Si Unsplash no encuentra resultados, intentar con términos relacionados
    if (imagenesUnsplash.length === 0) {
        // Buscar términos alternativos basados en el query original
        const terminosAlternativos = obtenerTerminosAlternativos(query);
        
        for (const termino of terminosAlternativos) {
            const imagenesAlternativas = await buscarImagenesUnsplash(termino);
            if (imagenesAlternativas.length > 0) {
                return imagenesAlternativas.slice(0, 4);
            }
        }
    }
    
    return imagenesUnsplash.slice(0, 4);
};

// NUEVA: Función para obtener términos alternativos
export const obtenerTerminosAlternativos = (query) => {
    const alternativos = [];
    
    if (query.includes('pvc')) {
        alternativos.push("plumbing PVC materials");
        alternativos.push("PVC pipes fittings");
        alternativos.push("plastic plumbing pipes");
    } else if (query.includes('plumbing') || query.includes('plomería')) {
        alternativos.push("plumbing tools materials");
        alternativos.push("water pipes installation");
        alternativos.push("plumbing system");
    } else if (query.includes('pipe') || query.includes('tubo')) {
        alternativos.push("water pipes");
        alternativos.push("plumbing pipes");
        alternativos.push("PVC tubing");
    }
    
    return alternativos;
};

// CORREGIDA: Formateo de respuesta con imágenes - MEJORADO
export const formatearRespuestaConImagenes = (imagenes, terminoBusqueda, mensajeOriginal) => {
    if (imagenes.length === 0) {
        return {
            tipo: "texto",
            contenido: `📸 No se encontraron imágenes específicas para "${mensajeOriginal}".\n\n💡 *Sugerencias:*\n- "muestra tubos PVC"\n- "ver conexiones PVC"\n- "imagen de válvulas"\n- "cómo se ven los codos PVC"\n- "foto de instalación de drenaje"`
        };
    }

    const mensaje = `📸 *Imágenes relacionadas con "${mensajeOriginal}":*\n\n` +
                   `Estas son imágenes de referencia para productos similares:`;

    return {
        tipo: "imagenes",
        contenido: mensaje,
        imagenes: imagenes,
        terminoBusqueda: terminoBusqueda,
        mensajeOriginal: mensajeOriginal
    };
};

// CORRECCIÓN: Función procesarEntidadesWit debe ser exportada
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

// CORREGIDA: Procesamiento local con mejor detección de imágenes
export const procesarRespuestaLocal = async (mensaje) => {
    const input = mensaje.toLowerCase().trim();
    
    // 1. Verificar si el usuario pide imágenes
    if (detectarSolicitudImagenes(input)) {
        const terminoBusqueda = obtenerTerminoBusquedaImagenes(input);
        
        // SOLO buscar imágenes si se encontró un término específico
        if (terminoBusqueda) {
            const imagenes = await buscarImagenesMultiples(terminoBusqueda);
            return formatearRespuestaConImagenes(imagenes, terminoBusqueda, mensaje);
        } else {
            // Si no hay término específico, ofrecer ayuda
            return {
                tipo: "texto",
                contenido: `📸 Veo que quieres ver imágenes. ¿De qué producto específico necesitas ver fotos?\n\n💡 *Ejemplos:*\n- "muestra tubos PVC"\n- "ver conexiones de drenaje"\n- "imagen de válvulas PVC"\n- "cómo se ven los codos 90 grados"`
            };
        }
    }
    
    // 2. Detección MEJORADA para horarios
    const horarioPatterns = [
        /\b(horario|horarios|hora)\b/,
        /\b(a qué hora|cuándo)\s*(abren|abrimos|cierran|cerramos)\b/,
        /\b(abren|cierran)\s*(a\s*qué\s*hora|cuándo)\b/,
        /\b(días\s*de\s*atención|días\s*abierto)\b/,
        /\b(atención\s*al\s*público|horario\s*de\s*atención)\b/
    ];
    
    for (const pattern of horarioPatterns) {
        if (pattern.test(input)) {
            return {
                tipo: "texto",
                contenido: "Nuestro horario de atención es de lunes a viernes de 8:30 a 18:00 y sábados de 8:00 a 15:00."
            };
        }
    }
    
    // 3. Detección MEJORADA para ubicación
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
            return {
                tipo: "texto",
                contenido: "📍 *Nuestra ubicación:*\nAvenida México No., Puxtla 25, Teotihuacan Centro, 55805 Teotihuacán de Arista, Méx."
            };
        }
    }
    
    // 4. Búsqueda normal en el conocimiento base
    for (const [claves, respuesta] of Object.entries(knowledgeBase.respuestas)) {
        const patrones = claves.split('|');
        for (const patron of patrones) {
            if (new RegExp(patron, 'i').test(input)) {
                return {
                    tipo: "texto",
                    contenido: respuesta
                };
            }
        }
    }
    
    // 5. Respuesta genérica
    return {
        tipo: "texto",
        contenido: knowledgeBase.respuestasGenericas[
            Math.floor(Math.random() * knowledgeBase.respuestasGenericas.length)
        ]
    };
};

// MEJORADO: Renderizado de imágenes en el chat
export const renderizarRespuestaEnChat = (respuesta) => {
    if (!respuesta) {
        return '<div class="chat-response">No se pudo generar una respuesta.</div>';
    }
    
    if (respuesta.tipo === "imagenes") {
        let html = `<div class="chat-response images-response">
            <div class="response-text">${respuesta.contenido}</div>
            <div class="images-container">`;
        
        respuesta.imagenes.forEach((img, index) => {
            html += `
                <div class="chat-image" onclick="window.open('${img.original}', '_blank')">
                    <img src="${img.url}" alt="${img.description || 'Producto PVC'}" loading="lazy">
                    <div class="image-caption">
                        <small>Foto: ${img.photographer}</small>
                    </div>
                </div>`;
        });
        
        html += `</div>
            <div class="image-note">
                <em>💡 Imágenes de referencia - Búsqueda: "${respuesta.terminoBusqueda}"</em>
            </div>
        </div>`;
        
        return html;
    } else {
        return `<div class="chat-response text-response">${respuesta.contenido}</div>`;
    }
};

// FUNCIONES QUE FALTABAN - COMPLETADAS
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
                        return {
                            tipo: "texto",
                            contenido: "¡Hola! Soy tu asistente de TUBCON. ¿En qué puedo ayudarte hoy?"
                        };
                    case 'despedida':
                        return {
                            tipo: "texto", 
                            contenido: "¡Hasta luego! No dudes en volver si necesitas más ayuda con nuestros productos de plomería."
                        };
                    case 'ayuda':
                        return {
                            tipo: "texto",
                            contenido: "Puedo ayudarte con información sobre nuestros productos de tubería, conexiones y accesorios de PVC. ¿Qué necesitas saber?"
                        };
                    default:
                        const respuestaEntidades = procesarEntidadesWit(data.entities);
                        return {
                            tipo: "texto",
                            contenido: respuestaEntidades || "Entendido. ¿Necesitas algo más específico sobre nuestros productos de plomería?"
                        };
                }
            }
        }
        
        return false;
        
    } catch (error) {
        console.error("Error con Wit.ai:", error);
        return false;
    }
};

export const consultarGemini = async (mensaje) => {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
        
        const prompt = `Eres un asistente especializado en TUBCON, una empresa de materiales de plomería y PVC. Responde concisamente en español sobre tubos, conexiones, accesorios de PVC, plomería, horarios, ubicación o contacto. Pregunta: ${mensaje}`;
        
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { 
                maxOutputTokens: 300, 
                temperature: 0.7,
                topP: 0.8,
                topK: 40
            }
        };
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) return false;
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            return {
                tipo: "texto",
                contenido: data.candidates[0].content.parts[0].text
            };
        }
        
        return false;
        
    } catch (error) {
        console.error("Error con Gemini:", error);
        return false;
    }
};

// FUNCIÓN PRINCIPAL ACTUALIZADA
export const procesarMensaje = async (mensaje) => {
    try {
        // 1. Procesar localmente (incluye imágenes)
        const respuestaLocal = await procesarRespuestaLocal(mensaje);
        
        // 2. Si la respuesta local es genérica, intentar Wit.ai
        const esRespuestaGenerica = knowledgeBase.respuestasGenericas.some(
            resp => resp === respuestaLocal.contenido
        );
        
        if (respuestaLocal.tipo === "texto" && esRespuestaGenerica) {
            const respuestaWit = await consultarWitAI(mensaje);
            if (respuestaWit) {
                return renderizarRespuestaEnChat(respuestaWit);
            }
            
            // 3. Si Wit.ai no funciona, intentar Gemini
            const respuestaGemini = await consultarGemini(mensaje);
            if (respuestaGemini) {
                return renderizarRespuestaEnChat(respuestaGemini);
            }
        }
        
        // 4. Devolver respuesta local (puede ser texto o imágenes)
        return renderizarRespuestaEnChat(respuestaLocal);
        
    } catch (error) {
        console.error("Error en procesarMensaje:", error);
        return '<div class="chat-response">Error al procesar el mensaje. Intenta de nuevo.</div>';
    }
};

export const estilosImagenesChat = `

<style>
.images-response {
    margin: 15px 0;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 10px;
}

.images-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Dos columnas */
    gap: 12px;
    margin: 12px 0;
}

.chat-image {
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
    max-width: 100%; /* Asegura que el contenedor no exceda el 100% del ancho disponible */
    width: 150px; /* Controla el tamaño del contenedor de la imagen */
    height: auto; /* Mantiene la relación de aspecto */
    margin: 0 auto;  /* Centra las imágenes dentro del contenedor */
}

.chat-image:hover {
    transform: translateY(-2px);
    border-color: #007bff;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.chat-image img {
    width: 100%; /* Asegura que la imagen ocupe el 100% del contenedor */
    height: auto; /* Mantiene la proporción correcta */
    object-fit: cover; /* Asegura que la imagen cubra el área sin distorsionarse */
    display: block;
}

.image-caption {
    padding: 8px;
    background: #f1f3f4;
    text-align: center;
    font-size: 0.75em;
    color: #666;
}

.image-note {
    margin-top: 12px;
    font-size: 0.85em;
    color: #666;
    font-style: italic;
    text-align: center;
    padding: 8px;
    background: #e9ecef;
    border-radius: 4px;
}

.text-response {
    margin: 10px 0;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #007bff;
}

.response-text {
    margin-bottom: 15px;
    font-weight: 500;
    color: #333;
    white-space: pre-line;
}
</style>
`;

// Función auxiliar para inicializar el chatbot
export const inicializarChatbot = () => {
    console.log('✅ Chatbot TUBCON inicializado correctamente');
    console.log('🔍 Funciones disponibles:');
    console.log('   - procesarMensaje(mensaje)');
    console.log('   - buscarImagenesUnsplash(query)');
    console.log('   - procesarRespuestaLocal(mensaje)');
    console.log('   - renderizarRespuestaEnChat(respuesta)');
};

// Inicializar automáticamente
inicializarChatbot();