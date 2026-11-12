import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import { Check, AlertCircle, X as CloseIcon } from "lucide-react";
import DataTable from "../../../sharedComponents/DataTable";
import FilterBar from "../../../sharedComponents/FilterBar";

const STATIC_TOOLS = [
  {
    ToolId: 1,
    ToolName: "Bosch ServoGun i4.0",
    Upto_Schedule: "2025-07-19T09:30:01.013Z",
    Status: "Pending",
    Message: "Bosch ServoGun i4.0 Has Pending Activity",
  },
  {
    ToolId: 2,
    ToolName: "Bosch C-Type Servo Gun",
    Upto_Schedule: "2025-07-19T09:30:01.013Z",
    Status: "Pending",
    Message: "Bosch C-Type Servo Gun Has Pending Activity",
  },
  {
    ToolId: 3,
    ToolName: "Bosch X-Type Servo Gun",
    Upto_Schedule: "2025-07-19T09:30:01.013Z",
    Status: "Pending",
    Message: "Bosch X-Type Servo Gun Has Pending Activity",
  },
  {
    ToolId: 4,
    ToolName: "Bosch Pneumatic Gun",
    Upto_Schedule: "2025-07-19T09:30:01.013Z",
    Status: "Pending",
    Message: "Bosch Pneumatic Gun Has Pending Activity",
  },
  {
    ToolId: 5,
    ToolName: "Bosch ServoGun i3.0",
    Upto_Schedule: "2025-07-19T09:30:01.013Z",
    Status: "Pending",
    Message: "Bosch ServoGun i3.0 Has Pending Activity",
  },
  {
    ToolId: 6,
    ToolName: "WTC Adaptive Servo Gun",
    Upto_Schedule: "2025-07-19T09:30:01.013Z",
    Status: "Pending",
    Message: "WTC Adaptive Servo Gun Has Pending Activity",
  },
];

