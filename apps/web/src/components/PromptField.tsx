import type { UseFormRegisterReturn } from "react-hook-form";
import { Textarea, TextField } from "@repo/ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarsIcon } from "@hugeicons/core-free-icons";

interface PromptFieldProps {
  registration: UseFormRegisterReturn;
  error?: string;
}

export const PromptField = ({ registration, error }: PromptFieldProps) => {
  return (
    <div className="flex flex-col gap-3">
      <TextField variant="secondary" className="text-[11px] uppercase tracking-widest font-semibold ml-1">
        Instrucciones de Cambio
      </TextField>
      <Textarea
        {...registration}
        error={error}
        placeholder="Ej: Cambiá el horario de Kenyi de 8:00 a 10:00 para los fines de semana de Mayo..."
        icon={
          <HugeiconsIcon
            icon={StarsIcon}
            size={16}
            strokeWidth={1.5}
            className="text-text-secondary"
          />
        }
      />
      {error && (
        <TextField className="text-[12px] text-red-400 ml-1">{error}</TextField>
      )}
    </div>
  );
};
