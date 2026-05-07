import type { ComponentProps } from "react";

export type InputPrimitiveProps = ComponentProps<"input">;

const InputPrimitive = ({ type = "text", className, ...props }: InputPrimitiveProps) => {
    return <input type={type} className={className} {...props} />;
};

export default InputPrimitive;
