import { useState, useMemo, useEffect, useCallback } from "react";
import { Activity } from "lucide-react";
import DataTable from "../../../sharedComponents/DataTable";
import FilterBar from "../../../sharedComponents/FilterBar";
import EmptyState, { NoDataState } from "../../../sharedComponents/EmptyState";
import { TableShimmer } from "../../../sharedComponents/Shimmer";
import { masterApi, ctOeeConfigApi } from "../../../services/api";
import { formatClusterName } from "../../../utils/Formatters";

function mapConfigRow(config, masterClusters, idx) {
  const cluster = masterClusters.find((c) => c.ClusterName === config.ClusterName);
  const line = cluster?.Lines?.find((l) => l.LineName === config.LineName);
  return {
    id: config.Id,
    sr: idx + 1,
    clusterId: cluster?.ClusterId ?? null,
    clusterName: config.ClusterName,
    lineId: line?.LineId ?? null,
    lineName: config.LineName,
    nominalCycleTime: config.NominalCycleTime,
    oeeTarget: config.OEETarget,
    techEfficiency: config.TechEfficiency,
    jph: config.JPH,
  };
}

const LABEL = "block text-xs font-bold tracking-widest uppercase mb-1.5 text-sky-700";
const INPUT = "w-full px-3 py-2.5 text-sm rounded-lg border border-sky-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500";
const DISABLED = "w-full px-3 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed";
const SELECT = "w-full px-3 py-2.5 text-sm rounded-lg border border-sky-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500 appearance-none cursor-pointer";

