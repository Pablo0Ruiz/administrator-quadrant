import { cva, type VariantProps } from 'class-variance-authority';

export const inputContainerVariants = cva(
    'transition-all duration-200 w-full',
    {
        variants: {
            variant: {
                default: 'flex flex-col gap-4 p-4 border border-border rounded-lg bg-surface/30',
                unstyled: 'flex items-center justify-center',
                dropzone: 'flex flex-col items-center justify-center min-h-[260px] w-full p-12 border-2 border-dashed border-border/60 bg-surface/20 rounded-md cursor-pointer group hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]'
            },
            status: {
                default: '',
                error: 'border-red-500 bg-red-500/5',
                valid: 'border-accent bg-accent/5'
            },
            isPill: {
                true: 'rounded-full',
                false: ''
            }
        },
        defaultVariants: {
            variant: 'default',
            status: 'default',
            isPill: false
        }
    }
);

export type InputContainerVariantsProps = VariantProps<typeof inputContainerVariants>;