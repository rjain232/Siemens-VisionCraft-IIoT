import React, { useState } from 'react';

export default function GeneratedScreen() {
  const [activeTab, setActiveTab] = useState('Results');
  const [queryText, setQueryText] = useState(
`SELECT
    name,
    type_desc,
    is_disabled
FROM sys.sql_logins
WHERE name = 'rjain';`
  );

  const resultsData = [
    { name: 'rjain', type_desc: 'SQL_LOGIN', is_disabled: 0 }
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-white text-black font-mono select-none overflow-hidden">
      
      {/* Top Bar / Navigation */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-[#f3f3f3] text-xs">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 font-bold text-[#0078d4]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4" />
            </svg>
            <span>QueryStudio Enterprise</span>
          </div>
          <div className="flex space-x-4 text-gray-700">
            <button className="hover:text-[#0078d4] transition-colors">File</button>
            <button className="hover:text-[#0078d4] transition-colors">Edit</button>
            <button className="hover:text-[#0078d4] transition-colors">Query</button>
            <button className="hover:text-[#0078d4] transition-colors">Tools</button>
            <button className="hover:text-[#0078d4] transition-colors">Window</button>
            <button className="hover:text-[#0078d4] transition-colors">Help</button>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <span className="inline-block w-2 h-2 rounded-full bg-[#107c10]"></span>
          <span>Connected: prod-sql-server-01</span>
        </div>
      </div>

      {/* Workspace: SQL Query Editor */}
      <div className="flex flex-col flex-grow border-b border-gray-300">
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#f3f3f3] border-b border-gray-200 text-xs text-gray-600">
          <span className="font-bold">SQL Query Editor</span>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-1 bg-[#0078d4] text-white px-3 py-1 rounded shadow-sm hover:bg-[#005a9e] transition-colors">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <span>Execute</span>
            </button>
          </div>
        </div>

        {/* Code Editor Area with Line Numbers */}
        <div className="flex flex-grow bg-white relative overflow-hidden">
          {/* Line Numbers */}
          <div className="w-12 py-2 bg-[#f3f3f3] border-r border-gray-200 text-right pr-3 text-gray-400 text-xs select-none">
            {Array.from({ length: 15 }, (_, i) => i + 55).map((num) => (
              <div key={num} className={num === 60 ? 'text-black font-bold flex items-center justify-end space-x-1' : ''}>
                {num === 60 && (
                  <svg className="w-3 h-3 text-gray-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                <span>{num}</span>
              </div>
            ))}
          </div>

          {/* Active selection simulation matching screenshot highlight */}
          <div className="absolute top-0 left-12 right-0 bottom-0 pointer-events-none p-2 text-xs leading-5">
            <div className="h-5"></div>
            <div className="h-5"></div>
            <div className="h-5 bg-blue-200 w-28"></div>
            <div className="h-5 bg-blue-200 w-36"></div>
            <div className="h-5 bg-blue-200 w-44"></div>
            <div className="h-5 bg-blue-200 w-36"></div>
            <div className="h-5 bg-blue-200 w-48"></div>
            <div className="h-5 bg-blue-200 w-56"></div>
          </div>

          {/* Code Textarea / Editor */}
          <textarea
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            spellCheck="false"
            className="flex-grow p-2 text-xs leading-5 resize-none outline-none bg-transparent z-10 font-mono text-black"
          />
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-3 py-1 bg-[#f3f3f3] border-t border-gray-200 text-xs">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 border border-gray-300 bg-white px-1.5 py-0.5 rounded">
              <span>100 %</span>
              <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center space-x-1.5 text-[#107c10]">
              <span className="w-2 h-2 rounded-full bg-[#107c10] inline-block"></span>
              <span className="font-semibold">No issues found</span>
            </div>
          </div>
          <div className="text-gray-500">
            Ln 60, Col 15 &nbsp;|&nbsp; Ch 3 &nbsp;|&nbsp; UTF-8
          </div>
        </div>
      </div>

      {/* Bottom Panel: Results & Messages */}
      <div className="flex flex-col h-64 bg-white">
        {/* Tab Control */}
        <div className="flex border-b border-gray-200 bg-[#f3f3f3]">
          <button
            onClick={() => setActiveTab('Results')}
            className={`flex items-center space-x-2 px-4 py-1.5 text-xs border-r border-gray-200 ${
              activeTab === 'Results'
                ? 'bg-white font-bold border-t-2 border-t-[#0078d4]'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg className="w-3.5 h-3.5 text-[#2b91af]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Results</span>
          </button>
          <button
            onClick={() => setActiveTab('Messages')}
            className={`flex items-center space-x-2 px-4 py-1.5 text-xs border-r border-gray-200 ${
              activeTab === 'Messages'
                ? 'bg-white font-bold border-t-2 border-t-[#0078d4]'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span>Messages</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-grow overflow-auto p-0">
          {activeTab === 'Results' ? (
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#f3f3f3] text-gray-700 border-b border-gray-300">
                  <th className="w-12 border-r border-gray-300 py-1 px-2 text-center font-normal text-gray-400"></th>
                  <th className="border-r border-gray-300 py-1 px-3 text-left font-normal">name</th>
                  <th className="border-r border-gray-300 py-1 px-3 text-left font-normal">type_desc</th>
                  <th className="border-r border-gray-300 py-1 px-3 text-left font-normal">is_disabled</th>
                </tr>
              </thead>
              <tbody>
                {resultsData.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-blue-50">
                    <td className="border-r border-gray-300 bg-[#f3f3f3] text-center text-gray-500 py-1 px-2">{idx + 1}</td>
                    <td className="border-r border-gray-300 py-1 px-3 focus:outline-dotted focus:outline-1 focus:outline-black" tabIndex="0">
                      {row.name}
                    </td>
                    <td className="border-r border-gray-300 py-1 px-3">{row.type_desc}</td>
                    <td className="border-r border-gray-300 py-1 px-3">{row.is_disabled}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-3 text-xs text-gray-700 space-y-1">
              <div className="text-gray-400">Commands completed successfully.</div>
              <div className="text-[#107c10]">(1 row affected)</div>
              <div className="text-gray-400">Execution time: 0.024 seconds</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}