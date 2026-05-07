interface CuadranteHeadProps {
  dayLetters: string[];
  dayNumbers: number[];
  isWeekend: (letter: string) => boolean;
}

const CuadranteHead = ({ dayLetters, dayNumbers, isWeekend }: CuadranteHeadProps) => {
  return (
    <thead>
      <tr className="cuadrante-header-row">
        <th
          className="cuadrante-col-sticky"
          style={{ textAlign: "right", paddingRight: 4, fontWeight: "bold", fontSize: 10 }}
        >
          DIA SEMANA
        </th>
        {dayLetters.map((letter, i) => (
          <th
            key={i}
            className={isWeekend(letter) ? "cuadrante-weekend-col" : ""}
            style={{ minWidth: 28, fontWeight: "bold" }}
          >
            {letter}
          </th>
        ))}
        <th className="cuadrante-horas" style={{ minWidth: 50 }}>
          HORAS
        </th>
      </tr>
      <tr className="cuadrante-header-row">
        <th
          className="cuadrante-col-sticky"
          style={{ textAlign: "center", letterSpacing: 4, fontWeight: "bold", fontSize: 10 }}
        >
          N O M B R E
        </th>
        {dayNumbers.map((num, i) => (
          <th
            key={num}
            className={isWeekend(dayLetters[i]!) ? "cuadrante-weekend-col" : ""}
            style={{ fontWeight: "bold" }}
          >
            {num}
          </th>
        ))}
        <th className="cuadrante-horas" />
      </tr>
    </thead>
  );
};

export default CuadranteHead;
