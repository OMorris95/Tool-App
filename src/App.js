import React, { useState, useEffect } from 'react';
import './App.css';

// Initial categories
const initialCategories = [
  "Drills",
  "Fixings",
  "Lights",
  "110V Gear",
  "Crimping",
  "Misc"
];

// Initial tools with categories
const initialTools = [
  // Drills
  { name: "Drill 1", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [] },
  { name: "Drill 2", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [] },
  { name: "Drill 3", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [] },
  { name: "Drill 4", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [] },
  { name: "Drill 5", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [] },
  { name: "Makita Drill", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [] },
  { name: "DeWalt Drill", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [] },
  { name: "Small Drill", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [] },
  { name: "Ballast Drill", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [] },
  // Fixings
  { name: "Fixings 1", category: "Fixings", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [] },
  { name: "Fixings 2", category: "Fixings", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [] },
  { name: "Fixings 3", category: "Fixings", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [] },
  { name: "Fixings 4", category: "Fixings", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [] },
  { name: "Fixings 5", category: "Fixings", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [] },
  { name: "Fixings 5", category: "Fixings", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [] },
  { name: "Heavy Fixings", category: "Fixings", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [] },
  // Lights
  { name: "Battery Tripod Site Light", category: "Lights", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [] },
  // 110V Gear
  { name: "110V Transformer 1", category: "110V Gear", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [] },
  { name: "110V Transformer 2", category: "110V Gear", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [] },
  { name: "110V Transformer 3", category: "110V Gear", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [] },
  { name: "110V Jigsaw", category: "110V Gear", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [] },
  // Crimping
  { name: "SWA Crimper", category: "Crimping", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [] },
  { name: "Large Crimper", category: "Crimping", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [] },
  { name: "Small Crimper", category: "Crimping", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [] },
];

// Function to get current date in DD/MM/YYYY format
const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};

