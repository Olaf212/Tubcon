// ==================== SISTEMA DE CONTEXTO Y MEMORIA ====================
export const contextoConversacion = new Map();

export const gestionarContexto = (idUsuario, mensaje, respuesta) => {
    if (!contextoConversacion.has(idUsuario)) {
        contextoConversacion.set(idUsuario, []);
    }
    
    const historial = contextoConversacion.get(idUsuario);
    historial.push({ 
        usuario: mensaje, 
        bot: respuesta,
        timestamp: new Date().toISOString()
    });
    
    // Mantener solo los últimos 6 mensajes para no sobrecargar
    if (historial.length > 6) {
        historial.shift();
    }
};

export const obtenerContexto = (idUsuario) => {
    return contextoConversacion.get(idUsuario) || [];
};

export const limpiarContexto = (idUsuario) => {
    contextoConversacion.delete(idUsuario);
};

// ==================== CONFIGURACIÓN ====================
export const WIT_AI_TOKEN = "PU6SJVTN7UBA5TJOAUTVZWBZIHUVNXJF";
export const WIT_API_VERSION = "20250502";
export const GEMINI_API_KEY = "AIzaSyD5G2WoPDgnXC9lT4lpPPyPGchb712hg2w";
export const UNSPLASH_ACCESS_KEY = "wtEzyz_eYhND7kjWxBmLj_DQILUePcx-nxXVdv3t4tc";
export const WHATSAPP_NUMERO_EMPRESA = "+5215543225189";
export const WHATSAPP_ENABLED = true;

// ==================== BASE DE CONOCIMIENTOS ====================
export const knowledgeBase = {
    saludos: [
        "¡Hola! Soy tu asistente de TUBCON. ¿En qué puedo ayudarte hoy?",
        "¡Buen día! ¿Necesitas ayuda con productos de plomería?",
        "¡Hola! Expertos en tubos, conexiones y accesorios de PVC. ¿En qué te puedo ayudar?"
    ],
    respuestas: {
        'tubcon|empresa|quiénes son|quién es': "TUBCON es una empresa especializada en la distribución de material de plomería, trabajando con las mejores marcas del mercado.",
        'productos|qué venden|qué tienen|catálogo': "Ofrecemos tubos, conexiones, accesorios de PVC, tinacos, cisternas, reguladores de gas, mancueras y bombas de agua de las mejores marcas. Puedes ver nuestro catálogo en la sección de productos.",
        'ubicación|dónde están|local|dirección|localización|mapa|como llegar|dirección exacta|ubican': "📍 *Nuestra ubicación:*\nAvenida México No., Puxtla 25, Teotihuacan Centro, 55805 Teotihuacán de Arista, Méx.",
        'contacto|teléfono|whatsapp|email|correo': "Puedes contactarnos a través de la sección de contacto o llamarnos al 55-43-22-51-89.",

        'pvc|tubos|tuberías|conexiones|accesorios': "Contamos con una amplia variedad de productos de PVC para todos tus proyectos de plomería. Visita nuestra sección de productos para más información.",

        // TINACOS Y CISTERNAS
        'tinacos|tinaco|tanques|tanque agua|almacenamiento agua': "En TUBCON manejamos tinacos de las mejores marcas: ROTOPLAS, IUSA y BLACKPLUS. Tenemos desde 110 litros hasta 1100 litros en diferentes modelos.",
        'cisternas|cisterna|depósitos|depósito agua|reservorios': "Contamos con cisternas desde 2,500 hasta 10,000 litros de marcas como ROTOPLAS, IUSA y BLACKPLUS. Ideales para almacenamiento de agua potable.",
        'rotoplas|marca rotoplas': "ROTOPLAS es una de nuestras principales marcas. Tenemos tinacos de 1100 litros, cisternas de 2800, 5000 litros y biodigestores autolimpiables.",
        'iusa|marca iusa': "IUSA nos ofrece tinacos tricapa de 110 litros, tinacos slim de 1100 litros, y cisternas de 2,500, 5,000 y 10,000 litros.",
        'black plus|blackplus|marca black': "BLACK PLUS tiene tinacos de 1100 litros en colores beige y negro, incluyendo el modelo 'bala' para espacios reducidos.",
        'biodigestor|biodigestores|autolimpiable': "Contamos con biodigestores autolimpiables de 1300 litros, perfectos para tratamiento de aguas residuales.",

        // MANCUERAS PARA GAS L.P.
        'mancueras|mancuera|cable gas|cables de gas|cable de gas|manguera gas|conexión gas|lp gas|características|especificaciones': "En TUBCON manejamos mancueras para gas L.P. de alta calidad con conexión 3/8\" flare/flare en diferentes longitudes.",
        'mancuera gas lp|gas lp|propano': "Mancueras para gas L.P. con características: tuercas de latón, espigas de latón, férulas de acero inoxidable. Temperatura de uso: -2 a 50°C. Presión máxima: 0.07 KCF/CM (7 KPA).",
        'longitud mancuera|medidas mancuera|tamaños mancuera': "Longitudes disponibles: 60 cm, 1.0 m, 1.5 m, 2.0 m, 3.0 m, 4.0 m, 5.0 m.",

        // REGULADORES DE GAS Y AGUA
        'reguladores|regulador|regulador gas|regulador agua|válvulas reguladoras': "En TUBCON manejamos reguladores de gas y agua de las marcas IUSA y CMS. Tenemos modelos de 1 vía, 2 vías, baja presión y alta presión.",
        'regulador iusa|marca iusa': "IUSA: Regulador R2001 IUSA 323986, Regulador 102 series, y diversos modelos de la serie 2403.",
        'regulador cms|marca cms': "CMS: Modelos LOBO, Regulador 1757 sin manómetro, y reguladores de diferentes especificaciones.",

        // BOMBAS IUSA
        'bombas|bomba|bomba agua|bomba iusa|sistema bombeo': "En TUBCON manejamos bombas de agua de la marca IUSA, incluyendo bombas periféricas, centrifugas, presurizadoras, autocebantes y para pozo profundo.",
        'bomba periférica|periférica iusa|1/2 hp periférica': "Bomba periférica IUSA de 1/2 HP, ideal para presurización de agua en hogares y pequeñas instalaciones.",

        // RESPUESTAS GENERALES
        'precios|costos|cotización|valor': "Para obtener información sobre precios y cotizaciones, te recomendamos contactarnos directamente para brindarte la mejor atención personalizada.",
        'distribuidor|mayoreo|revender|comerciante': "Si estás interesado en ser distribuidor, contáctanos para brindarte información sobre nuestros programas de distribution.",
        'gracias|bye|adiós|chao|hasta luego': "¡De nada! Estoy aquí para ayudarte cuando lo necesites. ¡Que tengas un excelente día!",
        'ayuda|soporte|asistencia|problema': "Para soporte técnico puedes contactarnos a través de la sección de contacto.",
        'horario|abren|cierran|horas|hora abren|hora cierran|atención|cuándo abren|cuándo cierran|días abren': "Nuestro horario de atención es de lunes a viernes de 8:30 a 18:00 y sábados de 8:00 a 15:00.",
        'envíos|entrega|shipping|delivery': "Ofrecemos servicios de entrega a domicilio. Consulta los detalles en la sección de contacto.",
        'garantía|devolución|reembolso': "Todos nuestros productos cuentan con garantía del fabricante. Para devoluciones o reembolsos, contáctanos directamente.",
    },

    comandosImagenes: {
        'muestra|muéstarme|ver|mostrar|imagen|foto|fotografía|gráfico|diagrama|visual|cómo se ve|aspecto|quiero ver|necesito ver|deseo ver': true
    },

    terminosBusquedaImagenes: {
        'tubos pvc|tuberías pvc|tubo pvc|tubería pvc|pvc tubo|pvc tubería': "PVC pipes plumbing installation",
        'tubos|tuberías|tubería|tubo|caños|cañerías': "water pipes plumbing system",
        'conexiones pvc|accesorios pvc|conexión pvc|accesorio pvc': "PVC fittings connectors plumbing",
        'codos pvc|codo pvc|codos 90|curvas pvc': "PVC elbows 90 degree fittings",
        'válvulas pvc|válvula pvc|llaves pvc|válvula agua': "PVC valves water control plumbing",
        'plomería|fontanería|instalación hidráulica|sistema plomería': "plumbing system installation tools",
    },

    respuestasGenericas: [
        "No estoy seguro de entender. ¿Podrías reformular tu pregunta?",
        "¿Te refieres a algún producto o servicio específico de TUBCON?",
        "Puedo ayudarte con información sobre nuestros productos, ubicación o contacto. ¿Qué necesitas?",
        "Como asistente de TUBCON, puedo ayudarte con información sobre nuestros productos de plomería. ¿En qué te puedo ayudar?"
    ]
};

