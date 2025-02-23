import React, { useState } from 'react';
import './App.css'; // Ensure CSS file is included with styles below

// Initial tools with categories as specified
const initialTools = [
  // Drills
  { name: "Drill 1", category: "Drills", available: true, jobNumber: null, comments: [] },
  { name: "Drill 2", category: "Drills", available: true, jobNumber: null, comments: [] },
  { name: "Drill 3", category: "Drills", available: true, jobNumber: null, comments: [] },
  { name: "Drill 4", category: "Drills", available: true, jobNumber: null, comments: [] },
  { name: "Drill 5", category: "Drills", available: true, jobNumber: null, comments: [] },
  { name: "Small Drill", category: "Drills", available: true, jobNumber: null, comments: [] },
  { name: "Makita Drill", category: "Drills", available: true, jobNumber: null, comments: [] },
  { name: "Dewalt Drill", category: "Drills", available: true, jobNumber: null, comments: [] },
  { name: "Ballast Drill", category: "Drills", available: true, jobNumber: null, comments: [] },
  
  // Fixings
  { name: "Fixings 1", category: "Fixings", available: true, jobNumber: null, comments: [] },
  { name: "Fixings 2", category: "Fixings", available: true, jobNumber: null, comments: [] },
  { name: "Fixings 3", category: "Fixings", available: true, jobNumber: null, comments: [] },
  { name: "Fixings 4", category: "Fixings", available: true, jobNumber: null, comments: [] },
  { name: "Fixings 5", category: "Fixings", available: true, jobNumber: null, comments: [] },
  { name: "Heavy Fixings", category: "Fixings", available: true, jobNumber: null, comments: [] },
  
  // 110V Gear
  { name: "110V Transformer", category: "110V Gear", available: true, jobNumber: null, comments: [] },
  { name: "110V 16A Lead", category: "110V Gear", available: true, jobNumber: null, comments: [] },
  { name: "110V Site Light", category: "110V Gear", available: true, jobNumber: null, comments: [] },
  { name: "110V Jigsaw", category: "110V Gear", available: true, jobNumber: null, comments: [] },
  
  // Crimping
  { name: "SWA Crimper", category: "Crimping", available: true, jobNumber: null, comments: [] },
  { name: "Normal Crimper", category: "Crimping", available: true, jobNumber: null, comments: [] },
  { name: "Small Crimper", category: "Crimping", available: true, jobNumber: null, comments: [] },
  { name: "Data Box", category: "Crimping", available: true, jobNumber: null, comments: [] },
  
  // Misc
  { name: "Grinder", category: "Misc", available: true, jobNumber: null, comments: [] },
  { name: "Torque Screwdriver Set", category: "Misc", available: true, jobNumber: null, comments: [] },
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

  // Get unique categories dynamically
  const categories = [...new Set(tools.map(tool => tool.category))];

  return (
    <div>
      <div className="tabs">
        <button
          className={currentTab === "book" ? "active" : ""}
          onClick={() => setCurrentTab("book")}
        >
          Book Tools
        </button>
        <button
          className={currentTab === "status" ? "active" : ""}
          onClick={() => setCurrentTab("status")}
        >
          Tool Status
        </button>
      </div>
      {currentTab === "book" && (
        <BookTools tools={tools} categories={categories} onBook={bookTools} />
      )}
      {currentTab === "status" && (
        <ToolStatus
          tools={tools}
          categories={categories}
          onReturn={returnTool}
          onOpenDetails={setModalTool}
        />
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

function BookTools({ tools, categories, onBook }) {
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
      {categories.map(category => (
        <div key={category} className="category-section">
          <h3>{category}</h3>
          <div className="tool-grid">
            {tools
              .filter(tool => tool.category === category)
              .map(tool => (
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
        </div>
      ))}
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

function ToolStatus({ tools, categories, onReturn, onOpenDetails }) {
  return (
    <div>
      <h2>Tool Status</h2>
      {categories.map(category => (
        <div key={category} className="category-section">
          <h3>{category}</h3>
          <div className="tool-grid">
            {tools
              .filter(tool => tool.category === category)
              .map(tool => (
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
      ))}
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