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
        'productos|qué venden|qué tienen|catálogo': "Ofrecemos tubos, conexiones, accesorios de PVC, tinacos, cisternas, reguladores de gas, mancueras y bombas de agua de las mejores marcas. Puedes ver nuestro catálogo en la sección de productos.",
        'ubicación|dónde están|local|dirección|localización|mapa|como llegar|dirección exacta': "📍 *Nuestra ubicación:*\nAvenida México No., Puxtla 25, Teotihuacan Centro, 55805 Teotihuacán de Arista, Méx.",
        'contacto|teléfono|whatsapp|email|correo': "Puedes contactarnos a través de la sección de contacto o llamarnos al 55-43-22-51-89.",

        // PRODUCTOS PRINCIPALES - CORREGIDO (sin duplicados)
        'pvc|tubos|tuberías|conexiones|accesorios': "Contamos con una amplia variedad de productos de PVC para todos tus proyectos de plomería. Visita nuestra sección de productos para más información.",

        // TINACOS Y CISTERNAS
        'tinacos|tinaco|tanques|tanque agua|almacenamiento agua': "En TUBCON manejamos tinacos de las mejores marcas: ROTOPLAS, IUSA y BLACKPLUS. Tenemos desde 110 litros hasta 1100 litros en diferentes modelos.",
        'cisternas|cisterna|depósitos|depósito agua|reservorios': "Contamos con cisternas desde 2,500 hasta 10,000 litros de marcas como ROTOPLAS, IUSA y BLACKPLUS. Ideales para almacenamiento de agua potable.",
        'rotoplas|marca rotoplas': "ROTOPLAS es una de nuestras principales marcas. Tenemos tinacos de 1100 litros, cisternas de 2800, 5000 litros y biodigestores autolimpiables.",
        'iusa|marca iusa': "IUSA nos ofrece tinacos tricapa de 110 litros, tinacos slim de 1100 litros, y cisternas de 2,500, 5,000 y 10,000 litros.",
        'black plus|blackplus|marca black': "BLACK PLUS tiene tinacos de 1100 litros en colores beige y negro, incluyendo el modelo 'bala' para espacios reducidos.",
        'biodigestor|biodigestores|autolimpiable': "Contamos con biodigestores autolimpiables de 1300 litros, perfectos para tratamiento de aguas residuales.",
        'tinaco 110|110 litros|tanque pequeño': "Tenemos tinacos IUSA de 110 litros tricapa, disponibles en color negro. Ideales para espacios reducidos.",
        'tinaco 1100|mil cien|tanque grande': "Ofrecemos tinacos de 1100 litros: ROTOPLAS, IUSA Slim, BLACK PLUS en diferentes colores y modelos horizontales.",
        'cisterna 2800|dos mil ochocientos': "Cisterna de 2,800 litros con equipo ROTOPLAS incluido. Perfecta para uso residencial.",
        'cisterna 5000|cinco mil': "Cisternas de 5,000 litros disponibles con o sin accesorios ROTOPLAS, según tus necesidades.",
        'cisterna 10000|diez mil|cisterna grande': "Cisterna IUSA de 10,000 litros para grandes requerimientos de almacenamiento.",

        // MANCUERAS PARA GAS L.P. - MEJORADO
        'mancueras|mancuera|cable gas|cables de gas|cable de gas|manguera gas|conexión gas|lp gas|características|especificaciones': "En TUBCON manejamos mancueras para gas L.P. de alta calidad con conexión 3/8\" flare/flare en diferentes longitudes.",
        'mancuera gas lp|gas lp|propano': "Mancueras para gas L.P. con características: tuercas de latón, espigas de latón, férulas de acero inoxidable. Temperatura de uso: -2 a 50°C. Presión máxima: 0.07 KCF/CM (7 KPA).",
        'mancuera reforzada|reforzada|polypropylene': "Mancuera reforzada con tramado de polipropileno, conectores de latón. Temperatura máxima: 60°C. Presión máxima: 7 KPA (71 C/CM2).",
        'longitud mancuera|medidas mancuera|tamaños mancuera': "Longitudes disponibles: 60 cm, 1.0 m, 1.5 m, 2.0 m, 3.0 m, 4.0 m, 5.0 m.",
        'conexión 3/8|flare flare|3/8 flare|3/8\"': "Todas nuestras mancueras tienen conexión 3/8\" flare/flare estándar.",
        'mancuera aluminio|aluminum|latón brass': "Mancueras con componentes de aluminio/latón: tuercas de latón, espigas de latón, férulas de acero inoxidable.",
        'presión gas|presión máxima|7 kpa': "Nuestras mancueras soportan presión máxima de 0.07 KCF/CM (7 KPA) para uso seguro con gas L.P.",
        'temperatura mancuera|rango temperatura': "Rango de temperatura: -2°C a 50°C (estándar) y hasta 60°C máximo para la versión reforzada.",
        'miber|marca miber': "Contamos con productos de la marca Miber de alta calidad para instalaciones de gas.",

        // REGULADORES DE GAS Y AGUA
        'reguladores|regulador|regulador gas|regulador agua|válvulas reguladoras': "En TUBCON manejamos reguladores de gas y agua de las marcas IUSA y CMS. Tenemos modelos de 1 vía, 2 vías, baja presión y alta presión.",
        'regulador 1 via|una vía|sencillo': "Contamos con reguladores de 1 vía como: Regulador 102 PSMP L.P., Regulador 102 B000 G.L.P. 1V, Regulador 3001, Regulador M 7000, y Regulador R2001 IUSA.",
        'regulador 2 vias|dos vías|doble vía': "Tenemos reguladores de 2 vías para baja presión y modelos específicos como el Regulador 2403 en diferentes medidas.",
        'regulador baja presión|b.p.|low pressure': "Reguladores de baja presión: 102 PSMP L.P., 2403 C2 ¼ X ½ B.P., 2403 C4 ¼ X ½ B.P., y modelos LOBO B.P. en 06X25 y 13X25.",
        'regulador alta presión|a.p.|high pressure': "Regulador 2403 S4 ½ X ½ A.P. para aplicaciones de alta presión.",
        'regulador lobo|lobo|cms lobo': "Modelos LOBO: LOBO B.P. S/POOL 06X25, LOBO B.P. S/POOL 13X25, LOBO 19 MM CMS, LOBO CMS 13X25 ROJO.",
        'regulador sin manómetro|sin medidor': "Regulador 080 sin manómetro y Regulador 1757 sin manómetro CMS.",
        'regulador con manómetro|con medidor': "Regulador 7000 C/Punta y Maneral 324210.",
        'regulador iusa|marca iusa': "IUSA: Regulador R2001 IUSA 323986, Regulador 102 series, y diversos modelos de la serie 2403.",
        'regulador cms|marca cms': "CMS: Modelos LOBO, Regulador 1757 sin manómetro, y reguladores de diferentes especificaciones.",
        'regulador 102|modelo 102': "Regulador 102 PSMP L.P. 267368, Regulador 102 B000 G.L.P. 1V 267368, Regulador Sencillo 102 267369.",
        'regulador 2403|modelo 2403': "Serie 2403: 2403 C2 ¼ X ½ B.P., 2403 C4 ¼ X ½ B.P., 2403 S4 ½ X ½ A.P., 2403 U4 de 1/2\" X1/2\" 311792.",
        'regulador 7000|modelo 7000': "Regulador M 7000 1 Vía y Regulador 7000 C/Punta y Maneral 324210.",
        'regulador r7008|modelo r7008': "Regulador R7008 Manual 339313.",

        // BOMBAS IUSA - AGREGADO
        'bombas|bomba|bomba agua|bomba iusa|sistema bombeo': "En TUBCON manejamos bombas de agua de la marca IUSA, incluyendo bombas periféricas, centrifugas, presurizadoras, autocebantes y para pozo profundo.",
        'bomba periférica|periférica iusa|1/2 hp periférica': "Bomba periférica IUSA de 1/2 HP, ideal para presurización de agua en hogares y pequeñas instalaciones.",
        'bomba centrífuga|centrífuga iusa|bomba centrifugal': "Bomba centrífuga IUSA para aplicaciones residenciales e industriales, eficiente en el transporte de agua.",
        'bomba presurizadora|presurizadora iusa|presurizador agua': "Bombas presurizadoras IUSA disponibles en modelos de 1 servicio y 3 servicios para diferentes necesidades de presión.",
        'bomba autocebante|autocebante primo|primo 1/2 hp': "Bomba autocebante IUSA Primo de 1/2 HP, perfecta para sistemas que requieren autocebado automático.",
        'bomba pozo profundo|pozo profundo iusa|sumergible pozo': "Bomba para pozo profundo IUSA, diseñada para extracción de agua desde grandes profundidades.",
        'bomba sumergible|sumergible alta presión|sumergible iusa': "Bomba sumergible IUSA de alta presión, ideal para cisternas y aplicaciones que requieren mayor fuerza de bombeo.",
        'motobomba|moto bomba iusa|bomba gasolina': "Moto bomba IUSA para aplicaciones móviles o donde no hay energía eléctrica disponible.",
        'bomba jet|jet iusa|sistema jet': "Bomba Jet IUSA, eficiente para sistemas de agua potable y aplicaciones residenciales.",
        'bomba 1 servicio|presurizadora simple': "Bomba presurizadora IUSA de 1 servicio, para aplicaciones básicas de presurización.",
        'bomba 3 servicios|presurizadora múltiple': "Bomba presurizadora IUSA de 3 servicios, para sistemas con múltiples puntos de uso.",

        // RESPUESTAS GENERALES (sin duplicados)
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
        switch (producto) {
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
                switch (intent) {
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

        // MEJORADO: Prompt más técnico y específico
        const prompt = `Eres un especialista técnico de TUBCON, empresa de materiales de plomería. 
        Responde de manera técnica pero clara sobre productos de PVC, tinacos, cisternas, reguladores de gas, 
        bombas de agua y materiales de plomería. Sé específico y proporciona información técnica útil.
        
        Pregunta del cliente: ${mensaje}
        
        Responde en español con información precisa y técnica.`;

        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                maxOutputTokens: 500,  // Aumentado para respuestas más completas
                temperature: 0.3,     // Reducido para respuestas más precisas
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

// MODIFICAR LA FUNCIÓN procesarMensaje
export const procesarMensaje = async (mensaje) => {
    try {
        const input = mensaje.toLowerCase().trim();
        
        // 1. DETECTAR SI ES UNA PREGUNTA TÉCNICA QUE DEBE IR DIRECTAMENTE A LA IA
        const esPreguntaTecnica = detectarPreguntaTecnica(input);
        const esConsultaDefinicion = detectarConsultaDefinicion(input);
        
        // 2. SI ES PREGUNTA TÉCNICA O DE DEFINICIÓN, IR DIRECTAMENTE A LAS IAs
        if (esPreguntaTecnica || esConsultaDefinicion) {
            console.log("🔍 Pregunta técnica detectada, consultando IAs...");
            
            // Intentar primero con Gemini (mejor para respuestas técnicas)
            const respuestaGemini = await consultarGemini(mensaje);
            if (respuestaGemini && !esRespuestaMuyGenerica(respuestaGemini.contenido)) {
                return renderizarRespuestaEnChat(respuestaGemini);
            }
            
            // Si Gemini falla, intentar con Wit.ai
            const respuestaWit = await consultarWitAI(mensaje);
            if (respuestaWit) {
                return renderizarRespuestaEnChat(respuestaWit);
            }
        }
        
        // 3. PROCESAR LOCALMENTE (solo si no es pregunta técnica)
        const respuestaLocal = await procesarRespuestaLocal(mensaje);
        
        // 4. Si la respuesta local es genérica, consultar IAs
        const esRespuestaGenerica = knowledgeBase.respuestasGenericas.some(
            resp => resp === respuestaLocal.contenido
        );

        if (respuestaLocal.tipo === "texto" && esRespuestaGenerica) {
            const respuestaGemini = await consultarGemini(mensaje);
            if (respuestaGemini) {
                return renderizarRespuestaEnChat(respuestaGemini);
            }
            
            const respuestaWit = await consultarWitAI(mensaje);
            if (respuestaWit) {
                return renderizarRespuestaEnChat(respuestaWit);
            }
        }

        // 5. Devolver respuesta local
        return renderizarRespuestaEnChat(respuestaLocal);

    } catch (error) {
        console.error("Error en procesarMensaje:", error);
        return '<div class="chat-response">Error al procesar el mensaje. Intenta de nuevo.</div>';
    }
};

// NUEVAS FUNCIONES DE DETECCIÓN MEJORADAS
export const detectarPreguntaTecnica = (input) => {
    const patronesTecnicos = [
        /qu[ée]\s+es\s+/i,
        /definici[óo]n\s+de\s+/i,
        /significado\s+de\s+/i,
        /c[óo]mo\s+funciona\s+/i,
        /para\s+qu[ée]\s+sirve\s+/i,
        /caracter[íi]sticas\s+de\s+/i,
        /especificaciones\s+de\s+/i,
        /ventajas\s+de\s+/i,
        /beneficios\s+de\s+/i,
        /propiedades\s+de\s+/i,
        /qu[ée]\s+significa\s+/i
    ];
    
    return patronesTecnicos.some(patron => patron.test(input));
};

export const detectarConsultaDefinicion = (input) => {
    // Palabras que indican que buscan una definición/explicación
    const palabrasDefinicion = [
        'qué es', 'que es', 'definición', 'definicion', 'significado',
        'qué significa', 'que significa', 'explica', 'explicación',
        'qué son', 'que son', 'definir', 'concepto'
    ];
    
    return palabrasDefinicion.some(palabra => input.includes(palabra));
};

// MEJORAR LA FUNCIÓN procesarRespuestaLocal para IGNORAR ciertas coincidencias
export const procesarRespuestaLocal = async (mensaje) => {
    const input = mensaje.toLowerCase().trim();

    // 1. Verificar si es una pregunta que debe ignorar la base local
    if (debeIgnorarBaseLocal(input)) {
        return {
            tipo: "texto",
            contenido: knowledgeBase.respuestasGenericas[0] // Forzar respuesta genérica
        };
    }

    // ... el resto del código de procesarRespuestaLocal se mantiene igual ...
    // 2. Verificar si el usuario pide imágenes
    if (detectarSolicitudImagenes(input)) {
        const terminoBusqueda = obtenerTerminoBusquedaImagenes(input);

        if (terminoBusqueda) {
            const imagenes = await buscarImagenesMultiples(terminoBusqueda);
            return formatearRespuestaConImagenes(imagenes, terminoBusqueda, mensaje);
        } else {
            return {
                tipo: "texto",
                contenido: `📸 Veo que quieres ver imágenes. ¿De qué producto específico necesitas ver fotos?\n\n💡 *Ejemplos:*\n- "muestra tubos PVC"\n- "ver conexiones de drenaje"\n- "imagen de válvulas PVC"\n- "cómo se ven los codos 90 grados"`
            };
        }
    }

    // 3. Detección para horarios
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

    // 4. Detección para ubicación
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

    // 5. Búsqueda normal en el conocimiento base (EXCLUYENDO PVC para preguntas técnicas)
    for (const [claves, respuesta] of Object.entries(knowledgeBase.respuestas)) {
        // Excluir la respuesta de PVC si es una pregunta técnica
        if (claves.includes('pvc|tubos') && detectarConsultaDefinicion(input)) {
            continue; // Saltar esta respuesta
        }
        
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

    // 6. Respuesta genérica
    return {
        tipo: "texto",
        contenido: knowledgeBase.respuestasGenericas[
            Math.floor(Math.random() * knowledgeBase.respuestasGenericas.length)
        ]
    };
};

// NUEVA FUNCIÓN para determinar cuándo ignorar la base local
export const debeIgnorarBaseLocal = (input) => {
    const preguntasParaIA = [
        /qu[ée]\s+es\s+.+/i,
        /definici[óo]n\s+de\s+.+/i,
        /c[óo]mo\s+funciona\s+.+/i,
        /para\s+qu[ée]\s+sirve\s+.+/i,
        /explica\s+.+/i,
        /qu[ée]\s+significa\s+.+/i
    ];
    
    return preguntasParaIA.some(patron => patron.test(input));
};

// MEJORAR LA FUNCIÓN esRespuestaMuyGenerica
export const esRespuestaMuyGenerica = (contenido) => {
    const respuestasGenericas = [
        "entendido", "puedo ayudarte", "qué necesitas saber",
        "en qué te puedo ayudar", "contamos con", "visita nuestra sección",
        "te recomendamos contactarnos", "tenemos una amplia variedad"
    ];
    
    const contenidoLower = contenido.toLowerCase();
    return respuestasGenericas.some(resp => contenidoLower.includes(resp));
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