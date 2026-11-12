import { memo, useState, useMemo } from "react";

// ─ Totals-row cell ─
const TOTALS_VARIANT_CLASSES = {
  default: "bg-sky-700",
  strong: "bg-sky-800",
};

// ─ Header color tokens (Tailwind-driven) ─
const HEADER_GROUP_BG = "bg-sky-300"; // Shift A / Shift B / Shift C / Daily Total row
const HEADER_SUB_BG = "bg-sky-200"; // Actual / Target row
const HEADER_TEXT_CLASS = "text-sky-950"; // darker than before for contrast against sky-300
const HEADER_DIVIDER = "border-sky-500"; // group separators — clearly darker than the fills
const HEADER_SUB_DIVIDER = "border-sky-400"; // sub-column separators — one step lighter than group dividers

function TotalsCell({ variant = "default", children }) {
  const bgClass =
    TOTALS_VARIANT_CLASSES[variant] ?? TOTALS_VARIANT_CLASSES.default;
  const isEmpty =
    children === "" || children === null || children === undefined;

  return (
    <div
      className={`${bgClass} text-white text-md font-bold whitespace-nowrap -my-1 -mx-0.5 px-0.5 py-1 min-h-[18px] block box-content`}
    >
      {isEmpty ? "\u00A0" : children}
    </div>
  );
}

//─ Sort Icon ─
function SortIcon({ active, dir }) {
  return (
    <span className="inline-flex flex-col gap-px ml-1 align-middle opacity-100">
      <svg width="7" height="4" viewBox="0 0 7 4">
        <path
          d="M3.5 0L7 4H0Z"
          fill={active && dir === "asc" ? "#1646A1" : "#6b7280"}
        />
      </svg>
      <svg width="7" height="4" viewBox="0 0 7 4">
        <path
          d="M3.5 4L0 0H7Z"
          fill={active && dir === "desc" ? "#1646A1" : "#6b7280"}
        />
      </svg>
    </span>
  );
}

//  Shift Badge
const SHIFT_BADGE_STYLE = {
  A: { backgroundColor: "#e8ecfa", color: "#2744A0", border: "1px solid #c3cbf0" },
  B: { backgroundColor: "#dbeafe", color: "#3b82f6", border: "1px solid #bfdbfe" },
  C: { backgroundColor: "#d1fae5", color: "#10b981", border: "1px solid #a7f3d0" },
};

const ROWS_PER_PAGE_OPTIONS = [9, 10, 25, 50, 100];

