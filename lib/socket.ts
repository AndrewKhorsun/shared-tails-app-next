import { io, Socket } from "socket.io-client";
import { config } from "./config";

let socket: Socket | null = null;

export function initSocket(): Socket {
  if (!socket) {
    socket = io(config.socket.url, {
      autoConnect: false,
      transports: ["websocket"],
    });
  }
  return socket;
}

export function getSocket(): Socket | null {
  return socket;
}

export function resetSocket(): void {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
}
