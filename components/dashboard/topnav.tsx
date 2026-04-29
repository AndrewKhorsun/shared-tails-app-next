import { getTranslations } from "next-intl/server";
import { User } from "@/types/auth";
import { ProfileDropdown } from "./profile-dropdown";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";

export async function TopNav({ user }: { user: User }) {
  const t = await getTranslations("TopNav");

  return (
    <nav className="w-full h-16 bg-canvas border-b border-border-soft flex items-center justify-between px-6">
      <span className="font-serif text-amber tracking-wide">{t("brandName")}</span>
      <div className="flex items-center gap-4">
        <LocaleSwitcher />
        <ProfileDropdown user={user} />
      </div>
    </nav>
  );
}
