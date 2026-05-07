import { inputContainerVariants } from "./InputContainer.variants";

export interface InputContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    label?: string;
    htmlFor?: string;
    status?: "default" | "error" | "valid";
    variant?: "default" | "unstyled" | "dropzone";
    isPill?: boolean;
    errorMessage?: string;
}

export const InputContainer = ({
    children,
    className,
    variant = "default",
    status = "default",
    label,
    htmlFor,
    errorMessage,
    isPill,
    ...props
}: InputContainerProps) => {
    if (variant === "dropzone" && htmlFor) {
        return (
            <div className="w-full" {...props}>
                <label
                    htmlFor={htmlFor}
                    className={inputContainerVariants({ variant, status, isPill, className })}
                >
                    {children}
                </label>
                {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
            </div>
        );
    }

    return (
        <div className={inputContainerVariants({ variant, status, isPill, className })} {...props}>
            {htmlFor ? (
                <label htmlFor={htmlFor} className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    {label && <span className="text-body font-medium text-cloud-mist">{label}</span>}
                    {children}
                </label>
            ) : (
                <>
                    {label && <label className="block text-body font-medium text-cloud-mist">{label}</label>}
                    {children}
                </>
            )}
            {errorMessage && <p className="mt-4 text-body text-flame-orange">{errorMessage}</p>}
        </div>
    );
};
