"use client";
import { useState } from "react";

const SECTIONS = [
  {
    id: "opening",
    title: "1. Opening",
    badge: "MANDATORY",
    content: [
      { type: "scripts", items: [
        { label: "Client (English)", text: `Good morning/afternoon/evening. My name is [Name], ID [##ID##]. I will be your Spanish interpreter. Everything you say will be interpreted and remain confidential. Please speak in short phrases.` },
        { label: "LEP (Target Language)", text: `Buenos dias/tardes/noches. Yo sere su interprete de Ingles. Todo lo que diga sera interpretado y mantenido confidencial. Por favor use frases cortas` },
      ]},
      { type: "checklist", items: ["Always include confidentiality (HIPAA)", "Set expectations for short segments"] },
    ],
  },
  {
    id: "core-rules",
    title: "2. Core Rules",
    content: [
      { type: "table-dos-donts",
        dos: ["Interpret everything", "Use first person", "Match tone & register", "Stay neutral", "Be accurate & complete"],
        donts: ["Omit or add information", 'Use "he says / she says"', "Simplify or change level", "Give advice or opinions", "Paraphrase unnecessarily"],
      },
      { type: "table-say-dontsay",
        say: ['"I have chest pain."', '"I need a refill."', 'Match tone: "I urgently need help."'],
        dontsay: ['"He says he has chest pain."', '"She said she needs a refill."', '"I need help." (loses urgency)'],
      },
    ],
  },
  {
    id: "intervention",
    title: "3. Intervention Protocol",
    content: [
      { type: "scripts", items: [{ label: "Always start with", text: "This is the interpreter speaking…" }] },
      { type: "checklist", items: ["Always identify yourself", "Keep it short and professional"] },
      { type: "use-for", label: "Use for", items: ["Repetition", "Clarification", "Verification", "Technical Issues"] },
      { type: "examples", items: [
        "This is the interpreter speaking. Could you please repeat the last sentence?",
        "This is the interpreter speaking. Could you please clarify the medication name?",
        "This is the interpreter speaking. To maintain accuracy, please speak in shorter segments.",
        "Interpreter Speaking, I'm having trouble hearing you clearly. Could you please speak a bit louder?",
      ]},
    ],
  },
  {
    id: "transparency",
    title: "4. Transparency Rule",
    badge: "CRITICAL",
    content: [
      { type: "rule", text: "If you speak to one party → you MUST inform the other" },
      { type: "checklist", items: ["No side conversations", "Both parties must stay informed"] },
      { type: "example-pair", items: [
        { label: "To LEP", text: "This is the interpreter. Could you repeat the phone number?" },
        { label: "Then to Client", text: "This is the interpreter speaking. I asked the patient to repeat the phone number. It is 512-356-2494." },
      ]},
    ],
  },
  {
    id: "flow",
    title: "5. Flow Management",
    content: [
      { type: "checklist", items: ["Keep a steady pace", "Ask for short segments if needed", "Stay efficient, especially in emergencies 🚨"] },
      { type: "avoid", items: ["Rush excessively", "Be too slow (causes delays)"] },
      { type: "scripts", items: [{ label: "When speaker is too long", text: "This is the interpreter speaking. Could you please speak in shorter segments so I can interpret everything accurately?" }] },
      { type: "table-dos-donts", label: "Filler words",
        dos: ['"I have been feeling dizzy for two days."'], donts: ['"Okay… so… um…"'],
        doLabel: "✔ Say", dontLabel: "❌ Avoid",
      },
    ],
  },
  {
    id: "role",
    title: "6. Role Boundaries",
    content: [
      { type: "rule", text: "You are a conduit only — follow the client's lead." },
      { type: "avoid", items: ["Give advice", "Ask extra questions", "Take over the call", "Lead the conversation"] },
      { type: "table-dos-donts",
        dos: ['"I think you should take this medication daily." (interpreted exactly)'],
        donts: ['"You should follow the doctor\'s advice."'],
        doLabel: "✔ DO (interpret only)", dontLabel: "❌ DON'T (add input)",
      },
      { type: "scripts", items: [{ label: "If pressured", text: "This is the interpreter speaking. I will interpret everything said, but I cannot provide advice." }] },
    ],
  },
  {
    id: "notes",
    title: "7. Note-Taking & Resourcefulness",
    content: [
      { type: "use-for", label: "Always note", items: ["Numbers", "Names", "Addresses", "Dosages", "Dates of Birth", "Billing Amounts", "Technical Terminology"] },
      { type: "checklist", items: ["If unsure — ask for clarification", "Use resources/dictionary", "Don't guess"] },
      { type: "scripts", items: [
        { label: "If unclear", text: "This is the interpreter speaking. Could you please repeat the insurance plan name?" },
        { label: "If terminology is unknown", text: "This is the interpreter speaking. Could you please spell that term?" },
      ]},
    ],
  },
  {
    id: "delivery",
    title: "8. Professional Delivery",
    content: [
      { type: "checklist", items: ["Clear voice projection", "Professional tone — calm, clear, neutral, polite", "Stay engaged at all times"] },
      { type: "avoid", items: ["Laughing or reacting emotionally", "Filler words (um, okay, so…)"] },
    ],
  },
  {
    id: "environment",
    title: "9. Work Environment",
    content: [
      { type: "checklist", items: ["Quiet setting", "No background noise", "No distractions"] },
      { type: "avoid", items: ["Talking over noise", "Multitasking"] },
      { type: "scripts", items: [{ label: "If noise interferes", text: "This is the interpreter speaking. I'm having difficulty hearing due to background noise on your end. Could you please repeat that?" }] },
    ],
  },
  {
    id: "hold",
    title: "10. Standard Hold Time Policy",
    content: [
      { type: "rule", text: "Standard: 15 minutes — resets if client returns." },
      { type: "scripts", items: [
        { label: "When placed on hold", text: "This is your interpreter. I will remain on hold for up to 15 minutes. If you return before that and ask me to continue waiting, the timer will restart." },
        { label: "After 15 minutes", text: "This is the interpreter speaking. It has been 15 minutes, and due to policy, I will now disconnect. You may call back for another interpreter." },
      ]},
    ],
  },
  {
    id: "scenarios",
    title: "11. Special Scenarios",
    content: [
      { type: "scenario-list", items: [
        { label: "Wrong Language", script: "This is the interpreter speaking. It appears this is not the correct language. Please call back and request the appropriate language." },
        { label: "Bad Connection", script: "This is the interpreter speaking. I am experiencing difficulty hearing. Could you please repeat?", follow: "This is the interpreter speaking. Due to the connection issues, I'm having difficulty maintaining accuracy. How would you like to proceed?" },
        { label: "Shadowing (LEP speaks English)", script: "This is the interpreter speaking. The patient is communicating in English. How would you like me to proceed?" },
      ]},
    ],
  },
  {
    id: "vri",
    title: "12. VRI Protocol",
    content: [
      { type: "checklist", label: "Camera", items: [
        "Camera must be ON at all times (unless client requests otherwise)",
        "Steady, centered, at eye level, head & shoulders visible",
        "Face clearly lit — avoid backlighting",
        "Clean, professional, distraction-free background",
      ]},
      { type: "checklist", label: "On-Camera", items: [
        "Alert posture, minimal movement",
        "Look at the camera, not the screen",
        "Place notes vertically near the camera",
        "Professional dress — follow company code",
      ]},
      { type: "avoid", items: ["Eating or drinking", "Looking away for long periods", "Multitasking"] },
      { type: "quick-check", items: ["Camera ON?", "Face centered & visible?", "Lighting clear?", "Background clean?", "Eye contact maintained?"] },
    ],
  },
  {
    id: "closing",
    title: "13. Closing",
    badge: "MANDATORY",
    content: [
      { type: "scripts", items: [
        { label: "Client — check for more", text: "Is there anything else I can assist you with?" },
        { label: "Client — then close", text: "Thank you for using our services. This is [Name], ID [ID]. Have a nice day." },
        { label: "LEP", text: "Goodbye, have a nice day. (in target language)" },
      ]},
      { type: "rule", text: "🚨 Immediately hang up after closing. Do NOT stay on the line." },
    ],
  },
];

