import type { CuadranteEntry, CuadranteMetadata } from "@repo/types";
import { getDayHeaders, isDayWeekend } from "../utils/excel";
import { 
  CuadranteRoot, 
  CuadranteHeader, 
  CuadranteHead, 
  CuadranteRow, 
  CuadranteFooter, 
  CuadranteEmpty 
} from "@repo/ui";

interface CuadranteTableProps {
  entries: CuadranteEntry[];
  metadata: CuadranteMetadata;
}

export const CuadranteTable = ({ entries, metadata }: CuadranteTableProps) => {
  const { diasEnMes, primerDiaSemana } = metadata;

  const dayLetters = getDayHeaders(diasEnMes, primerDiaSemana);
  const dayNumbers = Array.from({ length: diasEnMes }, (_, i) => i + 1);

  if (!entries.length) {
    return <CuadranteEmpty />;
  }

  return (
    <CuadranteRoot>
      <CuadranteHeader metadata={metadata} />

      <table>
        <CuadranteHead 
          dayLetters={dayLetters} 
          dayNumbers={dayNumbers} 
          isWeekend={isDayWeekend} 
        />
        <tbody>
          {entries.map((entry, entryIdx) => (
            <CuadranteRow 
              key={entryIdx} 
              entry={entry} 
              dayNumbers={dayNumbers} 
              dayLetters={dayLetters} 
              isWeekend={isDayWeekend} 
            />
          ))}
        </tbody>
      </table>
      
      <CuadranteFooter />
    </CuadranteRoot>
  );
};

