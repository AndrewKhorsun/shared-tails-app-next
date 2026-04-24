"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon: LucideIcon;
}

export function NavLink({ href, children, icon: Icon }: NavLinkProps) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <Tooltip content={String(children)}>
      <Link
        href={href}
        className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg hover:bg-elevated transition-colors ${isActive ? "text-amber" : "text-fog"}`}
      >
        <Icon size={14} className="shrink-0" />
        <span className="hidden sm:inline">{children}</span>
      </Link>
    </Tooltip>
  );
}
