"use client";
import { useMemo } from "react";
import { extractVerificationTokens } from "../lib/extractVerificationTokens";

interface Props {
  notes: string;
  verified: Set<string>;
  onToggle: (tokenId: string) => void;
}

export default function NumberVerification({ notes, verified, onToggle }: Props) {
  const tokens = useMemo(() => extractVerificationTokens(notes), [notes]);
  return (
    <div className="p-4 space-y-3">
      <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
        🔢 Number Verification
      </h2>
      {tokens.length === 0 ? (
        <p className="text-xs text-center py-8" style={{ color: "var(--text-soft)" }}>
          Numbers you type in your notes will appear here for quick verification.
        </p>
      ) : (
        <div className="space-y-2">
          {tokens.map((token, i) => {
            const isVerified = verified.has(token.id);
            return (
              <div
                key={token.id}
                className="flex items-center justify-between p-3 rounded-lg border transition-all"
                style={{
                  background: isVerified ? "#f0fdf4" : "#fffbeb",
                  borderColor: isVerified ? "#86efac" : "#fcd34d",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm" style={{ color: isVerified ? "#15803d" : "#92400e" }}>
                    {token.value}
                  </span>
                  <span className="text-xs" style={{ color: isVerified ? "#86efac" : "#fcd34d" }}>
                    #{i + 1}
                  </span>
                </div>
                <button
                  onClick={() => onToggle(token.id)}
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
      {tokens.length > 0 && (
        <p className="text-[10px] text-center pt-2" style={{ color: "var(--text-soft)" }}>
          {verified.size} of {tokens.length} verified
        </p>
      )}
    </div>
  );
}
