"use client";

import { useTranslations } from "next-intl";
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
import { useRouter } from "@/i18n/navigation";
import { CharacterModal } from "./character-modal";
import { Tooltip } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

type CharacterDto = z.infer<typeof characterSchema>;

const LANGUAGES = createBookPlanSchema.shape.language.options;

const inputClass =
  "w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]";

const textareaClass =
  "w-full bg-input border border-border-soft rounded-[10px] px-3.5 py-2.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719] resize-none overflow-hidden [field-sizing:content]";

function SectionHeading({ title, tooltip }: { title: string; tooltip: string }) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-medium text-parchment">{title}</h2>
      <Tooltip content={tooltip}>
        <button type="button" className="text-fog/50 hover:text-fog transition-colors cursor-default">
          <Info size={14} />
        </button>
      </Tooltip>
    </div>
  );
}

function FieldLabel({ label, tooltip }: { label: string; tooltip?: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <label className="text-xs text-fog tracking-wide">{label}</label>
      {tooltip && (
        <Tooltip content={tooltip}>
          <button type="button" className="text-fog/40 hover:text-fog/70 transition-colors cursor-default">
            <Info size={11} />
          </button>
        </Tooltip>
      )}
    </div>
  );
}

interface BookPlanFormProps {
  bookId: string;
  existingPlan?: BookPlan;
}

export function BookPlanForm({ bookId, existingPlan }: BookPlanFormProps) {
  const t = useTranslations("BookPlanForm");
  const router = useRouter();
  const [characterEditingIndex, setCharacterEditingIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [planExists, setPlanExists] = useState(!!existingPlan);

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

  const { fields: chapterFields } = useFieldArray({ control, name: "generation_settings.chapter_summaries" });

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
    setIsSaving(true);
    setSaveError(null);
    try {
      const method = planExists ? "put" : "post";
      const { error } = await api[method](`/api/books/${bookId}/plan`, data);
      if (error) {
        setSaveError(error);
        return;
      }
      setPlanExists(true);
      reset(data);
      router.refresh();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : t("failedToSave"));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Main */}
        <section className="space-y-6">
          <SectionHeading
            title={t("sections.main")}
            tooltip={t("sections.mainTooltip")}
          />

          <div>
            <FieldLabel
              label={t("fields.genre")}
              tooltip={t("fields.genreTooltip")}
            />
            <input
              {...register("genre")}
              placeholder={t("fields.genrePlaceholder")}
              className={inputClass}
            />
            {errors.genre && <p className="mt-1.5 text-xs text-rust">{errors.genre.message}</p>}
          </div>

          <div>
            <FieldLabel
              label={t("fields.targetAudience")}
              tooltip={t("fields.targetAudienceTooltip")}
            />
            <input
              {...register("target_audience")}
              placeholder={t("fields.targetAudiencePlaceholder")}
              className={inputClass}
            />
            {errors.target_audience && (
              <p className="mt-1.5 text-xs text-rust">{errors.target_audience.message}</p>
            )}
          </div>

          <div>
            <FieldLabel
              label={t("fields.writingStyle")}
              tooltip={t("fields.writingStyleTooltip")}
            />
            <input
              {...register("writing_style")}
              placeholder={t("fields.writingStylePlaceholder")}
              className={inputClass}
            />
            {errors.writing_style && (
              <p className="mt-1.5 text-xs text-rust">{errors.writing_style.message}</p>
            )}
          </div>

          <div>
            <FieldLabel
              label={t("fields.language")}
              tooltip={t("fields.languageTooltip")}
            />
            <select
              {...register("language")}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="" disabled>{t("fields.languagePlaceholder")}</option>
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
            <SectionHeading
              title={t("sections.characters")}
              tooltip={t("sections.charactersTooltip")}
            />
            <button
              type="button"
              onClick={() => setCharacterEditingIndex(-1)}
              className="text-sm text-amber hover:text-amber/80 transition-colors"
            >
              {t("characters.addCharacter")}
            </button>
          </div>

          {characterFields.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-parchment/20 text-left text-xs text-parchment/60">
                  <th className="pb-2 pr-4 font-medium">{t("characters.colName")}</th>
                  <th className="pb-2 pr-4 font-medium">{t("characters.colRole")}</th>
                  <th className="pb-2 font-medium">{t("characters.colDescription")}</th>
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
                          {t("characters.edit")}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeCharacter(index)}
                          className="text-xs text-rust hover:text-rust/80 transition-colors"
                        >
                          {t("characters.remove")}
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
          <SectionHeading
            title={t("sections.world")}
            tooltip={t("sections.worldTooltip")}
          />

          <div>
            <FieldLabel
              label={t("fields.world")}
              tooltip={t("fields.worldTooltip")}
            />
            <textarea
              {...register("generation_settings.setting.world")}
              placeholder={t("fields.worldPlaceholder")}
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
            <FieldLabel
              label={t("fields.atmosphere")}
              tooltip={t("fields.atmosphereTooltip")}
            />
            <textarea
              {...register("generation_settings.setting.atmosphere")}
              placeholder={t("fields.atmospherePlaceholder")}
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
          <SectionHeading
            title={t("sections.plot")}
            tooltip={t("sections.plotTooltip")}
          />

          <div>
            <FieldLabel
              label={t("fields.premise")}
              tooltip={t("fields.premiseTooltip")}
            />
            <textarea
              {...register("generation_settings.plot_arc.premise")}
              placeholder={t("fields.premisePlaceholder")}
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
            <FieldLabel
              label={t("fields.conflict")}
              tooltip={t("fields.conflictTooltip")}
            />
            <textarea
              {...register("generation_settings.plot_arc.conflict")}
              placeholder={t("fields.conflictPlaceholder")}
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
            <FieldLabel
              label={t("fields.resolution")}
              tooltip={t("fields.resolutionTooltip")}
            />
            <textarea
              {...register("generation_settings.plot_arc.resolution")}
              placeholder={t("fields.resolutionPlaceholder")}
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
          <SectionHeading
            title={t("sections.chapterSummaries")}
            tooltip={t("sections.chapterSummariesTooltip")}
          />

          {chapterFields.length === 0 ? (
            <p className="text-sm text-fog/50 italic">{t("chapterSummaries.empty")}</p>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-start gap-2 rounded-[10px] border border-amber/30 bg-amber/5 px-3.5 py-2.5">
                <span className="text-amber mt-0.5">{t("chapterSummaries.warningIcon")}</span>
                <p className="text-xs text-fog/80">{t("chapterSummaries.warningText")}</p>
              </div>
              {chapterFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex gap-4 items-start border border-border-soft rounded-[10px] p-4 bg-input"
                >
                  <span className="text-xs text-fog mt-3 w-6 shrink-0 text-right">{field.chapter}</span>
                  <div className="flex-1">
                    <textarea
                      {...register(`generation_settings.chapter_summaries.${index}.summary`)}
                      rows={2}
                      className={textareaClass}
                    />
                    {errors.generation_settings?.chapter_summaries?.[index]?.summary && (
                      <p className="mt-1.5 text-xs text-rust">{t("chapterSummaries.summaryCannotBeEmpty")}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {saveError && <p className="text-xs text-rust">{saveError}</p>}

        <button
          type="submit"
          disabled={!isDirty || isSaving}
          className="disabled:opacity-50 disabled:cursor-not-allowed w-full h-11 bg-amber text-canvas rounded-[10px] text-[15px] font-medium cursor-pointer hover:bg-[#D4B87C] active:scale-[0.97] transition-all tracking-wide"
        >
          {isSaving ? t("saving") : t("save")}
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
