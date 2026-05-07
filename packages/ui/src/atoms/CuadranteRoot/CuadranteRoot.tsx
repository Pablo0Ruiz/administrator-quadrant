
interface CuadranteRootProps {
  children: React.ReactNode;
}

const CuadranteRoot = ({ children }: CuadranteRootProps) => {
  return (
    <div className="cuadrante-scroll-container cuadrante-root">
      {children}
    </div>
  );
};

export default CuadranteRoot;