// ─ Main DataTable ─
export default memo(function DataTable({
  columns = [],
  data = [],
  showRemarks = false,
  onRemarksChange = null,
  defaultRows = 10,
  title = "Records",
  columnGroups = null,
  hidePagination = false,
  hidePageSizeSelector = false, //used in hourly Prod.
  serverPagination = null,
  topGroupLabel = null, // used on inline measurement report
  topGroupBg = "#7dd3fc", //used on inline measurement report
  // { page, pageSize, totalRecords, totalPages, onPageChange(newPage) }
}) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRpp] = useState(defaultRows);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [remarks, setRemarks] = useState({});
  const [savedRemarks, setSavedRemarks] = useState({});
  const [editingRows, setEditingRows] = useState(new Set());
  // ─ Split totals row(s) out of the sortable/pageable data ─
  const dataOnly = useMemo(() => data.filter((d) => !d.isTotal), [data]);
  const totalsRows = useMemo(() => data.filter((d) => d.isTotal), [data]);

  // ─ Sorting ─
  const sorted = useMemo(() => {
    if (!sortKey) return dataOnly;
    return [...dataOnly].sort((a, b) => {
      const va = a[sortKey] ?? "",
        vb = b[sortKey] ?? "";
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [dataOnly, sortKey, sortDir]);

  // ─ Pagination ─
  const isServer = serverPagination != null;

  // Client-side pagination (used when serverPagination is not provided)
  const totalPages = isServer
    ? serverPagination.totalPages
    : Math.max(1, Math.ceil(sorted.length / rowsPerPage));
  const safePage = isServer
    ? serverPagination.page
    : Math.min(page, totalPages);
  const paginated = isServer
    ? sorted
    : sorted.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);
  const totalCount = isServer ? serverPagination.totalRecords : sorted.length;
  const from =
    totalCount === 0
      ? 0
      : isServer
        ? (serverPagination.page - 1) * serverPagination.pageSize + 1
        : (safePage - 1) * rowsPerPage + 1;
  const to = isServer
    ? Math.min(serverPagination.page * serverPagination.pageSize, totalCount)
    : Math.min(safePage * rowsPerPage, sorted.length);

  const handleSort = (col) => {
    if (!col.sortable) return;
    if (sortKey === col.key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(col.key);
      setSortDir("asc");
    }
    setPage(1);
  };

  // ─ Page numbers with ellipsis ─
  const getPages = useMemo(() => {
    if (totalPages <= 6)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (safePage <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (safePage >= totalPages - 2)
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [1, "...", safePage - 1, safePage, safePage + 1, "...", totalPages];
  }, [totalPages, safePage]);

  const firstGroupIdx = columns.findIndex((c) => c.group);
  const lastGroupIdx = (() => {
    let idx = -1;
    columns.forEach((c, i) => {
      if (c.group) idx = i;
    });
    return idx;
  })();

  const leadingCols =
    firstGroupIdx === -1
      ? columns.filter((c) => !c.group)
      : columns.filter((c, i) => !c.group && i < firstGroupIdx);

  const trailingCols =
    firstGroupIdx === -1
      ? []
      : columns.filter((c, i) => !c.group && i > lastGroupIdx);

  const groupCols = columns.filter((c) => c.group);

  // ─ Cell renderer ─
  const renderCell = (col, item, gi) => {
    const value = item[col.key];
    if (col.render) {
      return (
        <td
          key={col.key}
          className="px-0.5 py-1 text-center border-r border-slate-200 last:border-r-0 whitespace-nowrap"
        >
          {col.render(item, gi)}
        </td>
      );
    }

    // ── Totals row: ONE generic path for every column, regardless of type ──
    if (item.isTotal) {
      const variant = col.totalEmphasis === "strong" ? "strong" : "default";
      return (
        <td
          key={col.key}
          className="px-0.5 py-1 text-center border-r border-slate-200 last:border-r-0 whitespace-nowrap"
        >
          <TotalsCell variant={variant}>{value ?? 0}</TotalsCell>
        </td>
      );
    }

    const tdBase = "border-r border-slate-200 last:border-r-0";
    // const tdPad = "px-4 py-1.5";
    const tdPad = "px-1 py-1.5";

    if (col.key === "sr") {
      return (
        <td
          key="sr"
          className={`px-3 py-1.5 whitespace-nowrap text-center w-12 ${tdBase}`}
        >
          <span className="text-xs font-semibold text-slate-500 tabular-nums">
            {gi + 1}
          </span>
        </td>
      );
    }

    // Shift badge
    if (col.type === "shift") {
      const badgeStyle = SHIFT_BADGE_STYLE[value] ?? SHIFT_BADGE_STYLE.A;
      return (
        <td
          key={col.key}
          className={`${tdPad} whitespace-nowrap text-center ${tdBase}`}
        >
          <span
            style={badgeStyle}
            className="inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold tracking-wide"
          >
            {value}
          </span>
        </td>
      );
    }

    // Actual vs Target
    if (col.type === "actual") {
      const targetKey = col.targetKey ?? "Target"; // NEW — configurable target field
      const target = item[targetKey];
      const below = target !== undefined && value < target;
      const delta = target !== undefined ? Math.abs(value - target) : 0;
      return (
        <td
          key={col.key}
          className={`${tdPad} whitespace-nowrap text-center ${tdBase}`}
        >
          <div className="flex items-center justify-center gap-2">
            <span
              className={`text-sm font-bold tabular-nums ${below ? "text-red-600" : "text-emerald-600"}`}
            >
              {value}
            </span>
            {delta > 0 && (
              <span
                className={`inline-flex items-center gap-0.5 text-[11px] font-semibold rounded px-1.5 py-0.5 ${
                  below
                    ? "text-red-500 bg-red-50 border border-red-100"
                    : "text-emerald-600 bg-emerald-50 border border-emerald-100"
                }`}
              >
                {below ? "▼" : "▲"}
                {delta}
              </span>
            )}
          </div>
        </td>
      );
    }

    // Monospace (dates, times, hour ranges)
    if (col.type === "mono") {
      return (
        <td
          key={col.key}
          className={`${tdPad} whitespace-nowrap text-center ${tdBase}`}
        >
          <span className="text-sm font-medium text-slate-600">{value}</span>
        </td>
      );
    }

    // Bold primary
    if (col.type === "primary") {
      return (
        <td
          key={col.key}
          className={`${tdPad} whitespace-nowrap text-center ${tdBase}`}
        >
          <span className="text-sm font-semibold text-sky-700 tracking-wide">
            {value}
          </span>
        </td>
      );
    }

    // Equipment badge
    if (col.type === "equipment") {
      return (
        <td
          key={col.key}
          className={`${tdPad} whitespace-nowrap text-center ${tdBase}`}
        >
          {value ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200">
              {value}
            </span>
          ) : (
            <span className="text-slate-300 text-xs">—</span>
          )}
        </td>
      );
    }

    // Default
    return (
      <td
        key={col.key}
        className={`${tdPad} whitespace-nowrap text-center ${tdBase}`}
      >
        <span className="text-sm font-medium text-slate-700">{value}</span>
      </td>
    );
  };

  return (
    <div className="mt-6 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* ── Top bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-3 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-5 bg-sky-600 rounded-full" />
          <span className="text-sm font-bold text-slate-700 tracking-wide">
            {title}
          </span>
        </div>
        <span className="text-xs font-medium text-slate-500">
          Showing{" "}
          <span className="font-bold text-sky-600">
            {from}–{to}
          </span>{" "}
          of <span className="font-bold text-sky-600">{totalCount}</span>{" "}
          records
        </span>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        {/* <table className="w-full border-collapse min-w-[700px]"> */}
        <table className="w-full border-collapse">
          <thead>
            {columnGroups?.length ? (
              <>
                {/* Top-level group header row — "Type" spanning all groups */}
                {topGroupLabel && (
                  <tr
                    style={{
                      backgroundColor: topGroupBg,
                      // borderBottom: "1px solid #38bdf8",
                    }}
                  >
                    {leadingCols.map((col) => (
                      <th
                        key={col.key}
                        rowSpan={3}
                        onClick={() => handleSort(col)}
                        style={{
                          backgroundColor: "#bae6fd",
                          borderRight: "1px solid #7dd3fc",
                          verticalAlign: "middle",
                        }}
                        className="px-2 py-1 text-center text-xs font-bold tracking-widest uppercase whitespace-nowrap align-middle border-t border-sky-300 last:border-r-0"
                      >
                        <span
                          className="inline-flex items-center justify-center gap-1"
                          style={{ color: "#0c4a6e" }}
                        >
                          {col.label}
                          {col.sortable && (
                            <SortIcon
                              active={sortKey === col.key}
                              dir={sortDir}
                            />
                          )}
                        </span>
                      </th>
                    ))}
                    <th
                      colSpan={columnGroups.reduce(
                        (sum, g) => sum + (g.span ?? 1),
                        0,
                      )}
                      style={{
                        backgroundColor: topGroupBg,
                      }}
                      className="px-1 py-1 text-center text-sm font-semibold uppercase whitespace-nowrap border border-sky-400 last:border-r-0"
                    >
                      <span
                        style={{
                          color: "#0c4a6e",
                          fontSize: "14px",
                          fontWeight: 700,
                          letterSpacing: "1px",
                        }}
                      >
                        {topGroupLabel}
                      </span>
                    </th>
                  </tr>
                )}

                {/* Group header row — Angle, Dimension, Base, Upper Spec, Lower Spec */}
                <tr
                  style={{
                    backgroundColor: "#bae6fd",
                    borderBottom: "1px solid #7dd3fc",
                  }}
                >
                  {!topGroupLabel &&
                    leadingCols.map((col) => (
                      <th
                        key={col.key}
                        rowSpan={2}
                        onClick={() => handleSort(col)}
                        style={{
                          backgroundColor: "#bae6fd",
                          verticalAlign: "middle",
                        }}
                        className="px-2 py-1 text-center text-xs font-bold tracking-widest uppercase whitespace-nowrap align-middle border-r border-t border-sky-300 last:border-r-0"
                      >
                        <span
                          className="inline-flex items-center justify-center gap-1"
                          style={{ color: "#0c4a6e" }}
                        >
                          {col.label}
                          {col.sortable && (
                            <SortIcon
                              active={sortKey === col.key}
                              dir={sortDir}
                            />
                          )}
                        </span>
                      </th>
                    ))}
                  {columnGroups.map((group) => (
                    <th
                      key={group.label}
                      colSpan={group.span}
                      style={{
                        backgroundColor: group.headerBg ?? "#a5d8ff",
                      }}
                      className="px-1 py-1 text-center text-sm font-semibold uppercase whitespace-nowrap border border-sky-400 last:border-r-0"
                    >
                      <span
                        style={{
                          color: "#0c4a6e",
                          fontSize: "14px",
                          fontWeight: 700,
                          letterSpacing: "1px",
                        }}
                      >
                        {group.label}
                      </span>
                    </th>
                  ))}
                  {trailingCols.map((col) => (
                    <th
                      key={col.key}
                      rowSpan={2}
                      onClick={() => handleSort(col)}
                      style={{
                        backgroundColor: "#bae6fd",
                        verticalAlign: "middle",
                      }}
                      className="px-2 py-1 text-center text-xs font-bold tracking-widest uppercase whitespace-nowrap align-middle border-r border border-sky-400 last:border-r-0"
                    >
                      <span
                        className="inline-flex items-center justify-center gap-1"
                        style={{ color: "#0c4a6e" }}
                      >
                        {col.label}
                        {col.sortable && (
                          <SortIcon
                            active={sortKey === col.key}
                            dir={sortDir}
                          />
                        )}
                      </span>
                    </th>
                  ))}
                </tr>

                <tr
                  style={{
                    backgroundColor: "#bae6fd",
                    borderBottom: "1px solid #7dd3fc",
                  }}
                >
                  {groupCols.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col)}
                      style={{
                        backgroundColor: "#bae6fd",
                        // borderRight: "1px solid #7dd3fc",
                      }}
                      className={`px-1 py-1 text-center text-xs font-bold tracking-widest uppercase whitespace-nowrap border-r border-sky-300 last:border-r-0 ${
                        col.sortable
                          ? "cursor-pointer select-none transition-colors"
                          : ""
                      }`}
                    >
                      <span
                        className="inline-flex items-center justify-center gap-1"
                        style={{ color: "#0c4a6e" }}
                      >
                        {col.label}
                        {col.sortable && (
                          <SortIcon
                            active={sortKey === col.key}
                            dir={sortDir}
                          />
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </>
            ) : (
              <tr className="bg-sky-200/80 border-b border-sky-300">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col)}
                    style={col.width ? { width: col.width, minWidth: col.width } : undefined}
                    className={`px-4 py-2 text-center text-xs font-bold text-sky-800 tracking-widest uppercase whitespace-nowrap border-r border-t border-sky-300 last:border-r-0 ${
                      col.key === "sr" ? "w-12 px-3" : ""
                    } ${
                      col.sortable
                        ? "cursor-pointer select-none hover:bg-sky-300/60 transition-colors"
                        : ""
                    }`}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {col.sortable && (
                        <SortIcon active={sortKey === col.key} dir={sortDir} />
                      )}
                    </span>
                  </th>
                ))}
                {showRemarks && (
                  <th className="px-5 py-2 text-center text-xs font-bold text-sky-800 tracking-widest uppercase min-w-[180px]">
                    Remark
                  </th>
                )}
              </tr>
            )}
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showRemarks ? 1 : 0)}
                  className="text-center py-16 text-sm font-medium text-slate-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">📭</span>
                    <span>No data found</span>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((item, idx) => {
                const gi = (safePage - 1) * rowsPerPage + idx;
                const isEven = idx % 2 === 1;
                return (
                  <tr
                    key={gi}
                    className={`transition-colors duration-100 hover:bg-sky-50 ${
                      isEven ? "bg-slate-50/70" : "bg-white"
                    }`}
                  >
                    {columns.map((col) => renderCell(col, item, gi))}
                    {showRemarks && (
                      <td className="px-4 py-1.5 border-r border-slate-200 last:border-r-0">
                        {savedRemarks[gi] && !editingRows.has(gi) ? (
                          <div className="flex items-center gap-2">
                            <span className="flex-1 text-sm font-medium text-slate-700 px-3 py-2 bg-sky-50 border border-sky-100 rounded-lg truncate">
                              {savedRemarks[gi]}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setRemarks((r) => ({
                                  ...r,
                                  [gi]: savedRemarks[gi],
                                }));
                                setEditingRows((s) => new Set(s).add(gi));
                              }}
                              className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg border border-sky-300 text-sky-700 hover:bg-sky-50 transition-colors"
                            >
                              Edit
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="Add remark..."
                              value={remarks[gi] ?? ""}
                              onChange={(e) =>
                                setRemarks((r) => ({
                                  ...r,
                                  [gi]: e.target.value,
                                }))
                              }
                              className="flex-1 text-sm font-medium px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 placeholder:text-slate-300 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
                            />
                            <button
                              type="button"
                              disabled={!remarks[gi]?.trim()}
                              onClick={() => {
                                const val = remarks[gi]?.trim();
                                if (!val) return;
                                const next = { ...savedRemarks, [gi]: val };
                                setSavedRemarks(next);
                                onRemarksChange?.(next);
                                setEditingRows((s) => {
                                  const next = new Set(s);
                                  next.delete(gi);
                                  return next;
                                });
                              }}
                              className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                              style={{ backgroundColor: "rgb(22, 70, 161)" }}
                            >
                              Save
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
          {totalsRows.length > 0 && (
            <tfoot>
              {totalsRows.map((item, idx) => (
                <tr
                  key={`total-${idx}`}
                  className="sticky bottom-0 z-10 shadow-[0_-1px_0_0_rgba(0,0,0,0.06)]"
                >
                  {columns.map((col) => renderCell(col, item, idx))}
                </tr>
              ))}
            </tfoot>
          )}
        </table>
      </div>

      {/* ── Pagination footer ── */}
      {!hidePagination && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-t border-slate-200 bg-slate-50">
          {isServer ? (
            /* Server-side pagination controls */
            <>
              {!hidePageSizeSelector ? (
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500">
                  <span className="hidden sm:inline">Rows per page:</span>
                  <select
                    value={serverPagination.pageSize}
                    onChange={(e) =>
                      serverPagination.onPageSizeChange?.(
                        Number(e.target.value),
                      )
                    }
                    className="text-sm font-semibold px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 cursor-pointer outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100 transition-all"
                  >
                    {ROWS_PER_PAGE_OPTIONS.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <span className="hidden sm:inline">
                    Page{" "}
                    <span className="font-bold text-sky-600">
                      {serverPagination.page}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-sky-600">
                      {serverPagination.totalPages}
                    </span>
                  </span>
                </div>
              ) : (
                <div />
              )}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    serverPagination.onPageChange(serverPagination.page - 1)
                  }
                  disabled={serverPagination.page <= 1}
                  className="px-3.5 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-100 hover:border-slate-300 disabled:text-slate-300 disabled:cursor-default transition-colors"
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">‹</span>
                </button>
                {getPages.map((p, i) =>
                  p === "..." ? (
                    <span
                      key={`d${i}`}
                      className="px-1 text-sm font-semibold text-slate-400"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => serverPagination.onPageChange(p)}
                      className={`w-8 h-8 text-xs font-semibold rounded-lg transition-colors ${
                        safePage === p
                          ? "text-white shadow-sm"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                      style={
                        safePage === p
                          ? { backgroundColor: "rgb(22, 70, 161)" }
                          : {}
                      }
                    >
                      {p}
                    </button>
                  ),
                )}
                <button
                  onClick={() =>
                    serverPagination.onPageChange(serverPagination.page + 1)
                  }
                  disabled={
                    serverPagination.page >= serverPagination.totalPages
                  }
                  className="px-3.5 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-100 hover:border-slate-300 disabled:text-slate-300 disabled:cursor-default transition-colors"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">›</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500">
                <span className="hidden sm:inline">Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRpp(Number(e.target.value));
                    setPage(1);
                  }}
                  className="text-sm font-semibold px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 cursor-pointer outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100 transition-all"
                >
                  {ROWS_PER_PAGE_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="px-3.5 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-100 hover:border-slate-300 disabled:text-slate-300 disabled:cursor-default transition-colors"
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">‹</span>
                </button>
                {getPages.map((p, i) =>
                  p === "..." ? (
                    <span
                      key={`d${i}`}
                      className="px-1 text-sm font-semibold text-slate-400"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 text-xs font-semibold rounded-lg transition-colors ${
                        safePage === p
                          ? "text-white shadow-sm"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                      style={
                        safePage === p
                          ? { backgroundColor: "rgb(22, 70, 161)" }
                          : {}
                      }
                    >
                      {p}
                    </button>
                  ),
                )}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="px-3.5 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-100 hover:border-slate-300 disabled:text-slate-300 disabled:cursor-default transition-colors"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">›</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
});
