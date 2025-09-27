// ChatContext.js
import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
const ChatContext = createContext();

// Proveedor del contexto
export const ChatProvider = ({ children }) => {
    // Estado para almacenar el contexto de las conversaciones
    const [contextosDeConversacion, setContextosDeConversacion] = useState({});

    // Función para agregar mensajes al contexto de un usuario
    const agregarMensaje = (idUsuario, mensaje, esUsuario) => {
        setContextosDeConversacion((prevContextos) => {
            const nuevoContexto = prevContextos[idUsuario] || [];
            nuevoContexto.push({ [esUsuario ? 'usuario' : 'bot']: mensaje });

            return {
                ...prevContextos,
                [idUsuario]: nuevoContexto,
            };
        });
    };

    return (
        <ChatContext.Provider value={{ contextosDeConversacion, agregarMensaje }}>
            {children}
        </ChatContext.Provider>
    );
};

// Hook para usar el contexto
export const useChat = () => {
    return useContext(ChatContext);
};
