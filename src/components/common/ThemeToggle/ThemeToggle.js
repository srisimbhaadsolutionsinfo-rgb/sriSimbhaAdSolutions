import { Moon, Sun } from "lucide-react";

import { useTheme } from "../../../app/ThemeProvider";

/**
 * Light / dark switch.
 *
 * A single button that flips directly between the two themes. There is
 * intentionally no "system", "auto" or "monitor" option and no intermediate
 * state: the site has exactly two themes, and the control's job is to get
 * between them.
 *
 * `aria-label` names the *action* ("Switch to dark mode") rather than the
 * current state, which is what a screen reader should announce when focus
 * lands on a button — the current state is conveyed by the icon and by
 * `aria-pressed` is deliberately not used, because a toggle button whose label
 * already changes would read as two different buttons.
 *
 * `theme` is guaranteed to be `light` or `dark`: `ThemeProvider` resolves
 * anything else to the default before it reaches here.
 *
 * Sizing: the control is a 16px icon plus `p-2`, which measured 34x34px —
 * under the 44x44px minimum touch target (WCAG 2.2 "Target Size (Minimum)",
 * and it was the smallest hit area on the whole page). The icon and padding are
 * unchanged, so the button *looks* the same size; it simply reserves a 44x44px
 * hit area around itself, which is what a fingertip actually needs. The desktop
 * header control is visually larger already and is unaffected in appearance.
 */
const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";
  const nextLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={nextLabel}
      title={nextLabel}
      className={`inline-flex min-h-[2.75rem] min-w-[2.75rem] shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white/70 p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-700 ${className}`.trim()}
    >
      {isDark ? (
        <Sun size={16} aria-hidden="true" />
      ) : (
        <Moon size={16} aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
