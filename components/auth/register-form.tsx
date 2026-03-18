"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { OAuthButtons } from "./oauth-buttons";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  function checkStrength(value: string) {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    setPasswordStrength(score);
  }

  const strengthColors = ["bg-rust", "bg-[#8B6F5C]", "bg-moss", "bg-sage"];
  const strengthWidths = ["w-1/4", "w-1/2", "w-3/4", "w-full"];

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* Name row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs text-fog mb-1.5 tracking-wide">
            First name
          </label>
          <input
            type="text"
            placeholder="Elena"
            className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]"
          />
        </div>
        <div>
          <label className="block text-xs text-fog mb-1.5 tracking-wide">
            Last name
          </label>
          <input
            type="text"
            placeholder="Cross"
            className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-xs text-fog mb-1.5 tracking-wide">
          Email address
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]"
        />
      </div>

      <div className="flex gap-3">
        {/* Password */}
        <div className="mb-4 flex-1">
          <label className="block text-xs text-fog mb-1.5 tracking-wide">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              onInput={(e) =>
                checkStrength((e.target as HTMLInputElement).value)
              }
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
          {/* Strength bar */}
          <div className="h-[3px] bg-elevated rounded-sm mt-2 overflow-hidden">
            <div
              className={`h-full rounded-sm transition-all duration-300 ${
                passwordStrength > 0
                  ? `${strengthWidths[passwordStrength - 1]} ${strengthColors[passwordStrength - 1]}`
                  : "w-0"
              }`}
            />
          </div>
        </div>

        {/* Confirm password */}
        <div className="mb-4 flex-1">
          <label className="block text-xs text-fog mb-1.5 tracking-wide">
            Confirm password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]"
          />
        </div>
      </div>

      {/* Terms checkbox */}
      <label className="flex items-center gap-2 text-[13px] font-light text-fog cursor-pointer mt-1">
        <input type="checkbox" className="sr-only peer" />
        <span className="w-4 h-4 bg-input border border-border-mid rounded flex items-center justify-center shrink-0 peer-checked:border-border-active peer-checked:bg-amber/15" />
        <span>
          I agree to the{" "}
          <a
            href="#"
            className="text-amber-dim hover:text-amber transition-colors"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-amber-dim hover:text-amber transition-colors"
          >
            Privacy Policy
          </a>
        </span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="w-full h-[46px] bg-amber text-canvas rounded-[10px] text-[15px] font-medium mt-6 cursor-pointer hover:bg-[#D4B87C] active:scale-[0.97] transition-all tracking-wide"
      >
        Create account
      </button>

      <OAuthButtons />
    </form>
  );
}
