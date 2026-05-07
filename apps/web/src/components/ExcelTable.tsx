import type { ExcelRow } from "@repo/types";
import { TextField } from "@repo/ui";

interface ExcelTableProps {
  rows: ExcelRow[];
}

const WEEKEND_PREFIXES = ["V ", "S ", "D "];

const isWeekend = (col: string) =>
  WEEKEND_PREFIXES.some((p) => col.startsWith(p));

export const ExcelTable = ({ rows }: ExcelTableProps) => {
  if (!rows.length) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <TextField variant="secondary">Sin datos cargados</TextField>
      </div>
    );
  }

  const headers = Object.keys(rows[0]!).filter(h => h !== "_meta");

  return (
    <div className="h-full overflow-auto bg-background selection:bg-accent/30">
      <table className="border-collapse text-[13px]" style={{ width: "max-content", minWidth: "100%" }}>
        <thead>
          <tr className="bg-surface/80 backdrop-blur-sm sticky top-0 z-30">
            {headers.map((h, i) => (
              <th
                key={h}
                className={[
                  "text-left font-semibold px-4 py-4 border-b border-r border-border whitespace-nowrap",
                  i === 0 ? "sticky left-0 z-40 bg-surface shadow-[1px_0_0_0_rgba(0,0,0,0.05)]" : "text-text-secondary",
                  i !== 0 && isWeekend(h) ? "bg-accent/5" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <TextField variant={i === 0 ? "display" : "secondary"} className="text-[11px] uppercase tracking-wider">
                  {h}
                </TextField>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-surface/40 transition-colors group">
              {headers.map((h, j) => {
                const isModified = row._meta?.modifiedFields?.includes(h);
                
                return (
                  <td
                    key={h}
                    className={[
                      "px-4 py-3 border-r border-border/40 whitespace-nowrap transition-all",
                      j === 0 ? "sticky left-0 z-20 bg-background group-hover:bg-surface shadow-[1px_0_0_0_rgba(0,0,0,0.05)]" : "",
                      j !== 0 && isWeekend(h) ? "bg-accent/5" : "",
                      isModified ? "relative" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <TextField 
                      variant={isModified ? "highlight" : "primary"}
                      className={isModified ? "px-2 py-0.5 rounded-sm font-medium animate-pulse" : ""}
                    >
                      {String(row[h] ?? "")}
                    </TextField>
                    {isModified && (
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-accent rounded-full -translate-y-1/2 translate-x-1/2 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