const MISTAKES = [
  { mistake: "No name/ID at end", fix: "Always include full closing script" },
  { mistake: "No intervention phrase", fix: 'Always start with "This is the interpreter speaking"' },
  { mistake: "Side conversations", fix: "Always explain to both parties" },
  { mistake: "Slow pacing", fix: "Keep delivery concise and responsive" },
  { mistake: "Taking over call", fix: "Let the client lead" },
  { mistake: "Not first person", fix: "Speak as the speaker" },
  { mistake: "Background noise", fix: "Ensure quiet or address it immediately" },
];

function ScriptBlock({ label, text }: { label: string; text: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-mid)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 5 }}>{label}</p>
      <p style={{ fontSize: 12.5, color: "#0f172a", background: "#f0fdfa", border: "1px solid #ccfbf1", borderRadius: 6, padding: "9px 11px", lineHeight: 1.6, fontStyle: "italic" }}>"{text}"</p>
    </div>
  );
}

function Checklist({ items, label }: { items: string[]; label?: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-mid)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>{label}</p>}
      <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: "var(--text-dark)", lineHeight: 1.5 }}>
            <span style={{ color: "#16a34a", marginTop: 1, flexShrink: 0 }}>✔</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AvoidList({ items }: { items: string[] }) {
  return (
    <ul style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12.5, color: "var(--text-mid)", lineHeight: 1.5 }}>
          <span style={{ color: "#dc2626", marginTop: 1, flexShrink: 0 }}>✗</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DosDontsTable({ dos, donts, doLabel = "✔ DO", dontLabel = "❌ DON'T" }: { dos: string[]; donts: string[]; doLabel?: string; dontLabel?: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 6, padding: 10 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: "#166534", marginBottom: 6 }}>{doLabel}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {dos.map((d, i) => <p key={i} style={{ fontSize: 11.5, color: "#166534", lineHeight: 1.5 }}>{d}</p>)}
        </div>
      </div>
      <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, padding: 10 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: "#991b1b", marginBottom: 6 }}>{dontLabel}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {donts.map((d, i) => <p key={i} style={{ fontSize: 11.5, color: "#991b1b", lineHeight: 1.5 }}>{d}</p>)}
        </div>
      </div>
    </div>
  );
}

