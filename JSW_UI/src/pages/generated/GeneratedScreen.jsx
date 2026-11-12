import React, { useState } from 'react';

export default function GeneratedScreen() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [activeStage, setActiveStage] = useState('All');
  const [currentSlide, setCurrentSlide] = useState(5);

  const stages = [
    {
      title: 'Develop',
      tools: ['Git', 'Subversion', 'Serena'],
      description: 'Version control and source code management for collaborative development.',
    },
    {
      title: 'Build',
      tools: ['GitHub', 'Jenkins', 'Docker'],
      description: 'Continuous integration, containerization, and automated compilation.',
    },
    {
      title: 'Test',
      tools: ['JUnit', 'Selenium', 'SonarQube'],
      description: 'Automated unit testing, UI testing, and code quality analysis.',
    },
    {
      title: 'Deploy',
      tools: ['Kubernetes', 'EC2', 'Terraform', 'Argo CD'],
      description: 'Infrastructure as code, container orchestration, and continuous delivery.',
    },
    {
      title: 'Release',
      tools: ['Grafana', 'Prometheus', 'ServiceNow'],
      description: 'Monitoring, logging, observability, and IT service management.',
    },
  ];

  const handleToolClick = (tool, stageTitle) => {
    setSelectedTool({ name: tool, stage: stageTitle });
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9] flex flex-col justify-between font-sans select-none text-[#333333]">
      {/* Top Header Bar */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-[#C8E6C9] px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#2E7D32] flex items-center justify-center text-white font-bold shadow-md">
            CI
          </div>
          <span className="font-semibold text-lg text-[#2E7D32] tracking-tight">Enterprise DevOps Hub</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-[#C8E6C9] text-[#2E7D32] px-3 py-1 rounded-full font-medium">Interactive Mode</span>
        </div>
      </header>

      {/* Main Slide Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex flex-col items-center justify-center">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] tracking-tight mb-2">Common DevOps Tools</h1>
          <p className="text-sm text-gray-600">Select any tool below to inspect its configuration and telemetry</p>
        </div>

        {/* Pipeline Grid Container */}
        <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 relative items-stretch">
          {stages.map((stage, idx) => {
            const isHighlighted = activeStage === 'All' || activeStage === stage.title;
            return (
              <div 
                key={stage.title} 
                className={`flex flex-col bg-white rounded-xl shadow-lg border border-[#C8E6C9] transition-all duration-300 transform ${isHighlighted ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}
              >
                {/* Stage Header */}
                <div className="bg-[#2E7D32] text-white text-center py-4 px-2 rounded-t-xl font-bold text-lg tracking-wide shadow-inner flex items-center justify-center relative">
                  <span>{stage.title}</span>
                  {/* Arrow connector between headers on desktop */}
                  {idx < stages.length - 1 && (
                    <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-[#2E7D32] bg-white rounded-full p-0.5 shadow">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.428L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Stage Tool List */}
                <div className="p-5 flex-1 flex flex-col justify-start space-y-4">
                  {stage.tools.map((tool) => (
                    <button
                      key={tool}
                      onClick={() => handleToolClick(tool, stage.title)}
                      className="flex items-center space-x-3 text-left w-full p-2.5 rounded-lg hover:bg-[#E8F5E9] transition-colors group focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#2E7D32] group-hover:scale-125 transition-transform" />
                      <span className="font-medium text-[#333333] group-hover:text-[#2E7D32]">{tool}</span>
                    </button>
                  ))}
                </div>

                {/* Stage Footer Tag */}
                <div className="p-3 bg-gray-50 border-t border-gray-100 text-center rounded-b-xl">
                  <span className="text-xs text-gray-500 font-medium">Stage {idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Slide Deck Navigation Footer */}
      <footer className="w-full bg-white/90 border-t border-[#C8E6C9] py-4 px-6 flex items-center justify-between shadow-inner">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-600">Filter Stage:</span>
          <select 
            value={activeStage} 
            onChange={(e) => setActiveStage(e.target.value)}
            className="bg-[#E8F5E9] border border-[#C8E6C9] text-xs rounded px-2 py-1 text-[#2E7D32] font-semibold focus:outline-none"
          >
            <option value="All">All Stages</option>
            {stages.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
          </select>
        </div>

        {/* Slide Controls */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setCurrentSlide(prev => Math.max(1, prev - 1))}
            className="p-2 rounded-full hover:bg-[#E8F5E9] text-[#333333] transition-colors"
            title="Previous Slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            className="p-2 rounded-full bg-[#2E7D32] text-white shadow-md hover:bg-[#1b4e1f] transition-colors"
            title="Play Presentation"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          <button 
            onClick={() => setCurrentSlide(prev => Math.min(7, prev + 1))}
            className="p-2 rounded-full hover:bg-[#E8F5E9] text-[#333333] transition-colors"
            title="Next Slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="text-xs font-semibold text-gray-500">
          {currentSlide} / 7
        </div>
      </footer>

      {/* Interactive Tool Modal / Drawer */}
      {selectedTool && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#C8E6C9] animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-full uppercase tracking-wider">
                  {selectedTool.stage} Stage
                </span>
                <h3 className="text-2xl font-bold text-[#333333] mt-2">{selectedTool.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedTool(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              {stages.find(s => s.title === selectedTool.stage)?.description || 'Standard industry tool utilized in enterprise CI/CD pipelines.'}
            </p>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Status:</span>
                <span className="font-semibold text-green-600 flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span> Active / Connected</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Integration Level:</span>
                <span className="font-semibold text-[#333333]">Full Pipeline Support</span>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedTool(null)}
                className="px-4 py-2 bg-[#2E7D32] text-white text-sm font-semibold rounded-lg hover:bg-[#1b4e1f] transition-colors shadow"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}