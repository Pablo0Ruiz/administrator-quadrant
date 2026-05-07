import {
    type ElementType,
    type ComponentPropsWithRef,
    type ReactNode,
} from "react";
import { textFieldVariants, TextFieldVariantsProps } from "./TextField.variants";

export type TextFieldProps<TAs extends ElementType = "span"> = ComponentPropsWithRef<TAs> & {
    as?: TAs;
    variant?: TextFieldVariantsProps["variant"];
    children?: ReactNode;
};


const TextField = <TAs extends ElementType = "span">({
    as,
    className,
    variant = "primary",
    children,
    ...props
}: TextFieldProps<TAs>) => {
    const Component = (as ?? "span") as ElementType;


    return (
        <Component className={`${textFieldVariants({ variant })} ${className ?? ""}`} {...props}>
            {children}
        </Component>
    );
};

export default TextField;
