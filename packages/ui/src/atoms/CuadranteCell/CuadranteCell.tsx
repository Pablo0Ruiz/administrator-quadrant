import type { CuadranteEntry } from "@repo/types";
import CellValue from "../CellValue/CellValue";

interface CuadranteCellProps {
  value: CuadranteEntry["dias"][number];
  isWeekend?: boolean;
  isModified?: boolean;
  className?: string;
  rowSpan?: number;
}

const CuadranteCell = ({ 
  value, 
  isWeekend, 
  isModified, 
  className = "", 
  rowSpan 
}: CuadranteCellProps) => {
  const isNumericVal =
    value != null &&
    !Array.isArray(value) &&
    !isNaN(parseFloat(String(value)));

  return (
    <td
      rowSpan={rowSpan}
      className={[
        isWeekend ? "cuadrante-weekend-col" : "",
        isModified ? "cuadrante-modified" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isNumericVal ? <CellValue value={value} /> : value}
    </td>
  );
};

export default CuadranteCell;
