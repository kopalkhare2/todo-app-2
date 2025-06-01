import React, { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleToggle = () => onUpdate(task.id, { completed: !task.completed });

  const handleEdit = () => {
    onUpdate(task.id, { text: editText });
    setIsEditing(false);
  };

  return (
  <div className={`task ${task.completed ? 'completed' : ''}`}>
  <input type="checkbox" checked={task.completed} onChange={handleToggle} />
  {isEditing ? (
    <>
      <input value={editText} onChange={e => setEditText(e.target.value)} />
      <div className="task-actions">
        <button onClick={handleEdit}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    </>
  ) : (
    <>
      <span>{task.text} ({task.priority})</span>
      <div className={`task ${task.completed ? 'completed' : ''}`} data-priority={task.priority}>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </>
  )}
</div>
  );
};

export default TaskItem;
