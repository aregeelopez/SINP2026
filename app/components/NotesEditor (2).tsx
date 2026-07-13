"use client";
import { useCallback, useRef } from "react";

interface Props {
  notes: string;
  onChange: (v: string) => void;
}

export default function NotesEditor({ notes, onChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = notes.trim() ? notes.trim().split(/\s+/).length : 0;
  const charCount = notes.length;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const el = e.currentTarget;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const newVal = notes.slice(0, start) + "  " + notes.slice(end);
        onChange(newVal);
        requestAnimationFrame(() => {
          el.selectionStart = el.selectionEnd = start + 2;
        });
      }
    },
    [notes, onChange]
  );

  return (
    <div className="flex-1 flex flex-col h-full">
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ background: "var(--bg-panel)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--accent)" }}>
            Interpreter Notes
          </span>
          <span style={{ color: "var(--text-soft)" }}>|</span>
          <span className="text-xs" style={{ color: "var(--text-soft)" }}>Ephemeral — not saved</span>
        </div>

        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "red" }}
        >
          VERIFY ALL NUMBERS!
        </span>

        <span className="text-xs" style={{ color: "var(--text-soft)" }}>
          {wordCount} words · {charCount} chars
        </span>
      </div>

      <div className="flex-1 relative overflow-hidden" style={{ background: "var(--bg-panel)" }}>
        <textarea
          ref={textareaRef}
          value={notes}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Start typing your interpretation notes here…\n\nNumbers you type will appear in the verification panel →`}
          className="absolute inset-0 w-full h-full p-6 resize-none outline-none"
          style={{
            background: "var(--bg-panel)",
            color: "var(--text-dark)",
            caretColor: "var(--accent)",
            fontSize: "0.875rem",
            lineHeight: "1.8",
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
          }}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
