// ==================== SISTEMA DE COTIZACIÓN CONVERSACIONAL COMPLETAMENTE MEJORADO ====================
export const sistemaCotizacion = {
    estado: new Map(),
    
    // Estados posibles en el flujo
    estados: {
        INICIO: 'inicio',
        CAPTURANDO_PRODUCTOS: 'capturando_productos',
        DETALLANDO_ESPECIFICACIONES: 'detallando_especificaciones',
        CONFIRMANDO_INFORMACION: 'confirmando_informacion',
        SOLICITANDO_CONTACTO: 'solicitando_contacto',
        ENVIANDO_CORREO: 'enviando_correo',
        FINALIZADO: 'finalizado'
    },

    // Base de productos estructurada - COMPLETAMENTE ACTUALIZADA
    categoriasProductos: {
        'tubos_tuberias': {
            nombre: 'Tubos y Tuberías',
            productos: {
                'pvc_1/2': { nombre: 'Tubo PVC 1/2"', unidad: 'metro', preguntas: ['¿Cuántos metros?'] },
                'pvc_3/4': { nombre: 'Tubo PVC 3/4"', unidad: 'metro', preguntas: ['¿Cuántos metros?'] },
                'pvc_1': { nombre: 'Tubo PVC 1"', unidad: 'metro', preguntas: ['¿Cuántos metros?'] },
                'pvc_1-1/2': { nombre: 'Tubo PVC 1 1/2"', unidad: 'metro', preguntas: ['¿Cuántos metros?'] },
                'pvc_2': { nombre: 'Tubo PVC 2"', unidad: 'metro', preguntas: ['¿Cuántos metros?'] },
                'pvc_3': { nombre: 'Tubo PVC 3"', unidad: 'metro', preguntas: ['¿Cuántos metros?'] },
                'pvc_4': { nombre: 'Tubo PVC 4"', unidad: 'metro', preguntas: ['¿Cuántos metros?'] },
                'cobre_1/2': { nombre: 'Tubo Cobre 1/2"', unidad: 'metro', preguntas: ['¿Cuántos metros?'] }
            }
        },
        'conexiones': {
            nombre: 'Conexiones y Accesorios',
            productos: {
                'codo_90_1/2': { nombre: 'Codo 90° 1/2"', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'codo_45_1/2': { nombre: 'Codo 45° 1/2"', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'tee_1/2': { nombre: 'Tee 1/2"', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'union_1/2': { nombre: 'Unión 1/2"', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'reduccion_1/2_a_3/4': { nombre: 'Reducción 1/2" a 3/4"', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'tapón_1/2': { nombre: 'Tapón 1/2"', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'adaptador_1/2': { nombre: 'Adaptador 1/2"', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] }
            }
        },
        'tinacos_cisternas': {
            nombre: 'Tinacos y Cisternas',
            productos: {
                'tinaco_450l': { nombre: 'Tinaco 450L', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'tinaco_600l': { nombre: 'Tinaco 600L', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'tinaco_1100l': { nombre: 'Tinaco 1100L', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'cisterna_2500l': { nombre: 'Cisterna 2500L', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'cisterna_5000l': { nombre: 'Cisterna 5000L', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] }
            }
        },
        'bombas': {
            nombre: 'Bombas de Agua',
            productos: {
                'bomba_1/2_hp': { nombre: 'Bomba 1/2 HP', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'bomba_1_hp': { nombre: 'Bomba 1 HP', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'bomba_presurizadora': { nombre: 'Bomba Presurizadora', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] }
            }
        },
        'valvulas_reguladores': {
            nombre: 'Válvulas y Reguladores',
            productos: {
                'valvula_compuerta_1/2': { nombre: 'Válvula Compuerta 1/2"', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'valvula_esfera_1/2': { nombre: 'Válvula Esfera 1/2"', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'regulador_gas': { nombre: 'Regulador Gas LP', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'mancuera_gas': { nombre: 'Mancuera para Gas 1.5m', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] }
            }
        },
        'accesorios': {
            nombre: 'Accesorios Varios',
            productos: {
                'pegamento_pvc': { nombre: 'Pegamento PVC', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'cinta_teflon': { nombre: 'Cinta Teflón', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] },
                'silicon_sellador': { nombre: 'Silicon Sellador', unidad: 'pieza', preguntas: ['¿Cuántas piezas?'] }
            }
        }
    },

    // Iniciar cotización
    iniciar: (idUsuario) => {
        sistemaCotizacion.estado.set(idUsuario, {
            estado: sistemaCotizacion.estados.INICIO,
            productos: [],
            contexto: {},
            pasoActual: null,
            datosContacto: {},
            timestamp: new Date().toISOString()
        });

        return sistemaCotizacion.generarMensajeInicial();
    },

    // Procesar mensaje del usuario de forma no lineal
    procesar: (idUsuario, mensaje) => {
        const estado = sistemaCotizacion.estado.get(idUsuario);
        if (!estado) return null;

        const input = mensaje.toLowerCase().trim();

        // Detectar comandos globales
        if (sistemaCotizacion.esComandoGlobal(input)) {
            return sistemaCotizacion.procesarComandoGlobal(idUsuario, input);
        }

        // Procesar según estado actual
        switch (estado.estado) {
            case sistemaCotizacion.estados.INICIO:
                return sistemaCotizacion.procesarInicio(idUsuario, input);
            
            case sistemaCotizacion.estados.CAPTURANDO_PRODUCTOS:
                return sistemaCotizacion.procesarProductos(idUsuario, input);
            
            case sistemaCotizacion.estados.DETALLANDO_ESPECIFICACIONES:
                return sistemaCotizacion.procesarEspecificaciones(idUsuario, input);
            
            case sistemaCotizacion.estados.CONFIRMANDO_INFORMACION:
                return sistemaCotizacion.procesarConfirmacion(idUsuario, input);
            
            case sistemaCotizacion.estados.SOLICITANDO_CONTACTO:
                return sistemaCotizacion.procesarSolicitudContacto(idUsuario, input);
            
            case sistemaCotizacion.estados.ENVIANDO_CORREO:
                return sistemaCotizacion.procesarEnvioCorreo(idUsuario, input);
            
            default:
                return sistemaCotizacion.reiniciarFlujo(idUsuario);
        }
    },

    // ==================== CORRECCIÓN CRÍTICA - PROCESAR INICIO MEJORADO ====================
    procesarInicio: (idUsuario, input) => {
        const estado = sistemaCotizacion.estado.get(idUsuario);
        
        // DETECCIÓN MEJORADA DE PROYECTOS - MÁS PATRONES Y MÁS FLEXIBLE
        const proyectos = {
            'baño|baños|sanitario|bañera|ducha|regadera|lavabo|excusado|inodoro': 'baño',
            'cocina|cocinas|lavaplatos|fregadero|tarja|estufa|hornilla': 'cocina',
            'jardín|jardin|riego|aspersores|plantas|cesped|cespéd': 'jardín',
            'alberca|albercas|piscina|pileta|natación': 'alberca',
            'casa|residencial|hogar|vivienda|departamento|apartamento': 'casa',
            'edificio|condominio|multifamiliar': 'edificio',
            'negocio|comercial|local|tienda|oficina|restaurante': 'comercial',
            'industria|industrial|fabrica|planta|taller': 'industrial'
        };

        // BUSCAR PROYECTO EN EL INPUT - MÁS INTELIGENTE
        let proyectoDetectado = null;
        for (const [patron, proyecto] of Object.entries(proyectos)) {
            if (new RegExp(patron, 'i').test(input)) {
                proyectoDetectado = proyecto;
                break;
            }
        }

        // SI DETECTA PROYECTO, SUGERIR PRODUCTOS ESPECÍFICOS INMEDIATAMENTE
        if (proyectoDetectado) {
            estado.contexto.tipoProyecto = proyectoDetectado;
            estado.contexto.descripcion = input;
            estado.estado = sistemaCotizacion.estados.CAPTURANDO_PRODUCTOS;
            
            return sistemaCotizacion.sugerirProductosPorProyecto(proyectoDetectado);
        }

        // DETECTAR SI YA MENCIONA PRODUCTOS ESPECÍFICOS
        const productosDetectados = sistemaCotizacion.extraerProductosMejorado(input);
        if (productosDetectados.length > 0) {
            estado.productos = productosDetectados;
            estado.estado = sistemaCotizacion.estados.CAPTURANDO_PRODUCTOS;
            return {
                tipo: "texto",
                contenido: `✅ *Excelente, detecté estos productos:*\n\n${sistemaCotizacion.generarResumenProductos(productosDetectados)}\n\n¿Qué más necesitas agregar a tu cotización? O escribe "LISTO" para continuar.`
            };
        }

        // SI NO DETECTA NADA, PEDIR MÁS INFORMACIÓN DE FORMA MÁS CLARA
        return {
            tipo: "texto",
            contenido: `🤔 *Veo que necesitas ayuda con un proyecto de plomería.*\n\n💡 *¿Podrías contarme más detalles?*\n\n🏠 **Ejemplos que funcionan:**\n• "Es para un baño completo"\n• "Necesito materiales para cocina"  \n• "Voy a instalar sistema de riego en el jardín"\n• "Es una reparación de tuberías"\n• "Necesito tubos y conexiones para..."\n\n🔧 **O menciona productos directos:**\n• "15m tubo 1/2, 8 codos, 2 válvulas"\n• "Tinaco 1100L y bomba 1/2 HP"\n• "Material para instalar regadera"\n\n*También puedes escribir "cancelar" si cambiaste de idea.*`
        };
    },

    // Procesar adición de productos - MEJORADO
    procesarProductos: (idUsuario, input) => {
        const estado = sistemaCotizacion.estado.get(idUsuario);
        
        // Verificar si el usuario quiere terminar de agregar productos
        if (sistemaCotizacion.esFinalizacionProductos(input)) {
            if (estado.productos.length === 0) {
                return {
                    tipo: "texto",
                    contenido: "📝 *Aún no has agregado productos.*\n\n¿Qué materiales necesitas? Puedes:\n• Elegir de las categorías\n• Decirme qué proyecto tienes\n• Describir los productos específicos"
                };
            }
            estado.estado = sistemaCotizacion.estados.CONFIRMANDO_INFORMACION;
            return sistemaCotizacion.solicitarConfirmacionFinal(estado);
        }

        // Extraer productos del mensaje - USANDO EL NUEVO MÉTODO MEJORADO
        const nuevosProductos = sistemaCotizacion.extraerProductosMejorado(input);
        
        if (nuevosProductos.length > 0) {
            // Combinar productos existentes con nuevos, evitando duplicados
            nuevosProductos.forEach(nuevoProducto => {
                const productoExistente = estado.productos.find(p => p.id === nuevoProducto.id);
                if (productoExistente) {
                    // Si ya existe, sumar la cantidad
                    productoExistente.cantidad += nuevoProducto.cantidad;
                } else {
                    // Si no existe, agregarlo
                    estado.productos.push(nuevoProducto);
                }
            });
            
            return {
                tipo: "texto",
                contenido: `✅ *Productos agregados correctamente*\n\n🛒 *Tu listado actual:*\n${sistemaCotizacion.generarResumenProductos(estado.productos)}\n\n¿Qué más necesitas? O escribe "LISTO" para continuar.`
            };
        } else {
            // No se detectaron productos, ofrecer ayuda contextual
            if (estado.contexto.tipoProyecto) {
                return sistemaCotizacion.sugerirProductosPorProyecto(estado.contexto.tipoProyecto);
            } else {
                return sistemaCotizacion.generarOpcionesProductos(estado);
            }
        }
    },

    // ==================== NUEVO MÉTODO MEJORADO PARA EXTRAER PRODUCTOS ====================
    extraerProductosMejorado: (texto) => {
        const productos = [];
        const textoLower = texto.toLowerCase().trim();
        
        console.log("🔍 Analizando texto para productos:", textoLower);
        
        // PATRONES MEJORADOS DE DETECCIÓN - MÁS COMPLETOS Y FLEXIBLES
        const patronesProductos = [
            // Reguladores de gas con diferentes patrones
            { 
                patron: /(\d+)?\s*regulador(?:\s*(?:gas|lp))?/gi, 
                producto: 'regulador_gas', 
                cantidadDefault: 1 
            },
            { 
                patron: /regulador\s*(?:de\s*)?gas/gi, 
                producto: 'regulador_gas', 
                cantidadDefault: 1 
            },
            
            // Mancueras con diferentes patrones
            { 
                patron: /(\d+)?\s*mancuera(?:\s*(?:gas))?/gi, 
                producto: 'mancuera_gas', 
                cantidadDefault: 1 
            },
            { 
                patron: /mancuera\s*(?:de\s*)?gas/gi, 
                producto: 'mancuera_gas', 
                cantidadDefault: 1 
            },
            
            // Tubos PVC con diferentes medidas
            { 
                patron: /(\d+)?\s*metros?\s*(?:de\s*)?tubo\s*(?:pvc\s*)?(?:\d\/\d)?/gi, 
                producto: 'pvc_1/2', 
                cantidadDefault: 1 
            },
            { 
                patron: /tubo\s*pvc/gi, 
                producto: 'pvc_1/2', 
                cantidadDefault: 1 
            },
            
            // Conexiones y accesorios
            { 
                patron: /(\d+)?\s*(?:codo|tee|uni[óo]n|adaptador)/gi, 
                producto: 'union_1/2', 
                cantidadDefault: 1 
            },
            { 
                patron: /conexiones?/gi, 
                producto: 'union_1/2', 
                cantidadDefault: 1 
            },
            
            // Válvulas
            { 
                patron: /(\d+)?\s*v[áa]lvula/gi, 
                producto: 'valvula_esfera_1/2', 
                cantidadDefault: 1 
            },
            
            // Tinacos y cisternas
            { 
                patron: /(\d+)?\s*tinaco/gi, 
                producto: 'tinaco_1100l', 
                cantidadDefault: 1 
            },
            { 
                patron: /(\d+)?\s*cisterna/gi, 
                producto: 'cisterna_2500l', 
                cantidadDefault: 1 
            },
            
            // Bombas
            { 
                patron: /(\d+)?\s*bomba/gi, 
                producto: 'bomba_1/2_hp', 
                cantidadDefault: 1 
            }
        ];

        // Buscar números al inicio de patrones
        const numeroMatch = textoLower.match(/^(\d+)\s*(.+)/);
        let cantidadGeneral = 1;
        let textoSinNumero = textoLower;
        
        if (numeroMatch) {
            cantidadGeneral = parseInt(numeroMatch[1]);
            textoSinNumero = numeroMatch[2];
        }

        // Buscar productos usando patrones mejorados
        for (const {patron, producto, cantidadDefault} of patronesProductos) {
            const matches = [...textoLower.matchAll(patron)];
            if (matches.length > 0) {
                console.log("✅ Encontrado:", producto, "en texto:", textoLower);
                
                // Intentar extraer cantidad específica del match
                let cantidad = cantidadDefault;
                const match = matches[0];
                if (match[1]) { // Si hay un número capturado en el grupo 1
                    cantidad = parseInt(match[1]);
                } else if (cantidadGeneral > 1) {
                    cantidad = cantidadGeneral;
                }
                
                // Verificar si el producto existe en el catálogo
                for (const [categoriaId, categoria] of Object.entries(sistemaCotizacion.categoriasProductos)) {
                    if (categoria.productos[producto]) {
                        productos.push({
                            id: producto,
                            nombre: categoria.productos[producto].nombre,
                            categoria: categoriaId,
                            cantidad: cantidad,
                            unidad: categoria.productos[producto].unidad,
                            especificaciones: {}
                        });
                        console.log("📦 Producto agregado:", producto, "cantidad:", cantidad);
                        break;
                    }
                }
            }
        }
        
        // Búsqueda por palabras clave específicas (como respaldo)
        const palabrasClave = {
            'regulador': {id: 'regulador_gas', cantidad: cantidadGeneral},
            'mancuera': {id: 'mancuera_gas', cantidad: cantidadGeneral},
            'tubo': {id: 'pvc_1/2', cantidad: cantidadGeneral},
            'tubería': {id: 'pvc_1/2', cantidad: cantidadGeneral},
            'tuberia': {id: 'pvc_1/2', cantidad: cantidadGeneral},
            'codo': {id: 'codo_90_1/2', cantidad: cantidadGeneral},
            'tee': {id: 'tee_1/2', cantidad: cantidadGeneral},
            'unión': {id: 'union_1/2', cantidad: cantidadGeneral},
            'union': {id: 'union_1/2', cantidad: cantidadGeneral},
            'adaptador': {id: 'adaptador_1/2', cantidad: cantidadGeneral},
            'válvula': {id: 'valvula_esfera_1/2', cantidad: cantidadGeneral},
            'valvula': {id: 'valvula_esfera_1/2', cantidad: cantidadGeneral},
            'tinaco': {id: 'tinaco_1100l', cantidad: cantidadGeneral},
            'cisterna': {id: 'cisterna_2500l', cantidad: cantidadGeneral},
            'bomba': {id: 'bomba_1/2_hp', cantidad: cantidadGeneral}
        };
        
        for (const [palabra, info] of Object.entries(palabrasClave)) {
            if (textoLower.includes(palabra) && !productos.some(p => p.id === info.id)) {
                for (const [categoriaId, categoria] of Object.entries(sistemaCotizacion.categoriasProductos)) {
                    if (categoria.productos[info.id]) {
                        productos.push({
                            id: info.id,
                            nombre: categoria.productos[info.id].nombre,
                            categoria: categoriaId,
                            cantidad: info.cantidad,
                            unidad: categoria.productos[info.id].unidad,
                            especificaciones: {}
                        });
                        console.log("🔍 Producto agregado por palabra clave:", info.id);
                        break;
                    }
                }
            }
        }
        
        console.log("🎯 Productos finales detectados:", productos);
        return productos;
    },

    // ==================== SISTEMA DE CORREO MEJORADO ====================
    procesarSolicitudContacto: (idUsuario, input) => {
        const estado = sistemaCotizacion.estado.get(idUsuario);
        
        // Si es la primera vez que entra a este estado, solicitar nombre
        if (!estado.datosContacto.nombre) {
            estado.datosContacto.nombre = input;
            return {
                tipo: "texto",
                contenido: `✅ *Nombre registrado:* ${input}\n\n📧 *Paso 2 de 3:* ¿Cuál es tu correo electrónico?`
            };
        }
        
        // Si ya tiene nombre pero no email, solicitar email
        if (estado.datosContacto.nombre && !estado.datosContacto.email) {
            // Validación básica de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input)) {
                return {
                    tipo: "texto",
                    contenido: "❌ *Correo inválido.* Por favor, ingresa un correo electrónico válido:"
                };
            }
            
            estado.datosContacto.email = input;
            return {
                tipo: "texto",
                contenido: `✅ *Correo registrado:* ${input}\n\n📱 *Paso 3 de 3:* ¿Cuál es tu número de teléfono?`
            };
        }
        
        // Si ya tiene nombre y email, solicitar teléfono
        if (estado.datosContacto.nombre && estado.datosContacto.email && !estado.datosContacto.telefono) {
            estado.datosContacto.telefono = input;
            estado.estado = sistemaCotizacion.estados.ENVIANDO_CORREO;
            
            // Enviar correo (simulado)
            return sistemaCotizacion.enviarCorreoCotizacion(idUsuario);
        }
        
        return sistemaCotizacion.generarErrorContacto();
    },

    procesarEnvioCorreo: (idUsuario, input) => {
        // Aquí procesaríamos la respuesta del usuario después del envío
        // Por ahora, simplemente finalizamos
        sistemaCotizacion.estado.delete(idUsuario);
        return {
            tipo: "texto",
            contenido: `🎉 *¡Cotización procesada exitosamente!*\n\n📋 *Resumen de tu solicitud:*\n• Productos: ${sistemaCotizacion.generarResumenProductos(sistemaCotizacion.estado.get(idUsuario)?.productos || [])}\n• Contacto: ${sistemaCotizacion.estado.get(idUsuario)?.datosContacto.nombre || 'No especificado'}\n\n💼 *Nuestro equipo te contactará en las próximas 24 horas.*\n\n¿Necesitas ayuda con algo más?`
        };
    },

    enviarCorreoCotizacion: (idUsuario) => {
        const estado = sistemaCotizacion.estado.get(idUsuario);
        
        // Simular envío de correo
        console.log('📧 Enviando correo de cotización:', {
            productos: estado.productos,
            contacto: estado.datosContacto,
            timestamp: new Date().toISOString()
        });
        
        // Aquí iría la lógica real de envío de correo
        // Por ahora, simulamos el envío
        
        return {
            tipo: "texto",
            contenido: `✅ *¡CORREO ENVIADO EXITOSAMENTE!*\n\n📨 *Se ha enviado tu cotización a:* ${estado.datosContacto.email}\n\n📋 *Resumen de tu cotización:*\n${sistemaCotizacion.generarResumenCompleto(estado)}\n\n👤 *Tus datos de contacto:*\n• Nombre: ${estado.datosContacto.nombre}\n• Email: ${estado.datosContacto.email}\n• Teléfono: ${estado.datosContacto.telefono}\n\n💼 *Nuestro equipo te contactará en las próximas 24 horas para confirmar precios y disponibilidad.*\n\n¿Necesitas hacer otra cotización o tienes alguna pregunta?`
        };
    },

    // ==================== MÉTODOS AUXILIARES MEJORADOS ====================
    generarResumenCompleto: (estado) => {
        let resumen = `🛒 *PRODUCTOS SOLICITADOS:*\n`;
        estado.productos.forEach((producto, index) => {
            resumen += `${index + 1}. ${producto.nombre} - ${producto.cantidad} ${producto.unidad}\n`;
        });
        
        if (estado.contexto.tipoProyecto) {
            resumen += `\n🏗️ *PROYECTO:* ${estado.contexto.tipoProyecto}\n`;
        }
        if (estado.contexto.descripcion) {
            resumen += `📝 *DESCRIPCIÓN:* ${estado.contexto.descripcion}\n`;
        }
        
        resumen += `\n📅 *FECHA DE SOLICITUD:* ${new Date().toLocaleDateString('es-MX')}`;
        
        return resumen;
    },

    solicitarConfirmacionFinal: (estado) => {
        return {
            tipo: "texto",
            contenido: `🎯 *CONFIRMACIÓN FINAL DE COTIZACIÓN*\n\n${sistemaCotizacion.generarResumenCompleto(estado)}\n\n¿Está correcta tu cotización? Responde "SÍ" para continuar o "NO" para modificar.`
        };
    },

    procesarConfirmacion: (idUsuario, input) => {
        const estado = sistemaCotizacion.estado.get(idUsuario);
        
        if (/(s[ií]|ok|correcto|listo|continuar)/i.test(input)) {
            estado.estado = sistemaCotizacion.estados.SOLICITANDO_CONTACTO;
            return {
                tipo: "texto",
                contenido: `✅ *¡Cotización confirmada!*\n\n👤 *Paso 1 de 3:* Para enviarte la cotización, necesito algunos datos:\n\n¿Cuál es tu nombre completo?`
            };
        } else if (/(no|corregir|modificar|cambiar)/i.test(input)) {
            estado.estado = sistemaCotizacion.estados.CAPTURANDO_PRODUCTOS;
            return {
                tipo: "texto",
                contenido: `🔄 *Vamos a modificar tu listado.*\n\n🛒 *Actualmente tienes:*\n${sistemaCotizacion.generarResumenProductos(estado.productos)}\n\n¿Qué quieres hacer?\n• Agregar más productos\n• Escribir "ELIMINAR [producto]" para quitar\n• Escribir "LISTO" para finalizar`
            };
        }
        
        return sistemaCotizacion.solicitarConfirmacionFinal(estado);
    },

    // ==================== MÉTODOS EXISTENTES ACTUALIZADOS ====================
    extraerProductos: (texto) => {
        // Método legacy - usar el nuevo extraerProductosMejorado
        return sistemaCotizacion.extraerProductosMejorado(texto);
    },

    generarOpcionesProductos: (estado) => {
        let mensaje = `🛒 *¿Qué productos necesitas para tu proyecto?*\n\n`;
        
        mensaje += `📋 *Tienes 3 opciones fáciles:*\n\n`;
        mensaje += `🔹 **1. CONTARME TU PROYECTO**\n`;
        mensaje += `   "necesito materiales para un baño"\n`;
        mensaje += `   "voy a instalar sistema de riego"\n`;
        mensaje += `   "requiero para cocina nueva"\n\n`;
        
        mensaje += `🔹 **2. MENCIONAR PRODUCTOS DIRECTOS**\n`;
        mensaje += `   "tubos pvc 1/2 y conexiones"\n`;
        mensaje += `   "tinaco 1100L + bomba 1/2 HP"\n`;
        mensaje += `   "10m tubo 3/4, 5 codos, 2 válvulas"\n\n`;
        
        mensaje += `🔹 **3. ELEGIR CATEGORÍA:*\n`;
        Object.entries(sistemaCotizacion.categoriasProductos).forEach(([id, categoria], index) => {
            mensaje += `   ${index + 1}. ${categoria.nombre}\n`;
        });
        
        mensaje += `\n💡 *Ejemplos que funcionan:*\n`;
        mensaje += `"Proyecto de baño con tubos 1/2"\n`;
        mensaje += `"Necesito 15m tubo pvc 1/2, 8 codos 90, 1 válvula"\n`;
        mensaje += `"Material para instalar tinaco y bomba"\n\n`;
        mensaje += `🛑 *¿Cambiaste de idea?* Escribe "cancelar"`;
        
        return { tipo: "texto", contenido: mensaje };
    },

    sugerirProductosPorProyecto: (proyecto) => {
        const sugerencias = {
            'baño': `🚽 *¡Perfecto! Para tu proyecto de BAÑO, te recomiendo:*\n\n📦 **PRODUCTOS ESENCIALES:**\n• Tubos PVC 1/2" para agua (15-20 metros)\n• Conexiones 1/2" (8-10 codos 90°, 4-5 tes)\n• Válvulas de paso 1/2" (2-3 piezas)\n• Tubería drenaje 3" (5-8 metros)\n• Conexiones drenaje 3" (4 codos, 2 tes)\n• Registro de acceso 4"\n\n💡 *Ejemplos fáciles:*\n"15m tubo 1/2, 8 codos, 2 válvulas, 5m drenaje 3"\n"Material completo para baño standard"\n"Necesito todo para instalar regadera y lavabo"\n\n🛒 *Escribe los productos que necesitas o "LISTO" para continuar:*`,
            
            'cocina': `🍳 *¡Excelente! Para tu COCINA, necesitarás:*\n\n📦 **PRODUCTOS CLAVE:**\n• Tubos PVC 1/2" agua fría/caliente (8-12 metros)\n• Conexiones para lavaplatos (4-6 codos, 2 tes)\n• Válvulas esféricas 1/2" (2-3 piezas)\n• Regulador de gas LP (1 pieza)\n• Mancuera para gas 1.5m (1 pieza)\n• Adaptadores y uniones\n\n💡 *Puedes decirme:*\n"Regulador gas + mancuera + tubos agua"\n"Material para instalar lavaplatos nuevo"\n"Necesito conexiones para cocina"\n\n🛒 *Menciona los productos o escribe "LISTO":*`,
            
            'jardín': `🌿 *¡Genial! Para JARDÍN/RIEGO, considera:*\n\n📦 **PRODUCTOS IDEALES:**\n• Tubos PVC 3/4" para riego (20-30 metros)\n• Conexiones para aspersores (6-8 codos, 4 tes)\n• Válvulas de control 3/4" (2-3 piezas)\n• Bomba de agua 1/2 HP (1 pieza)\n• Tinaco 1100L (opcional)\n• Reducciones y adaptadores\n\n💡 *Ejemplo práctico:*\n"Bomba 1/2 hp + 30m tubo 3/4 + válvulas"\n"Sistema riego para jardín mediano"\n\n🛒 *¿Qué productos específicos necesitas?*`
        };
        
        const mensaje = sugerencias[proyecto] || `🏗️ *Productos para ${proyecto}:*\n\n¿Qué materiales específicos necesitas? Puedes mencionarlos directamente.`;
        
        return {
            tipo: "texto", 
            contenido: mensaje
        };
    },

    // Comandos globales
    esComandoGlobal: (input) => {
        const comandos = ['ver listado', 'qué llevo', 'mostrar productos', 'eliminar', 'quitar', 'cancelar', 'empezar over'];
        return comandos.some(comando => input.includes(comando));
    },

    procesarComandoGlobal: (idUsuario, input) => {
        const estado = sistemaCotizacion.estado.get(idUsuario);
        
        if (input.includes('ver listado') || input.includes('qué llevo') || input.includes('mostrar productos')) {
            if (estado.productos.length === 0) {
                return { tipo: "texto", contenido: "📝 *Tu listado está vacío.*\n\nAgrega productos describiéndolos o eligiendo categorías." };
            }
            return {
                tipo: "texto",
                contenido: `🛒 *Tu listado actual:*\n\n${sistemaCotizacion.generarResumenProductos(estado.productos)}\n\n💡 *Puedes:*\n• Seguir agregando productos\n• Escribir "LISTO" para continuar\n• Escribir "ELIMINAR [producto]" para quitar algo`
            };
        }
        
        if (input.includes('eliminar') || input.includes('quitar')) {
            return sistemaCotizacion.procesarEliminacion(idUsuario, input);
        }
        
        if (input.includes('cancelar')) {
            sistemaCotizacion.estado.delete(idUsuario);
            return { tipo: "texto", contenido: "❌ *Cotización cancelada.* ¿En qué más puedo ayudarte?" };
        }
        
        if (input.includes('empezar over')) {
            sistemaCotizacion.estado.delete(idUsuario);
            return sistemaCotizacion.iniciar(idUsuario);
        }
        
        return null;
    },

    // Generar resumen de productos
    generarResumenProductos: (productos) => {
        if (productos.length === 0) return "📝 *Listado vacío*";
        
        let resumen = "";
        productos.forEach((producto, index) => {
            resumen += `${index + 1}. ${producto.nombre} - ${producto.cantidad} ${producto.unidad}\n`;
        });
        return resumen;
    },

    // Detectar finalización
    esFinalizacionProductos: (input) => {
        return /(listo|terminar|finalizar|ya está|eso es todo|continuar|siguiente)/i.test(input);
    },

    procesarEliminacion: (idUsuario, input) => {
        const estado = sistemaCotizacion.estado.get(idUsuario);
        const productos = estado.productos;
        
        if (productos.length === 0) {
            return { tipo: "texto", contenido: "📝 *No hay productos para eliminar.*" };
        }

        // Buscar producto a eliminar
        for (let i = 0; i < productos.length; i++) {
            if (input.toLowerCase().includes(productos[i].nombre.toLowerCase())) {
                const eliminado = productos.splice(i, 1)[0];
                return {
                    tipo: "texto",
                    contenido: `❌ *Eliminado:* ${eliminado.nombre}\n\n🛒 *Listado actual:*\n${sistemaCotizacion.generarResumenProductos(productos)}`
                };
            }
        }

        return {
            tipo: "texto",
            contenido: `❌ *No encontré ese producto.*\n\n🛒 *Tu listado:*\n${sistemaCotizacion.generarResumenProductos(productos)}\n\n💡 *Escribe "eliminar [nombre del producto]"*`
        };
    },

    finalizarCotizacion: (idUsuario) => {
        const estado = sistemaCotizacion.estado.get(idUsuario);
        
        const resumen = `🎉 *¡COTIZACIÓN COMPLETADA!*\n\n🛒 *Tu listado final:*\n${sistemaCotizacion.generarResumenProductos(estado.productos)}\n\n📧 *¿Qué deseas hacer ahora?*\n\n1. 📋 **VER DETALLES COMPLETOS**\n2. 📧 **ENVIAR POR CORREO** \n3. 💬 **CONTACTAR POR WHATSAPP**\n4. 🔄 **HACER OTRA COTIZACIÓN**\n\n*Responde con el número de tu elección:*`;

        // NO eliminar el estado aquí, ya que necesitamos los productos para el correo
        estado.estado = sistemaCotizacion.estados.CONFIRMANDO_INFORMACION;
        
        return {
            tipo: "texto",
            contenido: resumen
        };
    },

    generarErrorContacto: () => {
        return {
            tipo: "texto",
            contenido: "❌ *Error en el proceso de contacto.* Por favor, escribe 'cancelar' para empezar de nuevo."
        };
    },

    // ==================== FUNCIONES FALTANTES ACTUALIZADAS ====================
    generarMensajeInicial: () => {
        return {
            tipo: "texto",
            contenido: `📋 *¡Perfecto! Iniciemos tu cotización.*\n\n🛒 *¿Qué productos necesitas?*\n\n📋 *Puedes:*\n• **Describir tu proyecto** (ej: "necesito para un baño")\n• **Mencionar productos específicos** (ej: "tubos pvc 1/2 y conexiones")\n• **Escribir "ver categorías"** para ver opciones\n\n💡 *Ejemplos:*\n"Proyecto de baño con tubos 1/2"\n"Necesito 10m tubo pvc 1/2, 5 codos 90"\n"Material para sistema de riego"\n\n*También puedes escribir "cancelar" en cualquier momento.*`
        };
    },

    reiniciarFlujo: (idUsuario) => {
        return sistemaCotizacion.iniciar(idUsuario);
    },

    solicitarDetallesProductos: (estado) => {
        if (estado.productos.length === 0) {
            return {
                tipo: "texto",
                contenido: "📝 *Aún no has agregado productos.*\n\n¿Qué materiales necesitas?"
            };
        }
        
        return {
            tipo: "texto",
            contenido: `✅ *Productos agregados.* ¿Necesitas algo más?\n\n🛒 *Tu listado:*\n${sistemaCotizacion.generarResumenProductos(estado.productos)}\n\nEscribe "LISTO" para continuar o agrega más productos.`
        };
    },

    procesarEspecificaciones: (idUsuario, input) => {
        const estado = sistemaCotizacion.estado.get(idUsuario);
        // Por ahora, simplificamos y vamos a confirmación
        estado.estado = sistemaCotizacion.estados.CONFIRMANDO_INFORMACION;
        return sistemaCotizacion.procesarConfirmacion(idUsuario, input);
    }
};

// Detector de intención de cotización
sistemaCotizacion.detectarIntencionCotizacion = (input) => {
    const patrones = [
        /(cotizaci[óo]n|presupuesto|precio|cost[oó])/i,
        /(necesito|quiero|solicito).*(material|producto|tubo|tuber[ií]a|tinaco)/i,
        /(listado|lista|pedido|orden).*(producto|material)/i,
        /(envi[ae]r|mandar).*(correo|email)/i,
        /(agregar|añadir).*(producto|material)/i
    ];
    return patrones.some(patron => patron.test(input));
};

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

// ==================== RECOMENDACIÓN AVANZADA DE TUBERÍAS ====================
export const recomendarTuberiaAvanzado = async (input) => {
    const matchBaños = input.match(/(\d+)\s*baños?/i);
    const numBaños = matchBaños ? parseInt(matchBaños[1]) : 2;
    
    const recomendaciones = {
        'agua_fria': {
            titulo: "🚰 *SISTEMA DE AGUA FRÍA*",
            recomendaciones: [
                {
                    diametro: '1/2"',
                    aplicacion: "Baños individuales, lavabos",
                    caudal: "Hasta 15 LPM",
                    materiales: "PVC Schedule 40, CPVC"
                },
                {
                    diametro: '3/4"',
                    aplicacion: "2-3 baños, cocina",
                    caudal: "Hasta 30 LPM", 
                    materiales: "PVC Schedule 40, Cobre Tipo M"
                },
                {
                    diametro: '1"',
                    aplicacion: "4+ baños, sistema completo",
                    caudal: "Hasta 60 LPM",
                    materiales: "PVC Schedule 80, Cobre Tipo L"
                }
            ]
        },
        'drenaje': {
            titulo: "🚽 *SISTEMA DE DRENAJE*",
            recomendaciones: [
                {
                    diametro: '2"',
                    aplicacion: "Lavabos, regaderas, lavadoras",
                    capacidad: "Hasta 3 baños",
                    materiales: "PVC DWV, ABS"
                },
                {
                    diametro: '3"', 
                    aplicacion: "Inodoros, drenaje principal",
                    capacidad: "Hasta 6 baños",
                    materiales: "PVC DWV, ABS"
                },
                {
                    diametro: '4"',
                    aplicacion: "Drenaje principal edificios",
                    capacidad: "6+ baños",
                    materiales: "PVC DWV, Hierro Fundido"
                }
            ]
        }
    };

    let respuesta = `🔧 *RECOMENDACIONES TÉCNICAS DE TUBERÍAS* 🔧\n\n`;
    respuesta += `📊 *Para ${numBaños} baños:*\n\n`;

    Object.values(recomendaciones).forEach(sistema => {
        respuesta += `${sistema.titulo}\n\n`;
        sistema.recomendaciones.forEach(rec => {
            respuesta += `📏 *Diámetro ${rec.diametro}:*\n`;
            respuesta += `🎯 Aplicación: ${rec.aplicacion}\n`;
            respuesta += `💧 ${rec.caudal || rec.capacidad}\n`;
            respuesta += `🏭 Materiales: ${rec.materiales}\n\n`;
        });
    });

    respuesta += `💡 *CONSIDERACIONES TÉCNICAS:*\n`;
    respuesta += `• Presión mínima requerida: 2.0 kg/cm²\n`;
    respuesta += `• Velocidad máxima recomendada: 2.5 m/s\n`;
    respuesta += `• Pendiente drenaje: 2% mínimo\n`;
    respuesta += `• Juntas: Cemento solvente para PVC\n`;

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
        
        // === SISTEMA DE COTIZACIÓN MEJORADO ===
    
        // 1. Detectar inicio de cotización (ALTA PRIORIDAD)
        if ((/(cotizaci[óo]n|presupuesto|listado|pedido|materiales)/i.test(input) || 
             /(necesito|quiero|solicito).*(material|producto|tubo|tuber[ií]a|tinaco|cisterna|bomba|válvula|conexión)/i.test(input)) && 
            !sistemaCotizacion.estado.has(idUsuario)) {
            const respuesta = sistemaCotizacion.iniciar(idUsuario);
            gestionarContexto(idUsuario, mensaje, respuesta.contenido);
            return renderizarRespuestaEnChat(respuesta);
        }
        
        // 2. Procesar cotización existente (MÁXIMA PRIORIDAD)
        if (sistemaCotizacion.estado.has(idUsuario)) {
            const respuesta = sistemaCotizacion.procesar(idUsuario, mensaje);
            if (respuesta) {
                gestionarContexto(idUsuario, mensaje, respuesta.contenido);
                return renderizarRespuestaEnChat(respuesta);
            }
        }
        
        // 3. Detectar números para opciones de menú
        if (/^[1234]$/.test(input)) {
            const estado = sistemaCotizacion.estado.get(idUsuario);
            if (estado && estado.estado === sistemaCotizacion.estados.CONFIRMANDO_INFORMACION) {
                switch (input) {
                    case '1': // Ver detalles completos
                        return renderizarRespuestaEnChat({
                            tipo: "texto",
                            contenido: `📋 *DETALLES COMPLETOS DE TU COTIZACIÓN*\n\n${sistemaCotizacion.generarResumenCompleto(estado)}\n\n💡 *¿Qué deseas hacer?*\nEscribe "SÍ" para continuar con el envío o "NO" para modificar.`
                        });
                    case '2': // Enviar por correo
                        estado.estado = sistemaCotizacion.estados.SOLICITANDO_CONTACTO;
                        return renderizarRespuestaEnChat({
                            tipo: "texto",
                            contenido: `✅ *¡Excelente elección!*\n\n👤 *Paso 1 de 3:* Para enviarte la cotización, necesito algunos datos:\n\n¿Cuál es tu nombre completo?`
                        });
                    case '3': // Contactar por WhatsApp
                        return renderizarRespuestaEnChat({
                            tipo: "texto",
                            contenido: `💬 *CONTACTO POR WHATSAPP*\n\nPuedes contactarnos directamente al:\n📱 *+52 55 4322 5189*\n\n¡Estaremos encantados de atenderte! 🎯\n\n¿Necesitas algo más?`
                        });
                    case '4': // Hacer otra cotización
                        sistemaCotizacion.estado.delete(idUsuario);
                        return renderizarRespuestaEnChat(sistemaCotizacion.iniciar(idUsuario));
                }
            }
        }

        // 4. Detectar cancelación de flujo
        if (/(cancelar|detener|parar|no quiero|olvídalo)/i.test(input)) {
            const respuestaCancelacion = cancelarFlujo(idUsuario);
            if (respuestaCancelacion) {
                gestionarContexto(idUsuario, mensaje, respuestaCancelacion);
                return renderizarRespuestaEnChat({ tipo: "texto", contenido: respuestaCancelacion });
            }
        }
        
        // 5. Gestionar flujos conversacionales
        const respuestaFlujo = gestionarFlujoConversacional(idUsuario, mensaje);
        if (respuestaFlujo) {
            gestionarContexto(idUsuario, mensaje, respuestaFlujo);
            return renderizarRespuestaEnChat({ tipo: "texto", contenido: respuestaFlujo });
        }
        
        // 6. Verificar si es solicitud de recomendación técnica avanzada
        const recomendacionAvanzada = await sistemaRecomendacionAvanzado(mensaje);
        if (recomendacionAvanzada) {
            gestionarContexto(idUsuario, mensaje, recomendacionAvanzada.contenido);
            return renderizarRespuestaEnChat(recomendacionAvanzada);
        }
        
        // 7. Detectar saludos
        if (/(hola|buen|saludos|qué tal|buenas|hello|hi)/i.test(input)) {
            const contexto = obtenerContexto(idUsuario);
            const saludo = contexto.length > 0 
                ? "¡Hola de nuevo! ¿En qué más puedo ayudarte?"
                : knowledgeBase.saludos[Math.floor(Math.random() * knowledgeBase.saludos.length)];
            
            gestionarContexto(idUsuario, mensaje, saludo);
            return renderizarRespuestaEnChat({ tipo: "texto", contenido: saludo });
        }
        
        // 8. Detectar despedidas
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
        
        // 9. DETECTAR SI ES UNA PREGUNTA TÉCNICA QUE DEBE IR DIRECTAMENTE A LA IA
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
        
        // 10. PROCESAR LOCALMENTE (solo si no es pregunta técnica)
        const respuestaLocal = await procesarRespuestaLocal(mensaje);
        
        // 11. Si la respuesta local es genérica, consultar IAs
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

        // 12. Devolver respuesta local
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
        // Procesar texto para mejor visualización
        const contenidoFormateado = respuesta.contenido
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
            
        return `<div class="chat-response text-response">${contenidoFormateado}</div>`;
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
    console.log('🔍 Mejoras implementadas:');
    console.log('   - Sistema de detección de productos MEJORADO');
    console.log('   - Manejo de cantidades automático');
    console.log('   - Flujo de contacto completo (nombre, email, teléfono)');
    console.log('   - Confirmación de envío de correo');
    console.log('   - Eliminación de productos mejorada');
    console.log('   - Interfaz de usuario más clara');
    console.log('   - Sistema de recomendación técnica avanzada');
    console.log('   - Búsqueda de imágenes integrada');
};

// Inicializar automáticamente
inicializarChatbot();