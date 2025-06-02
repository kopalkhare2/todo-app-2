import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filter, setFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false);

  // Load from localStorage
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
      return [];
    }
  });

  // Save to localStorage on tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Dark mode toggle
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  // Sort by priority
  const sortByPriority = (tasksArray) => {
    const order = { High: 1, Medium: 2, Low: 3 };
    return [...tasksArray].sort((a, b) => order[a.priority] - order[b.priority]);
  };

  // Add task
  const addTask = () => {
    if (!input.trim()) return;
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      priority,
      completed: false,
    };
    const updated = sortByPriority([...tasks, newTask]);
    setTasks(updated);
    setInput('');
  };

  // Toggle completion
  const toggleComplete = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(sortByPriority(updated));
  };

  // Remove task
  const removeTask = (id) => {
    const updated = tasks.filter(task => task.id !== id);
    setTasks(updated);
  };

  // Edit task
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const saveEdit = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, text: editText.trim() } : task
    );
    setTasks(sortByPriority(updated));
    setEditingId(null);
    setEditText('');
  };

  // Filtered task list
  const filteredTasks = tasks.filter(task =>
    filter === 'All' ? true :
    filter === 'Completed' ? task.completed :
    !task.completed
  );

  return (
    <div className="app">
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
      </button>
      <h1>My ToDo App</h1>

      {/* Task Input Form */}
      <form onSubmit={e => { e.preventDefault(); addTask(); }}>
        <input
          type="text"
          placeholder="Add a task..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button type="submit">Add</button>
      </form>

      {/* Filter Tabs */}
      <div className="filter-bar">
        {['All', 'Active', 'Completed'].map(btn => (
          <button
            key={btn}
            className={filter === btn ? 'active' : ''}
            onClick={() => setFilter(btn)}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Task List */}
      {filteredTasks.map(task => (
        <div
          key={task.id}
          className={`task ${task.completed ? 'completed' : ''}`}
          data-priority={task.priority}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
          />

          {editingId === task.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => saveEdit(task.id)}>Save</button>
              <button onClick={() => {
                setEditingId(null);
                setEditText('');
              }}>Cancel</button>
            </>
          ) : (
            <>
              <span>{task.text}</span> <small>({task.priority})</small>
              <button onClick={() => {
                setEditingId(task.id);
                setEditText(task.text);
              }}>Edit</button>
              <button onClick={() => removeTask(task.id)}>Remove</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;