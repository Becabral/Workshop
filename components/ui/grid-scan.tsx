"use client";

import { cn } from "@/lib/utils";

interface GridScanProps {
  className?: string;
  children?: React.ReactNode;
  lineColor?: string;
  scanColor?: string;
  gridSize?: number;
  scanDuration?: number;
}

export function GridScan({
  className,
  children,
  lineColor = "rgba(243, 112, 33, 0.08)",
  scanColor = "rgba(243, 112, 33, 0.15)",
  gridSize = 60,
  scanDuration = 4,
}: GridScanProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${lineColor} 1px, transparent 1px),
            linear-gradient(90deg, ${lineColor} 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Horizontal scan beam */}
      <div
        className="pointer-events-none absolute inset-x-0 h-[120px]"
        style={{
          background: `linear-gradient(
            180deg,
            transparent 0%,
            ${scanColor} 30%,
            rgba(243, 112, 33, 0.35) 50%,
            ${scanColor} 70%,
            transparent 100%
          )`,
          animation: `gridScanV ${scanDuration}s ease-in-out infinite`,
        }}
      />

      {/* Vertical scan beam (slower, subtler) */}
      <div
        className="pointer-events-none absolute inset-y-0 w-[200px]"
        style={{
          background: `linear-gradient(
            90deg,
            transparent 0%,
            rgba(243, 112, 33, 0.06) 30%,
            rgba(243, 112, 33, 0.12) 50%,
            rgba(243, 112, 33, 0.06) 70%,
            transparent 100%
          )`,
          animation: `gridScanH ${scanDuration * 1.5}s ease-in-out infinite`,
        }}
      />

      {/* Glow at center */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 60% 50% at 50% 50%,
            rgba(243, 112, 33, 0.04) 0%,
            transparent 70%
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      <style>{`
        @keyframes gridScanV {
          0%, 100% { top: -120px; }
          50% { top: calc(100% + 120px); }
        }
        @keyframes gridScanH {
          0%, 100% { left: -200px; }
          50% { left: calc(100% + 200px); }
        }
      `}</style>
    </div>
  );
}