// ==================== SISTEMA AVANZADO DE RECOMENDACIÓN TÉCNICA CON FÓRMULAS ====================
export const sistemaRecomendacionAvanzado = async (mensaje) => {
    const input = mensaje.toLowerCase().trim();
    
    // 1. SISTEMA DE RECOMENDACIÓN PARA TINACOS CON FÓRMULAS
    if (/(tinaco|tanque).*(personas|familia|gente|capacidad|recomienda|cuál|qué)/i.test(input)) {
        return await recomendarTinacoAvanzado(input);
    }
    
    // 2. SISTEMA PARA CISTERNAS CON CÁLCULOS DE CONSUMO
    if (/(cisterna|depósito|reservorio).*(personas|días|consumo|capacidad)/i.test(input)) {
        return await recomendarCisternaAvanzado(input);
    }
    
    // 3. SISTEMA PARA BOMBAS CON CÁLCULOS HIDRÁULICOS
    if (/(bomba|bombas).*(casa|pisos|altura|presión|flujo)/i.test(input)) {
        return await recomendarBombaAvanzado(input);
    }
    
    // 4. SISTEMA PARA TUBERÍAS CON CÁLCULOS DE CAUDAL
    if (/(tubo|tubería|pvc).*(casa|baños|diámetro|caudal|presión)/i.test(input)) {
        return await recomendarTuberiaAvanzado(input);
    }
    
    // 5. COMPARATIVO TÉCNICO ENTRE MARCAS
    if (/(diferencia|comparar|mejor|cuál).*(iusa|rotoplas|black plus)/i.test(input)) {
        return await compararMarcasTecnicamente(input);
    }
    
    return null;
};

// ==================== FÓRMULAS Y CÁLCULOS TÉCNICOS ====================
export const formulasTecnicas = {
    // Consumo diario de agua por persona (litros/día)
    consumoPorPersona: (tipoVivienda) => {
        const consumos = {
            'económico': 80,      // Uso básico
            'estándar': 120,      // Uso normal residencial
            'confort': 150,       // Uso con jardín/limpieza
            'lujo': 200          // Uso intensivo
        };
        return consumos[tipoVivienda] || 120;
    },
    
    // Cálculo de capacidad de tinaco basado en consumo
    capacidadTinaco: (personas, diasReserva = 2, tipoVivienda = 'estándar') => {
        const consumoDiario = formulasTecnicas.consumoPorPersona(tipoVivienda);
        return Math.ceil(personas * consumoDiario * diasReserva);
    },
    
    // Cálculo de capacidad de cisterna (considerando 5-7 días)
    capacidadCisterna: (personas, tipoVivienda = 'estándar') => {
        const consumoDiario = formulasTecnicas.consumoPorPersona(tipoVivienda);
        return Math.ceil(personas * consumoDiario * 6); // 6 días de reserva
    },
    
    // Cálculo de caballaje de bomba basado en altura y caudal
    potenciaBomba: (alturaMetros, caudalLPM) => {
        // Fórmula simplificada: HP = (Altura × Caudal) / (4500 × Eficiencia)
        const eficiencia = 0.6; // 60% de eficiencia típica
        return Math.ceil((alturaMetros * caudalLPM) / (4500 * eficiencia) * 10) / 10;
    },
    
    // Cálculo de caudal requerido basado en puntos de uso
    caudalRequerido: (numBaños, numCocinas, tieneJardín = false) => {
        let caudal = 0;
        caudal += numBaños * 15;      // 15 LPM por baño
        caudal += numCocinas * 10;    // 10 LPM por cocina
        caudal += tieneJardín ? 20 : 0; // 20 LPM para riego
        
        return Math.max(caudal, 25); // Mínimo 25 LPM
    }
};

