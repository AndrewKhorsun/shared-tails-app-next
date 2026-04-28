import { User } from "@/types/auth";
import { ProfileDropdown } from "./profile-dropdown";

export function TopNav({ user }: { user: User }) {
  return (
    <nav className="w-full h-16 bg-canvas border-b border-border-soft flex items-center justify-between px-6">
      <span className="font-serif text-amber tracking-wide">Shared Tales</span>
      <ProfileDropdown user={user} />
    </nav>
  );
}
