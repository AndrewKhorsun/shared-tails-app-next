"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  createBookPlanSchema,
  characterSchema,
  type CreateBookPlanDto,
} from "@/lib/validations/book-plan.schema";
import { upperCaseFirstLetter } from "@/lib/utils";
import { BookPlan } from "@/types";
import { api } from "@/lib/api";
import { useState } from "react";
import { CharacterModal } from "./character-modal";

type CharacterDto = z.infer<typeof characterSchema>;

const LANGUAGES = createBookPlanSchema.shape.language.options;

interface BookPlanFormProps {
  bookId: string;
  existingPlan?: BookPlan;
}

export function BookPlanForm({ bookId, existingPlan }: BookPlanFormProps) {
  const [characterEditingIndex, setCharacterEditingIndex] = useState<
    number | null
  >(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
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

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "generation_settings.characters",
  });

  function handleSaveCharacter(character: CharacterDto) {
    if (characterEditingIndex === null) return;
    if (characterEditingIndex === -1) {
      append(character);
    } else {
      update(characterEditingIndex, character);
    }
    setCharacterEditingIndex(null);
  }

  async function onSubmit(data: CreateBookPlanDto) {
    const method = existingPlan ? "put" : "post";
    await api[method](`/api/books/${bookId}/plan`, data);
    reset(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-lg font-medium text-parchment">Main</h2>

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
            <p className="mt-1.5 text-xs text-rust">
              {errors.language.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-parchment">Characters</h3>
            <button type="button" onClick={() => setCharacterEditingIndex(-1)}>
              + Add character
            </button>
          </div>

          {fields.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-parchment/20 text-left text-xs text-parchment/60">
                  <th className="pb-2 pr-4 font-medium">Name</th>
                  <th className="pb-2 pr-4 font-medium">Role</th>
                  <th className="pb-2 font-medium">Description</th>
                  <th className="pb-2" />
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr
                    key={field.id}
                    className="border-b border-parchment/10 last:border-0"
                  >
                    <td className="py-2 pr-4 font-medium">{field.name}</td>
                    <td className="py-2 pr-4 text-parchment/70">
                      {field.role}
                    </td>
                    <td className="py-2 text-parchment/70">
                      {field.description}
                    </td>
                    <td className="py-2 pl-4">
                      <div className="flex gap-4 justify-end">
                        <button
                          type="button"
                          onClick={() => setCharacterEditingIndex(index)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-red-400"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <button
          type="submit"
          disabled={!isDirty}
          className="disabled:opacity-50 disabled:cursor-not-allowed w-full h-11 bg-amber text-canvas rounded-[10px] text-[15px] font-medium cursor-pointer hover:bg-[#D4B87C] active:scale-[0.97] transition-all tracking-wide"
        >
          Save
        </button>
      </form>

      <CharacterModal
        key={characterEditingIndex}
        isOpen={characterEditingIndex !== null}
        onClose={() => setCharacterEditingIndex(null)}
        onSave={handleSaveCharacter}
        defaultValues={
          characterEditingIndex !== null && characterEditingIndex !== -1
            ? fields[characterEditingIndex]
            : undefined
        }
      />
    </>
  );
}
