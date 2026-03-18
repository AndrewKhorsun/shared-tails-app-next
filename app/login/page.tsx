import { BookOpen } from "lucide-react";
import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  const features = [
    "AI agents that think, outline, and write",
    "Real-time collaboration with co-authors",
    "Every chapter, your voice",
    "From concept to finished manuscript",
  ];

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-[45%] bg-canvas border-r border-border-soft flex-col items-center justify-center p-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(107,140,122,0.07)_0%,transparent_70%)] pointer-events-none" />

        <div className="flex items-center gap-2.5 mb-12 relative z-10">
          <BookOpen className="w-8 h-8 text-sage" strokeWidth={1.2} />
          <span className="font-sans text-base font-medium text-parchment tracking-wide">
            Shared Tails
          </span>
        </div>

        <div className="text-center relative z-10">
          <p className="font-serif italic text-[26px] leading-snug text-parchment mb-4 max-w-[340px]">
            Write your book the way it deserves to be written
          </p>
          <p className="text-sm font-light text-fog leading-relaxed max-w-[300px] mx-auto mb-12">
            AI agents collaborate with you — planning, drafting, editing — while
            your voice stays at the center.
          </p>

          <ul className="text-left inline-block space-y-2.5">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-[13px] font-light text-fog"
              >
                <span className="w-[5px] h-[5px] rounded-full bg-sage shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 bg-page flex items-center justify-center p-10">
        <AuthForm />
      </div>
    </div>
  );
}
