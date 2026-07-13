"use client";
import { useMemo } from "react";

function extractNumbers(text: string) {
  const numberRegex = /(\d[\d.,]*)/g;
  const found: string[] = [];
  const seen = new Set<string>();
  let match;
  while ((match = numberRegex.exec(text)) !== null) {
    const num = match[1];
    if (seen.has(num)) continue;
    seen.add(num);
    found.push(num);
  }
  return found;
}

interface Props {
  notes: string;
  verified: Set<string>;
  onToggle: (num: string) => void;
}

export default function NumberVerification({ notes, verified, onToggle }: Props) {
  const numbers = useMemo(() => extractNumbers(notes), [notes]);
  return (
    <div className="p-4 space-y-3">
      <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
        🔢 Number Verification
      </h2>
      {numbers.length === 0 ? (
        <p className="text-xs text-center py-8" style={{ color: "var(--text-soft)" }}>
          Numbers you type in your notes will appear here for quick verification.
        </p>
      ) : (
        <div className="space-y-2">
          {numbers.map((num, i) => {
            const isVerified = verified.has(num);
            return (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg border transition-all"
                style={{
                  background: isVerified ? "#f0fdf4" : "#fffbeb",
                  borderColor: isVerified ? "#86efac" : "#fcd34d",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm" style={{ color: isVerified ? "#15803d" : "#92400e" }}>
                    {num}
                  </span>
                  <span className="text-xs" style={{ color: isVerified ? "#86efac" : "#fcd34d" }}>
                    #{i + 1}
                  </span>
                </div>
                <button
                  onClick={() => onToggle(num)}
                  className="text-xs font-bold px-3 py-1 rounded-lg transition-all"
                  style={{
                    background: isVerified ? "#22c55e" : "#f59e0b",
                    color: "white",
                  }}
                >
                  {isVerified ? "✓ VERIFIED" : "VERIFY"}
                </button>
              </div>
            );
          })}
        </div>
      )}
      {numbers.length > 0 && (
        <p className="text-[10px] text-center pt-2" style={{ color: "var(--text-soft)" }}>
          {verified.size} of {numbers.length} verified
        </p>
      )}
    </div>
  );
}
