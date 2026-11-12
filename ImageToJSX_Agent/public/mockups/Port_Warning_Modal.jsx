import React, { useState } from 'react';

export default function GeneratedScreen() {
  const [isOpen, setIsOpen] = useState(true);
  const [status, setStatus] = useState('idle');

  const handleRetry = () => {
    setStatus('retrying');
    setTimeout(() => {
      setStatus('idle');
    }, 1000);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f3f4f6] font-sans">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded bg-[#d97706] px-4 py-2 text-white shadow hover:bg-[#b45309] focus:outline-none"
        >
          Open Warning Dialog
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#f3f4f6] font-['Segoe_UI',sans-serif]">
      {/* Modal Dialog */}
      <div className="w-[520px] rounded-sm border border-gray-400 bg-white shadow-2xl">
        
        {/* TitleBar */}
        <div className="flex h-8 items-center justify-between bg-[#111827] px-3 select-none">
          <span className="text-xs font-semibold text-white">Warning</span>
          
          {/* Window Controls */}
          <div className="flex items-center space-x-1">
            {/* Minimize */}
            <button className="flex h-6 w-8 items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5" />
              </svg>
            </button>
            {/* Maximize */}
            <button className="flex h-6 w-8 items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white">
              <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" />
              </svg>
            </button>
            {/* Close */}
            <button 
              onClick={handleCancel}
              className="flex h-6 w-8 items-center justify-center text-gray-300 hover:bg-red-600 hover:text-white"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ContentArea */}
        <div className="flex px-6 py-6 items-start space-x-5">
          {/* WarningIcon */}
          <div className="flex-shrink-0 text-[#d97706]">
            <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* MessageText */}
          <div className="text-sm text-[#374151] leading-relaxed">
            It appears that port 8090 is already in use. Please exit the application that uses that port, or change the port number for this application in the Server tab of the App Settings dialog.
          </div>
        </div>

        {/* ActionFooter */}
        <div className="flex items-center justify-end space-x-3 bg-gray-50 px-6 py-4 border-t border-gray-200">
          {/* RetryButton */}
          <button
            onClick={handleRetry}
            disabled={status === 'retrying'}
            className="min-w-[80px] rounded-[2px] border border-gray-400 bg-gray-100 px-4 py-1.5 text-xs text-gray-800 shadow-sm outline-dashed outline-1 outline-offset-[-3px] outline-gray-500 hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:outline-dashed focus:outline-1 focus:outline-gray-600 transition-colors"
          >
            {status === 'retrying' ? 'Retrying...' : 'Retry'}
          </button>

          {/* CancelButton */}
          <button
            onClick={handleCancel}
            className="min-w-[80px] rounded-[2px] border border-gray-400 bg-gray-100 px-4 py-1.5 text-xs text-gray-800 shadow-sm hover:bg-gray-200 active:bg-gray-300 focus:outline-none transition-colors"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}