// ==================== RECOMENDACIÓN AVANZADA DE TINACOS ====================
export const recomendarTinacoAvanzado = async (input) => {
    const matchPersonas = input.match(/(\d+)\s*personas?/i) || input.match(/para\s*(\d+)/i);
    const numPersonas = matchPersonas ? parseInt(matchPersonas[1]) : 4; // Default 4 personas
    
    // Detectar tipo de vivienda
    let tipoVivienda = 'estándar';
    if (input.includes('económico') || input.includes('básico')) tipoVivienda = 'económico';
    if (input.includes('confort') || input.includes('jardín')) tipoVivienda = 'confort';
    if (input.includes('lujo') || input.includes('grande')) tipoVivienda = 'lujo';
    
    // Calcular capacidad requerida
    const capacidadRequerida = formulasTecnicas.capacidadTinaco(numPersonas, 2, tipoVivienda);
    const consumoDiario = formulasTecnicas.consumoPorPersona(tipoVivienda) * numPersonas;
    
    // RECOMENDACIONES POR MARCA CON FÓRMULAS ESPECÍFICAS
    const recomendaciones = [
        {
            marca: "IUSA",
            modelo: capacidadRequerida <= 450 ? "Tricapa 450L" : "Slim 1100L",
            capacidad: capacidadRequerida <= 450 ? 450 : 1100,
            ventajaTecnica: "✅ *Capas reforzadas:* 3 capas de polietileno\n✅ *UV Protection:* Resistente 10+ años\n✅ *Precio/Calidad:* Mejor relación del mercado",
            formula: `Cálculo: ${numPersonas} personas × ${formulasTecnicas.consumoPorPersona(tipoVivienda)}L/día × 2 días = ${capacidadRequerida}L`,
            duracionEstimada: `Duración: ${Math.round((capacidadRequerida <= 450 ? 450 : 1100) / consumoDiario * 10) / 10} días en uso normal`,
            precioRelativo: "💲💲 (Económico)"
        },
        {
            marca: "ROTOPLAS",
            modelo: capacidadRequerida <= 600 ? "Vertical 600L" : "Vertical 1100L",
            capacidad: capacidadRequerida <= 600 ? 600 : 1100,
            ventajaTecnica: "✅ *Garantía:* 15 años contra defectos\n✅ *Certificación:* Norma NMX-E-226-CNCP-2019\n✅ *Diseño:* Exclusivo sistema de cierre",
            formula: `Reserva: ${Math.round((capacidadRequerida <= 600 ? 600 : 1100) / consumoDiario * 10) / 10} días de autonomía`,
            duracionEstimada: `Vida útil: 15+ años con mantenimiento básico`,
            precioRelativo: "💲💲💲 (Premium)"
        },
        {
            marca: "BLACK PLUS",
            modelo: capacidadRequerida <= 550 ? "Compacto 550L" : "Bala 1100L",
            capacidad: capacidadRequerida <= 550 ? 550 : 1100,
            ventajaTecnica: "✅ *Compacto:* Ideal espacios reducidos\n✅ *UV Max:* Protección solar reforzada\n✅ *Instalación:* Sistema fácil 4 pasos",
            formula: `Eficiencia: ${Math.round((capacidadRequerida <= 550 ? 550 : 1100) / numPersonas)}L por persona`,
            duracionEstimada: `Rendimiento: Optimizado para ${tipoVivienda === 'confort' ? 'uso intensivo' : 'uso residencial'}`,
            precioRelativo: "💲💲💲 (Intermedio)"
        }
    ];

    let respuesta = `🚰 *ANÁLISIS TÉCNICO PARA ${numPersonas} PERSONAS* 🚰\n\n`;
    respuesta += `📊 *Parámetros calculados:*\n`;
    respuesta += `• Personas: ${numPersonas}\n`;
    respuesta += `• Tipo vivienda: ${tipoVivienda}\n`;
    respuesta += `• Consumo diario: ${consumoDiario}L\n`;
    respuesta += `• Capacidad recomendada: ${capacidadRequerida}L\n\n`;
    respuesta += `🏆 *RECOMENDACIONES TÉCNICAS:*\n\n`;

    recomendaciones.forEach((rec, index) => {
        respuesta += `*${rec.marca} - ${rec.modelo} (${rec.capacidad}L)*\n`;
        respuesta += `${rec.ventajaTecnica}\n`;
        respuesta += `🧮 ${rec.formula}\n`;
        respuesta += `⏱️ ${rec.duracionEstimada}\n`;
        respuesta += `${rec.precioRelativo}\n`;
        
        if (index < recomendaciones.length - 1) {
            respuesta += `\n${'─'.repeat(40)}\n\n`;
        }
    });

    respuesta += `\n💡 *RECOMENDACIÓN FINAL:* `;
    if (tipoVivienda === 'económico') {
        respuesta += `IUSA por mejor relación precio-calidad`;
    } else if (tipoVivienda === 'confort') {
        respuesta += `BLACK PLUS por diseño y eficiencia`;
    } else {
        respuesta += `ROTOPLAS por durabilidad y garantía`;
    }

    return { tipo: "texto", contenido: respuesta };
};

