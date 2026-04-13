"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <Link
      href={href}
      className={`text-sm py-1.5 px-2 rounded-lg hover:bg-elevated transition-colors ${isActive ? "text-amber" : "text-fog"}`}
    >
      {children}
    </Link>
  );
}
