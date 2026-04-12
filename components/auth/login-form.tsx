"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Check } from "lucide-react";
import { OAuthButtons } from "./oauth-buttons";
import { api } from "@/lib/api";
import type { AuthResponse } from "@/types";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: apiError } = await api.post<AuthResponse>(
      "/api/auth/login",
      { email, password }
    );

    setLoading(false);

    if (apiError) {
      setError(apiError);
      return;
    }

    router.push("/books");
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-rust/10 border border-rust/30 text-sm text-rust">
          {error}
        </div>
      )}

      {/* Email */}
      <div className="mb-4">
        <label className="block text-xs text-fog mb-1.5 tracking-wide">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]"
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-xs text-fog mb-1.5 tracking-wide">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 pr-10 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-fog p-1 cursor-pointer"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* Remember me + Forgot */}
      <div className="flex justify-between items-center mt-3">
        <label className="flex items-center gap-2 text-[13px] font-light text-fog cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <span className="w-4 h-4 bg-input border border-border-mid rounded flex items-center justify-center shrink-0 peer-checked:border-border-active peer-checked:bg-amber/15">
            <Check size={10} className="hidden peer-checked:block text-amber" strokeWidth={2} />
          </span>
          Remember me
        </label>
        <a href="#" className="text-xs font-light text-amber-dim hover:text-amber transition-colors">
          Forgot password?
        </a>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-11.5 bg-amber text-canvas rounded-[10px] text-[15px] font-medium mt-6 cursor-pointer hover:bg-[#D4B87C] active:scale-[0.97] transition-all tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <OAuthButtons />
    </form>
  );
}
