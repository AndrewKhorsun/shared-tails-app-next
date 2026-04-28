"use client";

import { useSocket } from "@/hooks/useSocket";

export function SocketProvider({
  userId,
  children,
}: {
  userId: number;
  children: React.ReactNode;
}) {
  useSocket(userId);
  return <>{children}</>;
}
