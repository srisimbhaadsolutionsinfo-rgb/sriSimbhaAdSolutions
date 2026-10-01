import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { cx } from "../../../utils/helpers";

/*
 * Button variants.
 *
 * The primary was `bg-brand-400` (#fbbf24) with `text-white`, which measures
 * 1.67:1 — a fail by a factor of nearly three, and the most obviously broken
 * thing about light mode.
 *
 * The fill ramp is still the brand amber, but it now runs from `brand-600`
 * downward, and only the 600/700 steps carry white text:
 *
 *   brand-600 #d97706 on white text   3.19:1  — large text only
 *   brand-700 #b45309 on white text   5.02:1  — AA for normal text
 *
 * `brand-700` is the fill at every size. An earlier revision used `brand-600`
 * at the `lg` size on the theory that 16px semibold counts as large text; it
 * does not — WCAG large text is >=18.66px **bold** (>=700), and `font-semibold`
 * is 600, so 16px/600 is normal text needing 4.5:1 and measured 3.19:1. The
 * `lg` exception is gone.
 *
 * Hover deepens rather than brightens. On a light page a lighter hover reads as
 * the button losing focus.
 *
 * Each variant keeps an explicit `dark:` twin so the dark theme is untouched.
 */
const VARIANTS = {
  primary:
    "bg-brand-700 text-white shadow-[var(--shadow-raised)] hover:bg-brand-800 " +
    "active:bg-brand-800 " +
    "dark:bg-brand-500 dark:text-gray-900 dark:hover:bg-brand-400 " +
    "dark:shadow-[var(--shadow-card)] focus-visible:outline-brand-700",
  gradient:
    "bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-[var(--shadow-raised)] " +
    "hover:from-brand-700 hover:to-brand-800 active:from-brand-800 " +
    "dark:from-brand-500 dark:to-brand-600 dark:text-gray-900 " +
    "dark:hover:from-brand-400 dark:hover:to-brand-500 dark:shadow-[var(--shadow-card)]",
  outline:
    "border-2 border-brand-700 text-brand-800 hover:bg-brand-700 hover:text-white " +
    "active:bg-brand-800 " +
    "dark:border-brand-400 dark:text-brand-300 dark:hover:bg-brand-500 dark:hover:text-gray-900",
  ghost:
    "text-[color:var(--color-text-muted)] hover:bg-black/[0.05] hover:text-[color:var(--color-text)] " +
    "dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white",
};

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-8 py-3.5 text-base",
};

/**
 * The one button in the design system.
 *
 * Renders a real `<button>`, or a react-router `<Link>` / `<a>` when `to` /
 * `href` is supplied — which keeps interactive markup free of nested
 * `<button>`-inside-`<a>` (an accessibility and HTML-validity problem in the
 * original services CTA).
 */
const Button = forwardRef(
  (
    {
      as,
      to,
      href,
      variant = "primary",
      size = "md",
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const Component = as || (to ? Link : href ? "a" : "button");

    const isNativeButton = Component === "button";

    return (
      <Component
        ref={ref}
        to={to}
        href={href}
        type={isNativeButton ? "button" : undefined}
        className={cx(
          "inline-flex items-center justify-center gap-2 rounded-pill font-semibold",
          "transition duration-300 ease-standard",
          "hover:scale-105 active:scale-95 motion-reduce:hover:scale-100",
          VARIANTS[variant],
          SIZES[size],
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

export default Button;
