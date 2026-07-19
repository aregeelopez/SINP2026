"use client";

import { useState } from "react";

interface Interpreter {
  firstName: string;
  interpreterId: string;
}

interface InterpreterSetupProps {
  onComplete: (interpreter: Interpreter) => void;
}

export default function InterpreterSetup({
  onComplete,
}: InterpreterSetupProps) {
  const [firstName, setFirstName] = useState("");
  const [interpreterId, setInterpreterId] = useState("");

  const handleContinue = () => {
    const interpreter = {
      firstName: firstName.trim(),
      interpreterId: interpreterId.trim(),
    };

    localStorage.setItem(
      "sinpInterpreter",
      JSON.stringify(interpreter)
    );

    onComplete(interpreter);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background: "var(--bg-main)",
        color: "var(--text-dark)",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <div
        className="w-full max-w-lg rounded-xl p-8"
        style={{
          background: "var(--bg-panel)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-bold"
            style={{ color: "#0d9488" }}
          >
            Welcome to SINP
          </h1>

          <p className="mt-3 text-sm">
            Enter your first name and/or Interpreter ID.
            These values will automatically appear in your
            Opening Protocol.
          </p>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2">
            First Name (optional)
          </label>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Raul"
            className="w-full rounded-lg border px-4 py-3"
            style={{
              background: "white",
              borderColor: "var(--border)",
            }}
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2">
            Interpreter ID (optional)
          </label>

          <input
            type="text"
            value={interpreterId}
            onChange={(e) => setInterpreterId(e.target.value)}
            placeholder="123456"
            className="w-full rounded-lg border px-4 py-3"
            style={{
              background: "white",
              borderColor: "var(--border)",
            }}
          />
        </div>

        <button
          onClick={handleContinue}
          className="w-full rounded-lg py-3 font-bold transition-colors"
          style={{
            background: "#0d9488",
            color: "white",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