const STATIC_ACTIVITIES = {
  3: [],
  4: [
    {
      Id: 20,
      ToolId: 4,
      Activity: "Check for air leaks in cylinders and hoses",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 21,
      ToolId: 4,
      Activity: "Test solenoid valve function and response time",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 22,
      ToolId: 4,
      Activity: "Ensure proper air pressure and regulator operation",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 23,
      ToolId: 4,
      Activity: "Dress or replace electrode tips",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 24,
      ToolId: 4,
      Activity: "Inspect piston seals for wear and air loss",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 25,
      ToolId: 4,
      Activity: "Lubricate moving joints and cylinders",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 26,
      ToolId: 4,
      Activity: "Verify electrode alignment and stroke travel",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
  ],
  5: [
    {
      Id: 30,
      ToolId: 5,
      Activity: "Run motor calibration tests via controller",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 31,
      ToolId: 5,
      Activity: "Inspect linear encoder for debris or wear",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 32,
      ToolId: 5,
      Activity: "Check for backlash in servo mechanism",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 33,
      ToolId: 5,
      Activity: "Review weld schedules in controller memory",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 34,
      ToolId: 5,
      Activity: "Monitor thermal protection systems and cooling flow",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 35,
      ToolId: 5,
      Activity: "Replace tips and clean weld area",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
  ],
  6: [
    {
      Id: 36,
      ToolId: 6,
      Activity: "Verify adaptive force control sensors calibration",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 37,
      ToolId: 6,
      Activity: "Inspect weld gun structure and servo motor function",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 38,
      ToolId: 6,
      Activity: "Clean and maintain electrode tips and holders",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 39,
      ToolId: 6,
      Activity: "Check adaptive algorithms settings and logs",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 40,
      ToolId: 6,
      Activity: "Lubricate joints and test stroke repeatability",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
    {
      Id: 41,
      ToolId: 6,
      Activity: "Backup WTC gun controller configuration",
      Action: false,
      Remarks: null,
      ComplitedBy: null,
      GeneratedBy: "Admin",
      Timestamp: "2025-07-12T09:30:01.013Z",
      Upto_Schedule: "2025-07-19T09:30:01.013Z",
      UpdateOn: null,
    },
  ],
};

let nextActivityId = 100; // local id generator for newly-added rows

const EXPECTED_COLUMNS = ["Activity"];

const Button = ({
  label,
  onClick,
  bgColor = "bg-[#26439f]",
  textColor = "text-white",
  icon: Icon,
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`${bgColor} hover:opacity-80 ${textColor} font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap ${className}`}
  >
    {Icon && <Icon size={18} />}
    {label}
  </button>
);
Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  icon: PropTypes.elementType,
  className: PropTypes.string,
};

const AlertCard = ({ variant = "success", title, message, actions, onClose }) => {
  if (!title && !message) return null;

  const isSuccess = variant === "success";

  const styles = isSuccess
    ? {
      wrapper: "bg-emerald-50 border-emerald-100",
      border: "border-l-emerald-500",
      iconBg: "bg-white text-emerald-500 ring-1 ring-emerald-200",
      title: "text-emerald-900",
      message: "text-emerald-700",
      action: "text-emerald-700 hover:text-emerald-900",
      close: "text-emerald-400 hover:text-emerald-600",
    }
    : {
      wrapper: "bg-red-50 border-red-100",
      border: "border-l-red-500",
      iconBg: "bg-white text-red-500 ring-1 ring-red-200",
      title: "text-red-900",
      message: "text-red-700",
      action: "text-red-700 hover:text-red-900",
      close: "text-red-400 hover:text-red-600",
    };

  const Icon = isSuccess ? Check : AlertCircle;

  return (
    <div
      role="alert"
      className={`flex items-start gap-4 rounded-xl border border-l-4 ${styles.wrapper} ${styles.border} px-5 py-4`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${styles.iconBg}`}
      >
        <Icon size={16} strokeWidth={3} />
      </span>

      <div className="flex-1 min-w-0">
        {title && (
          <p className={`text-sm font-bold ${styles.title}`}>{title}</p>
        )}
        {message && (
          <p className={`text-sm mt-0.5 ${styles.message}`}>{message}</p>
        )}
        {actions?.length > 0 && (
          <div className="flex items-center gap-4 mt-2">
            {actions.map((a) => (
              <button
                key={a.label}
                type="button"
                onClick={a.onClick}
                className={`text-sm font-semibold underline-offset-2 hover:underline ${styles.action}`}
              >
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={`shrink-0 rounded-full p-1 ${styles.close}`}
        >
          <CloseIcon size={18} />
        </button>
      )}
    </div>
  );
};
AlertCard.propTypes = {
  variant: PropTypes.oneOf(["success", "error"]),
  title: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
  onClose: PropTypes.func,
};

const ModalHOC = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/30 z-50 px-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-xl border border-sky-100 w-full max-w-md z-50 overflow-hidden">
        {title && (
          <div className="flex items-center justify-between bg-sky-50 border-b border-sky-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded bg-sky-600 shrink-0" />
              <h2 className="text-sm font-extrabold tracking-widest uppercase text-sky-900">
                {title}
              </h2>
            </div>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              onClick={onClose}
            >
              <CloseIcon size={20} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
ModalHOC.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const AddActivityForm = ({ toolId, onAdded }) => {
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE_MB = 5;

  const handleChange = (e) => {
    const { files } = e.target;
    setErrorMsg("");
    setSuccessMsg("");
    if (!files?.length) return;

    const selected = files[0];
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    const maxSize = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (!validTypes.includes(selected.type)) {
      setErrorMsg("Only Excel files (.xls, .xlsx) are allowed.");
      return;
    }
    if (selected.size > maxSize) {
      setErrorMsg(`File must be smaller than ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }
    setFile(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Reads the workbook, checks the header row against EXPECTED_COLUMNS.
  // Resolves with parsed rows if valid, rejects with an error message if not.
  const validateAndParseExcel = (selectedFile) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const data = new Uint8Array(evt.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

          if (!rows.length) {
            reject("Excel file is empty.");
            return;
          }

          const headers = Object.keys(rows[0]).map((h) => h.trim());
          const missing = EXPECTED_COLUMNS.filter(
            (col) => !headers.includes(col)
          );

          if (missing.length > 0) {
            reject(`Missing column(s): ${missing.join(", ")}.`);
            return;
          }

          resolve(rows);
        } catch (err) {
          reject("Unable to read the Excel file. Please check the format.");
        }
      };
      reader.onerror = () => reject("Error reading the file.");
      reader.readAsArrayBuffer(selectedFile);
    });

  const handleUpload = async () => {
    if (!file) {
      setErrorMsg("Please select a file.");
      return;
    }
    if (!toolId) {
      setErrorMsg("Please select a tool before uploading.");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const rows = await validateAndParseExcel(file);

      let addedCount = 0;
      rows.forEach((row) => {
        const activityText = String(row["Activity"] || "").trim();
        if (!activityText) return;

        onAdded({
          Id: nextActivityId++,
          ToolId: Number(toolId),
          Activity: activityText,
          Action: false,
          Remarks: null,
          ComplitedBy: null,
          GeneratedBy: "Admin",
          Timestamp: new Date().toISOString(),
          Upto_Schedule: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
          UpdateOn: null,
        });
        addedCount += 1;
      });

      if (addedCount === 0) {
        setErrorMsg("No valid activity rows found in the file.");
      } else {
        setSuccessMsg("Your changes have been saved.");
        setFile(null);
      }
    } catch (err) {
      setErrorMsg(
        typeof err === "string" ? err : "There was a problem with your submission."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Upload Excel File
        </label>
        <input
          type="file"
          name="file"
          accept=".xlsx, .xls"
          onChange={handleChange}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          required
        />
      </div>

      <AlertCard
        variant="error"
        message={errorMsg}
        onClose={() => setErrorMsg("")}
      />
      <AlertCard
        variant="success"
        message={successMsg}
        onClose={() => setSuccessMsg("")}
      />

      <div className="flex">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#26439f] text-white py-2 rounded hover:opacity-80 transition disabled:opacity-50"
          onClick={handleUpload}
        >
          {loading ? "Uploading..." : "Upload Excel"}
        </button>
      </div>
    </form>
  );
};
AddActivityForm.propTypes = {
  toolId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onAdded: PropTypes.func.isRequired,
};

const TDMTools = ({ toolSelected: toolSelectedProp, changeTool: changeToolProp }) => {
  const [internalTool, setInternalTool] = useState({
    value: String(STATIC_TOOLS[0].ToolId),
    text: STATIC_TOOLS[0].ToolName,
  });
  const toolSelected = toolSelectedProp ?? internalTool;
  const changeTool = changeToolProp ?? setInternalTool;

  const [activitiesStore, setActivitiesStore] = useState(STATIC_ACTIVITIES);

  const [rowState, setRowState] = useState({});
  const [reportBy, setReportBy] = useState("");
  const [activitySearch, setActivitySearch] = useState("");
  const [showAddActivityForm, setShowAddActivityForm] = useState(false);
  const [isLastWeekPending, setIsLastWeekPending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [reportAlert, setReportAlert] = useState(null);

  const activityData = activitiesStore[toolSelected.value] || [];
  const filteredActivityData = useMemo(() => {
    if (!activitySearch.trim()) return activityData;
    const q = activitySearch.trim().toLowerCase();
    return activityData.filter((item) =>
      item.Activity?.toLowerCase().includes(q)
    );
  }, [activityData, activitySearch]);

  const changeFormVisibility = () => {
    setShowAddActivityForm(!showAddActivityForm);
  };

  const handleRemarkChange = useCallback((id, value) => {
    setRowState((prev) => ({
      ...prev,
      [id]: { ...prev[id], remark: value },
    }));
  }, []);

  const handleCheckboxChange = useCallback((id, checked) => {
    setRowState((prev) => ({
      ...prev,
      [id]: { ...prev[id], checked },
    }));
  }, []);

  const handleReportByChange = useCallback((e) => {
    setReportBy(e.target.value);
  }, []);

  const columns = useMemo(
    () => [
      { key: "sr", label: "Sr. No" },
      { key: "Activity", label: "Activity", sortable: true },
      {
        key: "Action",
        label: "Action",
        render: (row) => (
          <input
            type="checkbox"
            checked={rowState[row.Id]?.checked || false}
            onChange={(e) => handleCheckboxChange(row.Id, e.target.checked)}
          />
        ),
      },
      {
        key: "Remarks",
        label: "Remark",
        render: (row) => (
          <input
            type="text"
            className="border border-sky-200 p-2 rounded-md w-full text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
            value={rowState[row.Id]?.remark || ""}
            placeholder="Enter Remark"
            onChange={(e) => handleRemarkChange(row.Id, e.target.value)}
          />
        ),
      },
    ],
    [rowState, handleCheckboxChange, handleRemarkChange]
  );

  const toolOptions = useMemo(
    () =>
      STATIC_TOOLS.map((t) => ({
        label: t.ToolName,
        value: String(t.ToolId),
      })),
    []
  );

  const handleToolFilterChange = (newFilters) => {
    const id = newFilters.tool;
    const tool = STATIC_TOOLS.find((t) => String(t.ToolId) === String(id));
    changeTool({
      value: id,
      text: tool ? tool.ToolName : "",
    });
    setRowState({});
    setActivitySearch("");
    setReportAlert(null);
  };

  useEffect(() => {
    const currentDate = new Date();
    const hasPending = activityData?.some((activity) => {
      const uptoSchedule = activity.Upto_Schedule
        ? new Date(activity.Upto_Schedule)
        : null;
      return uptoSchedule && uptoSchedule <= currentDate;
    });
    setIsLastWeekPending(hasPending);
  }, [activityData]);

  useEffect(() => {
    if (!reportAlert) return undefined;
    const timer = setTimeout(() => setReportAlert(null), 4000);
    return () => clearTimeout(timer);
  }, [reportAlert]);

  const handleActivityAdded = (newActivity) => {
    setActivitiesStore((prev) => {
      const key = String(newActivity.ToolId);
      const list = prev[key] || [];
      return { ...prev, [key]: [...list, newActivity] };
    });
  };

  const handleGenerateReportClick = async () => {
    if (!reportBy.trim()) {
      setReportAlert({
        variant: "error",
        title: "Name Required",
        message: "Please enter your name before generating the report.",
      });
      return;
    }

    const filteredData = activityData
      .filter((item) => rowState[item.Id]?.checked)
      .map((item) => ({
        ToolId: toolSelected.value,
        Activity: item.Activity,
        Action: 1,
        Remark: rowState[item.Id]?.remark || "",
        reportBy,
      }));

    if (filteredData.length === 0) {
      setReportAlert({
        variant: "error",
        title: "No Activities Selected",
        message: "Please select at least one activity to generate the report.",
      });
      return;
    }

    setIsSubmitting(true);
    setReportAlert(null);
    await new Promise((resolve) => setTimeout(resolve, 400)); // simulate latency

    setActivitiesStore((prev) => {
      const key = String(toolSelected.value);
      const list = prev[key] || [];
      const remaining = list.filter((item) => !rowState[item.Id]?.checked);
      return { ...prev, [key]: remaining };
    });

    setIsSubmitting(false);
    setRowState({});
    setReportBy("");
    setReportAlert({
      variant: "success",
      title: "Update Successful",
      message: "Tool maintenance data updated successfully.",
    });
  };

  return (
    <>
      <div className="mt-4 px-2 sm:px-0">

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap items-end gap-4">
            <FilterBar
              withContainer={false}
              config={[
                {
                  key: "tool",
                  label: "Select Tool",
                  type: "select",
                  options: toolOptions,
                },
              ]}
              filters={{ tool: toolSelected.value }}
              onChange={handleToolFilterChange}
            />

            <span className="text-lg font-semibold text-gray-700 pb-2">
              Selected Tool: {toolSelected.text}
            </span>
          </div>

          <div className="shrink-0">
            <Button
              label="Add New Activities"
              onClick={changeFormVisibility}
              className="w-full md:w-auto"
            />
          </div>
        </div>

        <div className="mt-6">
          {toolSelected?.value && activityData?.length > 0 ? (
            <>
              {filteredActivityData.length > 0 ? (
                <div className="overflow-x-auto">
                  <DataTable
                    data={filteredActivityData}
                    columns={columns}
                    title="Tool Activities"
                    defaultRows={10}
                  />
                </div>
              ) : (
                <p className="text-gray-500 mt-2">
                  No activities match "{activitySearch}".
                </p>
              )}

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                <span className="text-lg font-semibold text-gray-700 flex flex-wrap items-center gap-2">
                  Name:
                  <input
                    type="text"
                    className="flex-1 text-sm font-medium px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 placeholder:text-slate-300 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
                    placeholder="Enter Name"
                    value={reportBy}
                    onChange={handleReportByChange}
                  />
                </span>

                <button
                  onClick={handleGenerateReportClick}
                  disabled={isSubmitting}
                  className="bg-[#26439f] hover:opacity-80 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 w-full sm:w-auto"
                >
                  {isSubmitting ? "Generating..." : "Generate Report"}
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500 mt-2">
              {toolSelected?.value
                ? "No activities found for the selected tool."
                : "Select a tool to view activities."}
            </p>
          )}
        </div>
      </div>

      <ModalHOC
        isOpen={showAddActivityForm}
        onClose={changeFormVisibility}
        title="Add Activity"
      >
        <AddActivityForm
          toolId={toolSelected.value}
          onAdded={handleActivityAdded}
        />
      </ModalHOC>
      {reportAlert && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-full max-w-sm px-4 animate-[toast-in_0.25s_ease-out]">
          <AlertCard
            variant={reportAlert.variant}
            title={reportAlert.title}
            message={reportAlert.message}
            onClose={() => setReportAlert(null)}
          />
        </div>
      )}
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

TDMTools.propTypes = {
  toolSelected: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
  }),
  changeTool: PropTypes.func,
};

export default TDMTools;