// ==================== RECOMENDACIÓN AVANZADA DE CISTERNAS ====================
export const recomendarCisternaAvanzado = async (input) => {
    const matchPersonas = input.match(/(\d+)\s*personas?/i) || input.match(/para\s*(\d+)/i);
    const numPersonas = matchPersonas ? parseInt(matchPersonas[1]) : 4;
    
    const capacidadRequerida = formulasTecnicas.capacidadCisterna(numPersonas);
    const consumoMensual = formulasTecnicas.consumoPorPersona('estándar') * numPersonas * 30;

    const recomendaciones = [
        {
            marca: "IUSA",
            modelo: capacidadRequerida <= 5000 ? "Rectangular 2500L" : "Rectangular 10000L",
            capacidad: capacidadRequerida <= 5000 ? 2500 : 10000,
            ventajas: [
                "✅ *Estructura:* Refuerzos laterales cada 40cm",
                "✅ *Instalación:* Sistema modular fácil ensamble",
                "✅ *Mantenimiento:* Tapa de 60cm para acceso fácil"
            ],
            calculo: `Autonomía: ${Math.round((capacidadRequerida <= 5000 ? 2500 : 10000) / (numPersonas * 120) * 10) / 10} días`,
            aplicacion: capacidadRequerida <= 5000 ? "Familiar (4-6 personas)" : "Comercial (10+ personas)"
        },
        {
            marca: "ROTOPLAS",
            modelo: capacidadRequerida <= 6000 ? "Circular 2800L" : "Circular 10000L",
            capacidad: capacidadRequerida <= 6000 ? 2800 : 10000,
            ventajas: [
                "✅ *Diseño:* Forma circular optimizada",
                "✅ *Durabilidad:* 20 años de vida útil",
                "✅ *Tecnología:* Sistema Rotocontrol"
            ],
            calculo: `Reserva: ${Math.round((capacidadRequerida <= 6000 ? 2800 : 10000) / consumoMensual * 30)} días mensuales`,
            aplicacion: capacidadRequerida <= 6000 ? "Residencial estándar" : "Grandes consumos"
        },
        {
            marca: "BLACK PLUS",
            modelo: capacidadRequerida <= 5500 ? "Horizontal 3000L" : "Horizontal 8000L",
            capacidad: capacidadRequerida <= 5500 ? 3000 : 8000,
            ventajas: [
                "✅ *Espacio:* Diseño bajo para techos bajos",
                "✅ *UV:* Protección solar integrada",
                "✅ *Instalación:* 30% más rápida"
            ],
            calculo: `Eficiencia: ${Math.round((capacidadRequerida <= 5500 ? 3000 : 8000) / numPersonas)}L/persona`,
            aplicacion: capacidadRequerida <= 5500 ? "Espacios reducidos" : "Capacidad media"
        }
    ];

    let respuesta = `💧 *ANÁLISIS TÉCNICO DE CISTERNAS* 💧\n\n`;
    respuesta += `📈 *Cálculos para ${numPersonas} personas:*\n`;
    respuesta += `• Consumo mensual estimado: ${consumoMensual}L\n`;
    respuesta += `• Capacidad recomendada: ${capacidadRequerida}L\n`;
    respuesta += `• Autonomía ideal: 5-7 días\n\n`;

    recomendaciones.forEach(rec => {
        respuesta += `🏷️ *${rec.marca} ${rec.modelo}*\n`;
        respuesta += `📦 Capacidad: ${rec.capacidad}L\n`;
        respuesta += `🎯 Aplicación: ${rec.aplicacion}\n`;
        rec.ventajas.forEach(v => respuesta += `${v}\n`);
        respuesta += `🧮 ${rec.calculo}\n\n`;
    });

    respuesta += `⚖️ *TABLA COMPARATIVA:*\n`;
    respuesta += `\`\`\`\n`;
    respuesta += `Marca       | Cap. (L) | Vida Útil | Instalación\n`;
    respuesta += `${'─'.repeat(45)}\n`;
    respuesta += `IUSA        | 2500-10K | 15 años   | Media (2 personas)\n`;
    respuesta += `ROTOPLAS    | 2800-10K | 20 años   | Compleja (3 personas)\n`;
    respuesta += `BLACK PLUS  | 3000-8K  | 15 años   | Fácil (1-2 personas)\n`;
    respuesta += `\`\`\`\n\n`;
    respuesta += `💡 *Selección inteligente:* Elige según espacio, presupuesto y tiempo de instalación.`;

    return { tipo: "texto", contenido: respuesta };
};

// ==================== RECOMENDACIÓN AVANZADA DE BOMBAS ====================
export const recomendarBombaAvanzado = async (input) => {
    const matchPisos = input.match(/(\d+)\s*pisos?/i) || input.match(/para\s*(\d+).*piso/i);
    const numPisos = matchPisos ? parseInt(matchPisos[1]) : 1;
    
    const matchBaños = input.match(/(\d+)\s*baños?/i);
    const numBaños = matchBaños ? parseInt(matchBaños[1]) : 2;
    
    // Cálculos técnicos
    const alturaMetros = numPisos * 3 + 3; // 3m por piso + 3m adicional
    const caudalRequerido = formulasTecnicas.caudalRequerido(numBaños, 1, input.includes('jardín'));
    const potenciaRequerida = formulasTecnicas.potenciaBomba(alturaMetros, caudalRequerido);

    const recomendaciones = [
        {
            tipo: "Centrífuga",
            marca: "IUSA",
            modelo: `C-${potenciaRequerida <= 0.75 ? "075" : "100"}`,
            potencia: potenciaRequerida <= 0.75 ? "0.75 HP" : "1.0 HP",
            aplicacion: "Cisterna a tinaco",
            eficiencia: "75%",
            calculo: `HP = (${alturaMetros}m × ${caudalRequerido}LPM) / (4500 × 0.6) = ${potenciaRequerida} HP`,
            ventajas: ["✅ Alto caudal", "✅ Bajo mantenimiento", "✅ Precio competitivo"]
        },
        {
            tipo: "Presurizadora",
            marca: "IUSA",
            modelo: `P-${numBaños <= 2 ? "02" : "03"}`,
            potencia: numBaños <= 2 ? "0.5 HP" : "0.75 HP",
            aplicacion: "Mejorar presión existente",
            eficiencia: "80%",
            calculo: `Caudal: ${numBaños} baños × 15LPM = ${caudalRequerido} LPM`,
            ventajas: ["✅ Automática", "✅ Silenciosa", "✅ Ahorro energía"]
        },
        {
            tipo: "Periférica",
            marca: "IUSA",
            modelo: `PER-${potenciaRequerida <= 1 ? "100" : "150"}`,
            potencia: potenciaRequerida <= 1 ? "1.0 HP" : "1.5 HP",
            aplicacion: "Riego y sistemas",
            eficiencia: "70%",
            calculo: `Altura máxima: ${alturaMetros + 5}m (incluye succión)`,
            ventajas: ["✅ Autocebante", "✅ Versátil", "✅ Multiusos"]
        }
    ];

    let respuesta = `⚡ *ANÁLISIS TÉCNICO DE BOMBAS* ⚡\n\n`;
    respuesta += `📐 *Parámetros de diseño:*\n`;
    respuesta += `• Pisos: ${numPisos} (${alturaMetros}m altura)\n`;
    respuesta += `• Baños: ${numBaños}\n`;
    respuesta += `• Caudal requerido: ${caudalRequerido} LPM\n`;
    respuesta += `• Potencia calculada: ${potenciaRequerida} HP\n\n`;

    respuesta += `🔧 *RECOMENDACIONES IUSA TÉCNICAS:*\n\n`;

    recomendaciones.forEach(rec => {
        respuesta += `🔹 *${rec.tipo} ${rec.marca} ${rec.modelo}*\n`;
        respuesta += `⚡ Potencia: ${rec.potencia} | Eficiencia: ${rec.eficiencia}\n`;
        respuesta += `🎯 Aplicación: ${rec.aplicacion}\n`;
        rec.ventajas.forEach(v => respuesta += `${v}\n`);
        respuesta += `🧮 ${rec.calculo}\n\n`;
    });

    respuesta += `📊 *TABLA DE SELECCIÓN TÉCNICA:*\n`;
    respuesta += `\`\`\`\n`;
    respuesta += `Tipo         | Pisos | Baños | HP    | Caudal\n`;
    respuesta += `${'─'.repeat(50)}\n`;
    respuesta += `Centrífuga   | 1-2   | 2-3   | 0.75  | 40-60 LPM\n`;
    respuesta += `Presurizadora| 1-3   | 2-4   | 0.5-1 | 20-35 LPM\n`;
    respuesta += `Periférica   | 1-4   | 3-6   | 1-2   | 50-80 LPM\n`;
    respuesta += `\`\`\`\n\n`;
    respuesta += `💡 *Recomendación final:* Para ${numPisos} pisos y ${numBaños} baños, `;
    respuesta += `la bomba ${recomendaciones[0].tipo} ${recomendaciones[0].modelo} es óptima.`;

    return { tipo: "texto", contenido: respuesta };
};

