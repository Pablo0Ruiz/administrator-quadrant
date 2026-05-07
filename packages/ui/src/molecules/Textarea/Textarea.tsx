
export interface TextareaProps extends
  React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  icon?: React.ReactNode;
}


const Textarea = ({ error, icon, className, ...props }: TextareaProps) => {
  return (
    <div className="relative group">
      <textarea
        className={[
          "w-full min-h-[120px] text-[13px] bg-surface/50 border rounded-lg px-4 py-3 text-text-primary",
          "placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent transition-all resize-none",
          error ? "border-red-500/50" : "border-border group-hover:border-accent/50",
          className,
        ].filter(Boolean).join(" ")}
        {...props}
      />
      {icon && (
        <div className="absolute bottom-3 right-3 opacity-20 group-focus-within:opacity-50 transition-opacity">
          {icon}
        </div>
      )}
    </div>
  );
};
export default Textarea;