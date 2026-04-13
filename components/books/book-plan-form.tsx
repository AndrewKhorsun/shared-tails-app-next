"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createBookPlanSchema,
  type CreateBookPlanDto,
} from "@/lib/validations/book-plan.schema";
import { upperCaseFirstLetter } from "@/lib/utils";
import { BookPlan } from "@/types";
import { api } from "@/lib/api";

const LANGUAGES = createBookPlanSchema.shape.language.options;

interface BookPlanFormProps {
  bookId: number;
  existingPlan?: BookPlan;
}

export function BookPlanForm({ bookId, existingPlan }: BookPlanFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBookPlanDto>({
    resolver: zodResolver(createBookPlanSchema),
    defaultValues: existingPlan
      ? {
          genre: existingPlan.genre,
          target_audience: existingPlan.target_audience,
          writing_style: existingPlan.writing_style,
          language: existingPlan.language,
          generation_settings: existingPlan.generation_settings,
        }
      : undefined,
  });

  async function onSubmit(data: CreateBookPlanDto) {
    const method = existingPlan ? "put" : "post";
    await api[method](`/api/books/${bookId}/plan`, data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-lg font-medium text-parchment">Main</h2>

      {/* Genre */}
      <div>
        <label className="block text-xs text-fog mb-1.5 tracking-wide">
          Genre
        </label>
        <input
          {...register("genre")}
          placeholder="e.g. Fantasy, Thriller, Romance"
          className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]"
        />
        {errors.genre && (
          <p className="mt-1.5 text-xs text-rust">{errors.genre.message}</p>
        )}
      </div>

      {/* Target audience */}
      <div>
        <label className="block text-xs text-fog mb-1.5 tracking-wide">
          Target audience
        </label>
        <input
          {...register("target_audience")}
          placeholder="e.g. Young adults, Children 8-12"
          className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]"
        />
        {errors.target_audience && (
          <p className="mt-1.5 text-xs text-rust">
            {errors.target_audience.message}
          </p>
        )}
      </div>

      {/* Writing style */}
      <div>
        <label className="block text-xs text-fog mb-1.5 tracking-wide">
          Writing style
        </label>
        <input
          {...register("writing_style")}
          placeholder="e.g. Descriptive, Minimalist, Lyrical"
          className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]"
        />
        {errors.writing_style && (
          <p className="mt-1.5 text-xs text-rust">
            {errors.writing_style.message}
          </p>
        )}
      </div>

      {/* Language */}
      <div>
        <label className="block text-xs text-fog mb-1.5 tracking-wide">
          Language
        </label>
        <select
          {...register("language")}
          className="w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719] appearance-none cursor-pointer"
        >
          <option value="" disabled>
            Select a language
          </option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {upperCaseFirstLetter(lang)}
            </option>
          ))}
        </select>
        {errors.language && (
          <p className="mt-1.5 text-xs text-rust">{errors.language.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full h-11 bg-amber text-canvas rounded-[10px] text-[15px] font-medium cursor-pointer hover:bg-[#D4B87C] active:scale-[0.97] transition-all tracking-wide"
      >
        Save
      </button>
    </form>
  );
}
