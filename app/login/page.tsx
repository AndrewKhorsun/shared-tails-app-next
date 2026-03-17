import { AuthForm } from "./auth-form";

/*
  Server Component — no "use client" at the top.
  The left branding panel is pure static HTML.
  Zero JS sent to the browser for this part.
*/
export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — static branding, rendered on server only */}
      <div className="hidden md:flex w-[45%] bg-canvas border-r border-border-soft flex-col items-center justify-center p-14 relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(107,140,122,0.07)_0%,transparent_70%)] pointer-events-none" />

        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-12 relative z-10">
          <svg className="w-8 h-8 text-sage" viewBox="0 0 32 32" fill="none">
            <path d="M16 4C16 4 8 8 8 16C8 24 16 28 16 28C16 28 24 24 24 16C24 8 16 4 16 4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            <path d="M16 4L16 28M8 12H24M8 20H24" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
          </svg>
          <span className="font-sans text-base font-medium text-parchment tracking-wide">
            Book Architect
          </span>
        </div>

        {/* Tagline */}
        <div className="text-center relative z-10">
          <p className="font-serif italic text-[26px] leading-snug text-parchment mb-4 max-w-[340px]">
            Write your book the way it deserves to be written
          </p>
          <p className="text-sm font-light text-fog leading-relaxed max-w-[300px] mx-auto mb-12">
            AI agents collaborate with you — planning, drafting, editing — while your voice stays at the center.
          </p>

          {/* Features list */}
          <ul className="text-left inline-block space-y-2.5">
            {[
              "AI agents that think, outline, and write",
              "Real-time collaboration with co-authors",
              "Every chapter, your voice",
              "From concept to finished manuscript",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2.5 text-[13px] font-light text-fog">
                <span className="w-[5px] h-[5px] rounded-full bg-sage shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative book SVG */}
        <svg className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-[0.08]" width="280" height="200" viewBox="0 0 280 200" fill="none">
          <path d="M140 20 L20 60 L20 180 L140 140 L260 180 L260 60 Z" stroke="#9DB898" strokeWidth="0.8"/>
          <path d="M140 20 L140 140" stroke="#9DB898" strokeWidth="0.8"/>
          <path d="M40 70 L120 50" stroke="#9DB898" strokeWidth="0.5" opacity="0.6"/>
          <path d="M40 85 L120 65" stroke="#9DB898" strokeWidth="0.5" opacity="0.6"/>
          <path d="M40 100 L120 80" stroke="#9DB898" strokeWidth="0.5" opacity="0.6"/>
          <path d="M40 115 L120 95" stroke="#9DB898" strokeWidth="0.5" opacity="0.6"/>
          <path d="M160 50 L240 70" stroke="#9DB898" strokeWidth="0.5" opacity="0.6"/>
          <path d="M160 65 L240 85" stroke="#9DB898" strokeWidth="0.5" opacity="0.6"/>
          <path d="M160 80 L240 100" stroke="#9DB898" strokeWidth="0.5" opacity="0.6"/>
          <path d="M160 95 L240 115" stroke="#9DB898" strokeWidth="0.5" opacity="0.6"/>
        </svg>
      </div>

      {/* Right panel — interactive form (Client Component) */}
      <div className="flex-1 bg-page flex items-center justify-center p-10">
        <AuthForm />
      </div>
    </div>
  );
}
