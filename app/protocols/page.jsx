"use client";

import { useEffect, useState } from "react";
import InterpreterSetup from "../components/InterpreterSetup";

const [interpreter, setInterpreter] = useState(null);
const openingScript =
"Good morning. I am your interpreter...";
useEffect(() => {
  const saved =
    localStorage.getItem("sinpInterpreter");

  if (saved) {
    setInterpreter(JSON.parse(saved));
  }
}, []);

if (!interpreter) {
  return (
    <InterpreterSetup
      onComplete={setInterpreter}
    />
  );
}

