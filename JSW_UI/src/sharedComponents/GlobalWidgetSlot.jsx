import React, { useState, useEffect, Suspense } from "react";
import { Sparkles, X, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

// Dynamically discover all generated components in ./pages/generated/*.jsx
const generatedModules = import.meta.glob("../pages/generated/*.jsx");

export default function GlobalWidgetSlot() {
  const [manifest, setManifest] = useState([]);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [LoadedComponent, setLoadedComponent] = useState(null);

  useEffect(() => {
    // Load manifest
    const loadManifest = async () => {
      try {
        const manifestMod = await import("../pages/generated/manifest.json");
        const list = manifestMod.default || [];
        setManifest(list);
        if (list.length > 0 && !selectedWidget) {
          setSelectedWidget(list[0]);
        }
      } catch (err) {
        // manifest.json may be empty initially
      }
    };
    loadManifest();
  }, []);

  useEffect(() => {
    if (!selectedWidget) {
      setLoadedComponent(null);
      return;
    }
    const path = `../pages/generated/${selectedWidget.id}.jsx`;
    const loader = generatedModules[path];
    if (loader) {
      loader().then((mod) => {
        setLoadedComponent(() => mod.default || mod);
      }).catch((err) => {
        console.error("Failed to load widget component:", err);
      });
    }
  }, [selectedWidget]);

  if (!manifest || manifest.length === 0) return null;

  return (
    <div className="mb-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/20 via-slate-900/40 to-slate-900/60 p-4 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 font-bold shadow-sm">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                AI VisionCraft Component Hub
              </h4>
              <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-400">
                {manifest.length} Screen{manifest.length > 1 ? "s" : ""} Active
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Select any generated UI screen to preview directly on this page
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {manifest.length > 1 && (
            <select
              value={selectedWidget?.id || ""}
              onChange={(e) => {
                const item = manifest.find((m) => m.id === e.target.value);
                if (item) {
                  setSelectedWidget(item);
                  setIsOpen(true);
                }
              }}
              className="rounded-xl border border-cyan-500/30 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-gray-800 dark:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {manifest.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name || m.id}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white px-3.5 py-1.5 text-xs font-bold transition shadow-sm"
          >
            <span>{isOpen ? "Hide Component" : "View Component"}</span>
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b0f17] p-5 shadow-inner">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-gray-700 dark:text-slate-200 font-mono">
                {selectedWidget?.name || selectedWidget?.id}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-600 transition"
            >
              <X size={15} />
            </button>
          </div>

          <div className="overflow-x-auto min-h-[250px]">
            {LoadedComponent ? (
              <Suspense fallback={<div className="p-8 text-center text-xs text-gray-400">Loading AI Component...</div>}>
                <LoadedComponent />
              </Suspense>
            ) : (
              <div className="p-8 text-center text-xs text-gray-400">
                Compiling and loading component...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