// ==================== COMPARATIVO TÉCNICO ENTRE MARCAS ====================
export const compararMarcasTecnicamente = async (input) => {
    let producto = "tinacos";
    if (input.includes('cisterna')) producto = "cisternas";
    if (input.includes('bomba')) producto = "bombas";
    if (input.includes('regulador')) producto = "reguladores";

    const comparativa = {
        'tinacos': {
            iusa: {
                ventajas: ["Precio competitivo", "Amplia distribución", "Garantía 10 años"],
                especificaciones: ["3 capas de polietileno", "Resistente a UV", "Temperatura -10°C a 50°C"],
                vidaUtil: "15 años",
                precio: "$$",
                eficiencia: "85%"
            },
            rotoplas: {
                ventajas: ["Reconocimiento de marca", "Garantía 15 años", "Sistema exclusivo cierre"],
                especificaciones: ["4 capas reforzadas", "Certificación NMX", "Auto-limpieza"],
                vidaUtil: "20 años",
                precio: "$$$",
                eficiencia: "90%"
            },
            blackplus: {
                ventajas: ["Diseño compacto", "Instalación fácil", "Protección UV Max"],
                especificaciones: ["Forma ergonómica", "Bajo perfil", "Optimizado espacios"],
                vidaUtil: "15 años",
                precio: "$$",
                eficiencia: "88%"
            }
        },
        'cisternas': {
            iusa: {
                ventajas: ["Sistema modular", "Refuerzos cada 40cm", "Precio accesible"],
                especificaciones: ["Capacidad 2500-10000L", "Instalación 2 personas", "Mantenimiento fácil"],
                vidaUtil: "15 años",
                precio: "$$$",
                eficiencia: "82%"
            },
            rotoplas: {
                ventajas: ["Diseño circular", "Vida útil extendida", "Tecnología Rotocontrol"],
                especificaciones: ["Capacidad 2800-10000L", "Estructura optimizada", "Auto-nivelación"],
                vidaUtil: "20 años",
                precio: "$$$$",
                eficiencia: "92%"
            },
            blackplus: {
                ventajas: ["Diseño horizontal", "Para espacios bajos", "Instalación rápida"],
                especificaciones: ["Capacidad 3000-8000L", "30% más rápido", "UV integrado"],
                vidaUtil: "15 años",
                precio: "$$$",
                eficiencia: "85%"
            }
        }
    };

    const data = comparativa[producto];
    if (!data) return null;

    let respuesta = `🏆 *COMPARATIVO TÉCNICO - ${producto.toUpperCase()}* 🏆\n\n`;

    Object.entries(data).forEach(([marca, info]) => {
        respuesta += `🔸 *${marca.toUpperCase()}*\n`;
        respuesta += `⭐ Ventajas: ${info.ventajas.join(', ')}\n`;
        respuesta += `📋 Especificaciones:\n`;
        info.especificaciones.forEach(esp => respuesta += `   • ${esp}\n`);
        respuesta += `⏱️ Vida útil: ${info.vidaUtil} | Precio: ${info.precio}\n`;
        respuesta += `📊 Eficiencia: ${info.eficiencia}\n\n`;
    });

    respuesta += `📈 *ANÁLISIS COMPARATIVO:*\n`;
    respuesta += `• *Mejor precio:* IUSA\n`;
    respuesta += `• *Mayor durabilidad:* ROTOPLAS\n`;
    respuesta += `• *Mejor diseño:* BLACK PLUS\n`;
    respuesta += `• *Relación precio-calidad:* IUSA\n\n`;
    respuesta += `💡 *Conclusión técnica:* Selecciona según prioridades de durabilidad, presupuesto y espacio disponible.`;

    return { tipo: "texto", contenido: respuesta };
};

// ==================== FUNCIONES DE BÚSQUEDA DE IMÁGENES ====================
export const extraerTerminoEspecifico = (input) => {
    const palabrasClave = [
        'tubos', 'tuberías', 'codos', 'tes', 'válvulas', 'conexiones',
        'accesorios', 'pegamento', 'cemento', 'drenaje', 'instalación',
        'pvc', 'plomería', 'fontanería', 'sistema', 'materiales'
    ];

    const palabras = input.toLowerCase().split(/\s+/);
    for (const palabra of palabras) {
        if (palabrasClave.includes(palabra)) {
            return palabra;
        }
    }
    return null;
};

export const detectarSolicitudImagenes = (input) => {
    const comandos = Object.keys(knowledgeBase.comandosImagenes);
    return comandos.some(cmd => {
        const patrones = cmd.split('|');
        return patrones.some(patron => new RegExp(patron, 'i').test(input));
    });
};

