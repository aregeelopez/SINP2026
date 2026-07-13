"use client";
import { useState, useMemo } from "react";
import { MEDICAL } from "./data/MedicalData";
import { HEALTH_INSURANCE } from "./data/HealthInsuranceData";
import { AUTO_INSURANCE } from "./data/AutoInsuranceData";
import { FINANCIAL } from "./data/FinancialData";
import { CULTURAL } from "./data/CulturalData";
import { CUSTOMER_SERVICE } from "./data/CustomerServiceData";
import  PersonalDictionary  from "./PersonalDictionary";

interface GlossaryEntry {
  term: string;
  spanish: string;
  category: string;
}

const TABS = [
  { key: "medical", label: "Medical", data: MEDICAL },
  { key: "health", label: "Health Ins.", data: HEALTH_INSURANCE },
  { key: "auto", label: "Auto Ins.", data: AUTO_INSURANCE },
  { key: "financial", label: "Financial", data: FINANCIAL },
  { key: "cultural", label: "Cultural", data: CULTURAL },
  { key: "customer", label: "Cust. Service", data: CUSTOMER_SERVICE },
  { key: "personal", label: "My Terms", data: [] },
];

export default function GlossarySidebar() {
  const [activeTab, setActiveTab] = useState("medical");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const currentData: GlossaryEntry[] = useMemo(() => {
    const tab = TABS.find((t) => t.key === activeTab);
    return tab ? tab.data : [];
  }, [activeTab]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(currentData.map((e) => e.category)));
    return ["All", ...cats];
  }, [currentData]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return currentData.filter((e) => {
      const matchesQuery =
        e.term.toLowerCase().includes(q) || e.spanish.toLowerCase().includes(q);
      const matchesCategory = activeCategory === "All" || e.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [currentData, query, activeCategory]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setActiveCategory("All");
    setQuery("");
  };

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: "var(--bg-panel)" }}>
      {/* Top tab navigation */}
      <div className="flex flex-wrap border-b" style={{ borderColor: "var(--border)" }}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className="flex-1 py-2 text-[10px] font-bold uppercase tracking-wide transition-all whitespace-nowrap px-1"
            style={
              activeTab === tab.key
                ? { color: "white", background: "var(--accent)" }
                : { color: "var(--text-mid)", background: "transparent" }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Personal Dictionary gets its own UI */}
      {activeTab === "personal" ? (
        <PersonalDictionary />
      ) : (
        <>
          <div className="px-4 pt-3 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
              📖 EN → ES Glossary
            </h2>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search terms or Spanish…"
              className="w-full px-3 py-2 text-sm rounded-lg outline-none transition-colors"
              style={{ background: "var(--bg-dark)", border: "1px solid var(--border)", color: "var(--text-dark)" }}
            />
          </div>

          <div className="px-4 pb-2 flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all whitespace-nowrap"
                style={
                  activeCategory === cat
                    ? { background: "var(--accent)", color: "white", border: "1px solid var(--accent)" }
                    : { background: "transparent", color: "var(--text-mid)", border: "1px solid var(--border)" }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="px-3 pb-1">
            <p className="text-[10px]" style={{ color: "var(--text-soft)" }}>{filtered.length} terms</p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
            {filtered.length === 0 ? (
              <p className="text-sm text-center py-8" style={{ color: "var(--text-soft)" }}>No results found.</p>
            ) : (
              filtered.map((entry, i) => (
                <div
                  key={`${entry.term}-${i}`}
                  className="p-3 rounded-lg flex justify-between items-start"
                  style={{ background: "white", border: "1px solid var(--border)" }}
                >
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: "var(--text-dark)" }}>{entry.term}</div>
                    <div className="text-sm font-semibold" style={{ color: "var(--accent)" }}>{entry.spanish}</div>
                  </div>
                  <span
                    className="text-[10px] rounded px-2 py-0.5 ml-2 mt-0.5 whitespace-nowrap"
                    style={{ background: "var(--bg-dark)", color: "var(--text-mid)", border: "1px solid var(--border)" }}
                  >
                    {entry.category}
                  </span>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
