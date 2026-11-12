import { useState, useMemo } from "react";
import DataTable from "../../../../sharedComponents/DataTable";

const BufferConfig = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    line: "",
    backlogDescription: "",
    actualBuffr: 0,
    minThresh: 0,
    maxThresh: 0,
    capacity: 0,
  });

  const [dummyData, setDummyData] = useState([
    { id: 1, line: "REAR FLOOR", backlogDescription: "Previous", actualBuffr: 0, minThresh: 0, maxThresh: 15, capacity: 20 },
    { id: 2, line: "REAR FLOOR", backlogDescription: "Next", actualBuffr: 5, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 3, line: "CENTER FLOOR", backlogDescription: "Previous", actualBuffr: 0, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 4, line: "CENTER FLOOR", backlogDescription: "Next", actualBuffr: 0, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 5, line: "UB", backlogDescription: "Previous", actualBuffr: 5, minThresh: 2, maxThresh: 3, capacity: 10 },
    { id: 6, line: "UB", backlogDescription: "Next", actualBuffr: 11, minThresh: 2, maxThresh: 3, capacity: 10 },
    { id: 7, line: "FE", backlogDescription: "Previous", actualBuffr: 0, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 8, line: "FE", backlogDescription: "Next", actualBuffr: 13, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 9, line: "SR", backlogDescription: "Previous", actualBuffr: 0, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 10, line: "SR", backlogDescription: "Next", actualBuffr: 3, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 11, line: "BS LH", backlogDescription: "Previous", actualBuffr: 6, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 12, line: "BS LH", backlogDescription: "Next", actualBuffr: 7, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 13, line: "BS RH", backlogDescription: "Previous", actualBuffr: 7, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 14, line: "BS RH", backlogDescription: "Next", actualBuffr: 6, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 15, line: "FRONT FLOOR", backlogDescription: "Previous", actualBuffr: 8, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 16, line: "FRONT FLOOR", backlogDescription: "Next", actualBuffr: 12, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 17, line: "SIDE PANEL LH", backlogDescription: "Previous", actualBuffr: 3, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 18, line: "SIDE PANEL LH", backlogDescription: "Next", actualBuffr: 5, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 19, line: "SIDE PANEL RH", backlogDescription: "Previous", actualBuffr: 4, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 20, line: "SIDE PANEL RH", backlogDescription: "Next", actualBuffr: 7, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 21, line: "ROOF", backlogDescription: "Previous", actualBuffr: 2, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 22, line: "ROOF", backlogDescription: "Next", actualBuffr: 9, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 23, line: "TAILGATE", backlogDescription: "Previous", actualBuffr: 6, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 24, line: "TAILGATE", backlogDescription: "Next", actualBuffr: 4, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 25, line: "DOOR LH", backlogDescription: "Previous", actualBuffr: 5, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 26, line: "DOOR LH", backlogDescription: "Next", actualBuffr: 8, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 27, line: "DOOR RH", backlogDescription: "Previous", actualBuffr: 7, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 28, line: "DOOR RH", backlogDescription: "Next", actualBuffr: 3, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 29, line: "HOOD", backlogDescription: "Previous", actualBuffr: 9, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 30, line: "HOOD", backlogDescription: "Next", actualBuffr: 11, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 31, line: "FENDER LH", backlogDescription: "Previous", actualBuffr: 4, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 32, line: "FENDER LH", backlogDescription: "Next", actualBuffr: 6, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 33, line: "FENDER RH", backlogDescription: "Previous", actualBuffr: 3, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 34, line: "FENDER RH", backlogDescription: "Next", actualBuffr: 8, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 35, line: "BUMPER FRONT", backlogDescription: "Previous", actualBuffr: 10, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 36, line: "BUMPER FRONT", backlogDescription: "Next", actualBuffr: 5, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 37, line: "BUMPER REAR", backlogDescription: "Previous", actualBuffr: 7, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 38, line: "BUMPER REAR", backlogDescription: "Next", actualBuffr: 9, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 39, line: "GRILLE", backlogDescription: "Previous", actualBuffr: 2, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 40, line: "GRILLE", backlogDescription: "Next", actualBuffr: 6, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 41, line: "MIRROR LH", backlogDescription: "Previous", actualBuffr: 8, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 42, line: "MIRROR LH", backlogDescription: "Next", actualBuffr: 4, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 43, line: "MIRROR RH", backlogDescription: "Previous", actualBuffr: 5, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 44, line: "MIRROR RH", backlogDescription: "Next", actualBuffr: 7, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 45, line: "WINDSHIELD", backlogDescription: "Previous", actualBuffr: 6, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 46, line: "WINDSHIELD", backlogDescription: "Next", actualBuffr: 3, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 47, line: "REAR GLASS", backlogDescription: "Previous", actualBuffr: 9, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 48, line: "REAR GLASS", backlogDescription: "Next", actualBuffr: 4, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 49, line: "SUNROOF", backlogDescription: "Previous", actualBuffr: 5, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 50, line: "SUNROOF", backlogDescription: "Next", actualBuffr: 8, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 51, line: "ANTENNA", backlogDescription: "Previous", actualBuffr: 3, minThresh: 0, maxThresh: 15, capacity: 0 },
    { id: 52, line: "ANTENNA", backlogDescription: "Next", actualBuffr: 6, minThresh: 0, maxThresh: 15, capacity: 0 },
  ]);

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      line: item.line,
      backlogDescription: item.backlogDescription,
      actualBuffr: item.actualBuffr,
      minThresh: item.minThresh,
      maxThresh: item.maxThresh,
      capacity: item.capacity,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ line: "", backlogDescription: "", actualBuffr: 0, minThresh: 0, maxThresh: 0, capacity: 0 });
  };

  const handleSave = () => {
    if (!editingItem) return;
    setDummyData((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? {
            ...item,
            line: formData.line,
            backlogDescription: formData.backlogDescription,
            actualBuffr: Number(formData.actualBuffr),
            minThresh: Number(formData.minThresh),
            maxThresh: Number(formData.maxThresh),
            capacity: Number(formData.capacity),
          }
          : item
      )
    );
    handleCloseModal();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const filteredData = useMemo(() => {
    return dummyData.filter((item) =>
      searchTerm === "" ||
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, dummyData]);

  const columns = [
    { key: "line", label: "Line", sortable: true },
    { key: "backlogDescription", label: "Backlog Description", sortable: true },
    { key: "actualBuffr", label: "Actual Buffer", sortable: true },
    { key: "minThresh", label: "Min Thresh", sortable: true },
    { key: "maxThresh", label: "Max Thresh", sortable: true },
    { key: "capacity", label: "Capacity", sortable: true },
    {
      key: "_action",
      label: "",
      sortable: false,
      render: (row) => (
        <button
          onClick={() => handleEdit(row)}
          className="text-sky-600 hover:text-sky-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      ),
    },
  ];

  return (
    <div className="m-4">

      <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-sm font-bold text-slate-700 tracking-wide">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all w-full sm:w-64"
          />
          <button className="ml-1 px-3.5 py-1.5 bg-sky-200/80 border border-sky-300 rounded-lg text-sm font-semibold text-sky-800 hover:bg-sky-300/60 transition-colors">
            🔍
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        title="Buffer Config"
        defaultRows={10}
      />

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.15)" }}
        >
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden">

            <div className="bg-sky-200/80 border-b border-sky-300 px-6 py-4 flex items-center gap-2.5">
              <div className="w-1 h-5 bg-sky-600 rounded-full" />
              <h2 className="text-base font-bold text-sky-800 tracking-wide uppercase">
                Edit Backlog Registry
              </h2>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {[
                { label: "Line", field: "line", type: "text" },
                { label: "Backlog Description", field: "backlogDescription", type: "text" },
                { label: "Actual Buffer", field: "actualBuffr", type: "number" },
                { label: "Min Threshold", field: "minThresh", type: "number" },
                { label: "Max Threshold", field: "maxThresh", type: "number" },
                { label: "Capacity", field: "capacity", type: "number" },
              ].map(({ label, field, type }) => (
                <div key={field}>
                  <label className="block text-xs font-bold text-sky-800 tracking-widest uppercase mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full px-3 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg bg-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-1.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 hover:border-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1.5 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 shadow-sm transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BufferConfig;