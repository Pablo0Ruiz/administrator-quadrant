import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@repo/ui";
import { EditorLayout } from "../../components/EditorLayout";
import { FileDropField } from "../../components/FileDropField";
import { PromptField } from "../../components/PromptField";
import { CuadranteTable } from "../../components/CuadranteTable";
import { mockCuadranteData, mockCuadranteMetadata } from "../../data/mock-cuadrante";
import { diffCuadranteData } from "../../utils/excel";
import type { CuadranteEntry } from "@repo/types";

type EditorForm = { file: FileList; prompt: string };


export const ExcelEditor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedData, setProcessedData] = useState<CuadranteEntry[] | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditorForm>();

  const selectedFile = watch("file")?.[0] ?? null;

  const onSubmit = (data: EditorForm) => {
    console.log("Form submitted:", data);
    setIsProcessing(true);

    setTimeout(() => {
      const modifiedMock = mockCuadranteData.map((entry, i) => {
        if (i === 0) {
          return {
            ...entry,
            dias: { ...entry.dias, 4: ["00:00", "06:00"] as string[] },
          };
        }
        return entry;
      });

      const diffed = diffCuadranteData(mockCuadranteData, modifiedMock);
      setProcessedData(diffed);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <EditorLayout
      sidebar={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col gap-2">
            <TextField variant="display" className="text-xl font-bold tracking-tight">
              Cuadrante AI
            </TextField>
            <TextField variant="secondary" className="text-xs">
              Modificación inteligente de horarios
            </TextField>
          </div>

          <div className="h-px bg-border/50 w-full" />

          <FileDropField
            registration={register("file", {
              required: "Seleccioná un archivo",
              validate: (fileList) => {
                const file = fileList?.[0];
                if (!file) return "Seleccioná un archivo";
                const ext = file.name.split(".").pop()?.toLowerCase();
                return (
                  ext === "xlsx" ||
                  ext === "xls" ||
                  "Solo se aceptan archivos .xlsx y .xls"
                );
              },
            })}
            selectedFile={selectedFile}
            error={errors.file?.message as string}
          />

          <PromptField
            registration={register("prompt", {
              required: "Escribí las instrucciones",
              validate: (v) =>
                v.trim().length > 0 || "Escribí las instrucciones",
            })}
            error={errors.prompt?.message}
          />

          <Button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 shadow-sm"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Procesando...</span>
              </div>
            ) : "Generar Cambios"}
          </Button>

          <div className="mt-auto pt-10 flex flex-col gap-4">
            <TextField variant="secondary" className="text-[11px] leading-relaxed italic opacity-70">
              Subí el Excel original y describí qué querés cambiar. La IA calculará las horas y aplicará los ajustes automáticamente.
            </TextField>
          </div>
        </form>
      }
    >
      {isProcessing ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 bg-slate-50/50">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-200 border-t-accent rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-accent/10 rounded-full blur-xl animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <TextField variant="display" className="text-lg animate-pulse text-slate-900">Analizando Cuadrante</TextField>
            <TextField variant="secondary" className="text-sm">Calculando horas y aplicando reglas de negocio...</TextField>
          </div>
        </div>
      ) : (
        <CuadranteTable
          entries={processedData ?? mockCuadranteData}
          metadata={mockCuadranteMetadata}
        />
      )}
    </EditorLayout>
  );
};
