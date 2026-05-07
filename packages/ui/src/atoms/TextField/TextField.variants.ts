import {cva, type VariantProps} from 'class-variance-authority';

export const textFieldVariants = cva(
    '',
    {
        variants: {
            variant: {
                primary: 'text-text-primary',
                secondary: 'text-text-secondary',
                highlight: 'bg-diff-bg text-diff-text',
                dimmed: 'text-text-secondary opacity-50',
                display: 'font-display text-text-primary',
            },
        },
        defaultVariants: {
            variant: 'primary',
        },
    }
);

export type TextFieldVariantsProps = VariantProps<typeof textFieldVariants>;
