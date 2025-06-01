import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filter, setFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const addTask = () => {
    if (!input.trim()) return;
    const newTask = {
      id: Date.now(),
      text: input,
      priority,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
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
          <span>{task.text}</span>
        </div>
      ))}
    </div>
  );
}

export default App;