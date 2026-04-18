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

const inputClass =
  "w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]";

const textareaClass =
  "w-full bg-input border border-border-soft rounded-[10px] px-3.5 py-2.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719] resize-none";

interface BookPlanFormProps {
  bookId: string;
  existingPlan?: BookPlan;
}

export function BookPlanForm({ bookId, existingPlan }: BookPlanFormProps) {
  const [characterEditingIndex, setCharacterEditingIndex] = useState<number | null>(null);

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

  const {
    fields: characterFields,
    append: appendCharacter,
    remove: removeCharacter,
    update: updateCharacter,
  } = useFieldArray({ control, name: "generation_settings.characters" });

  const {
    fields: chapterFields,
    append: appendChapter,
    remove: removeChapter,
  } = useFieldArray({ control, name: "generation_settings.chapter_summaries" });

  function handleSaveCharacter(character: CharacterDto) {
    if (characterEditingIndex === null) return;
    if (characterEditingIndex === -1) {
      appendCharacter(character);
    } else {
      updateCharacter(characterEditingIndex, character);
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Main */}
        <section className="space-y-6">
          <h2 className="text-lg font-medium text-parchment">Main</h2>

          <div>
            <label className="block text-xs text-fog mb-1.5 tracking-wide">Genre</label>
            <input
              {...register("genre")}
              placeholder="e.g. Fantasy, Thriller, Romance"
              className={inputClass}
            />
            {errors.genre && <p className="mt-1.5 text-xs text-rust">{errors.genre.message}</p>}
          </div>

          <div>
            <label className="block text-xs text-fog mb-1.5 tracking-wide">Target audience</label>
            <input
              {...register("target_audience")}
              placeholder="e.g. Young adults, Children 8-12"
              className={inputClass}
            />
            {errors.target_audience && (
              <p className="mt-1.5 text-xs text-rust">{errors.target_audience.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-fog mb-1.5 tracking-wide">Writing style</label>
            <input
              {...register("writing_style")}
              placeholder="e.g. Descriptive, Minimalist, Lyrical"
              className={inputClass}
            />
            {errors.writing_style && (
              <p className="mt-1.5 text-xs text-rust">{errors.writing_style.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-fog mb-1.5 tracking-wide">Language</label>
            <select
              {...register("language")}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="" disabled>Select a language</option>
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
        </section>

        {/* Characters */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-parchment">Characters</h2>
            <button
              type="button"
              onClick={() => setCharacterEditingIndex(-1)}
              className="text-sm text-amber hover:text-amber/80 transition-colors"
            >
              + Add character
            </button>
          </div>

          {characterFields.length > 0 && (
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
                {characterFields.map((field, index) => (
                  <tr key={field.id} className="border-b border-parchment/10 last:border-0">
                    <td className="py-2 pr-4 font-medium">{field.name}</td>
                    <td className="py-2 pr-4 text-parchment/70">{field.role}</td>
                    <td className="py-2 text-parchment/70">{field.description}</td>
                    <td className="py-2 pl-4">
                      <div className="flex gap-4 justify-end">
                        <button
                          type="button"
                          onClick={() => setCharacterEditingIndex(index)}
                          className="text-xs text-fog hover:text-parchment transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => removeCharacter(index)}
                          className="text-xs text-rust hover:text-rust/80 transition-colors"
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
        </section>

        {/* World */}
        <section className="space-y-6">
          <h2 className="text-lg font-medium text-parchment">World</h2>

          <div>
            <label className="block text-xs text-fog mb-1.5 tracking-wide">World</label>
            <textarea
              {...register("generation_settings.setting.world")}
              placeholder="Describe the world where the story takes place"
              rows={3}
              className={textareaClass}
            />
            {errors.generation_settings?.setting?.world && (
              <p className="mt-1.5 text-xs text-rust">
                {errors.generation_settings.setting.world.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs text-fog mb-1.5 tracking-wide">Atmosphere</label>
            <textarea
              {...register("generation_settings.setting.atmosphere")}
              placeholder="e.g. Dark and gritty, Whimsical and lighthearted"
              rows={3}
              className={textareaClass}
            />
            {errors.generation_settings?.setting?.atmosphere && (
              <p className="mt-1.5 text-xs text-rust">
                {errors.generation_settings.setting.atmosphere.message}
              </p>
            )}
          </div>
        </section>

        {/* Plot Arc */}
        <section className="space-y-6">
          <h2 className="text-lg font-medium text-parchment">Plot</h2>

          <div>
            <label className="block text-xs text-fog mb-1.5 tracking-wide">Premise</label>
            <textarea
              {...register("generation_settings.plot_arc.premise")}
              placeholder="The central idea or starting situation of the story"
              rows={3}
              className={textareaClass}
            />
            {errors.generation_settings?.plot_arc?.premise && (
              <p className="mt-1.5 text-xs text-rust">
                {errors.generation_settings.plot_arc.premise.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs text-fog mb-1.5 tracking-wide">Conflict</label>
            <textarea
              {...register("generation_settings.plot_arc.conflict")}
              placeholder="The main struggle or tension driving the story"
              rows={3}
              className={textareaClass}
            />
            {errors.generation_settings?.plot_arc?.conflict && (
              <p className="mt-1.5 text-xs text-rust">
                {errors.generation_settings.plot_arc.conflict.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs text-fog mb-1.5 tracking-wide">Resolution</label>
            <textarea
              {...register("generation_settings.plot_arc.resolution")}
              placeholder="How the conflict is resolved"
              rows={3}
              className={textareaClass}
            />
            {errors.generation_settings?.plot_arc?.resolution && (
              <p className="mt-1.5 text-xs text-rust">
                {errors.generation_settings.plot_arc.resolution.message}
              </p>
            )}
          </div>
        </section>

        {/* Chapter Summaries */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-parchment">Chapter Summaries</h2>
            <button
              type="button"
              onClick={() =>
                appendChapter({
                  chapter: chapterFields.length + 1,
                  summary: "",
                })
              }
              className="text-sm text-amber hover:text-amber/80 transition-colors"
            >
              + Add chapter
            </button>
          </div>

          {chapterFields.length > 0 && (
            <div className="space-y-4">
              {chapterFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex gap-4 items-start border border-border-soft rounded-[10px] p-4 bg-input"
                >
                  <span className="text-xs text-fog mt-3 w-6 shrink-0 text-right">
                    {field.chapter}
                  </span>
                  <div className="flex-1">
                    <textarea
                      {...register(`generation_settings.chapter_summaries.${index}.summary`)}
                      placeholder={`Summary of chapter ${field.chapter}`}
                      rows={2}
                      className={textareaClass}
                    />
                    {errors.generation_settings?.chapter_summaries?.[index]?.summary && (
                      <p className="mt-1.5 text-xs text-rust">
                        {errors.generation_settings.chapter_summaries[index].summary.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeChapter(index)}
                    className="text-xs text-rust hover:text-rust/80 transition-colors mt-3 shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

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
            ? characterFields[characterEditingIndex]
            : undefined
        }
      />
    </>
  );
}
