"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSidebar() {
  const path = usePathname();
  const isActiveLink = (href: string) =>
    path === href ? "text-amber" : "text-fog";

  return (
    <div className="flex flex-col">
      <Link href="/books" className={isActiveLink("/books")}>
        Books
      </Link>
      <Link href="/profile" className={isActiveLink("/profile")}>
        Profile
      </Link>
    </div>
  );
}
