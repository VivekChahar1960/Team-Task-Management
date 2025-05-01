import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { useNotification } from "../../Context/NotificationContext";
import "./MyTasks.css";
const MyTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const empCode = window.localStorage.getItem("empcode");

  useEffect(() => {
    const fetchMyTasks = async () => {
      setLoading(true);
      try {
        const db = getDatabase();
        const fetchPromise = get(ref(db, "tasks"));
        const minWait = new Promise((resolve) => setTimeout(resolve, 1000));
        const [snapshot] = await Promise.all([fetchPromise, minWait]);

        const data = snapshot.val();
        if (data) {
          const tasksArray = Object.entries(data).map(([id, task]) => ({
            id,
            ...task,
          }));

          setAllTasks(tasksArray);
          const filtered = tasksArray.filter(
            (task) => task.assignedTo === empCode
          );
          setMyTasks(filtered);
        } else {
          setAllTasks([]);
          setMyTasks([]);
          showNotification("No tasks found");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        showNotification(`Error fetching tasks: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTasks();
  }, []);

  return (
    <div>
      <h2>My Tasks</h2>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : myTasks.length > 0 ? (
        <div className="mytask-container">
          {myTasks.map((task) => (
            <div key={task.taskId} className="task-card myTask-card ">
              <strong>{task.taskName}</strong> <br />
              <span>Due: {task.dueDate}</span> <br />
              <span>Assigned on: {task.assignDate}</span> <br />
              <span>Priority: {task.priority}</span> <br />
              <span>Progress: {task.progress}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No tasks assigned to you</p>
      )}
    </div>
  );
};

export default MyTasks;