function EditModal({ item, formData, onChange, onSave, onClose, masterClusters, saving, saveError }) {
  if (!item) return null;
  const lineOptions = useMemo(() => {
    const cluster = masterClusters.find((c) => c.ClusterId === item.clusterId);
    return (cluster?.Lines || []).map((l) => ({
      lineId: l.LineId,
      lineName: l.LineName,
    }));
  }, [masterClusters, item.clusterId]);

  const handleLineChange = (e) => {
    const selectedLine = lineOptions.find((l) => String(l.lineId) === e.target.value);
    if (selectedLine) {
      onChange("lineId", selectedLine.lineId);
      onChange("lineName", selectedLine.lineName);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-sky-100">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded bg-sky-600 shrink-0" />
            <h2 className="text-sm font-extrabold tracking-widest uppercase text-sky-900">
              Edit OEE Configuration
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors" title="Close">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-5 space-y-4 overflow-y-auto" style={{ maxHeight: "65vh" }}>
          {saveError && (
            <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-700">
              {saveError}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL}>Area</label>
              <input type="text" value={formatClusterName(item.clusterName || "")} disabled className={DISABLED} />
            </div>
            <div>
              <label className={LABEL}>Line</label>
              <input type="text" value={item.lineName || ""} disabled className={DISABLED} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL}>Nominal Cycle Time (sec)</label>
              <input type="number" value={formData.nominalCycleTime} onChange={(e) => onChange("nominalCycleTime", parseFloat(e.target.value) || 0)} className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>JPH (Jobs Per Hour)</label>
              <input type="number" value={formData.jph} onChange={(e) => onChange("jph", parseFloat(e.target.value) || 0)} className={INPUT} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL}>OEE Target (%)</label>
              <input type="number" value={formData.oeeTarget} onChange={(e) => onChange("oeeTarget", parseFloat(e.target.value) || 0)} className={INPUT} />
            </div>
            <div>
              <label className={LABEL}>Tech. Efficiency (%)</label> 
              <input type="number" value={formData.techEfficiency} onChange={(e) => onChange("techEfficiency", parseFloat(e.target.value) || 0)} className={INPUT} />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200">
          <button onClick={onClose} disabled={saving} className="px-6 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button onClick={onSave} disabled={saving} className="px-6 py-2.5 text-sm font-bold text-white rounded-lg transition-colors disabled:opacity-60" style={{ backgroundColor: "#1d4ed8" }}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CTOEEConfiguration() {
  const [masterClusters, setMasterClusters] = useState([]);
  const [configRows, setConfigRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const [filters, setFilters] = useState({ clusterId: "", lineId: "" });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    lineId: null, lineName: "", nominalCycleTime: 0, oeeTarget: 0, techEfficiency: 0, jph: 0,
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {

    let cancelled = false;
    (async () => {
      setLoading(true);
      setApiError(null);
      try {
        const json = await masterApi.getMasterData();
        if (cancelled) return;
        const clusters = json.data ?? json ?? [];
        setMasterClusters(clusters);
        const firstCluster = clusters[0];
        const firstLine = firstCluster?.Lines?.[0];
        setFilters({
          clusterId: firstCluster ? String(firstCluster.ClusterId) : "",
          lineId: firstLine ? String(firstLine.LineId) : "",
        });
      } catch (err) {
        if (cancelled) return;
        setApiError(err.message);
        setMasterClusters([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setApiError(null);
      try {
        const json = await ctOeeConfigApi.list({
          clusterId: filters.clusterId || undefined,
          lineId: filters.lineId || undefined,
        });
        if (cancelled) return;
        setConfigRows(json.data ?? []);
      } catch (err) {
        if (cancelled) return;
        setApiError(err.message);
        setConfigRows([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
 }, [filters.clusterId, filters.lineId, masterClusters]);

  const clusterOptions = useMemo(() => {
    return masterClusters.map((c) => ({
      value: String(c.ClusterId),
      label: formatClusterName(c.ClusterName),
    }));
  }, [masterClusters]);

  const lineOptions = useMemo(() => {
    const sources = !filters.clusterId
      ? masterClusters
      : masterClusters.filter((c) => String(c.ClusterId) === filters.clusterId);
    const seen = new Set();
    const opts = [];
    sources.forEach((c) => {
      (c.Lines || []).forEach((l) => {
        if (!seen.has(l.LineId)) {
          seen.add(l.LineId);
          opts.push({ value: String(l.LineId), label: l.LineName });
        }
      });
    });
    return opts;
  }, [masterClusters, filters.clusterId]);

  const noLinesAvailable =
    masterClusters.length > 0 && Boolean(filters.clusterId) && lineOptions.length === 0;

  const filterConfig = useMemo(() => [
    { key: "clusterId", type: "select", label: "Area", options: clusterOptions },
    { key: "lineId", type: "select", label: "Line", options: lineOptions },
  ], [clusterOptions, lineOptions]);

  const handleFiltersChange = useCallback((next) => {
    if (next.clusterId !== filters.clusterId) {
      const selectedCluster = masterClusters.find(
        (c) => String(c.ClusterId) === next.clusterId
      );
      const firstLine = selectedCluster?.Lines?.[0];
      setFilters({
        ...next,
        lineId: firstLine ? String(firstLine.LineId) : "",
      });
    } else {
      setFilters(next);
    }
  }, [filters.clusterId, masterClusters]);

  const tableData = useMemo(
    () => configRows.map((row, idx) => mapConfigRow(row, masterClusters, idx)),
    [configRows, masterClusters],
  )

  const handleEdit = useCallback((row) => {
    setEditingItem(row);
    setSaveError(null);
    setEditFormData({
      lineId: row.lineId,
      lineName: row.lineName,
      nominalCycleTime: row.nominalCycleTime,
      oeeTarget: row.oeeTarget,
      techEfficiency: row.techEfficiency,
      jph: row.jph,
    });
    setIsEditModalOpen(true);
  }, []);

  const handleFieldChange = useCallback((field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSaveEdit = async () => {
    if (!editingItem) return;
    setSaving(true);
    setSaveError(null);
    try {
      await ctOeeConfigApi.update(editingItem.id, {
        nominalCycleTime: editFormData.nominalCycleTime,
        jph: editFormData.jph,
        oeeTarget: editFormData.oeeTarget,
        techEfficiency: editFormData.techEfficiency,
      });
      const json = await ctOeeConfigApi.list({
        clusterId: filters.clusterId || undefined,
        lineId: filters.lineId || undefined,
      });
      setConfigRows(json.data ?? []);
      handleCloseModal();
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };


  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingItem(null);
    setSaveError(null);
    setEditFormData({ lineId: null, lineName: "", nominalCycleTime: 0, oeeTarget: 0, techEfficiency: 0, jph: 0 });
  };

  const columns = useMemo(() => [
    { key: "sr", label: "Sr. No." },
    {
      key: "clusterName", label: "Area", sortable: true,
      render: (row) => (
        <span className="text-sm font-medium text-slate-700">
          {formatClusterName(row.clusterName)}
        </span>
      ),
    },
    { key: "lineName", label: "Line", sortable: true, type: "primary" },
    { key: "nominalCycleTime", label: "Nominal Cycle Time", sortable: true },
    { key: "jph", label: "JPH", sortable: true },
    { key: "oeeTarget", label: "OEE Target", sortable: true },
    { key: "techEfficiency", label: "Tech. Efficiency", sortable: true },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <button onClick={() => handleEdit(row)} className="text-sky-500 hover:text-sky-800 transition-colors" title="Edit">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      ),
    },
  ], [handleEdit]);

  return (
    <div className="p-4">
      {apiError && (
        <div className="mb-4 flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-700">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          Failed to load master data: {apiError}
        </div>
      )}

      <FilterBar config={filterConfig} filters={filters} onChange={handleFiltersChange} />

      {noLinesAvailable ? (
        <EmptyState
          icon={Activity}
          color="sky"
          title="No line or station available for the selected area"
        />
      ) : loading ? (
        <TableShimmer />
      ) : tableData.length === 0 ? (
        <NoDataState />
      ) : (
        <DataTable
          columns={columns}
          data={tableData}
          title="OEE Configuration"
          defaultRows={10}
        />
      )}

      {isEditModalOpen && (
        <EditModal
          item={editingItem}
          formData={editFormData}
          onChange={handleFieldChange}
          onSave={handleSaveEdit}
          onClose={handleCloseModal}
          masterClusters={masterClusters}
          saving={saving}
          saveError={saveError}
        />
      )}
    </div>
  );
}