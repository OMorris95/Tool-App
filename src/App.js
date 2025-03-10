import React, { useState, useEffect } from 'react';
import './App.css';

// Initial categories
const initialCategories = [
  "Drills",
  "Fixings",
  "Steps",
  "Lights",
  "110V Gear",
  "Test Gear",
  "Crimping",
  "Misc"
];

// Initial tools with categories, locations, and placeholder images
const initialTools = [
  // Drills
  { name: "Drill 1", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Drill 2", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Drill 3", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Drill 4", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Drill 5", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Makita Drill", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "DeWalt Drill", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Small Drill", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Ballast Drill", category: "Drills", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  
  // Fixings
  { name: "Fixings 1", category: "Fixings", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Fixings 2", category: "Fixings", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Fixings 3", category: "Fixings", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Fixings 4", category: "Fixings", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Fixings 5", category: "Fixings", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Heavy Fixings", category: "Fixings", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [], image: "https://i.imgur.com/sObks4o.jpeg" },

  // Steps
  { name: "Yellow Steps 1", category: "Steps", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Yellow Steps 2", category: "Steps", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Yellow Steps 3", category: "Steps", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Tall Yellow Steps", category: "Steps", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Slightly Smaller Yellow Steps", category: "Steps", available: true, jobNumber: null, location: "Upstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Small Yellow Steps 1", category: "Steps", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [], image: "https://i.imgur.com/sObks4o.jpeg" },
  { name: "Small Yellow Steps 2", category: "Steps", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [], image: "https://i.imgur.com/sObks4o.jpeg" },
  { name: "3-Part Steps - Silver", category: "Steps", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [], image: "https://i.imgur.com/sObks4o.jpeg" },
  { name: "3-Part Steps - Red", category: "Steps", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [], image: "https://i.imgur.com/sObks4o.jpeg" },
  
  // Lights
  { name: "Battery Tripod Site Light", category: "Lights", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  
  // 110V Gear
  { name: "110V Transformer 1", category: "110V Gear", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "110V Transformer 2", category: "110V Gear", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "110V Transformer 3", category: "110V Gear", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "110V Jigsaw", category: "110V Gear", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },

  // Test Gear
  { name: "Test Box 1", category: "Test Gear", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Test Box 2", category: "Test Gear", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "PAT Tester 1", category: "Test Gear", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "PAT Tester 2", category: "Test Gear", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Blue MFT", category: "Test Gear", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Laptop", category: "Test Gear", available: true, jobNumber: null, location: "Tool Cupboard", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  
  // Crimping
  { name: "SWA Crimper", category: "Crimping", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [], image: "https://i.imgur.com/m39XtnY.jpeg" },
  { name: "Crimper", category: "Crimping", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Small Crimper", category: "Crimping", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [], image: "https://i.imgur.com/QyjNQz9.jpeg" },
  { name: "Crimp Connection Box 1", category: "Crimping", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [], image: "https://i.imgur.com/wTfmIdp.jpeg" },
  { name: "Crimp Connection Box 2", category: "Crimping", available: true, jobNumber: null, location: "Downstairs", comments: [], history: [], image: "https://i.imgur.com/5rUlobu.jpeg" },
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
  const [tools, setTools] = useState(() => {
    const savedTools = localStorage.getItem('tools');
    return savedTools ? JSON.parse(savedTools) : initialTools;
  });
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedTools, setSelectedTools] = useState([]);
  const [jobNumber, setJobNumber] = useState('');
  const [newToolName, setNewToolName] = useState('');
  const [newToolCategory, setNewToolCategory] = useState(initialCategories[0]);
  const [newToolLocation, setNewToolLocation] = useState('');
  const [newToolImage, setNewToolImage] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'allocated'

  useEffect(() => {
    localStorage.setItem('tools', JSON.stringify(tools));
  }, [tools]);

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleCheckboxChange = (toolName) => {
    setSelectedTools(prev =>
      prev.includes(toolName) ? prev.filter(n => n !== toolName) : [...prev, toolName]
    );
  };

  const bookTools = () => {
    if (selectedTools.length === 0 || !jobNumber.trim()) {
      alert('Select at least one tool and enter a job number.');
      return;
    }
    const message = `Are you sure you want to book the following tools to job #${jobNumber}?:\n${selectedTools.join('\n')}`;
    if (window.confirm(message)) {
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
    }
    // If "No" is selected, do nothing and leave tools available
  };

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

  const addComment = (toolName, commentText) => {
    if (!commentText.trim()) return; // Prevent empty comments
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
    setNewComment(''); // Clear input and update UI immediately

    // Update selectedTool to reflect the latest tool data
    const updatedTool = updatedTools.find(tool => tool.name === toolName);
    setSelectedTool(updatedTool);
  };

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

    // Update selectedTool to reflect the latest tool data
    const updatedTool = updatedTools.find(tool => tool.name === toolName);
    setSelectedTool(updatedTool);

    // Update the tool list in the right section immediately
    // No additional state needed here since tools state update triggers re-render
  };

  const addNewTool = () => {
    if (!newToolName.trim() || !initialCategories.includes(newToolCategory) || !newToolLocation.trim()) {
      alert('Enter a tool name, location, and select a valid category.');
      return;
    }
    const imageUrl = newToolImage ? URL.createObjectURL(newToolImage) : "https://via.placeholder.com/300";
    const newTool = {
      name: newToolName,
      category: newToolCategory,
      available: true,
      jobNumber: null,
      location: newToolLocation,
      comments: [],
      history: [],
      image: imageUrl
    };
    setTools([...tools, newTool]);
    setNewToolName('');
    setNewToolCategory(initialCategories[0]);
    setNewToolLocation('');
    setNewToolImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewToolImage(file);
  };

  const selectTool = (tool) => {
    setSelectedTool(tool);
    setActiveTab('details'); // Switch to details tab when a tool is selected
  };

  // Function to find the date when a tool was allocated to a job
  const getToolAllocationDate = (tool) => {
    if (!tool.history.length) return null;
    
    // Find the latest 'Booked Out' entry for the current job number
    const bookingEntry = tool.history.find(entry => 
      entry.action === 'Booked Out' && entry.details === `Job #${tool.jobNumber}`
    );
    
    return bookingEntry ? bookingEntry.date : null;
  };

  // Get all allocated tools
  const allocatedTools = tools.filter(tool => !tool.available && tool.jobNumber);

  // Group allocated tools by job number
  const groupedByJob = allocatedTools.reduce((acc, tool) => {
    const jobNum = tool.jobNumber;
    if (!acc[jobNum]) {
      acc[jobNum] = [];
    }
    acc[jobNum].push({
      ...tool,
      allocationDate: getToolAllocationDate(tool)
    });
    return acc;
  }, {});

  return (
    <div className="app-container">
      {/* Left Section: Tool Details or Allocated Tools */}
      <div className="left-section">
        <div className="tab-buttons">
          <button 
            className={`tab-button ${activeTab === 'details' ? 'active-tab' : ''}`} 
            onClick={() => setActiveTab('details')}
          >
            Tool Details
          </button>
          <button 
            className={`tab-button ${activeTab === 'allocated' ? 'active-tab' : ''}`} 
            onClick={() => setActiveTab('allocated')}
          >
            Allocated Tools
          </button>
        </div>

        {activeTab === 'details' ? (
          // TOOL DETAILS TAB
          selectedTool ? (
            <div>
              <h2>{selectedTool.name} - {selectedTool.location}</h2>
              <div className="tool-image-container">
                <img src={selectedTool.image} alt={`${selectedTool.name} Image`} className="tool-image" />
              </div>
              <div className="comments-section">
                <h3>Comments:</h3>
                {selectedTool.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <span className="checkmark"
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
                    onClick={() => addComment(selectedTool.name, newComment)}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="history-section">
                <h3>History:</h3>
                <div className="scrollable-history">
                  {selectedTool.history.map((entry, index) => (
                    <div key={index}>
                      {entry.date} - {entry.action}{entry.details ? ` - ${entry.details}` : ''}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p>Select a tool to view details</p>
          )
        ) : (
          // ALLOCATED TOOLS TAB
          <div className="allocated-tools-view">
            <h2>Currently Allocated Tools</h2>
            {Object.keys(groupedByJob).length > 0 ? (
              Object.entries(groupedByJob).map(([jobNumber, jobTools]) => (
                <div key={jobNumber} className="job-tools-section">
                  <h3>Job #{jobNumber}</h3>
                  <div className="job-tools-list">
                    {jobTools.map(tool => (
                      <div key={tool.name} className="allocated-tool-item">
                        <div className="allocated-tool-header">
                          <span className="allocated-tool-name">{tool.name}</span>
                          <button 
                            className="return-btn-allocated" 
                            onClick={() => returnTool(tool.name)}
                          >
                            Return
                          </button>
                        </div>
                        <div className="allocated-tool-details">
                          <span>Category: {tool.category}</span>
                          <span>Location: {tool.location}</span>
                          <span>Booked Out: {tool.allocationDate || 'Unknown'}</span>
                          {tool.comments.length > 0 && (
                            <span className="comments-badge">
                              {tool.comments.length} Comment{tool.comments.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <div className="allocated-tool-link" onClick={() => selectTool(tool)}>
                          View Details
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No tools are currently allocated to jobs</p>
            )}
          </div>
        )}
      </div>

      {/* Right Section: Tool List and Booking */}
      <div className="right-section">
        <h2>Tool List</h2>
        {initialCategories.map(category => (
          <div key={category} className="category-section">
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
                        <span>On job #{tool.jobNumber}</span>
                      )}
                      <span>
                        {tool.name}
                        {tool.comments.some(comment => comment.status === 'active') && (
                          <span className="exclamation-point">!</span>
                        )}
                      </span>
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
          <label><b>Book selected tools to job:</b></label>
          <input
            type="text"
            value={jobNumber}
            onChange={e => setJobNumber(e.target.value)}
            placeholder="Job number"
          />
          <button onClick={bookTools}>Book</button>
        </div>
        <div className="add-tool-section">
          <h3>Add new tool to tool list:</h3>
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
          <input
            type="text"
            value={newToolLocation}
            onChange={e => setNewToolLocation(e.target.value)}
            placeholder="Tool location"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <button onClick={addNewTool}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;