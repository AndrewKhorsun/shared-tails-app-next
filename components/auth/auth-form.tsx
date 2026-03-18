"use client";

import { useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export function AuthForm() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

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

      {/* Forms */}
      {isLogin ? <LoginForm /> : <RegisterForm />}

      {/* Bottom text */}
      <p className="text-center text-[13px] font-light text-fog mt-6">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              onClick={() => setActiveTab("register")}
              className="text-amber-dim hover:text-amber transition-colors cursor-pointer"
            >
              Create one
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setActiveTab("login")}
              className="text-amber-dim hover:text-amber transition-colors cursor-pointer"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}
