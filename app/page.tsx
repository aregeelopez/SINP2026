"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { extractVerificationTokens } from "./lib/extractVerificationTokens";
import GlossarySidebar from "./components/GlossarySidebar";
import NumberVerification from "./components/NumberVerification";
import PainAssessment from "./components/PainAssessment";
import ProtocolCheatSheet from "./components/ProtocolCheatSheet";
import NotesEditor from "./components/NotesEditor";
import ShredModal from "./components/ShredModal";
import InterpreterSetup from "./components/InterpreterSetup";

interface Interpreter {
  firstName: string;
  interpreterId: string;
}

export default function InterpreterPad() {
  const [notes, setNotes] = useState("");
  const [showShred, setShowShred] = useState(false);
  const [rightPanelTab, setRightPanelTab] = useState("protocol");
  const [verified, setVerified] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const [interpreter, setInterpreter] = useState<Interpreter | null>(null);
  const [checkedStorage, setCheckedStorage] = useState(false);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  // Fail-safe #1: force-clear on every mount, even though state already
  // inits empty. Defends against future code changes accidentally seeding
  // notes/verified from props, storage, or SSR hydration mismatches.
  useEffect(() => {
    setNotes("");
    setVerified(new Set());
  }, []);

  // Fail-safe #2: browsers can restore a full DOM snapshot (including a
  // textarea's prior text) from the back/forward cache (bfcache) when the
  // user navigates back to this tab, bypassing React state entirely. Force
  // a hard clear whenever the page is restored this way.
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setNotes("");
        setVerified(new Set());
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);


  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Load saved interpreter
    const saved = localStorage.getItem("sinpInterpreter");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Interpreter;
        setInterpreter(parsed);
        setShowWelcomeBack(true);
        setTimeout(() => setShowWelcomeBack(false), 4000);
      } catch (err) {
        console.error("Failed to parse saved interpreter:", err);
      }
    }
    setCheckedStorage(true);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const handleShred = useCallback(() => {
    setNotes("");
    setVerified(new Set());
    setShowShred(false);
  }, []);

  const [showClipboardNotice, setShowClipboardNotice] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(notes);
      setCopied(true);
      setShowClipboardNotice(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);

      setTimeout(() => {
        setShowClipboardNotice(false);
      }, 6000);

    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleAppend = useCallback((text: string) => {
    setNotes((prev) => (prev ? prev + " " + text : text));
  }, []);

  const handleToggle = useCallback((tokenId: string) => {
    setVerified((prev) => {
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
    (token) => !verified.has(token.id)
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
      return (
        <PainAssessment
          onAppend={handleAppend}
        />
      );
    }

    if (rightPanelTab === "protocol") {
      return (
        <ProtocolCheatSheet interpreter={interpreter} />
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


  if (!checkedStorage) {
    return null;
  }

  if (!interpreter) {
    return (
      <InterpreterSetup
        onComplete={(data) => {
          setInterpreter(data);
        }}
      />
    );
  }

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

      {showWelcomeBack && (
        <div
          style={{
            position: "fixed",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
            background: "#0d9488",
            color: "white",
            fontSize: 13,
            fontWeight: 700,
            padding: "10px 20px",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          👋 Welcome back{interpreter.firstName ? `, ${interpreter.firstName}` : ""}
          {interpreter.interpreterId ? ` (ID ${interpreter.interpreterId})` : ""}
        </div>
      )}

      {showClipboardNotice && (
        <div
          style={{
            position: "fixed",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
            background: "#fffbeb",
            color: "#92400e",
            border: "1px solid #fcd34d",
            fontSize: 12,
            fontWeight: 600,
            padding: "10px 18px",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            maxWidth: 420,
            textAlign: "center",
          }}
        >
          ⚠️ Notes copied to clipboard. This device's clipboard may retain the
          text until overwritten — clear it (copy something else, or paste and
          delete) once you're done pasting to protect confidentiality.
        </div>
      )}

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
              style={{
                color: "white",
              }}
            >
              aregee insights
            </h1>

            <p
              className="text-[10px] mt-1 uppercase tracking-wider"
              style={{
                color:"#99f6e4",
              }}
            >
              Spanish Interpreter's Note Pad
            </p>

            <div className="flex gap-2 mt-1">
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] uppercase tracking-wider hover:underline"
                style={{ color: "#99f6e4" }}
              >
                Privacy
              </a>
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] uppercase tracking-wider hover:underline"
                style={{ color: "#99f6e4" }}
              >
                Terms
              </a>
              <a
                href="/refund"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] uppercase tracking-wider hover:underline"
                style={{ color: "#99f6e4" }}
              >
                Refund
              </a>
            </div>

          </div>

        </div>


        <div className="flex gap-2">

          {deferredPrompt && !isInstalled && (
            <button
              onClick={handleInstallClick}
              className="text-xs font-bold px-4 py-2 rounded-lg"
              style={{
                background: "white",
                color: "#0d9488",
                border: "1px solid #99f6e4",
              }}
            >
              ⬇ INSTALL APP
            </button>
          )}

          <button
            onClick={handleCopy}
            className="text-xs font-bold px-4 py-2 rounded-lg"
            style={{
              background: copied ? "#14b8a6" : "white",
              color: copied ? "white" : "#0d9488",
            }}
          >
            {copied ? "✓ COPIED" : "COPY NOTES"}
          </button>


          <button
            onClick={() => setShowShred(true)}
            className="text-xs font-bold px-4 py-2 rounded-lg"
            style={{
              background:"#dc2626",
              color:"white",
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
            background:"var(--bg-panel)",
            borderColor:"var(--border)",
          }}
        >
          <GlossarySidebar />
        </aside>


        <main
          className="flex-1 flex flex-col overflow-hidden"
          style={{
            background:"var(--bg-main)",
            minWidth:"420px",
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
          } flex-shrink-0 border-l flex flex-col`}
          style={{
            background:"var(--bg-panel)",
            borderColor:"var(--border)",
          }}
        >


          <div
            className="flex border-b"
            style={{
              borderColor:"var(--border)",
            }}
          >

            <button
              onClick={() => setRightPanelTab("protocol")}
              className="flex-1 py-3 text-[9px] font-bold"
              style={tabStyle("protocol")}
            >
              PROTOCOL
            </button>


            <button
              onClick={() => setRightPanelTab("pain")}
              className="flex-1 py-3 text-[9px] font-bold"
              style={tabStyle("pain")}
            >
              PAIN
            </button>


            <button
              onClick={() => setRightPanelTab("numbers")}
              className="flex-1 py-3 text-[9px] font-bold relative"
              style={tabStyle("numbers")}
            >
              NUMBERS

              {unverifiedCount > 0 &&
                rightPanelTab !== "numbers" && (
                <span
                  style={{
                    position:"absolute",
                    top:6,
                    right:6,
                    background:"#dc2626",
                    color:"white",
                    fontSize:9,
                    fontWeight:700,
                    borderRadius:999,
                    padding:"1px 5px",
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
