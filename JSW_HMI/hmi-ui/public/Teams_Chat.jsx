import React, { useState } from 'react';

export default function GeneratedScreen() {
  const [activeTab, setActiveTab] = useState('Chat');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Gandhar, Chougule - SCHAEFFLER',
      timestamp: 'Thursday 15:55',
      message: 'saw message now teams was closed\nwas able to connect to plc and send and receive json data in debug and in gauge',
      type: 'incoming',
      dateDivider: 'Thursday'
    },
    {
      id: 2,
      sender: 'You',
      timestamp: 'Thursday 17:49',
      message: 'Good job buddy',
      type: 'outgoing',
      dateDivider: null
    },
    {
      id: 3,
      sender: 'Gandhar, Chougule - SCHAEFFLER',
      timestamp: 'Friday 09:55',
      message: 'cant send photo in teams as no access\'\n\nhave connected mqtt broadcast , mssql and sqlite (ddont have db instance for now )using function block which which stores plc json to db and another fn block which processes data to specific and stores in other db',
      type: 'incoming',
      dateDivider: 'Friday'
    },
    {
      id: 4,
      sender: 'You',
      timestamp: 'Friday 11:52',
      message: 'received id card',
      type: 'outgoing',
      dateDivider: null
    },
    {
      id: 5,
      sender: 'Gandhar, Chougule - SCHAEFFLER',
      timestamp: 'Friday 12:06',
      message: 'Very good',
      type: 'incoming',
      dateDivider: null
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: inputText,
      type: 'outgoing',
      dateDivider: null
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-white font-['Segoe_UI',sans-serif] text-[#242424] overflow-hidden select-none">
      
      {/* TOPBAR / HEADER */}
      <header className="flex items-center justify-between px-4 h-14 border-b border-[#e1dfdd] bg-white shrink-0">
        
        {/* Left Section: Avatar, Title, and Navigation Tabs */}
        <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-3 shrink-0">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#e1dfdd] text-[#242424] font-semibold text-xs">
              CG
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center border border-[#e1dfdd]">
                <svg className="w-2 h-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </div>
            <h1 className="text-sm font-semibold text-[#242424] tracking-tight">
              Gandhar, Chougule - SCHAEFFLER
            </h1>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 h-14 shrink-0">
            {['Chat', 'Shared', 'Recap', 'Storyline'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-3 h-full flex items-center text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-[#242424] font-semibold'
                    : 'text-[#616161] hover:text-[#242424]'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5558af]" />
                )}
              </button>
            ))}
            <button className="p-1.5 text-gray-500 hover:bg-[#f3f2f1] rounded transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </nav>
        </div>

        {/* Right Utility Icons */}
        <div className="flex items-center space-x-1 text-gray-600 shrink-0">
          <button className="p-2 hover:bg-[#f3f2f1] rounded transition-colors" title="Audio call">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-[#f3f2f1] rounded transition-colors" title="Video call">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-[#f3f2f1] rounded transition-colors" title="Add members">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </button>
          <div className="w-[1px] h-4 bg-[#e1dfdd] mx-1" />
          <button className="p-2 hover:bg-[#f3f2f1] rounded transition-colors" title="Pop out chat">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
          <button className="p-2 hover:bg-[#f3f2f1] rounded transition-colors" title="Search">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-[#f3f2f1] rounded transition-colors" title="Apps">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-[#f3f2f1] rounded transition-colors" title="More options">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </header>

      {/* FEED / MESSAGE HISTORY CONTAINER */}
      <main className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-white">
        
        {messages.map((msg, idx) => {
          const isIncoming = msg.type === 'incoming';
          
          return (
            <React.Fragment key={msg.id}>
              {/* Date Divider */}
              {msg.dateDivider && (
                <div className="flex items-center justify-center my-4">
                  <span className="text-xs text-gray-500 font-medium px-2 py-0.5 bg-white">
                    {msg.dateDivider}
                  </span>
                </div>
              )}

              <div className={`flex flex-col ${isIncoming ? 'items-start' : 'items-end'} space-y-1`}>
                
                {/* Sender & Timestamp Subtitle for Incoming */}
                {isIncoming && (
                  <div className="flex items-center space-x-2 ml-9">
                    <span className="text-xs text-gray-500 font-normal">
                      {msg.sender} {msg.timestamp}
                    </span>
                  </div>
                )}

                {/* Message Row */}
                <div className={`flex items-end space-x-2 ${isIncoming ? '' : 'flex-row-reverse space-x-reverse'}`}>
                  
                  {/* Avatar for incoming message */}
                  {isIncoming ? (
                    <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#e1dfdd] text-[#242424] font-semibold text-[10px] shrink-0 mb-1">
                      CG
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center border border-[#e1dfdd]">
                        <svg className="w-1.5 h-1.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                    </div>
                  ) : null}

                  {/* Bubble Content */}
                  <div
                    className={`max-w-xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                      isIncoming
                        ? 'bg-[#f3f2f1] text-[#242424] rounded-tr-lg rounded-tl-lg rounded-br-lg rounded-bl-sm'
                        : 'bg-[#5558af] text-white rounded-tr-lg rounded-tl-lg rounded-bl-lg rounded-br-sm'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>

              </div>
            </React.Fragment>
          );
        })}

      </main>

      {/* INPUT / COMPOSER FOOTER */}
      <footer className="px-4 py-3 bg-white border-t border-[#e1dfdd] shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a new message"
            className="flex-1 bg-[#f3f2f1] border border-transparent focus:border-[#5558af] focus:bg-white text-sm rounded px-4 py-2.5 outline-none transition-all placeholder:text-gray-500 text-[#242424]"
          />
          <button
            type="submit"
            className="bg-[#5558af] hover:bg-[#484b99] text-white px-4 py-2.5 rounded text-sm font-medium transition-colors flex items-center justify-center shadow-sm"
          >
            Send
          </button>
        </form>
      </footer>

    </div>
  );
}