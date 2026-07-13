"use client";
import { useState, useEffect, useMemo } from "react";

interface PersonalEntry {
  id: string;
  term: string;
  spanish: string;
  category: string;
}

const STORAGE_KEY = "aregee_personal_dictionary";

export default function PersonalDictionary() {
  const [entries, setEntries] = useState<PersonalEntry[]>([]);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newTerm, setNewTerm] = useState("");
  const [newSpanish, setNewSpanish] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setEntries(JSON.parse(stored));
    } catch {}
  }, []);

  // Save to localStorage whenever entries change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {}
  }, [entries]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return entries.filter(
      (e) =>
        e.term.toLowerCase().includes(q) ||
        e.spanish.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
    );
  }, [entries, query]);

  const resetForm = () => {
    setNewTerm("");
    setNewSpanish("");
    setNewCategory("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (!newTerm.trim() || !newSpanish.trim()) return;

    if (editingId) {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === editingId
            ? { ...e, term: newTerm.trim(), spanish: newSpanish.trim(), category: newCategory.trim() }
            : e
        )
      );
    } else {
      const newEntry: PersonalEntry = {
        id: Date.now().toString(),
        term: newTerm.trim(),
        spanish: newSpanish.trim(),
        category: newCategory.trim() || "Custom",
      };
      setEntries((prev) => [newEntry, ...prev]);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    resetForm();
  };

  const handleEdit = (entry: PersonalEntry) => {
    setNewTerm(entry.term);
    setNewSpanish(entry.spanish);
    setNewCategory(entry.category);
    setEditingId(entry.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: "var(--bg-panel)" }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
            📝 My Dictionary
          </h2>
          <button
            onClick={() => { resetForm(); setShowForm(!showForm); }}
            className="text-[10px] font-bold px-3 py-1 rounded-full transition-all"
            style={{ background: "var(--accent)", color: "white" }}
          >
            {showForm ? "Cancel" : "+ Add Term"}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="mb-3 p-3 rounded-lg space-y-2" style={{ background: "white", border: "1px solid var(--border)" }}>
            <input
              type="text"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
              placeholder="English term *"
              className="w-full px-3 py-1.5 text-sm rounded-lg outline-none"
              style={{ background: "var(--bg-dark)", border: "1px solid var(--border)", color: "var(--text-dark)" }}
            />
            <input
              type="text"
              value={newSpanish}
              onChange={(e) => setNewSpanish(e.target.value)}
              placeholder="Spanish translation *"
              className="w-full px-3 py-1.5 text-sm rounded-lg outline-none"
              style={{ background: "var(--bg-dark)", border: "1px solid var(--border)", color: "var(--text-dark)" }}
            />
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category (optional)"
              className="w-full px-3 py-1.5 text-sm rounded-lg outline-none"
              style={{ background: "var(--bg-dark)", border: "1px solid var(--border)", color: "var(--text-dark)" }}
            />
            <button
              onClick={handleSave}
              disabled={!newTerm.trim() || !newSpanish.trim()}
              className="w-full py-1.5 text-xs font-bold rounded-lg transition-all"
              style={{
                background: newTerm.trim() && newSpanish.trim() ? "var(--accent)" : "var(--border)",
                color: newTerm.trim() && newSpanish.trim() ? "white" : "var(--text-soft)",
              }}
            >
              {editingId ? "Update Term" : "Save Term"}
            </button>
            {saved && (
              <p className="text-[10px] text-center font-bold" style={{ color: "var(--accent)" }}>
                ✓ Saved!
              </p>
            )}
          </div>
        )}

        {/* Search */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your terms…"
          className="w-full px-3 py-2 text-sm rounded-lg outline-none transition-colors"
          style={{ background: "var(--bg-dark)", border: "1px solid var(--border)", color: "var(--text-dark)" }}
        />
      </div>

      <div className="px-3 pb-1 flex-shrink-0">
        <p className="text-[10px]" style={{ color: "var(--text-soft)" }}>
          {filtered.length} of {entries.length} terms
        </p>
      </div>

      {/* Term List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
        {entries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm font-medium mb-1" style={{ color: "var(--text-mid)" }}>No terms yet</p>
            <p className="text-xs" style={{ color: "var(--text-soft)" }}>Add your first custom term above</p>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-center py-8" style={{ color: "var(--text-soft)" }}>No results found.</p>
        ) : (
          filtered.map((entry) => (
            <div
              key={entry.id}
              className="p-3 rounded-lg"
              style={{ background: "white", border: "1px solid var(--border)" }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-xs font-medium mb-0.5" style={{ color: "var(--text-dark)" }}>{entry.term}</div>
                  <div className="text-sm font-semibold" style={{ color: "var(--accent)" }}>{entry.spanish}</div>
                  {entry.category && (
                    <span
                      className="text-[10px] rounded px-2 py-0.5 mt-1 inline-block"
                      style={{ background: "var(--bg-dark)", color: "var(--text-mid)", border: "1px solid var(--border)" }}
                    >
                      {entry.category}
                    </span>
                  )}
                </div>
                <div className="flex gap-1 ml-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(entry)}
                    className="text-[10px] px-2 py-0.5 rounded font-bold transition-all"
                    style={{ background: "var(--accent-lt)", color: "var(--accent)", border: "1px solid var(--accent-mid)" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-[10px] px-2 py-0.5 rounded font-bold transition-all"
                    style={{ background: "#fee2e2", color: "#dc2626", border: "1px solid #fca5a5" }}
                  >
                    Del
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
