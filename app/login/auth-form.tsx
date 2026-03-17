"use client";

/*
  "use client" — this component runs in the browser.
  We need it because of: useState, onClick handlers, onSubmit, onInput.
  Without "use client", React would try to run this on the server
  and crash on useState.
*/

import { useState } from "react";

export function AuthForm() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegPass, setShowRegPass] = useState(false);
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

  const isLogin = activeTab === "login";

  return (
    <div className="w-full max-w-[380px] animate-[fadeUp_0.5s_cubic-bezier(0.22,1,0.36,1)_both]">
      {/* Title */}
      <h1 className="font-serif text-[28px] text-parchment mb-1.5">
        {isLogin ? "Welcome back" : "Start writing"}
      </h1>
      <p className="text-sm font-light text-fog mb-8 leading-normal">
        {isLogin
          ? "Sign in to continue your story."
          : "Create your account and begin your first book."}
      </p>

      {/* Tab switcher */}
      <div className="flex bg-surface rounded-xl p-1 mb-8 relative">
        {/* Sliding indicator */}
        <div
          className={`absolute top-1 left-1 w-[calc(50%-4px)] h-9 bg-elevated rounded-lg transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            !isLogin ? "translate-x-[calc(100%+4px)]" : ""
          }`}
        />
        <button
          onClick={() => setActiveTab("login")}
          className={`flex-1 h-9 rounded-lg text-sm relative z-10 transition-colors cursor-pointer ${
            isLogin ? "text-parchment font-medium" : "text-fog font-light"
          }`}
        >
          Sign in
        </button>
        <button
          onClick={() => setActiveTab("register")}
          className={`flex-1 h-9 rounded-lg text-sm relative z-10 transition-colors cursor-pointer ${
            !isLogin ? "text-parchment font-medium" : "text-fog font-light"
          }`}
        >
          Create account
        </button>
      </div>

      {/* Login form */}
      {isLogin && (
        <form onSubmit={(e) => e.preventDefault()}>
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

          {/* Password */}
          <div className="mb-4">
            <label className="block text-xs text-fog mb-1.5 tracking-wide">
              Password
            </label>
            <div className="relative">
              <input
                type={showLoginPass ? "text" : "password"}
                placeholder="••••••••"
                className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 pr-10 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]"
              />
              <button
                type="button"
                onClick={() => setShowLoginPass(!showLoginPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-fog p-1 cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Remember me + Forgot */}
          <div className="flex justify-between items-center mt-3">
            <label className="flex items-center gap-2 text-[13px] font-light text-fog cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <span className="w-4 h-4 bg-input border border-border-mid rounded flex items-center justify-center shrink-0 peer-checked:border-border-active peer-checked:bg-amber/15">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="hidden peer-checked:block">
                  <path d="M1 4L3.5 6.5L9 1" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
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
            className="w-full h-[46px] bg-amber text-canvas rounded-[10px] text-[15px] font-medium mt-6 cursor-pointer hover:bg-[#D4B87C] active:scale-[0.97] transition-all tracking-wide"
          >
            Sign in
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border-soft" />
            <span className="text-xs text-fog font-light">or</span>
            <div className="flex-1 h-px bg-border-soft" />
          </div>

          {/* OAuth */}
          <button
            type="button"
            className="w-full h-11 bg-elevated border border-border-mid rounded-[10px] text-sm text-parchment flex items-center justify-center gap-2.5 cursor-pointer hover:border-border-active hover:bg-[#344130] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </form>
      )}

      {/* Register form */}
      {!isLogin && (
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Name row */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs text-fog mb-1.5 tracking-wide">First name</label>
              <input
                type="text"
                placeholder="Elena"
                className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]"
              />
            </div>
            <div>
              <label className="block text-xs text-fog mb-1.5 tracking-wide">Last name</label>
              <input
                type="text"
                placeholder="Cross"
                className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs text-fog mb-1.5 tracking-wide">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-xs text-fog mb-1.5 tracking-wide">Password</label>
            <div className="relative">
              <input
                type={showRegPass ? "text" : "password"}
                placeholder="••••••••"
                onInput={(e) => checkStrength((e.target as HTMLInputElement).value)}
                className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 pr-10 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]"
              />
              <button
                type="button"
                onClick={() => setShowRegPass(!showRegPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-fog p-1 cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
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
          <div className="mb-4">
            <label className="block text-xs text-fog mb-1.5 tracking-wide">Confirm password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]"
            />
          </div>

          {/* Terms checkbox */}
          <label className="flex items-center gap-2 text-[13px] font-light text-fog cursor-pointer mt-1">
            <input type="checkbox" className="sr-only peer" />
            <span className="w-4 h-4 bg-input border border-border-mid rounded flex items-center justify-center shrink-0 peer-checked:border-border-active peer-checked:bg-amber/15" />
            <span>
              I agree to the{" "}
              <a href="#" className="text-amber-dim hover:text-amber transition-colors">Terms</a>
              {" "}and{" "}
              <a href="#" className="text-amber-dim hover:text-amber transition-colors">Privacy Policy</a>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-[46px] bg-amber text-canvas rounded-[10px] text-[15px] font-medium mt-6 cursor-pointer hover:bg-[#D4B87C] active:scale-[0.97] transition-all tracking-wide"
          >
            Create account
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border-soft" />
            <span className="text-xs text-fog font-light">or</span>
            <div className="flex-1 h-px bg-border-soft" />
          </div>

          {/* OAuth */}
          <button
            type="button"
            className="w-full h-11 bg-elevated border border-border-mid rounded-[10px] text-sm text-parchment flex items-center justify-center gap-2.5 cursor-pointer hover:border-border-active hover:bg-[#344130] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </form>
      )}

      {/* Bottom text */}
      <p className="text-center text-[13px] font-light text-fog mt-6">
        {isLogin ? (
          <>Don&apos;t have an account?{" "}
            <button onClick={() => setActiveTab("register")} className="text-amber-dim hover:text-amber transition-colors cursor-pointer">
              Create one
            </button>
          </>
        ) : (
          <>Already have an account?{" "}
            <button onClick={() => setActiveTab("login")} className="text-amber-dim hover:text-amber transition-colors cursor-pointer">
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}
