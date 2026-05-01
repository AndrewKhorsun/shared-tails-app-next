"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { User, LogOut } from "lucide-react";
import { logout } from "@/lib/actions/auth";
import { User as UserType } from "@/types/auth";

export function ProfileDropdown({ user, trigger }: { user: UserType; trigger?: ReactNode }) {
  const t = useTranslations("ProfileDropdown");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {trigger ? (
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-center"
        >
          {trigger}
        </button>
      ) : (
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 text-sm text-fog hover:text-parchment transition-colors"
        >
          <span>
            {user.first_name} {user.last_name}
          </span>
        </button>
      )}

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-surface border border-border-soft rounded-lg shadow-lg overflow-hidden z-50">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-fog hover:text-parchment hover:bg-elevated transition-colors"
          >
            <User size={14} />
            {t("profile")}
          </Link>
          <div className="border-t border-border-soft" />
          <form action={logout}>
            <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-amber-dim hover:text-amber hover:bg-elevated transition-colors">
              <LogOut size={14} />
              {t("signOut")}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
