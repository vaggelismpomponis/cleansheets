"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface LogoProps {
  /** Display format */
  variant?: "full" | "mark" | "compact";
  /** Color theme */
  theme?: "light" | "dark" | "auto";
  /** Size preset */
  size?: "sm" | "md" | "lg" | "xl";
  /** Whether to show the subtitle/tagline in full variant */
  showSubtitle?: boolean;
  /** Custom subtitle text */
  subtitle?: string;
  /** Additional container classes */
  className?: string;
  /** Hover animations */
  animated?: boolean;
  /** Override brand title text */
  brandName?: string;
}

export function LogoIcon({
  size = "md",
  className,
  animated = true,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean;
}) {
  const sizeMap = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl",
    lg: "w-12 h-12 rounded-2xl",
    xl: "w-16 h-16 rounded-2xl",
  };

  const iconPaddingMap = {
    sm: "p-1",
    md: "p-1.5",
    lg: "p-2",
    xl: "p-2.5",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 select-none transition-all duration-300",
        "bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] shadow-md shadow-teal/25 border border-white/25",
        sizeMap[size],
        iconPaddingMap[size],
        animated && "group-hover:scale-105 group-hover:shadow-teal/45 group-hover:shadow-lg",
        className
      )}
    >
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Dynamic Folded Linen / Modern E Curves */}
        {/* Top Wave */}
        <path
          d="M34 40 C 34 35, 42 32, 54 32 C 68 32, 78 37, 82 41 C 83.5 42.5, 82 45, 79.5 44.5 C 72 43, 62 42.5, 52 44.5 C 44 46, 38 48.5, 34 52 Z"
          fill="#FFFFFF"
          fillOpacity="0.96"
        />

        {/* Spine & Center Wave */}
        <path
          d="M32 36 C 33 36, 34 37, 34 39 L 34 81 C 34 83, 32 84, 30.5 83 C 29.5 82, 29 80.5, 29 79 L 29 38 C 29 36.8, 30.5 36, 32 36 Z"
          fill="#FFFFFF"
          fillOpacity="0.92"
        />
        <path
          d="M34 58 C 42 56, 52 55.5, 62 57 C 67 57.8, 70 59, 71.5 60.5 C 72.5 61.5, 71.5 63, 69.5 63 C 61 62.5, 50 63.5, 34 68 Z"
          fill="#FFFFFF"
          fillOpacity="0.88"
        />

        {/* Bottom Wave */}
        <path
          d="M34 76 C 42 74, 56 73.5, 68 76 C 76 77.8, 83 81.5, 87 85 C 88.5 86.3, 87 88.5, 84.5 88 C 74 86, 60 84.5, 48 86.5 C 41 87.8, 36 90, 32 93 C 30.5 94.2, 29 93, 29.5 91 C 31 85, 32.5 80, 34 76 Z"
          fill="#FFFFFF"
        />

        {/* Primary Sparkle Star */}
        <g transform="translate(86, 32)">
          <path
            d="M0 -15 C 0.8 -4, 4 -0.8, 15 0 C 4 0.8, 0.8 4, 0 15 C -0.8 4, -4 0.8, -15 0 C -4 -0.8, -0.8 -4, 0 -15 Z"
            fill="#FFFFFF"
          />
          <circle cx="0" cy="0" r="3.5" fill="#FCD34D" />
          <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
        </g>

        {/* Secondary Sparkle Star */}
        <g transform="translate(74, 18) scale(0.45)">
          <path
            d="M0 -12 C 0.6 -3, 3 -0.6, 12 0 C 3 0.6, 0.6 3, 0 12 C -0.6 3, -3 0.6, -12 0 C -3 -0.6, -0.6 -3, 0 -12 Z"
            fill="#FCD34D"
          />
        </g>
      </svg>
    </div>
  );
}

export default function Logo({
  variant = "full",
  theme = "auto",
  size = "md",
  showSubtitle = false,
  subtitle = "Hospitality & Cleaning",
  className,
  animated = true,
  brandName = "Ephtopia Cleans",
}: LogoProps) {
  if (variant === "mark") {
    return <LogoIcon size={size} className={className} animated={animated} />;
  }

  // Parse brand name into main word & second word if available
  const parts = brandName.trim().split(" ");
  const firstWord = parts[0] || "Ephtopia";
  const secondWord = parts.slice(1).join(" ") || "Cleans";

  // Text size classes
  const titleSizeMap = {
    sm: "text-base tracking-tight",
    md: "text-lg sm:text-[19px] tracking-tight",
    lg: "text-xl sm:text-2xl tracking-tight",
    xl: "text-2xl sm:text-3xl tracking-tight",
  };

  const subtitleSizeMap = {
    sm: "text-[9px] tracking-widest",
    md: "text-[10px] tracking-widest",
    lg: "text-[11px] tracking-widest",
    xl: "text-xs tracking-widest",
  };

  // Theme color styles
  const firstWordColor =
    theme === "dark"
      ? "text-white"
      : theme === "light"
      ? "text-slate-900"
      : "text-slate-900 dark:text-white";

  const secondWordColor = "text-teal";

  const subtitleColor =
    theme === "dark"
      ? "text-slate-400"
      : "text-slate-400";

  return (
    <div className={cn("inline-flex items-center gap-2.5 sm:gap-3 group select-none", className)}>
      <LogoIcon size={size} animated={animated} />

      <div className="flex flex-col leading-none">
        <div className={cn("font-bold font-heading flex items-center gap-1.5", titleSizeMap[size])}>
          <span className={cn("transition-colors duration-200", firstWordColor)}>
            {firstWord}
          </span>
          <span className={cn("font-extrabold transition-colors duration-200", secondWordColor)}>
            {secondWord}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0 animate-pulse" />
        </div>

        {showSubtitle && (
          <span
            className={cn(
              "font-medium uppercase tracking-widest mt-0.5 transition-colors duration-200",
              subtitleSizeMap[size],
              subtitleColor
            )}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