function UseFor({ label, items }: { label: string; items: string[] }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-mid)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>{label}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {items.map((item, i) => (
          <span key={i} style={{ fontSize: 10.5, background: "var(--bg-main)", color: "var(--text-mid)", border: "1px solid var(--border)", borderRadius: 4, padding: "4px 8px" }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function ExamplePair({ items }: { items: { label: string; text: string }[] }) {
  return (
    <div style={{ marginBottom: 14, display: "flex", flexDirection: "column", gap: 4 }}>
      {items.map((item, i) => <ScriptBlock key={i} label={item.label} text={item.text} />)}
    </div>
  );
}

function ScenarioList({ items }: { items: { label: string; script: string; follow?: string }[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 14 }}>
      {items.map((item, i) => (
        <div key={i} style={{ paddingBottom: i < items.length - 1 ? 14 : 0, borderBottom: i < items.length - 1 ? "1px solid var(--border)" : "none" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-dark)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>{item.label}</p>
          <ScriptBlock label="Script" text={item.script} />
          {item.follow && <ScriptBlock label="If unresolved" text={item.follow} />}
        </div>
      ))}
    </div>
  );
}

function QuickCheck({ items }: { items: string[] }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-mid)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>⚠️ Quick Visual Check</p>
      <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 6, padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item, i) => <p key={i} style={{ fontSize: 11.5, color: "#92400e", lineHeight: 1.5 }}>✔ {item}</p>)}
      </div>
    </div>
  );
}

function RuleBlock({ text }: { text: string }) {
  return (
    <div style={{ marginBottom: 14, background: "var(--bg-main)", borderLeft: "3px solid #0d9488", padding: "10px 12px", borderRadius: "0 6px 6px 0" }}>
      <p style={{ fontSize: 12.5, color: "var(--text-dark)", lineHeight: 1.5, fontWeight: 600 }}>{text}</p>
    </div>
  );
}

