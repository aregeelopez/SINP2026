export default function InterpreterPad() {
  const [interpreter, setInterpreter] = useState<Interpreter | null>(null);
  const [notes, setNotes] = useState("");
  const [showShred, setShowShred] = useState(false);
  const [rightPanelTab, setRightPanelTab] = useState("protocol");
  const [verified, setVerified] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sinpInterpreter");

    if (saved) {
      setInterpreter(JSON.parse(saved));
    }
  }, []);

  const handleShred = useCallback(() => {
    setNotes("");
    setVerified(new Set());
    setShowShred(false);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(notes);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!interpreter) {
    return (
      <InterpreterSetup
        onComplete={(data) => {
          localStorage.setItem(
            "sinpInterpreter",
            JSON.stringify(data)
          );
          setInterpreter(data);
        }}
      />
    );
  }

  return (
    // existing SINP JSX
  );
}

  if (!interpreter) {
    return (
      <InterpreterSetup
        onComplete={(data) => {
          localStorage.setItem(
            "sinpInterpreter",
            JSON.stringify(data)
          );
          setInterpreter(data);
        }}
      />
    );
  }

  const [notes, setNotes] = useState("");
  const [showShred, setShowShred] = useState(false);
  const [rightPanelTab, setRightPanelTab] = useState("protocol");
  const [verified, setVerified] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const handleShred = useCallback(() => {
    setNotes("");
    setVerified(new Set());
    setShowShred(false);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(notes);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleAppend = useCallback((text: string) => {
    setNotes((prev) => prev ? prev + " " + text : text);
  }, []);

  const handleToggle = useCallback((tokenId: string) => {
    setVerified(prev => {
      const next = new Set(prev);
      if (next.has(tokenId)) {
        next.delete(tokenId);
      } else {
        next.add(tokenId);
      }
      return next;
    });
  }, []);

  const verificationTokens = useMemo(
    () => extractVerificationTokens(notes),
    [notes]
  );

  const unverifiedCount = verificationTokens.filter(
    token => !verified.has(token.id)
  ).length;

  const renderRightPanel = () => {
    if (rightPanelTab === "numbers") {
      return (
        <NumberVerification
          notes={notes}
          verified={verified}
          onToggle={handleToggle}
        />
      );
    }

    if (rightPanelTab === "pain") {
      return <PainAssessment onAppend={handleAppend} />;
    }

    if (rightPanelTab === "protocol") {
      return (
        <ProtocolCheatSheet
          interpreter={interpreter}
        />
      );
    }

    return null;
  };

  const tabStyle = (tab: string) =>
    rightPanelTab === tab
      ? {
          color: "white",
          borderBottom: "2px solid #0d9488",
          background: "#0d9488",
        }
      : {
          color: "var(--text-mid)",
        };

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        background: "var(--bg-main)",
        color: "var(--text-dark)",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        width: "100%",
        height: "100vh",
      }}
    >
      <header
        className="flex items-center justify-between px-6 py-3 border-b flex-shrink-0"
        style={{
          background: "#0d9488",
          borderColor: "#14b8a6",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
            style={{
              background: "white",
              color: "#0d9488",
            }}
          >
            Ar
          </div>

          <div>
            <h1
              className="text-sm font-bold leading-none"
              style={{ color: "white" }}
            >
              aregee insights
            </h1>

            <p
              className="text-[10px] mt-1 uppercase tracking-wider"
              style={{ color: "#99f6e4" }}
            >
              Spanish Interpreter's Note Pad
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="text-xs font-bold px-4 py-2 rounded-lg transition-all"
            style={{
              background: copied ? "#14b8a6" : "white",
              color: copied ? "white" : "#0d9488",
            }}
          >
            {copied ? "✓ COPIED" : "COPY NOTES"}
          </button>

          <button
            onClick={() => setShowShred(true)}
            className="text-xs font-bold px-4 py-2 rounded-lg transition-all"
            style={{
              background: "#dc2626",
              color: "white",
            }}
          >
            SHRED SESSION
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className="w-[28rem] flex-shrink-0 border-r"
          style={{
            background: "var(--bg-panel)",
            borderColor: "var(--border)",
          }}
        >
          <GlossarySidebar />
        </aside>

        <main
          className="flex-1 flex flex-col overflow-hidden"
          style={{
            background: "var(--bg-main)",
            minWidth: "420px",
          }}
        >
          <NotesEditor
            notes={notes}
            onChange={setNotes}
          />
        </main>

        <aside
          className={`${
            rightPanelTab === "protocol"
              ? "w-[30rem]"
              : "w-96"
          } flex-shrink-0 border-l flex flex-col transition-all`}
          style={{
            background: "var(--bg-panel)",
            borderColor: "var(--border)",
          }}
        >
          <div
            className="flex border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              onClick={() => setRightPanelTab("protocol")}
              className="flex-1 py-3 text-[9px] font-bold transition-colors"
              style={tabStyle("protocol")}
            >
              PROTOCOL
            </button>

            <button
              onClick={() => setRightPanelTab("pain")}
              className="flex-1 py-3 text-[9px] font-bold transition-colors"
              style={tabStyle("pain")}
            >
              PAIN
            </button>

            <button
              onClick={() => setRightPanelTab("numbers")}
              className="flex-1 py-3 text-[9px] font-bold transition-colors relative"
              style={tabStyle("numbers")}
            >
              NUMBERS

              {unverifiedCount > 0 &&
                rightPanelTab !== "numbers" && (
                  <span
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      background: "#dc2626",
                      color: "white",
                      fontSize: 9,
                      fontWeight: 700,
                      borderRadius: 999,
                      padding: "1px 5px",
                      lineHeight: 1.4,
                    }}
                  >
                    {unverifiedCount}
                  </span>
                )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {renderRightPanel()}
          </div>
        </aside>
      </div>

      {showShred && (
        <ShredModal
          onConfirm={handleShred}
          onCancel={() => setShowShred(false)}
        />
      )}
    </div>
  );
}
