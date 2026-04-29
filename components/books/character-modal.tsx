"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { characterSchema } from "@/lib/validations/book-plan.schema";
import { Modal } from "@/components/ui/modal";
import { useTranslations } from "next-intl";

type CharacterDto = z.infer<typeof characterSchema>;

interface CharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (character: CharacterDto) => void;
  defaultValues?: CharacterDto;
}

export function CharacterModal({
  isOpen,
  onClose,
  onSave,
  defaultValues,
}: CharacterModalProps) {
  const t = useTranslations("CharacterModal");
  const [traitInput, setTraitInput] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<CharacterDto>({
    resolver: zodResolver(characterSchema),
    defaultValues: defaultValues ?? {
      name: "",
      role: "supporting",
      description: "",
      traits: [],
    },
  });

  const traits = useWatch({ control, name: "traits" }) ?? [];

  function handleTraitKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = traitInput.trim();
      if (trimmed && !traits.includes(trimmed)) {
        setValue("traits", [...traits, trimmed]);
        setTraitInput("");
      }
    }
  }

  function removeTrait(index: number) {
    setValue(
      "traits",
      traits.filter((_, i) => i !== index),
    );
  }

  function onSubmit(data: CharacterDto) {
    onSave(data);
    onClose();
    reset();
  }

  const inputClass =
    "w-full h-11 bg-input border border-border-soft rounded-[10px] px-3.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719]";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={defaultValues ? "Edit character" : "Add character"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs text-fog mb-1.5 tracking-wide">
            {t("name")}
          </label>
          <input
            {...register("name")}
            placeholder="e.g. Artem"
            className={inputClass}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-rust">{errors.name.message}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block text-xs text-fog mb-1.5 tracking-wide">
            {t("role")}
          </label>
          <select {...register("role")} className={inputClass}>
            <option value="protagonist">{t("protagonist")}</option>
            <option value="antagonist">{t("antagonist")}</option>
            <option value="supporting">{t("supporting")}</option>
          </select>
          {errors.role && (
            <p className="mt-1.5 text-xs text-rust">{errors.role.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs text-fog mb-1.5 tracking-wide">
            {t("description")}
          </label>
          <textarea
            {...register("description")}
            placeholder={t("descriptionPlaceholder")}
            rows={3}
            className="w-full bg-input border border-border-soft rounded-[10px] px-3.5 py-2.5 text-sm font-light text-parchment placeholder:text-fog/50 outline-none transition-all focus:border-border-active focus:shadow-[0_0_0_3px_rgba(201,169,110,0.10)] focus:bg-[#1b2719] resize-none"
          />
          {errors.description && (
            <p className="mt-1.5 text-xs text-rust">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Traits */}
        <div>
          <label className="block text-xs text-fog mb-1.5 tracking-wide">
            {t("traits")}
          </label>
          <input
            value={traitInput}
            onChange={(e) => setTraitInput(e.target.value)}
            onKeyDown={handleTraitKeyDown}
            placeholder={t("traitsPlaceholder")}
            className={inputClass}
          />
          {traits.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {traits.map((trait, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 px-2.5 py-1 bg-input border border-border-soft rounded-full text-xs text-parchment"
                >
                  {trait}
                  <button
                    type="button"
                    onClick={() => removeTrait(i)}
                    className="text-fog hover:text-rust transition-colors leading-none"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full h-11 bg-amber text-canvas rounded-[10px] text-[15px] font-medium cursor-pointer hover:bg-[#D4B87C] active:scale-[0.97] transition-all tracking-wide"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}
