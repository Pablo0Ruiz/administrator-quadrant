import type { UseFormRegisterReturn } from "react-hook-form";
import { HugeiconsIcon } from "@hugeicons/react";
import { CloudUploadIcon } from "@hugeicons/core-free-icons";
import { InputContainer, InputPrimitive, TextField } from "@repo/ui";

interface FileDropFieldProps {
  registration: UseFormRegisterReturn;
  selectedFile?: File | null;
  error?: string;
}

export const FileDropField = ({ registration, selectedFile, error }: FileDropFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <TextField variant="secondary" className="text-[11px] uppercase tracking-widest font-semibold ml-1">
        Archivo de Cuadrante
      </TextField>

      <InputContainer
        htmlFor={registration.name}
        variant="dropzone"
        status={error ? "error" : selectedFile ? "valid" : "default"}
        errorMessage={error}
      >
        <HugeiconsIcon
          icon={CloudUploadIcon}
          size={40}
          strokeWidth={1.5}
          className={`mb-3 transition-colors duration-200 ${
            selectedFile ? "text-accent" : "text-text-secondary group-hover:text-accent"
          }`}
        />

        <TextField
          className={`text-[13px] text-center whitespace-nowrap transition-colors duration-200 ${
            selectedFile
              ? "text-accent font-semibold"
              : "text-text-secondary group-hover:text-accent"
          }`}
        >
          {selectedFile ? selectedFile.name : "Subí o arrastrá tu archivo .xlsx"}
        </TextField>

        {!selectedFile && (
          <span className="mt-1 text-[11px] text-text-secondary/50 group-hover:text-accent/60 transition-colors duration-200">
            .xlsx · .xls
          </span>
        )}

        <InputPrimitive
          type="file"
          id={registration.name}
          {...registration}
          className="sr-only"
          accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        />
      </InputContainer>
    </div>
  );
};
