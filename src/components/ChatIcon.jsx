// src/ChatIcon.js
import React from 'react';

const ChatIcon = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12c0 4.418-4.03 8-9 8-1.512 0-2.944-.337-4.191-.926L3 20l1.427-4.102A7.962 7.962 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </button>
  );
};

export default ChatIcon;
