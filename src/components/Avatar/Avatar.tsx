import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const avatarVariants = cva("relative inline-flex shrink-0 overflow-hidden rounded-full", {
  variants: {
    size: {
      xs: "w-6 h-6 text-[10px]",
      sm: "w-8 h-8 text-[12px]",
      md: "w-10 h-10 text-[14px]",
      lg: "w-12 h-12 text-[16px]",
      xl: "w-16 h-16 text-[20px]",
    },
  },
  defaultVariants: { size: "md" },
});

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, src, alt, fallback, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size }), className)}
    {...props}
  >
    <AvatarPrimitive.Image
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
    />
    <AvatarPrimitive.Fallback
      className="w-full h-full flex items-center justify-center bg-[var(--color-muted)] text-[var(--color-muted-foreground)] font-semibold"
    >
      {fallback ?? alt?.slice(0, 1).toUpperCase() ?? "?"}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
));
Avatar.displayName = "Avatar";

export { Avatar };
