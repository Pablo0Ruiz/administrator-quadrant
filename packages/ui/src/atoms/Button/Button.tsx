"use client";


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button 
      className={`px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer border-0 ${className ?? ""}`} 
      {...props}
    >
      {children}
    </button>
  );
};
