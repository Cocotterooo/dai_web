// src/scripts/busSocketClient.js
import { io } from 'https://cdn.socket.io/4.8.1/socket.io.esm.min.js';

// Esto asegurará que solo se cree una conexión WebSocket.
let socket;
const subscribers = {}; // Almacena callbacks para cada stopId

// Función para determinar la URL del socket según el entorno
function getSocketUrl() {
    // Si estamos en desarrollo (localhost), usar la IP local
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://192.168.1.132:4322';
    }
    
    // En producción, primero intentar la variable de entorno
    if (import.meta.env.PUBLIC_SOCKET_URL) {
        return import.meta.env.PUBLIC_SOCKET_URL;
    }
    
    // Como fallback, usar el mismo dominio con puerto 4322
    // Esto funciona si el socket server está en el mismo dominio
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const fallbackUrl = `${protocol}//${window.location.hostname}:4322`;
    
    console.warn('⚠️ No se encontró PUBLIC_SOCKET_URL, usando fallback:', fallbackUrl);
    return fallbackUrl;
}

// Función para intentar múltiples URLs de conexión
function createSocketWithFallback() {
    const primaryUrl = getSocketUrl();
    const fallbackUrls = [
        primaryUrl,
        // Intentar también con HTTP/WS si HTTPS/WSS falla
        primaryUrl.replace('wss:', 'ws:').replace('https:', 'http:'),
        // Intentar sin puerto específico (por si hay proxy)
        `${window.location.protocol}//${window.location.hostname}/socket.io/`,
    ];

    console.log('� Intentando conectar a:', fallbackUrls);

    return io(primaryUrl, {
        // Configuraciones para mejor compatibilidad
        transports: ['websocket', 'polling'],
        timeout: 20000,
        forceNew: true,
        upgrade: true,
        rememberUpgrade: false,
    });
}

export function getSocket() {
    if (!socket) {
        socket = createSocketWithFallback();

        socket.on("connect", () => {
            console.log("✅ Conectado al servidor Socket.IO");
            console.log(`🔗 URL conectada: ${socket.io.uri}`);
            // Cuando nos conectamos o reconectamos, solicitamos datos para todos los suscriptores
            Object.keys(subscribers).forEach(stopId => {
                socket.emit("BusStop", { stopId: Number(stopId) });
            });
        });

        socket.on("connect_error", (err) => {
            console.error("❌ Error de conexión:", err.message);
            console.error(`🔧 URL intentada: ${socket.io.uri}`);
            console.error("🌐 Hostname actual:", window.location.hostname);
            console.error("📍 Protocolo:", window.location.protocol);
            console.error("🔍 Error completo:", err);
        });

        socket.on("disconnect", (reason) => {
            console.warn("⚠️ Desconectado del socket:", reason);
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