export const obtenerTerminoBusquedaImagenes = (input) => {
    const terminoEspecifico = extraerTerminoEspecifico(input);

    for (const [claves, term] of Object.entries(knowledgeBase.terminosBusquedaImagenes)) {
        const patrones = claves.split('|');
        for (const patron of patrones) {
            if (new RegExp(`\\b${patron}\\b`, 'i').test(input)) {
                return term;
            }
        }
    }

    if (terminoEspecifico) {
        for (const [claves, term] of Object.entries(knowledgeBase.terminosBusquedaImagenes)) {
            if (claves.includes(terminoEspecifico)) {
                return term;
            }
        }
    }

    return null;
};

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
        });

        if (!response.ok) return [];

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

export const buscarImagenesMultiples = async (query) => {
    if (!query) return [];
    const imagenesUnsplash = await buscarImagenesUnsplash(query);
    return imagenesUnsplash.slice(0, 4);
};

export const formatearRespuestaConImagenes = (imagenes, terminoBusqueda, mensajeOriginal) => {
    if (imagenes.length === 0) {
        return {
            tipo: "texto",
            contenido: `📸 No se encontraron imágenes específicas para "${mensajeOriginal}".\n\n💡 *Sugerencias:*\n- "muestra tubos PVC"\n- "ver conexiones PVC"\n- "imagen de válvulas"\n- "cómo se ven los codos PVC"`
        };
    }

    const mensaje = `📸 *Imágenes relacionadas con "${mensajeOriginal}":*\n\nEstas son imágenes de referencia para productos similares:`;
    return {
        tipo: "imagenes",
        contenido: mensaje,
        imagenes: imagenes,
        terminoBusqueda: terminoBusqueda,
        mensajeOriginal: mensajeOriginal
    };
};

// ==================== FUNCIONES DE IA ====================
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
                        return { tipo: "texto", contenido: "¡Hola! Soy tu asistente de TUBCON. ¿En qué puedo ayudarte hoy?" };
                    case 'despedida':
                        return { tipo: "texto", contenido: "¡Hasta luego! No dudes en volver si necesitas más ayuda con nuestros productos de plomería." };
                    case 'ayuda':
                        return { tipo: "texto", contenido: "Puedo ayudarte con información sobre nuestros productos de tubería, conexiones y accesorios de PVC. ¿Qué necesitas saber?" };
                    default:
                        const respuestaEntidades = procesarEntidadesWit(data.entities);
                        return { tipo: "texto", contenido: respuestaEntidades || "Entendido. ¿Necesitas algo más específico sobre nuestros productos de plomería?" };
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
        const prompt = `Eres un especialista técnico de TUBCON, empresa de materiales de plomería. 
        Responde de manera técnica pero clara sobre productos de PVC, tinacos, cisternas, reguladores de gas, 
        bombas de agua y materiales de plomería. Sé específico y proporciona información técnica útil.
        
        Pregunta del cliente: ${mensaje}
        
        Responde en español con información precisa y técnica.`;

        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.3,
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
            return { tipo: "texto", contenido: data.candidates[0].content.parts[0].text };
        }
        return false;
    } catch (error) {
        console.error("Error con Gemini:", error);
        return false;
    }
};

export const procesarEntidadesWit = (entities) => {
    if (!entities) return null;
    if (entities.producto) {
        const producto = entities.producto[0].value.toLowerCase();
        switch (producto) {
            case 'tubos': case 'tuberías': case 'tubo':
                return "Contamos con una amplia variedad de tubos de PVC en diferentes medidas y especificaciones. ¿Te interesa algún diámetro en particular?";
            case 'conexiones': case 'conexión': case 'accesorios':
                return "Tenemos todo tipo de conexiones y accesorios de PVC para tus proyectos de plomería. ¿Qué tipo de conexión necesitas?";
            case 'pvc':
                return "Trabajamos con los mejores materiales de PVC del mercado. ¿Necesitas información sobre algún producto específico?";
        }
    }
    return null;
};

// ==================== FUNCIONES DE DETECCIÓN ====================
export const detectarPreguntaTecnica = (input) => {
    const patronesTecnicos = [
        /qu[ée]\s+es\s+/i, /definici[óo]n\s+de\s+/i, /significado\s+de\s+/i,
        /c[óo]mo\s+funciona\s+/i, /para\s+qu[ée]\s+sirve\s+/i,
        /caracter[íi]sticas\s+de\s+/i, /especificaciones\s+de\s+/i,
        /ventajas\s+de\s+/i, /beneficios\s+de\s+/i, /propiedades\s+de\s+/i,
        /qu[ée]\s+significa\s+/i
    ];
    return patronesTecnicos.some(patron => patron.test(input));
};

export const detectarConsultaDefinicion = (input) => {
    const palabrasDefinicion = [
        'qué es', 'que es', 'definición', 'definicion', 'significado',
        'qué significa', 'que significa', 'explica', 'explicación',
        'qué son', 'que son', 'definir', 'concepto'
    ];
    return palabrasDefinicion.some(palabra => input.includes(palabra));
};

export const debeIgnorarBaseLocal = (input) => {
    const preguntasParaIA = [
        /qu[ée]\s+es\s+.+/i, /definici[óo]n\s+de\s+.+/i,
        /c[óo]mo\s+funciona\s+.+/i, /para\s+qu[ée]\s+sirve\s+.+/i,
        /explica\s+.+/i, /qu[ée]\s+significa\s+.+/i
    ];
    return preguntasParaIA.some(patron => patron.test(input));
};

export const esRespuestaMuyGenerica = (contenido) => {
    const respuestasGenericas = [
        "entendido", "puedo ayudarte", "qué necesitas saber",
        "en qué te puedo ayudar", "contamos con", "visita nuestra sección",
        "te recomendamos contactarnos", "tenemos una amplia variedad"
    ];
    const contenidoLower = contenido.toLowerCase();
    return respuestasGenericas.some(resp => contenidoLower.includes(resp));
};

