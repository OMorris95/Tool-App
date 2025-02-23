import React, { useState } from 'react'
import './App.css';

// Initial list of tools, all starting as available with no comments
const initialTools = [
  { name: "Drill 1", available: true, jobNumber: null, comments: [] },
  { name: "Drill 2", available: true, jobNumber: null, comments: [] },
  { name: "Drill 3", available: true, jobNumber: null, comments: [] },
  { name: "Drill 4", available: true, jobNumber: null, comments: [] },
  { name: "Drill 5", available: true, jobNumber: null, comments: [] },
  { name: "Makita Drill", available: true, jobNumber: null, comments: [] },
  { name: "Dewalt Drill", available: true, jobNumber: null, comments: [] },
  { name: "Small Drill 3", available: true, jobNumber: null, comments: [] },
  { name: "Fixings 1", available: true, jobNumber: null, comments: [] },
  { name: "Fixings 2", available: true, jobNumber: null, comments: [] },
  { name: "Fixings 3", available: true, jobNumber: null, comments: [] },
  { name: "Fixings 4", available: true, jobNumber: null, comments: [] },
  { name: "Fixings 5", available: true, jobNumber: null, comments: [] },
  { name: "110V Transformer", available: true, jobNumber: null, comments: [] },
  { name: "Battery Powered Site Light", available: true, jobNumber: null, comments: [] },
  { name: "Grinder", available: true, jobNumber: null, comments: [] },
  { name: "110V Jigsaw", available: true, jobNumber: null, comments: [] },
  { name: "Jigsaw", available: true, jobNumber: null, comments: [] },
  { name: "SWA Crimper", available: true, jobNumber: null, comments: [] },
  { name: "Normal Crimper", available: true, jobNumber: null, comments: [] },
];

function App() {
  const [tools, setTools] = useState(initialTools);
  const [currentTab, setCurrentTab] = useState("book");
  const [modalTool, setModalTool] = useState(null);

  const bookTools = (selectedTools, jobNumber) => {
    setTools(tools.map(tool =>
      selectedTools.includes(tool.name)
        ? { ...tool, available: false, jobNumber }
        : tool
    ));
  };

  const returnTool = (toolName) => {
    setTools(tools.map(tool =>
      tool.name === toolName
        ? { ...tool, available: true, jobNumber: null }
        : tool
    ));
  };

  const addComment = (toolName, commentText) => {
    setTools(tools.map(tool =>
      tool.name === toolName
        ? { ...tool, comments: [...tool.comments, { text: commentText, status: "active" }] }
        : tool
    ));
  };

  const completeComment = (toolName, commentIndex) => {
    setTools(tools.map(tool =>
      tool.name === toolName
        ? {
            ...tool,
            comments: tool.comments.map((c, i) =>
              i === commentIndex ? { ...c, status: "completed" } : c
            )
          }
        : tool
    ));
  };

  return (
    <div>
      <div>
        <button onClick={() => setCurrentTab("book")}>Book Tools</button>
        <button onClick={() => setCurrentTab("status")}>Tool Status</button>
      </div>
      {currentTab === "book" && <BookTools tools={tools} onBook={bookTools} />}
      {currentTab === "status" && (
        <ToolStatus tools={tools} onReturn={returnTool} onOpenDetails={setModalTool} />
      )}
      {modalTool && (
        <ToolDetailsModal
          tool={modalTool}
          onClose={() => setModalTool(null)}
          onAddComment={addComment}
          onCompleteComment={completeComment}
        />
      )}
    </div>
  );
}

function BookTools({ tools, onBook }) {
  const [selectedTools, setSelectedTools] = useState([]);
  const [jobNumber, setJobNumber] = useState("");

  const handleCheckboxChange = (toolName) => {
    setSelectedTools(prev =>
      prev.includes(toolName) ? prev.filter(n => n !== toolName) : [...prev, toolName]
    );
  };

  const handleBook = () => {
    if (selectedTools.length > 0 && jobNumber.trim()) {
      onBook(selectedTools, jobNumber);
      setSelectedTools([]);
      setJobNumber("");
    } else {
      alert("Select at least one tool and enter a job number.");
    }
  };

  return (
    <div>
      <h2>Book Tools</h2>
      <div className="tool-grid">
        {tools.map(tool => (
          <div className="tool-item" key={tool.name}>
            <input
              type="checkbox"
              checked={selectedTools.includes(tool.name)}
              onChange={() => handleCheckboxChange(tool.name)}
              disabled={!tool.available}
            />
            <span className={tool.available ? '' : 'unavailable'}>{tool.name}</span>
            <img src="https://via.placeholder.com/100" className="tool-image" alt="Tool Image" />
          </div>
        ))}
      </div>
      <div>
        <label>Job Number: </label>
        <input
          type="text"
          value={jobNumber}
          onChange={e => setJobNumber(e.target.value)}
        />
      </div>
      <button onClick={handleBook}>Book Tools</button>
    </div>
  );
}

function ToolStatus({ tools, onReturn, onOpenDetails }) {
  return (
    <div>
      <h2>Tool Status</h2>
      <div className="tool-grid">
        {tools.map(tool => (
          <div className="tool-item" key={tool.name}>
            <span className={tool.available ? '' : 'unavailable'}>
              {tool.name}: {tool.available ? "Available" : `Booked for Job #${tool.jobNumber}`}
            </span>
            {!tool.available && <button onClick={() => onReturn(tool.name)}>Return</button>}
            <button onClick={() => onOpenDetails(tool)}>Details</button>
            <img src="https://via.placeholder.com/100" className="tool-image" alt="Tool Image" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ToolDetailsModal({ tool, onClose, onAddComment, onCompleteComment }) {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(tool.name, newComment);
      setNewComment("");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{tool.name}</h2>
        <p>Status: {tool.available ? "Available" : `Booked for Job #${tool.jobNumber}`}</p>
        <h3>Active Comments</h3>
        {tool.comments
          .filter(c => c.status === "active")
          .map((c, i) => (
            <div key={i}>
              {c.text}
              <button onClick={() => onCompleteComment(tool.name, tool.comments.indexOf(c))}>
                Mark as Completed
              </button>
            </div>
          ))}
        <div>
          <input
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
        <h3>Comment History</h3>
        {tool.comments
          .filter(c => c.status === "completed")
          .map((c, i) => <div key={i}>{c.text}</div>)}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default App;