function renderBlock(block: any, idx: number) {
  switch (block.type) {
    case "scripts":
      return <div key={idx}>{block.items.map((s: any, i: number) => <ScriptBlock key={i} label={s.label} text={s.text} />)}</div>;
    case "checklist":
      return <Checklist key={idx} items={block.items} label={block.label} />;
    case "avoid":
      return <AvoidList key={idx} items={block.items} />;
    case "table-dos-donts":
      return <DosDontsTable key={idx} dos={block.dos} donts={block.donts} doLabel={block.doLabel} dontLabel={block.dontLabel} />;
    case "table-say-dontsay":
      return <DosDontsTable key={idx} dos={block.say} donts={block.dontsay} doLabel="✔ Say" dontLabel="❌ DON'T Say" />;
    case "use-for":
      return <UseFor key={idx} label={block.label} items={block.items} />;
    case "examples":
      return (
        <div key={idx} style={{ marginBottom: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-mid)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Examples</p>
          {block.items.map((ex: string, i: number) => (
            <p key={i} style={{ fontSize: 11, color: "var(--text-dark)", background: "var(--bg-main)", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 8px", fontStyle: "italic", lineHeight: 1.4 }}>{ex}</p>
          ))}
        </div>
      );
    case "example-pair":
      return <ExamplePair key={idx} items={block.items} />;
    case "scenario-list":
      return <ScenarioList key={idx} items={block.items} />;
    case "quick-check":
      return <QuickCheck key={idx} items={block.items} />;
    case "rule":
      return <RuleBlock key={idx} text={block.text} />;
    default:
      return null;
  }
}

export default function ProtocolCheatSheet() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = SECTIONS.filter((s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return s.title.toLowerCase().includes(q) || JSON.stringify(s.content).toLowerCase().includes(q);
  });

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div style={{ padding: "16px 16px 8px" }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: "var(--text-dark)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
          🎧 Interpreter Protocol
        </h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search protocol…"
          style={{
            width: "100%",
            padding: "8px 12px",
            fontSize: 13,
            background: "var(--bg-main)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            outline: "none",
            color: "var(--text-dark)",
          }}
        />
      </div>

      <div className="flex-1 overflow-y-auto" style={{ padding: "0 14px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {!searchQuery && (
          <div style={{ marginBottom: 2, border: "1px solid var(--border)", borderRadius: 8 }}>
            <div style={{ background: "#334155", padding: "8px 12px" }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.06em" }}>⚠️ Top Common Mistakes</p>
            </div>
            <table style={{ width: "100%", fontSize: 10.5, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--bg-main)" }}>
                  <th style={{ padding: "6px 8px", textAlign: "left", color: "#dc2626", fontWeight: 700 }}>❌ Mistake</th>
                  <th style={{ padding: "6px 8px", textAlign: "left", color: "#166534", fontWeight: 700 }}>✔ Fix</th>
                </tr>
              </thead>
              <tbody>
                {MISTAKES.map((m, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "var(--bg-panel)" : "var(--bg-main)" }}>
                    <td style={{ padding: "6px 8px", color: "var(--text-mid)", lineHeight: 1.5, borderTop: "1px solid var(--border)" }}>{m.mistake}</td>
                    <td style={{ padding: "6px 8px", color: "var(--text-dark)", lineHeight: 1.5, borderTop: "1px solid var(--border)" }}>{m.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!searchQuery && (
          <div style={{ marginBottom: 2, background: "#0d9488", borderRadius: 8, padding: "10px 12px" }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "white", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>🧠 Quick Mindset</p>
            <p style={{ fontSize: 11.5, color: "#99f6e4", lineHeight: 1.5 }}>Open properly → interpret everything → add nothing → be transparent → intervene properly → close properly</p>
          </div>
        )}

        {filteredSections.map((section) => {
          const isOpen = activeSection === section.id;
          return (
            <div key={section.id} style={{ border: "1px solid var(--border)", borderRadius: 8 }}>
              <button
                onClick={() => setActiveSection(isOpen ? null : section.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  textAlign: "left",
                  background: isOpen ? "#f0fdfa" : "var(--bg-panel)",
                  borderBottom: isOpen ? "1px solid #ccfbf1" : "none",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text-dark)" }}>{section.title}</span>
                  {section.badge && (
                    <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.04em", background: "#dcfce7", color: "#166534" }}>
                      {section.badge}
                    </span>
                  )}
                </div>
                <span style={{ color: "var(--text-mid)", fontSize: 11, flexShrink: 0, marginLeft: 8 }}>{isOpen ? "▲" : "▼"}</span>
              </button>

              {isOpen && (
                <div style={{ padding: "14px 14px 4px", background: "var(--bg-panel)", maxHeight: 480, overflowY: "auto" }}>
                  {section.content.map((block, idx) => renderBlock(block, idx))}
                </div>
              )}
            </div>
          );
        })}

        {filteredSections.length === 0 && (
          <p style={{ fontSize: 13, color: "var(--text-mid)", textAlign: "center", padding: "32px 0" }}>No results found.</p>
        )}
      </div>
    </div>
  );
}