// ==================== SISTEMA DE FLUJOS CONVERSACIONALES ====================
export const flujosConversacion = {
    cotizacion: {
        pasos: [
            { 
                pregunta: "📋 *Paso 1 de 4:* ¿Para qué tipo de proyecto necesitas los materiales?\n\n💡 *Ejemplos:* residencial, comercial, industrial, reparación, construcción nueva", 
                campo: "tipoProyecto" 
            },
            { 
                pregunta: "📋 *Paso 2 de 4:* ¿Qué productos específicamente necesitas?\n\n💡 *Ejemplos:* tubos PVC 1/2\", tinaco 1100L, conexiones para drenaje", 
                campo: "productos" 
            },
            { 
                pregunta: "📋 *Paso 3 de 4:* ¿Qué cantidades aproximadas requieres?\n\n💡 *Ejemplos:* 10 metros, 5 piezas, 1 tinaco", 
                campo: "cantidades" 
            },
            { 
                pregunta: "📋 *Paso 4 de 4:* ¿Para cuándo necesitas los materiales?", 
                campo: "fecha" 
            }
        ],
        estado: new Map(),
        completado: "¡Gracias por la información! 📞 Te contactaremos en breve para brindarte una cotización personalizada. ¿Necesitas ayuda con algo más?"
    }
};

export const gestionarFlujoConversacional = (idUsuario, mensaje) => {
    // Verificar si estamos en medio de algún flujo
    for (const [nombreFlujo, config] of Object.entries(flujosConversacion)) {
        if (config.estado.has(idUsuario)) {
            return procesarPasoFlujo(idUsuario, mensaje, nombreFlujo);
        }
    }
    
    // Si no hay flujo activo, detectar si debemos iniciar uno
    const intencion = detectarIntencionMejorada(mensaje);
    
    if (intencion === 'solicitudCotizacion') {
        return iniciarFlujo(idUsuario, 'cotizacion');
    }
    
    return null;
};

export const iniciarFlujo = (idUsuario, nombreFlujo) => {
    const flujo = flujosConversacion[nombreFlujo];
    flujo.estado.set(idUsuario, {
        pasoActual: 0,
        datos: {},
        flujo: nombreFlujo
    });
    
    return flujo.pasos[0].pregunta;
};

export const procesarPasoFlujo = (idUsuario, mensaje, nombreFlujo) => {
    const flujo = flujosConversacion[nombreFlujo];
    const estado = flujo.estado.get(idUsuario);
    
    // Guardar respuesta del paso actual
    const pasoActual = estado.pasoActual;
    const campo = flujo.pasos[pasoActual].campo;
    estado.datos[campo] = mensaje;
    
    // Avanzar al siguiente paso
    estado.pasoActual++;
    
    if (estado.pasoActual < flujo.pasos.length) {
        return flujo.pasos[estado.pasoActual].pregunta;
    } else {
        // Flujo completado
        flujo.estado.delete(idUsuario);
        console.log(`📦 Flujo ${nombreFlujo} completado:`, estado.datos);
        return flujo.completado;
    }
};

export const cancelarFlujo = (idUsuario) => {
    for (const [nombreFlujo, config] of Object.entries(flujosConversacion)) {
        if (config.estado.has(idUsuario)) {
            config.estado.delete(idUsuario);
            return `❌ Hemos cancelado la solicitud. ¿En qué más puedo ayudarte?`;
        }
    }
    return null;
};

// ==================== DETECCIÓN MEJORADA DE INTENCIONES ====================
export const detectarIntencionMejorada = (input) => {
    const intenciones = {
        consultaProducto: {
            patrones: [
                /(?:quiero|necesito|busco|deseo|me interesa).*(?:tubo|tubería|conexión|válvula|tinaco|cisterna|bomba|regulador|mancuera|pvc)/i,
                /(?:qué|cuál).*(?:tienen|ofrecen|venden|manejan).*(?:para|de)/i,
            ],
            prioridad: 1
        },
        solicitudCotizacion: {
            patrones: [
                /(?:precio|costo|cotizaci[óo]n|valor|cu[áa]nto).*(?:tubo|tubería|producto|material)/i,
                /(?:cu[áa]nto cuesta|qu[ée] precio|qu[ée] valor).*/i,
                /(?:presupuesto|cotizar|presupuestar).*/i,
            ],
            prioridad: 2
        },
        solicitudTecnica: {
            patrones: [
                /(?:c[óo]mo|de qu[ée] manera).*(?:instalar|funciona|usar|aplicar)/i,
                /(?:caracter[íi]sticas|especificaciones|medidas|dimensiones).*/i,
                /(?:para qu[ée] sirve|qu[ée] es|funcionamiento).*/i,
            ],
            prioridad: 1
        }
    };

    let mejorIntencion = null;
    let mejorPuntaje = 0;

    for (const [intencion, config] of Object.entries(intenciones)) {
        for (const patron of config.patrones) {
            if (patron.test(input)) {
                if (config.prioridad > mejorPuntaje) {
                    mejorPuntaje = config.prioridad;
                    mejorIntencion = intencion;
                }
                break;
            }
        }
    }

    return mejorIntencion;
};

// ==================== ANÁLISIS DE SENTIMIENTO ====================
export const analizarSentimiento = (texto) => {
    const positivos = ['gracias', 'excelente', 'bueno', 'perfecto', 'genial', 'ayuda', 'buen', 'agradecido', 'agradezco'];
    const negativos = ['problema', 'error', 'mal', 'terrible', 'horrible', 'queja', 'molesto', 'enojado', 'pésimo'];
    
    let puntaje = 0;
    const palabras = texto.toLowerCase().split(/\s+/);
    
    palabras.forEach(palabra => {
        if (positivos.includes(palabra)) puntaje++;
        if (negativos.includes(palabra)) puntaje--;
    });
    
    return puntaje > 0 ? 'positivo' : puntaje < 0 ? 'negativo' : 'neutral';
};

// ==================== PROCESAMIENTO LOCAL MEJORADO ====================
export const procesarRespuestaLocal = async (mensaje) => {
    const input = mensaje.toLowerCase().trim();

    // 1. Verificar si es una pregunta que debe ignorar la base local
    if (debeIgnorarBaseLocal(input)) {
        return {
            tipo: "texto",
            contenido: knowledgeBase.respuestasGenericas[0]
        };
    }

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

    // 5. Búsqueda normal en el conocimiento base
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

    // 6. Respuesta genérica
    return {
        tipo: "texto",
        contenido: knowledgeBase.respuestasGenericas[
            Math.floor(Math.random() * knowledgeBase.respuestasGenericas.length)
        ]
    };
};

