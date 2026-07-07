import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";

type ButtonVariant = "default" | "outline";
type ButtonSize = "default" | "lg";

type ButtonProps = {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-full active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(
    base,
    size === "lg" ? "h-12 px-7 text-base" : "h-10 px-5 text-sm",
    variant === "outline"
      ? "border border-brand-line bg-transparent text-brand-navy hover:border-brand-teal hover:text-brand-teal"
      : "bg-brand-teal text-white shadow-[0_12px_28px_-12px_rgba(176, 90, 51,0.55)] hover:bg-brand-navy hover:shadow-[0_12px_28px_-12px_rgba(10,22,40,0.45)] hover:-translate-y-0.5",
    className,
  );
}

export function Button({
  asChild = false,
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = buttonClasses(variant, size, className);

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "default",
  size = "default",
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClasses(variant, size, className)}>
      {children}
    </Link>
  );
}
