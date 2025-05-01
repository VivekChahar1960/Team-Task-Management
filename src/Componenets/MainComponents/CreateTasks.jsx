import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, get } from "firebase/database";
import { useNotification } from "../../Context/NotificationContext";

const CreateTasks = () => {

  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [assignDate, setAssignDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [progress, setProgress] = useState(0);

  const db = getDatabase();
  const { showNotification } = useNotification();

  const createTask = () => {
    if(!taskId || !taskName || !description || !employeeId || !assignDate || !dueDate || !priority){
      showNotification("Please fill the Details to Create")
    }else{
      const dref = ref(db, `tasks/${taskId}`);
      const taskDetails = {
        taskId,
        taskName,
        description,
        progress:`${progress}%`,
        assignedTo:employeeId,
        assignDate,
        dueDate,
        priority,
      };
      set(dref, taskDetails);
      showNotification(`Task ${taskId} Created Succesfully`);
      setTaskId("");
      setTaskName("");
      setAssignDate("");
      setProgress(0);
      setDescription("");
      setDueDate("");
      setEmployeeId("");
      setPriority("medium");
    }
    
  };

  return (
    <div className="create_task">
              <label>Task ID</label>
              <input
                type="text"
                placeholder="Enter task ID"
                value={taskId}
                onChange={(e) => setTaskId(e.target.value)}
              />

              <label>Task Name</label>
              <input
                type="text"
                placeholder="Task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />

              <label>Description</label>
              <input
                type="text"
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label>Progress</label>
              <label className="progress_bar">
              <input
                type="range"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                width="80px"
              />{progress}%
              </label>

              <label>Task Assigned to</label>
              <input
                type="text"
                placeholder="Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
              
              <label>Assign Date</label>
              <input
                type="date"
                value={assignDate}
                onChange={(e) => setAssignDate(e.target.value)}
              />

              <label>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

              <label>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <button type="submit" onClick={createTask}>
                Create Task
              </button>
            </div>
  )
}

export default CreateTasks
