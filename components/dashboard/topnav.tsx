"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { User } from "@/types/auth";
import { ProfileDropdown } from "./profile-dropdown";

export function TopNav({ user }: { user: User }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname.includes(href);
  };

  const initials = `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase();

  return (
    <nav className="w-full h-[52px] bg-page border-b border-border-soft flex items-center justify-between px-6">
      <Link href="/books" className="font-serif text-amber text-[22px] tracking-[0.02em]">
        Shared Tales
      </Link>

      <div className="flex items-center gap-3">
        <Link
          href="/books"
          className={`text-sm rounded-lg px-3 py-1.5 transition-colors ${
            isActive("/books")
              ? "bg-surface text-parchment font-medium"
              : "text-fog hover:text-parchment"
          }`}
        >
          My Books
        </Link>

        <Link
          href="/profile"
          className={`text-sm rounded-lg px-3 py-1.5 transition-colors ${
            isActive("/profile")
              ? "bg-surface text-parchment font-medium"
              : "text-fog hover:text-parchment"
          }`}
        >
          Profile
        </Link>

        <div className="w-px h-5 bg-border-soft mx-1" />

        <ProfileDropdown
          user={user}
          trigger={
            <div className="w-[30px] h-[30px] rounded-full bg-amber-dim flex items-center justify-center font-serif text-[13px] text-parchment cursor-pointer">
              {initials}
            </div>
          }
        />
      </div>
    </nav>
  );
}
