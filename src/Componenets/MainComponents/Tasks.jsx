import React from "react";

const Tasks = ({ loading, tasks }) => {
  const priorityColor = {
    high: "priority-high",
    medium: "priority-medium",
    low: "priority-low",
  };
  const handleRemainingTime = (due_Date) => {
    const today = new Date();
    const endDate = new Date(due_Date);
    const diffMs = endDate - today;
    if (diffMs < 0) {
      return `the task due time has ended`;
    }
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    return `${days} days, ${hours} hours`;
  };
  return (
    <div>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="tasks">
          {tasks.map((task) => (
            <div className="task-card" key={task.id}>
              <h3 className="task-name">{task.taskName}</h3>
              <p className="task-detail">
                <strong>Task ID:</strong> {task.taskId}
              </p>
              <p className="task-detail">
                <strong>Description:</strong> {task.description}
              </p>
              <p className="task-detail">
                <strong>Progress:</strong> {task.progress}
              </p>
              <p className="task-detail">
                <strong>Assigned to:</strong> {task.assignedTo}
              </p>
              <p className="task-detail">
                <strong>Assigned Date:</strong> {task.assignDate}
              </p>
              <p className="task-detail">
                <strong>Due Date:</strong> {task.dueDate}
              </p>
              <p className="task-detail">
                <strong>Remaining time:</strong>{" "}
                {handleRemainingTime(task.dueDate)}
              </p>
              <p className="task-detail">
                <strong>Priority:</strong>
                <span
                  className={`priority-badge ${
                    priorityColor[task.priority.toLowerCase()]
                  }`}
                >
                  {task.priority}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
