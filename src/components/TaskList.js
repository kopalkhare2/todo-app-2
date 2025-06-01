import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdate, onDelete }) => (
  <div>
    {tasks.map(task => (
      <TaskItem
        key={task.id}
        task={task}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    ))}
  </div>
);

export default TaskList;
