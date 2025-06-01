// src/scripts/busSocketClient.js
import { io } from 'https://cdn.socket.io/4.8.1/socket.io.esm.min.js';

// Esto asegurará que solo se cree una conexión WebSocket.
let socket;
const subscribers = {}; // Almacena callbacks para cada stopId

export function getSocket() {
    if (!socket) {
        socket = io('http://localhost:4322');

        socket.on("connect", () => {
            console.log("Conectado al servidor Socket.IO");
            // Cuando nos conectamos o reconectamos, solicitamos datos para todos los suscriptores
            Object.keys(subscribers).forEach(stopId => {
                socket.emit("BusStop", { stopId: Number(stopId) });
            });
        });

        socket.on("connect_error", (err) => {
            console.error("Error al conectar al servidor Socket.IO:", err.message);
        });

        socket.on("BusStop", (data) => {
            if (data && data.stopId && subscribers[data.stopId]) {
                // Notifica solo a los suscriptores interesados en este stopId
                subscribers[data.stopId](data.incomingBuses);
            }
        });

        // Configura un intervalo para pedir actualizaciones para todos los stopIds suscritos
        setInterval(() => {
            Object.keys(subscribers).forEach(stopId => {
                if (socket.connected) {
                    socket.emit("BusStop", { stopId: Number(stopId) });
                }
            });
        }, 25000);
    }
    return socket;
}

// Función para que los componentes se "suscriban" a un stopId específico
export function subscribeToBusStop(stopId, callback) {
    if (!subscribers[stopId]) {
        subscribers[stopId] = callback;
        // Si es la primera vez que se suscribe a este stopId, pídelo al servidor
        if (socket && socket.connected) {
            socket.emit("BusStop", { stopId: Number(stopId) });
        }
    } else {
        // Si ya hay un suscriptor, reemplázalo (o maneja múltiples callbacks si es necesario)
        subscribers[stopId] = callback;
    }
}

// Función para que los componentes se "desuscriban" (opcional, pero buena práctica)
export function unsubscribeFromBusStop(stopId) {
    delete subscribers[stopId];
}