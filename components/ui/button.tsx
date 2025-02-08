import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-[#0F172A] dark:focus-visible:ring-[#4ADE80]",
  {
    variants: {
      variant: {
        default:
          "bg-[#4ADE80] text-[#0F172A] hover:bg-[#22C55E] dark:bg-[#4ADE80] dark:text-[#0F172A] dark:hover:bg-[#22C55E]",
        destructive:
          "bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
        outline:
          "border border-[#4ADE80] bg-transparent hover:bg-[#4ADE80]/10 hover:text-[#4ADE80] dark:border-[#4ADE80] dark:hover:bg-[#4ADE80]/10 dark:hover:text-[#4ADE80]",
        secondary:
          "bg-[#22C55E] text-[#0F172A] hover:bg-[#22C55E]/80 dark:bg-[#22C55E] dark:text-[#0F172A] dark:hover:bg-[#22C55E]/80",
        ghost: "hover:bg-[#4ADE80]/10 hover:text-[#4ADE80] dark:hover:bg-[#4ADE80]/10 dark:hover:text-[#4ADE80]",
        link: "text-[#4ADE80] underline-offset-4 hover:underline dark:text-[#4ADE80]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }