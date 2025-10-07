import { io } from "socket.io-client";
import { ref, onUnmounted } from "vue";

export function useSocket(url = "http://localhost:3000") {
    //cria conexão com o servidor
    const socket = io(url, {
        autoConnect: false, //não conecta automaticamente
        transports: ['websocket'] //força o uso de websocket
    })

    const connected = ref(false)

    const connect = () => {
        socket.connect()
    }

    const disconnect = () => {
        socket.disconnect()
    }

    socket.on("connect", () => {
        connected.value = true
        console.log("Conectado ao servidor de WebSocket")
    })

    socket.on("disconnect", () => {
        connected.value = false
        console.log("Desconectado do servidor de WebSocket")
    })

    // Exemplo: ouvir mensagens de um canal “agendamentos”
    const listen = (event, callback) => {
        socket.on(event, callback)
    }

    const emit = (event, data) => {
        socket.emit(event, data)
    }

    // Limpa listeners ao desmontar componente
    onUnmounted(() => {
        socket.removeAllListeners()
    })

    return { socket, connect, disconnect, emit, listen, connected }

}