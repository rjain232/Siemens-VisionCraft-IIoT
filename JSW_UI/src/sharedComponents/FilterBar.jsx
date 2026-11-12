import { memo, useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const SelectField = memo(function SelectField({
  label,
  options,
  value,
  onChange,
  multiple = false,
  searchable = true,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  const isMulti = multiple;

  const selectedOptions = isMulti
    ? options.filter((o) => (value || []).includes(o.value))
    : options.find((o) => o.value === value) || null;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const toggleMultiValue = (optValue) => {
    const current = value || [];
    const exists = current.includes(optValue);
    onChange(
      exists ? current.filter((v) => v !== optValue) : [...current, optValue],
    );
  };

  const removeChip = (e, optValue) => {
    e.stopPropagation();
    onChange((value || []).filter((v) => v !== optValue));
  };

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  );

  if (isMulti) {
    return (
      // ── same width/layout class as single-select ──
      <div
        className="flex flex-col gap-1 min-w-[150px]"
        style={{ position: "relative" }}
        ref={ref}
      >
        <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          {label}
        </label>

        {/* ── trigger: fixed h-[38px], no wrap, overflow hidden ── */}
        <div
          onClick={() => setOpen((p) => !p)}
          className={`flex items-center h-[38px] bg-white border rounded-md px-2 cursor-pointer transition-all overflow-hidden ${
            open
              ? "border-sky-500 ring-2 ring-sky-100"
              : "border-gray-200 hover:border-gray-300"
            }`}
        >
          {/* chips row – flex nowrap so they never cause height growth */}
          <div className="flex items-center gap-1 flex-nowrap overflow-hidden flex-1 min-w-0">
            {(value || []).length === 0 ? (
              <span className="text-sm text-gray-400 whitespace-nowrap">
                Select...
              </span>
            ) : (
              (value || []).map((v) => {
                const opt = options.find((o) => o.value === v);
                return (
                  <span
                    key={v}
                    className="flex items-center gap-1 bg-sky-100 text-sky-700 text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0"
                  >
                    {opt?.label}
                    <button
                      onMouseDown={(e) => removeChip(e, v)}
                      className="ml-0.5 text-sky-400 hover:text-sky-700 leading-none"
                    >
                      ×
                    </button>
                  </span>
                );
              })
            )}
          </div>

          <ChevronDown
            size={13}
            className={`shrink-0 text-gray-400 transition-transform duration-200 ml-1 ${
              open ? "rotate-180 text-sky-500" : ""
              }`}
          />
        </div>

        {open && (
          <div
            className="absolute top-full mt-1 left-0 w-full min-w-[200px] bg-white border border-gray-200 rounded-xl shadow-xl"
            style={{ zIndex: 9999, overflow: "visible" }}
          >
            {searchable && (
              <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 rounded-t-xl">
                <svg
                  className="w-4 h-4 text-gray-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
                  autoFocus
                />
              </div>
            )}

            <div className="max-h-52 overflow-y-auto overflow-x-hidden rounded-b-xl">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-3 text-sm text-gray-400 text-center">
                  No results found
                </div>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = (value || []).includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        toggleMultiValue(opt.value);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                        isSelected ? "bg-sky-50" : "hover:bg-gray-50"
                        }`}
                    >
                      <div
                        className={`w-[18px] h-[18px] rounded-[4px] flex items-center justify-center border-2 shrink-0 transition-all ${
                          isSelected
                            ? "border-sky-600 bg-sky-600"
                            : "border-gray-300 bg-white"
                          }`}
                        style={{ minWidth: 18, minHeight: 18 }}
                      >
                        {isSelected && (
                          <Check
                            size={11}
                            strokeWidth={3}
                            className="text-white"
                          />
                        )}
                      </div>
                      <span
                        className={`font-semibold ${
                          isSelected ? "text-sky-700" : "text-gray-800"
                          }`}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── SINGLE SELECT ──
  return (
    <div
      className="flex flex-col gap-1 min-w-[150px]"
      style={{ position: "relative" }}
      ref={ref}
    >
      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </label>

      <div className="relative">
        <button
          onClick={() => setOpen((p) => !p)}
          className={`w-full flex items-center justify-between gap-2 h-[38px] bg-white border rounded-md px-3 text-sm font-medium transition-all cursor-pointer ${
            open
              ? "border-sky-500 ring-2 ring-sky-100 text-sky-700"
              : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
        >
          <span
            className={`text-sm ${selectedOptions ? "text-gray-700" : "text-gray-400"}`}
          >
            {selectedOptions?.label ?? "Select..."}
          </span>
          <ChevronDown
            size={13}
            className={`shrink-0 text-gray-400 transition-transform duration-200 ${
              open ? "rotate-180 text-sky-500" : ""
              }`}
          />
        </button>

        {open && (
          <div
            className="absolute top-full mt-1 left-0 min-w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden"
            style={{ zIndex: 9999 }}
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-sm transition-colors text-left ${
                    isSelected
                      ? "bg-sky-50 text-sky-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && (
                    <Check size={13} className="text-sky-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

// ── MultiCheckField ──
const MultiCheckField = memo(function MultiCheckField({
  label,
  options,
  value = {},
  onChange,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex items-center gap-4 h-[38px]">
        {options.map((opt) => {
          const checked = !!value[opt.value];
          return (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer select-none group"
              onClick={() => onChange({ ...value, [opt.value]: !checked })}
            >
              <div
                className={`w-[18px] h-[18px] rounded-[4px] flex items-center justify-center border-2 transition-all ${
                  checked
                    ? "border-sky-600 bg-sky-600"
                    : "border-gray-300 bg-white group-hover:border-sky-400"
                  }`}
              >
                {checked && (
                  <Check size={11} strokeWidth={3} className="text-white" />
                )}
              </div>
              <span
                className={`text-sm font-medium transition-colors ${
                  checked ? "text-gray-800" : "text-gray-400"
                  }`}
              >
                {opt.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
});

function Divider() {
  return (
    <div className="hidden md:block w-px h-10 bg-gray-200 self-center mx-1" />
  );
}

export default memo(function FilterBar({
  config = [],
  filters = {},
  onChange = () => {},
  withContainer = true,
  children,
}) {
  const content = (
    <div className="flex flex-wrap items-end gap-4">
      {config.map((field, idx) => {
        if (field.type === "divider") {
          return <Divider key={`divider-${idx}`} />;
        }

        if (field.type === "select") {
          return (
            <SelectField
              key={field.key}
              label={field.label}
              options={field.options}
              value={
                filters[field.key] ??
                (field.multiple ? [] : field.options[0]?.value)
              }
              multiple={field.multiple}
              searchable={field.searchable !== false}
              onChange={(v) => onChange({ ...filters, [field.key]: v })}
            />
          );
        }

        if (field.type === "multicheck") {
          return (
            <MultiCheckField
              key={field.key}
              label={field.label}
              options={field.options}
              value={filters[field.key] ?? {}}
              onChange={(v) => onChange({ ...filters, [field.key]: v })}
            />
          );
        }

        return null;
      })}
    </div>
  );

  if (!withContainer) return content;

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg px-4 py-3 mb-4"
      style={{ overflow: "visible", position: "relative" }}
    >
      {content}
    </div>
  );
});
