import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filter, setFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Load tasks from localStorage just once (on first render)
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load tasks from localStorage:', e);
      return [];
    }
  });

  // 🔃 Sort by priority
  const sortByPriority = (tasksArray) => {
    const order = { High: 1, Medium: 2, Low: 3 };
    return [...tasksArray].sort((a, b) => order[a.priority] - order[b.priority]);
  };

  // 💾 Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // 🌙 Apply dark mode
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  // ➕ Add task
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

  // ✅ Toggle complete
  const toggleComplete = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(sortByPriority(updated));
  };

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

      {filteredTasks.map(task => (
        <div
          key={task.id}
          className={`task ${task.completed ? 'completed' : ''}`}
          data-priority={task.priority}
          onClick={() => toggleComplete(task.id)}
        >
          <span>{task.text}</span> <small>({task.priority})</small>
        </div>
      ))}
    </div>
  );
}

export default App;