function App() {
  // State management
  const [tools, setTools] = useState(() => {
    const savedTools = localStorage.getItem('tools');
    return savedTools ? JSON.parse(savedTools) : initialTools;
  });
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedTools, setSelectedTools] = useState([]);
  const [jobNumber, setJobNumber] = useState('');
  const [newToolName, setNewToolName] = useState('');
  const [newToolCategory, setNewToolCategory] = useState(initialCategories[0]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [newComment, setNewComment] = useState('');

  // Persist tools to localStorage whenever they change (needs changed to server side later)
  useEffect(() => {
    localStorage.setItem('tools', JSON.stringify(tools));
  }, [tools]);

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Handle checkbox selection for booking tools
  const handleCheckboxChange = (toolName) => {
    setSelectedTools(prev =>
      prev.includes(toolName) ? prev.filter(n => n !== toolName) : [...prev, toolName]
    );
  };

  // Book selected tools to a job
  const bookTools = () => {
    if (selectedTools.length === 0 || !jobNumber.trim()) {
      alert('Select at least one tool and enter a job number.');
      return;
    }
    const updatedTools = tools.map(tool => {
      if (selectedTools.includes(tool.name)) {
        const historyEntry = {
          date: getCurrentDate(),
          action: 'Booked Out',
          details: `Job #${jobNumber}`
        };
        return {
          ...tool,
          available: false,
          jobNumber,
          history: [historyEntry, ...tool.history]
        };
      }
      return tool;
    });
    setTools(updatedTools);
    setSelectedTools([]);
    setJobNumber('');
  };

  // Return a tool to make it available again
  const returnTool = (toolName) => {
    const updatedTools = tools.map(tool => {
      if (tool.name === toolName) {
        const historyEntry = {
          date: getCurrentDate(),
          action: 'Returned',
          details: ''
        };
        return {
          ...tool,
          available: true,
          jobNumber: null,
          history: [historyEntry, ...tool.history]
        };
      }
      return tool;
    });
    setTools(updatedTools);
  };

  // Add a new comment to the selected tool
  const addComment = (toolName, commentText) => {
    const updatedTools = tools.map(tool => {
      if (tool.name === toolName) {
        const historyEntry = {
          date: getCurrentDate(),
          action: 'Comment',
          details: commentText
        };
        return {
          ...tool,
          comments: [...tool.comments, { text: commentText, status: 'active' }],
          history: [historyEntry, ...tool.history]
        };
      }
      return tool;
    });
    setTools(updatedTools);
    setNewComment('');
  };

  // Mark a comment as complete with confirmation
  const completeComment = (toolName, commentIndex) => {
    if (!window.confirm('Are you sure you want to mark this comment complete?')) return;
    const updatedTools = tools.map(tool => {
      if (tool.name === toolName) {
        const comment = tool.comments[commentIndex];
        const historyEntry = {
          date: getCurrentDate(),
          action: 'Comment Complete',
          details: comment.text
        };
        return {
          ...tool,
          comments: tool.comments.filter((_, i) => i !== commentIndex),
          history: [historyEntry, ...tool.history]
        };
      }
      return tool;
    });
    setTools(updatedTools);
  };

  // Add a new tool to the list
  const addNewTool = () => {
    if (!newToolName.trim() || !initialCategories.includes(newToolCategory)) {
      alert('Enter a tool name and select a valid category.');
      return;
    }
    const newTool = {
      name: newToolName,
      category: newToolCategory,
      available: true,
      jobNumber: null,
      location: 'New Tool Location', // Placeholder
      comments: [],
      history: []
    };
    setTools([...tools, newTool]);
    setNewToolName('');
  };

  // Select a tool to display its details
  const selectTool = (tool) => {
    setSelectedTool(tool);
  };

  return (
    <div className="app-container">
      {/* Left Section: Tool Details */}
      <div className="left-section">
        {selectedTool ? (
          <div>
            <h2>{selectedTool.name} - {selectedTool.location}</h2>
            <div className="tool-image">IMAGE OF TOOL</div>
            <div className="comments-section">
              <h3>Comments:</h3>
              {selectedTool.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <span
                    className="checkmark"
                    onClick={() => completeComment(selectedTool.name, index)}
                  >
                    ✔
                  </span>
                  {comment.text}
                </div>
              ))}
              <div>
                <input
                  type="text"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="New comment"
                />
                <button
                  onClick={() => {
                    if (newComment.trim()) addComment(selectedTool.name, newComment);
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="history-section">
              <h3>History:</h3>
              {selectedTool.history.map((entry, index) => (
                <div key={index}>
                  {entry.date} - {entry.action}{entry.details ? ` - ${entry.details}` : ''}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Select a tool to view details</p>
        )}
      </div>

      {/* Right Section: Tool List and Booking */}
      <div className="right-section">
        <h2>Tool List</h2>
        {initialCategories.map(category => (
          <div key={category}>
            <h3 onClick={() => toggleCategory(category)}>
              {expandedCategories[category] ? 'v' : '>'} {category}
            </h3>
            {expandedCategories[category] && (
              <div className="tool-list">
                {tools
                  .filter(tool => tool.category === category)
                  .map(tool => (
                    <div
                      key={tool.name}
                      className={`tool-item ${tool.available ? 'available' : 'unavailable'}`}
                      onClick={() => selectTool(tool)}
                    >
                      {tool.available ? (
                        <input
                          type="checkbox"
                          checked={selectedTools.includes(tool.name)}
                          onChange={() => handleCheckboxChange(tool.name)}
                          onClick={e => e.stopPropagation()}
                        />
                      ) : (
                        <span>on job #{tool.jobNumber}</span>
                      )}
                      <span>{tool.name}</span>
                      {!tool.available && (
                        <button
                          className="return-btn"
                          onClick={e => {
                            e.stopPropagation();
                            returnTool(tool.name);
                          }}
                        >
                          Return
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
        <div className="booking-section">
          <label>Add selected tools to job:</label>
          <input
            type="text"
            value={jobNumber}
            onChange={e => setJobNumber(e.target.value)}
            placeholder="Job number"
          />
          <button onClick={bookTools}>Add</button>
        </div>
        <div className="add-tool-section">
          <h3>Add tool</h3>
          <input
            type="text"
            value={newToolName}
            onChange={e => setNewToolName(e.target.value)}
            placeholder="Tool name"
          />
          <select
            value={newToolCategory}
            onChange={e => setNewToolCategory(e.target.value)}
          >
            {initialCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button onClick={addNewTool}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;