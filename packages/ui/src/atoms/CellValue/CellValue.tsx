import type { CuadranteEntry } from "@repo/types";


const CellValue = ({ value }: { value: CuadranteEntry["dias"][number] }) => {
  if (value == null || value === "") return null;

  if (Array.isArray(value)) {
    return (
      <div className="cuadrante-multi-value">
        {value.map((v, i) => (
          <span key={i}>{v}</span>
        ))}
      </div>
    );
  }

  return <>{String(value)}</>;
};

export default CellValue;