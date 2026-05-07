import type { CuadranteEntry, CuadranteMetadata, ExcelRow } from "@repo/types";

// ──────────────────────────────────────────────────────────────────────────
// Helpers de cabecera
// ──────────────────────────────────────────────────────────────────────────

const DAY_LETTERS = ["L", "M", "X", "J", "V", "S", "D"] as const;

/**
 * Genera las letras de día para cada día del mes.
 * @param diasEnMes - Total de días del mes (28-31)
 * @param primerDiaSemana - Letra del día con que empieza el mes ("L","M","X","J","V","S","D")
 * @returns Array con la letra de cada día, ej: ["V","S","D","L","M","X","J","V"...]
 */
export const getDayHeaders = (
  diasEnMes: number,
  primerDiaSemana: CuadranteMetadata["primerDiaSemana"]
): string[] => {
  const startIndex = DAY_LETTERS.indexOf(
    primerDiaSemana as (typeof DAY_LETTERS)[number]
  );
  const letters: string[] = [];
  for (let i = 0; i < diasEnMes; i++) {
    letters.push(DAY_LETTERS[(startIndex + i) % 7]!);
  }
  return letters;
};

/**
 * Determina si un día es fin de semana (V, S o D).
 */
export const isDayWeekend = (dayLetter: string): boolean =>
  ["V", "S", "D"].includes(dayLetter);

// ──────────────────────────────────────────────────────────────────────────
// Transformación: ExcelRow[] → CuadranteEntry[]
// ──────────────────────────────────────────────────────────────────────────

/**
 * Convierte la salida plana de sheet_to_json (ExcelRow[]) en CuadranteEntry[].
 *
 * El backend devuelve filas planas donde cada fila corresponde a una entrada
 * del cuadrante. Esta función re-interpreta esas filas al modelo agrupado.
 *
 * Convención asumida del Excel:
 *   - La clave "NOMBRE" contiene el nombre del servicio
 *   - La clave "EMPLEADO" o segunda línea contiene el empleado
 *   - La clave "TEL" o "TELEFONO" contiene el teléfono
 *   - Las claves numéricas (o "1", "2", ...) corresponden a días
 *   - La clave "HORAS" contiene el total
 */
export const transformToCuadrante = (rows: ExcelRow[]): CuadranteEntry[] => {
  return rows.map((row) => {
    const dias: Record<number, string | null> = {};

    // Extraer días: buscar claves que sean números o puedan parsearse como tal
    for (const key of Object.keys(row)) {
      if (key === "_meta" || key === "NOMBRE" || key === "HORAS") continue;

      const dayNum = parseInt(key, 10);
      if (!isNaN(dayNum) && dayNum >= 1 && dayNum <= 31) {
        const val = row[key];
        dias[dayNum] = val != null ? String(val) : null;
      }
    }

    // Extraer nombre: soporta objeto {NOMBRE, Tel} (formato actual) o string
    const nombreField = row["NOMBRE"];
    let servicio = "";
    let empleado = "";
    let telefono = "";

    if (nombreField && typeof nombreField === "object" && "NOMBRE" in nombreField) {
      const parts = String(nombreField.NOMBRE).split(",");
      servicio = parts[0]?.trim() ?? "";
      empleado = row["EMPLEADO"] ?? "";
      telefono = String(nombreField.Tel ?? "");
    } else if (typeof nombreField === "string") {
      servicio = nombreField;
      empleado = row["EMPLEADO"] ?? "";
      telefono = row["TEL"] ?? row["TELEFONO"] ?? "";
    }

    const entry: CuadranteEntry = {
      servicio,
      empleado,
      telefono,
      dias,
      horas: row["HORAS"] != null ? Number(row["HORAS"]) : null,
    };

    if (row._meta?.modifiedFields?.length) {
      entry._meta = { modifiedDays: row._meta.modifiedFields };
    }

    return entry;
  });
};

// ──────────────────────────────────────────────────────────────────────────
// Diff para CuadranteEntry[]
// ──────────────────────────────────────────────────────────────────────────

/**
 * Compara dos CuadranteEntry y marca los días modificados en _meta.
 */
export const compareCuadranteEntries = (
  original: CuadranteEntry,
  modified: CuadranteEntry
): CuadranteEntry => {
  const modifiedDays: string[] = [];

  for (const dayStr of Object.keys(modified.dias)) {
    const day = Number(dayStr);
    if (String(modified.dias[day]) !== String(original.dias[day])) {
      modifiedDays.push(dayStr);
    }
  }

  if (modifiedDays.length > 0) {
    return { ...modified, _meta: { modifiedDays } };
  }
  return modified;
};

/**
 * Aplica diff entre dos arrays de CuadranteEntry y marca las diferencias.
 */
export const diffCuadranteData = (
  original: CuadranteEntry[],
  modified: CuadranteEntry[]
): CuadranteEntry[] => {
  return modified.map((entry, index) => {
    const originalEntry = original[index];
    if (!originalEntry) return entry;
    return compareCuadranteEntries(originalEntry, entry);
  });
};

// ──────────────────────────────────────────────────────────────────────────
// Legado — ExcelRow diff (mantener para compatibilidad)
// ──────────────────────────────────────────────────────────────────────────

export const compareExcelRows = (original: ExcelRow, modified: ExcelRow): ExcelRow => {
  const modifiedFields: string[] = [];
  const result: ExcelRow = { ...modified };

  Object.keys(modified).forEach((key) => {
    if (key === "_meta") return;
    if (modified[key] !== original[key]) {
      modifiedFields.push(key);
    }
  });

  if (modifiedFields.length > 0) {
    result._meta = { modifiedFields };
  }

  return result;
};

export const diffExcelData = (original: ExcelRow[], modified: ExcelRow[]): ExcelRow[] => {
  return modified.map((row, index) => {
    const originalRow = original[index];
    if (!originalRow) return row;
    return compareExcelRows(originalRow, row);
  });
};
