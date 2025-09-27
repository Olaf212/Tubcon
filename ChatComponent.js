// ChatComponent.js
import React, { useState } from 'react';
import { useChat } from './ChatContext';

// Función para generar un ID de sesión único
function generarIdSesion() {
    return 'user-' + Math.random().toString(36).substr(2, 9); // Generar un ID único
}

const ChatComponent = () => {
    const [mensaje, setMensaje] = useState('');
    const { contextosDeConversacion, agregarMensaje } = useChat();

    // ID de sesión del usuario (en este caso, lo generamos cuando el componente se monta)
    const idUsuario = generarIdSesion();

    // Manejar el envío del mensaje
    const enviarMensaje = async () => {
        if (!mensaje) return;

        // 1. Agregar el mensaje del usuario al contexto
        agregarMensaje(idUsuario, mensaje, true);

        // 2. Procesar el mensaje y obtener la respuesta del bot (aquí lo simularemos)
        const respuestaBot = await procesarMensajeBot(mensaje, idUsuario);

        // 3. Agregar la respuesta del bot al contexto
        agregarMensaje(idUsuario, respuestaBot, false);

        // Limpiar el campo de mensaje
        setMensaje('');
    };

    // Función para procesar el mensaje del bot (puedes integrar Gemini o Wit.ai aquí)
    const procesarMensajeBot = async (mensaje, idUsuario) => {
        // Aquí puedes incluir la lógica de IA para obtener la respuesta real
        // Por ahora, vamos a devolver una respuesta genérica
        const respuesta = `Bot: Este es un mensaje procesado para "${mensaje}"`;
        return respuesta;
    };

    return (
        <div>
            <h1>Chatbot</h1>
            <div className="chat-box">
                {/* Mostrar el historial de la conversación */}
                <div className="messages">
                    {contextosDeConversacion[idUsuario] &&
                        contextosDeConversacion[idUsuario].map((msg, index) => (
                            <div key={index}>
                                {msg.usuario ? (
                                    <p><strong>Usuario:</strong> {msg.usuario}</p>
                                ) : (
                                    <p><strong>Bot:</strong> {msg.bot}</p>
                                )}
                            </div>
                        ))}
                </div>

                {/* Entrada de mensaje */}
                <input
                    type="text"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                />
                <button onClick={enviarMensaje}>Enviar</button>
            </div>
        </div>
    );
};

export default ChatComponent;
