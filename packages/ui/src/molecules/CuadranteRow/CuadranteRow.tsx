import { Fragment } from "react";
import type { CuadranteEntry } from "@repo/types";
import CuadranteCell from "../../atoms/CuadranteCell/CuadranteCell";

interface CuadranteRowProps {
  entry: CuadranteEntry;
  dayNumbers: number[];
  dayLetters: string[];
  isWeekend: (letter: string) => boolean;
}

const CuadranteRow = ({ entry, dayNumbers, dayLetters, isWeekend }: CuadranteRowProps) => {
  const modifiedDays = new Set(entry._meta?.modifiedDays ?? []);

  return (
    <Fragment>
      <tr>
        <td
          rowSpan={3}
          className="cuadrante-col-sticky"
          style={{ verticalAlign: "top", padding: 0 }}
        >
          <div className="cuadrante-service-name">{entry.servicio}</div>
          <div className="cuadrante-employee-name">{entry.empleado}</div>
          <div className="cuadrante-phone">{entry.telefono}</div>
        </td>

        {dayNumbers.map((day, i) => {
          const val = entry.dias[day] ?? null;
          const isWknd = isWeekend(dayLetters[i]!);
          const isModified = modifiedDays.has(String(day));

          return (
            <CuadranteCell
              key={day}
              value={val}
              isWeekend={isWknd}
              isModified={isModified}
            />
          );
        })}
        <td className="cuadrante-horas" style={{ fontWeight: "bold" }}>
          {entry.horas != null ? String(entry.horas).replace(".", ",") : ""}
        </td>
      </tr>

      <tr>
        {dayNumbers.map((day, i) => {
          const val = entry.dias[day] ?? null;
          const isWknd = isWeekend(dayLetters[i]!);
          const isModified = modifiedDays.has(String(day));

          const displayVal = Array.isArray(val)
            ? val[0] ?? null
            : typeof val === "string" && val.includes(":")
            ? val
            : null;

          return (
            <CuadranteCell
              key={day}
              value={displayVal}
              isWeekend={isWknd}
              isModified={isModified}
            />
          );
        })}
        <td className="cuadrante-horas" />
      </tr>
      <tr>
        {dayNumbers.map((day, i) => {
          const val = entry.dias[day] ?? null;
          const isWknd = isWeekend(dayLetters[i]!);
          const isModified = modifiedDays.has(String(day));
          const displayVal =
            Array.isArray(val) && val.length > 1 ? val[1] ?? null : null;

          return (
            <CuadranteCell
              key={day}
              value={displayVal}
              isWeekend={isWknd}
              isModified={isModified}
            />
          );
        })}
        <td className="cuadrante-horas" />
      </tr>
    </Fragment>
  );
};

export default CuadranteRow;
