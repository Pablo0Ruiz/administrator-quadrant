import type { CuadranteMetadata } from "@repo/types";

interface CuadranteHeaderProps {
  metadata: CuadranteMetadata;
}

const CuadranteHeader = ({ metadata }: CuadranteHeaderProps) => {
  const { title, responsable, mes, anio, servicio } = metadata;

  return (
    <div style={{ padding: "4px 8px", borderBottom: "1px solid #4472C4", background: "#fff" }}>
      <div className="cuadrante-title">{title}</div>
      <div className="cuadrante-meta">
        <span>
          <em>RESPONSABLE D.:</em>&nbsp;
          <span style={{ textDecoration: "underline" }}>{responsable ?? ""}</span>
        </span>
        <span style={{ display: "flex", gap: 24 }}>
          <span>
            MES:&nbsp;<strong>{mes}</strong>
          </span>
          <span>
            AÑO:&nbsp;<strong>{anio}</strong>
          </span>
        </span>
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: 12,
          fontFamily: "Arial, sans-serif",
          letterSpacing: 2,
          padding: "2px 0",
        }}
      >
        S E R V I C I O :&nbsp;&nbsp;<em>{servicio}</em>
      </div>
    </div>
  );
};

export default CuadranteHeader;
