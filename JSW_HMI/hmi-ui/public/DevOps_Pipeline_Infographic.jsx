import React, { useState } from 'react';

export default function GeneratedScreen() {
  const [currentPage, setCurrentPage] = useState(5);
  const totalPages = 7;

  const pipelineStages = [
    {
      title: "Develop",
      tools: ["Git", "Subversion", "Serena"]
    },
    {
      title: "Build",
      tools: ["GitHub", "Jenkins", "Docker"]
    },
    {
      title: "Test",
      tools: ["JUnit", "Selenium", "SonarQube"]
    },
    {
      title: "Deploy",
      tools: ["Kubernetes", "EC2", "Terraform", "Argo CD"]
    },
    {
      title: "Release",
      tools: ["Grafana", "Prometheus", "ServiceNow"]
    }
  ];

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9] flex flex-col justify-between font-sans select-none text-[#333333]">
      {/* Top Header */}
      <header className="w-full py-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#333333]">
          Common DevOps Tools
        </h1>
      </header>

      {/* Pipeline Container */}
      <main className="w-full max-w-7xl mx-auto px-4 flex-1 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full items-stretch">
          {pipelineStages.map((stage, index) => (
            <div 
              key={stage.title}
              className="relative bg-white rounded-xl shadow-lg border border-black/5 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {/* Green Header Box */}
              <div className="bg-[#228B22] text-white py-4 px-6 text-center font-bold text-lg tracking-wide shadow-sm">
                {stage.title}
              </div>

              {/* Tools List */}
              <div className="p-6 flex-1 flex flex-col justify-start space-y-4">
                {stage.tools.map((tool) => (
                  <div key={tool} className="flex items-center space-x-3 text-base font-medium text-[#333333]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#333333]"></span>
                    <span>{tool}</span>
                  </div>
                ))}
              </div>

              {/* Connecting Arrow between cards (Desktop only) */}
              {index < pipelineStages.length - 1 && (
                <div className="hidden md:flex absolute -right-3.5 top-14 z-10 text-[#228B22] bg-white rounded-full p-0.5 shadow-sm items-center justify-center">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer Pagination */}
      <footer className="w-full bg-[#E0F2F1]/50 border-t border-black/5 py-3 px-6 flex items-center justify-between mt-auto">
        <div className="flex-1"></div>
        
        {/* Controls */}
        <div className="flex items-center space-x-4 text-gray-600">
          <button 
            onClick={handlePrev}
            className="p-1 hover:text-[#228B22] transition-colors focus:outline-none"
            aria-label="Previous Page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={() => {}}
            className="p-1 hover:text-[#228B22] transition-colors focus:outline-none"
            aria-label="Play / Pause"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          <button 
            onClick={handleNext}
            className="p-1 hover:text-[#228B22] transition-colors focus:outline-none"
            aria-label="Next Page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Page Indicator */}
        <div className="flex-1 text-right text-sm font-medium text-gray-600 pr-2">
          {currentPage} / {totalPages}
        </div>
      </footer>
    </div>
  );
}