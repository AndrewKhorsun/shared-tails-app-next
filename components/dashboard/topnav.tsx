import { logout } from "@/lib/actions/auth";
import { User } from "@/types/auth";

export function TopNav({ user }: { user: User }) {
  return (
    <nav className="w-full h-16 bg-surface flex items-center justify-between px-6">
      <span>Shared Tales</span>
      <div className="flex items-center gap-4">
        <span className="text-sm text-fog">
          {user.first_name} {user.last_name}
        </span>
        <form action={logout}>
          <button className="text-sm text-amber-dim hover:text-amber transition-colors">
            Sign out
          </button>
        </form>
      </div>
    </nav>
  );
}
