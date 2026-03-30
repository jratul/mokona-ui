import * as React from "react";
import { type LucideIcon, type LucideProps } from "lucide-react";
import { cn } from "../../utils/cn";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconProps extends Omit<LucideProps, "size"> {
  icon: LucideIcon;
  size?: IconSize | number;
  label?: string;
}

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon: LucideIconComponent, size = "md", label, className, ...props }, ref) => {
    const px = typeof size === "number" ? size : sizeMap[size];

    return (
      <LucideIconComponent
        ref={ref}
        size={px}
        aria-label={label}
        aria-hidden={!label}
        className={cn("shrink-0", className)}
        {...props}
      />
    );
  }
);
Icon.displayName = "Icon";

export { Icon };
