"use client";

import { useEffect } from "react";
import { initSocket } from "@/lib/socket";

export function useSocket(userId: number) {
  const socket = initSocket();
  useEffect(() => {
    socket.connect();
    socket.emit("join", String(userId));

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return socket;
}
