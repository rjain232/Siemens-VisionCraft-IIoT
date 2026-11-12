import { useState, useEffect } from "react";
import {
  Folder,
  FolderOpen,
  FileText,
  ChevronRight,
  ChevronDown,
  Download,
  Share2,
  X,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { SHARE_REPORT_TREE } from "../../../utils/shareReportTree";

const ShareReport = () => {
  const [expandedNodes, setExpandedNodes] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [email, setEmail] = useState("");
  const [cadence, setCadence] = useState([]);
  const [emailStatus, setEmailStatus] = useState(null); // 'success', 'error', or null
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (showShareModal) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [showShareModal]);

  const toggleNode = (path) => {
    const key = path.join("/");
    setExpandedNodes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isExpanded = (path) => expandedNodes[path.join("/")] || false;

  const toggleFileSelection = (file) => {
    setSelectedFiles((prev) =>
      prev.some((f) => f.name === file.name)
        ? prev.filter((f) => f.name !== file.name)
        : [...prev, file]
    );
  };

  const handleDownload = (file) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    link.click();
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    setEmailStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Email:", email);
      console.log("Cadence:", cadence);
      console.log("Files:", selectedFiles);

      setEmailStatus("success");
      setTimeout(() => {
        setShowShareModal(false);
        setEmail("");
        setCadence([]);
        setSelectedFiles([]);
        setEmailStatus(null);
      }, 2000);
    } catch (error) {
      setEmailStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  const renderNode = (node, path = []) => {
    const currentPath = [...path, node.name];
    const expanded = isExpanded(currentPath);
    const hasChildren = node.children?.length;

    return (
      <div key={currentPath.join("/")} className="transition-all duration-200">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 min-w-0 ${node.type === "file"
            ? "hover:bg-sky-50 hover:shadow-sm"
            : "hover:bg-sky-100"
            }`}
          onClick={() => node.type !== "file" && toggleNode(currentPath)}
        >
          {/* Expand icon */}
          {hasChildren ? (
            expanded ? (
              <ChevronDown
                size={18}
                className="text-[#2744A0] transition-transform duration-200"
              />
            ) : (
              <ChevronRight
                size={18}
                className="text-[#2744A0] transition-transform duration-200"
              />
            )
          ) : (
            <span className="w-[18px]" />
          )}

          {/* Folder / Year icons */}
          {node.type === "year" && (
            <div className="bg-[#2744A0] p-2 rounded-lg">
              <Folder size={20} className="text-white" />
            </div>
          )}
          {node.type === "folder" && (
            <div
              className={`${expanded ? "bg-[#0e5a94]" : "bg-[#2744A0]"
                } p-2 rounded-lg transition-all duration-300`}
            >
              {expanded ? (
                <FolderOpen size={20} className="text-white" />
              ) : (
                <Folder size={20} className="text-white" />
              )}
            </div>
          )}

          {/* Folder / Year name */}
          {node.type !== "file" && (
            <span className="text-base font-bold text-[#152552] truncate min-w-0">
              {node.name}
            </span>
          )}

          {/* File row */}
          {node.type === "file" && (
            <>
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-2 border-sky-400 text-[#2744A0] focus:ring-2 focus:ring-sky-300 cursor-pointer transition-all"
                checked={selectedFiles.some((f) => f.name === node.name)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleFileSelection(node);
                }}
              />

              <div className="bg-red-600 p-2 rounded-lg">
                <FileText size={18} className="text-white" />
              </div>

              <span className="text-sm font-medium text-[#152552] flex-1 truncate min-w-0">
                {node.name}
              </span>
            </>
          )}
        </div>

        {/* Children */}
        {hasChildren && expanded && (
          <div className="ml-8 border-l-2 border-sky-300 pl-2 mt-1">
            {node.children.map((child) => renderNode(child, currentPath))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Scrollbar-hiding styles for the modal body only */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* MAIN CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border border-sky-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-sky-200">
          <div>
            <h2 className="text-2xl font-bold text-[#152552]">Share Reports</h2>
            <p className="text-sm text-[#2744A0] mt-1 font-medium">
              Select files to share via email
            </p>
          </div>

          <div className="flex items-center gap-4">
            {selectedFiles.length > 0 && (
              <div className="border-2 border-[#2744A0] text-[#2744A0] px-4 py-2 rounded-lg text-sm font-semibold">
                {selectedFiles.length} File{selectedFiles.length > 1 ? "s" : ""} Selected
              </div>
            )}
            <button
              disabled={selectedFiles.length === 0}
              onClick={() => setShowShareModal(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold shadow-md transition-all duration-200
    ${selectedFiles.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#2744A0] hover:bg-[#0e5a94] hover:shadow-lg"
                }`}
            >
              <Share2 size={16} />
              <span>Share Reports</span>
            </button>
          </div>
        </div>

        {/* Tree View */}
        <div className="bg-gray-50 rounded-xl p-4 border border-sky-200 overflow-x-hidden">
          {renderNode(SHARE_REPORT_TREE)}
        </div>
      </div>

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl transform transition-all animate-in zoom-in duration-300 max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-[#2744A0] p-5 rounded-t-2xl flex-shrink-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2.5 rounded-lg">
                    <Share2 size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Share Reports</h3>
                    <p className="text-white text-xs mt-0.5 font-medium opacity-90">
                      Send selected reports via email
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                  title="Close"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="no-scrollbar p-6 space-y-6 overflow-y-auto overflow-x-hidden flex-1 min-h-0">
              {/* Email Input */}
              <div>
                <label className="text-sm font-bold text-[#152552] mb-2 block">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3 border-2 border-sky-200 rounded-xl px-4 py-3 focus-within:border-[#2744A0] focus-within:shadow-lg transition-all bg-white">
                  <Mail size={20} className="text-[#2744A0]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@company.com"
                    className="w-full outline-none bg-transparent text-[#152552] placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Cadence */}
              <div>
                <label className="text-sm font-bold text-[#152552] mb-3 block">
                  Cadence <span className="text-red-500">*</span>
                </label>
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
                  <p className="text-xs text-[#2744A0] mb-3 font-medium">
                    Click to select or deselect
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "shiftwise", label: "Shift wise" },
                      { value: "daily", label: "Daily" },
                      { value: "weekly", label: "Weekly" },
                      { value: "monthly", label: "Monthly" },
                      { value: "quarterly", label: "Quarterly" },
                      { value: "yearly", label: "Yearly" },
                    ].map((option) => {
                      const isSelected = cadence.includes(option.value);
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setCadence(cadence.filter((c) => c !== option.value));
                            } else {
                              setCadence([...cadence, option.value]);
                            }
                          }}
                          className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${isSelected
                            ? "bg-[#2744A0] text-white shadow-md hover:bg-[#0e5a94]"
                            : "bg-white text-[#152552] border-2 border-sky-300 hover:border-[#2744A0] hover:bg-sky-100"
                            }`}
                        >
                          {isSelected && <span className="mr-1.5">Γ£ô</span>}
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                  {cadence.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-sky-200">
                      <p className="text-xs text-[#2744A0] font-semibold">
                        Selected:{" "}
                        {cadence
                          .map((c) => {
                            const labels = {
                              shiftwise: "Shift wise",
                              daily: "Daily",
                              weekly: "Weekly",
                              monthly: "Monthly",
                              quarterly: "Quarterly",
                              yearly: "Yearly",
                            };
                            return labels[c];
                          })
                          .join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Files */}
              <div>
                <p className="text-sm font-bold text-[#152552] mb-3 flex items-center gap-2">
                  Selected Files
                  <span className="bg-[#2744A0] text-white text-xs px-2 py-1 rounded-full">
                    {selectedFiles.length}
                  </span>
                </p>
                <div className="no-scrollbar bg-sky-50 rounded-xl p-4 border border-sky-200 max-h-40 overflow-y-auto overflow-x-hidden">
                  <ul className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all min-w-0"
                      >
                        <div className="bg-red-600 p-2 rounded-lg flex-shrink-0">
                          <FileText size={16} className="text-white" />
                        </div>
                        <span className="text-sm font-medium text-[#152552] flex-1 truncate min-w-0">
                          {file.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status Message */}
              {emailStatus && (
                <div
                  className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-3 shadow-lg animate-in slide-in-from-top duration-300 ${emailStatus === "success"
                    ? "bg-green-50 text-green-800 border-2 border-green-300"
                    : "bg-red-50 text-red-800 border-2 border-red-300"
                    }`}
                >
                  {emailStatus === "success" ? (
                    <>
                      <CheckCircle2 size={20} className="text-green-600" />
                      Email sent successfully!
                    </>
                  ) : (
                    <>
                      <AlertCircle size={20} className="text-red-600" />
                      Failed to send email. Please try again.
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-5 border-t-2 border-sky-100 bg-white rounded-b-2xl flex-shrink-0">
              <button
                onClick={() => setShowShareModal(false)}
                disabled={isSending}
                className="px-5 py-2.5 border-2 border-sky-300 rounded-lg font-semibold text-[#2744A0] hover:bg-sky-50 disabled:opacity-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                disabled={!email || cadence.length === 0 || isSending}
                className={`px-5 py-2.5 rounded-lg font-semibold text-white transition-all duration-200 flex items-center gap-2 shadow-md
                  ${!email || cadence.length === 0 || isSending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#2744A0] hover:bg-[#0e5a94] hover:shadow-lg"
                  }`}
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail size={18} />
                    Send Email
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareReport;
