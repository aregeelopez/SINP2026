"use client";
import { useState } from "react";

const PAIN_DESCRIPTORS = [
  { term: "Sharp pain", spanish: "Dolor agudo / punzante" },
  { term: "Dull pain", spanish: "Dolor sordo / leve" },
  { term: "Burning pain", spanish: "Dolor ardiente / quemazón" },
  { term: "Throbbing pain", spanish: "Dolor pulsátil / palpitante" },
  { term: "Stabbing pain", spanish: "Dolor punzante / como puñalada" },
  { term: "Shooting pain", spanish: "Dolor que se irradia / como descarga" },
  { term: "Cramping pain", spanish: "Dolor tipo cólico / calambre" },
  { term: "Aching pain", spanish: "Dolor molesto / persistente" },
  { term: "Pressure pain", spanish: "Dolor con sensación de presión" },
  { term: "Squeezing pain", spanish: "Dolor opresivo / como apretón" },
  { term: "Tearing pain", spanish: "Dolor desgarrante" },
  { term: "Gnawing pain", spanish: "Dolor corrosivo / roedor" },
  { term: "Radiating pain", spanish: "Dolor que se irradia / que se extiende" },
  { term: "Referred pain", spanish: "Dolor referido" },
  { term: "Constant pain", spanish: "Dolor constante / continuo" },
  { term: "Intermittent pain", spanish: "Dolor intermitente" },
  { term: "Sudden pain", spanish: "Dolor repentino / súbito" },
  { term: "Gradual pain", spanish: "Dolor gradual / progresivo" },
  { term: "Tingling", spanish: "Hormigueo" },
  { term: "Numbness", spanish: "Entumecimiento / adormecimiento" },
  { term: "Electric shock sensation", spanish: "Sensación de descarga eléctrica" },
  { term: "Pins and needles", spanish: "Sensación de agujas / acorchamiento" },
  { term: "Itching", spanish: "Picazón / comezón" },
  { term: "Tenderness", spanish: "Sensibilidad al tacto / dolor a la palpación" },
  { term: "Rawness", spanish: "Sensación en carne viva" },
  { term: "Heaviness", spanish: "Sensación de pesadez" },
  { term: "Tightness", spanish: "Sensación de tensión / apretamiento" },
  { term: "Fullness", spanish: "Sensación de llenura / distensión" },
  { term: "Pain at rest", spanish: "Dolor en reposo" },
  { term: "Pain with movement", spanish: "Dolor al moverse" },
  { term: "Pain worse at night", spanish: "Dolor que empeora de noche" },
  { term: "Pain worse in the morning", spanish: "Dolor que empeora por la mañana" },
  { term: "Pain after eating", spanish: "Dolor después de comer" },
  { term: "Pain that wakes me up", spanish: "Dolor que me despierta" },
  { term: "Pain comes and goes", spanish: "Dolor que va y viene" },
  { term: "Pain spreading", spanish: "Dolor que se extiende / que se propaga" },
];

const SCALE_LABELS: Record<number, { en: string; es: string }> = {
  1:  { en: "Minimal",       es: "Mínimo" },
  2:  { en: "Mild",          es: "Leve" },
  3:  { en: "Uncomfortable", es: "Incómodo" },
  4:  { en: "Moderate",      es: "Moderado" },
  5:  { en: "Distressing",   es: "Angustiante" },
  6:  { en: "Intense",       es: "Intenso" },
  7:  { en: "Severe",        es: "Severo" },
  8:  { en: "Very Severe",   es: "Muy severo" },
  9:  { en: "Excruciating",  es: "Insoportable" },
  10: { en: "Unbearable",    es: "Inaguantable" },
};

const SCALE_COLORS: Record<number, string> = {
  1:  "bg-emerald-500 border-emerald-600 text-white",
  2:  "bg-green-500 border-green-600 text-white",
  3:  "bg-lime-500 border-lime-600 text-white",
  4:  "bg-yellow-400 border-yellow-500 text-slate-800",
  5:  "bg-amber-400 border-amber-500 text-slate-800",
  6:  "bg-orange-400 border-orange-500 text-white",
  7:  "bg-orange-500 border-orange-600 text-white",
  8:  "bg-red-500 border-red-600 text-white",
  9:  "bg-red-600 border-red-700 text-white",
  10: "bg-red-800 border-red-900 text-white",
};

const INACTIVE = "bg-white border-slate-200 text-slate-500 hover:border-teal-400 hover:text-teal-600";

interface Props {
  onAppend: (text: string) => void;
}

export default function PainAssessment({ onAppend }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const filtered = PAIN_DESCRIPTORS.filter(
    (d) =>
      d.term.toLowerCase().includes(search.toLowerCase()) ||
      d.spanish.toLowerCase().includes(search.toLowerCase())
  );

  const handleScale = (n: number) => {
    const isDeselect = selected === n;
    setSelected(isDeselect ? null : n);
    if (!isDeselect) {
      const label = SCALE_LABELS[n];
      const text = `[Pain ${n} - ${label.en} / ${label.es}]`;
      onAppend(text);
      setLastAdded(text);
      setTimeout(() => setLastAdded(null), 1500);
    }
  };

  const handleDescriptor = (d: { term: string; spanish: string }) => {
    const text = `[${d.term} / ${d.spanish}]`;
    onAppend(text);
    setLastAdded(text);
    setTimeout(() => setLastAdded(null), 1500);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Pain Scale */}
      <div className="px-4 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
          🚑Pain Scale (1–10)
        </h2>
        <p className="text-[10px] mb-2" style={{ color: "var(--text-soft)" }}>Click a number to add to notes</p>
        <div className="grid grid-cols-5 gap-1.5 mb-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => handleScale(n)}
              className={`rounded-lg border-2 py-2 text-sm font-bold transition-all ${
                selected === n ? SCALE_COLORS[n] : INACTIVE
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        {selected && (
          <div className="mt-2 rounded-lg px-3 py-2 text-center" style={{ background: "var(--bg-dark)", border: "1px solid var(--border)" }}>
            <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>
              {selected} — {SCALE_LABELS[selected].en} / {SCALE_LABELS[selected].es}
            </span>
          </div>
        )}
        {lastAdded && (
          <div className="mt-1 rounded px-2 py-1 text-center bg-green-50 border border-green-200">
            <span className="text-[10px] text-green-700 font-mono">✓ Added to notes</span>
          </div>
        )}
      </div>

      {/* Pain Descriptors */}
      <div className="px-4 pt-3 pb-2">
        <h2 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>
          📋 Pain Descriptors
        </h2>
        <p className="text-[10px] mb-2" style={{ color: "var(--text-soft)" }}>Click any descriptor to add to notes</p>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search descriptors…"
          className="w-full px-3 py-2 text-sm rounded-lg outline-none transition-colors"
          style={{
            background: "var(--bg-main)",
            border: "1px solid var(--border)",
            color: "var(--text-dark)",
          }}
        />
        <p className="text-[10px] mt-1" style={{ color: "var(--text-soft)" }}>{filtered.length} descriptors</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
        {filtered.map((d, i) => (
          <button
            key={i}
            onClick={() => handleDescriptor(d)}
            className="w-full text-left p-3 rounded-lg transition-all group cursor-pointer"
            style={{
              background: "var(--bg-panel)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-dark)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-panel)";
            }}
          >
            <div className="text-xs font-medium mb-0.5" style={{ color: "var(--text-mid)" }}>{d.term}</div>
            <div className="text-sm font-semibold" style={{ color: "var(--accent)" }}>{d.spanish}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
