import { motion } from "framer-motion";

const shimmerVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: { duration: 1.2, repeat: Infinity, ease: "linear" },
  },
};

function ShimmerBlock({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden bg-slate-200 rounded-lg ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
        }}
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
      />
    </div>
  );
}

export function KPIShimmer() {
  return (
    <div className="mb-5 grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg p-3 border border-slate-200 bg-slate-50 space-y-2"
        >
          <ShimmerBlock className="h-3 w-24" />
          <ShimmerBlock className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}

export function ChartShimmer() {
  return (
    <div className="space-y-3">
      <ShimmerBlock className="h-3 w-32" />
      <div className="h-[280px] sm:h-[360px] lg:h-[460px] flex items-end gap-3 px-4 pt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ShimmerBlock
            key={i}
            className="flex-1 rounded-t-md rounded-b-none"
            style={{ height: `${40 + (i % 3) * 20 + (i % 2) * 15}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function OEEShimmer() {
  return (
    <div className="space-y-4">
      {/* ── Top charts row ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* Shift-wise OEE card */}
        <div className="md:col-span-1 lg:col-span-3 bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col gap-3">
          <ShimmerBlock className="h-3 w-28" />
          <ShimmerBlock className="h-[200px] w-[200px] rounded-full mx-auto mt-2" />
          <div className="flex justify-center gap-6 pb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <ShimmerBlock className="h-2.5 w-14" />
                <ShimmerBlock className="h-3.5 w-10" />
              </div>
            ))}
          </div>
        </div>

        {/* APQ card */}
        <div className="md:col-span-2 lg:col-span-6 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
            <ShimmerBlock className="h-3 w-24" />
            <ShimmerBlock className="h-10 w-24 rounded-lg" />
          </div>
          <div className="grid grid-cols-3 divide-x divide-slate-100 flex-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center px-4 py-5 gap-2"
              >
                <ShimmerBlock className="h-2.5 w-20" />
                <ShimmerBlock className="h-[160px] w-[160px] rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Available vs Downtime card */}
        <div className="md:col-span-1 lg:col-span-3 bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col gap-3">
          <ShimmerBlock className="h-3 w-36" />
          <ShimmerBlock className="h-[200px] w-[200px] rounded-full mx-auto mt-2" />
          <div className="flex justify-center gap-8 pb-2">
            {[1, 2].map((i) => (
              <ShimmerBlock key={i} className="h-2.5 w-20" />
            ))}
          </div>
        </div>
      </div>

      {/* ── Sub-station label ── */}
      <ShimmerBlock className="h-3 w-44" />

      {/* ── Sub-station cards ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden"
          >
            {/* header */}
            <ShimmerBlock className="h-10 w-full rounded-none" />
            {/* gauge + bars */}
            <div className="grid grid-cols-2">
              <div className="flex items-center justify-center p-4">
                <ShimmerBlock className="h-[160px] w-[160px] rounded-full" />
              </div>
              <div className="flex flex-col justify-center gap-3 p-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center gap-2">
                    <ShimmerBlock className="h-3 w-12 shrink-0" />
                    <ShimmerBlock className="h-6 flex-1 rounded" />
                  </div>
                ))}
              </div>
            </div>
            {/* bottom metrics */}
            <div className="grid grid-cols-4 border-t border-slate-100">
              {[1, 2, 3, 4].map((j) => (
                <div
                  key={j}
                  className="py-3 px-2 flex flex-col items-center gap-1.5 border-r border-slate-100 last:border-r-0"
                >
                  <ShimmerBlock className="h-2 w-16" />
                  <ShimmerBlock className="h-4 w-12" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-slate-50">
          <ShimmerBlock className="h-4 w-32" />
          <ShimmerBlock className="h-3 w-24" />
        </div>
        <div className="flex gap-2 px-4 py-2 bg-sky-100 border-b border-sky-200">
          {Array.from({ length: 10 }).map((_, i) => (
            <ShimmerBlock key={i} className="h-3 flex-1" />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`flex gap-2 px-4 py-2 border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50" : ""}`}
          >
            {Array.from({ length: 10 }).map((_, j) => (
              <ShimmerBlock key={j} className="h-3 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TableShimmer({ rows = 8 }) {
  return (
    <div className="mt-6 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* header bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-slate-50">
        <ShimmerBlock className="h-4 w-40" />
        <ShimmerBlock className="h-3 w-28" />
      </div>
      {/* column headers */}
      <div className="flex gap-2 px-4 py-2 bg-sky-100 border-b border-sky-200">
        {Array.from({ length: 7 }).map((_, i) => (
          <ShimmerBlock key={i} className="h-3 flex-1" />
        ))}
      </div>
      {/* rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={`flex gap-2 px-4 py-2 border-b border-slate-100 ${i % 2 === 1 ? "bg-slate-50" : ""}`}
        >
          {Array.from({ length: 7 }).map((_, j) => (
            <ShimmerBlock key={j} className="h-3 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