// ==================== FUNCIÓN PRINCIPAL MEJORADA ====================
export const procesarMensaje = async (mensaje, idUsuario = 'default') => {
    try {
        const input = mensaje.toLowerCase().trim();
        
        // 1. Detectar cancelación de flujo
        if (/(cancelar|detener|parar|no quiero|olvídalo)/i.test(input)) {
            const respuestaCancelacion = cancelarFlujo(idUsuario);
            if (respuestaCancelacion) {
                gestionarContexto(idUsuario, mensaje, respuestaCancelacion);
                return renderizarRespuestaEnChat({ tipo: "texto", contenido: respuestaCancelacion });
            }
        }
        
        // 2. Gestionar flujos conversacionales
        const respuestaFlujo = gestionarFlujoConversacional(idUsuario, mensaje);
        if (respuestaFlujo) {
            gestionarContexto(idUsuario, mensaje, respuestaFlujo);
            return renderizarRespuestaEnChat({ tipo: "texto", contenido: respuestaFlujo });
        }
        
        // 3. NUEVO: Verificar si es solicitud de recomendación técnica avanzada
        const recomendacionAvanzada = await sistemaRecomendacionAvanzado(mensaje);
        if (recomendacionAvanzada) {
            gestionarContexto(idUsuario, mensaje, recomendacionAvanzada.contenido);
            return renderizarRespuestaEnChat(recomendacionAvanzada);
        }
        
        // 4. Detectar saludos
        if (/(hola|buen|saludos|qué tal|buenas|hello|hi)/i.test(input)) {
            const contexto = obtenerContexto(idUsuario);
            const saludo = contexto.length > 0 
                ? "¡Hola de nuevo! ¿En qué más puedo ayudarte?"
                : knowledgeBase.saludos[Math.floor(Math.random() * knowledgeBase.saludos.length)];
            
            gestionarContexto(idUsuario, mensaje, saludo);
            return renderizarRespuestaEnChat({ tipo: "texto", contenido: saludo });
        }
        
        // 5. Detectar despedidas
        if (/(gracias|adi[óo]s|chao|bye|hasta luego|nos vemos|chao)/i.test(input)) {
            const sentimiento = analizarSentimiento(input);
            let despedida = "¡De nada! Estoy aquí para ayudarte cuando lo necesites. ¡Que tengas un excelente día! 🌟";
            
            if (sentimiento === 'positivo') {
                despedida = "¡Gracias a ti! 😊 Fue un gusto ayudarte. ¡Vuelve pronto!";
            } else if (sentimiento === 'negativo') {
                despedida = "Lamento no haber podido ayudarte mejor. 😔 ¿Hay algo más en lo que pueda asistirte?";
            }
            
            gestionarContexto(idUsuario, mensaje, despedida);
            return renderizarRespuestaEnChat({ tipo: "texto", contenido: despedida });
        }
        
        // 6. DETECTAR SI ES UNA PREGUNTA TÉCNICA QUE DEBE IR DIRECTAMENTE A LA IA
        const esPreguntaTecnica = detectarPreguntaTecnica(input);
        const esConsultaDefinicion = detectarConsultaDefinicion(input);
        
        if (esPreguntaTecnica || esConsultaDefinicion) {
            console.log("🔍 Pregunta técnica detectada, consultando IAs...");
            
            // Intentar primero con Gemini (mejor para respuestas técnicas)
            const respuestaGemini = await consultarGemini(mensaje);
            if (respuestaGemini && !esRespuestaMuyGenerica(respuestaGemini.contenido)) {
                gestionarContexto(idUsuario, mensaje, respuestaGemini.contenido);
                return renderizarRespuestaEnChat(respuestaGemini);
            }
            
            // Si Gemini falla, intentar con Wit.ai
            const respuestaWit = await consultarWitAI(mensaje);
            if (respuestaWit) {
                gestionarContexto(idUsuario, mensaje, respuestaWit.contenido);
                return renderizarRespuestaEnChat(respuestaWit);
            }
        }
        
        // 7. PROCESAR LOCALMENTE (solo si no es pregunta técnica)
        const respuestaLocal = await procesarRespuestaLocal(mensaje);
        
        // 8. Si la respuesta local es genérica, consultar IAs
        const esRespuestaGenerica = knowledgeBase.respuestasGenericas.some(
            resp => resp === respuestaLocal.contenido
        );

        if (respuestaLocal.tipo === "texto" && esRespuestaGenerica) {
            const respuestaGemini = await consultarGemini(mensaje);
            if (respuestaGemini) {
                gestionarContexto(idUsuario, mensaje, respuestaGemini.contenido);
                return renderizarRespuestaEnChat(respuestaGemini);
            }
            
            const respuestaWit = await consultarWitAI(mensaje);
            if (respuestaWit) {
                gestionarContexto(idUsuario, mensaje, respuestaWit.contenido);
                return renderizarRespuestaEnChat(respuestaWit);
            }
        }

        // 9. Devolver respuesta local
        gestionarContexto(idUsuario, mensaje, respuestaLocal.contenido);
        return renderizarRespuestaEnChat(respuestaLocal);

    } catch (error) {
        console.error("Error en procesarMensaje:", error);
        const errorMsg = '<div class="chat-response">Error al procesar el mensaje. Intenta de nuevo.</div>';
        gestionarContexto(idUsuario, mensaje, errorMsg);
        return errorMsg;
    }
};

// ==================== RENDERIZADO Y ESTILOS ====================
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
    grid-template-columns: repeat(2, 1fr);
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
    max-width: 100%;
    width: 150px;
    height: auto;
    margin: 0 auto;
}

.chat-image:hover {
    transform: translateY(-2px);
    border-color: #007bff;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.chat-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
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

// ==================== INICIALIZACIÓN ====================
export const inicializarChatbot = () => {
    console.log('🚀 Chatbot TUBCON Mejorado inicializado correctamente');
    console.log('🔍 Funciones disponibles:');
    console.log('   - Sistema de contexto y memoria');
    console.log('   - Flujos conversacionales para cotizaciones');
    console.log('   - Detección mejorada de intenciones');
    console.log('   - Análisis de sentimiento');
    console.log('   - Búsqueda de imágenes mejorada');
    console.log('   - Sistema avanzado de recomendación técnica');
    console.log('   - Fórmulas y cálculos técnicos integrados');
};

// Inicializar automáticamente
inicializarChatbot();