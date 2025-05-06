import React, { useEffect, useState } from "react";
import { useNotification } from "../../Context/NotificationContext";
import { getDatabase, ref, get } from "firebase/database";
import "./Search.css"; 

const Search = ({ searchText }) => {
  const [result, setResult] = useState(null);
  const [type, setType] = useState(null);
  const { showNotification } = useNotification();
  const db = getDatabase();

  useEffect(() => {
    const handleSearch = async () => {
      if (!searchText) return;

      let table = "";

      if (/^[0-9]+$/.test(searchText)) {
        table = "tasks";
        setType("task");
      } else if (/^[a-zA-Z0-9]+$/.test(searchText)) {
        table = "users";
        setType("employee");
      } else {
        showNotification("Search text contains special characters or spaces");
        return;
      }

      try {
        const snapshot = await get(ref(db, `${table}/${searchText}`));
        if (snapshot.exists()) {
          setResult(snapshot.val());
        } else {
          setResult(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        showNotification("Error fetching data. Please try again.");
        setResult(null);
      }
    };

    handleSearch();
  }, [searchText]);

  return (
    <div className="search-results">
      {result ? (
        type === "task" ? (
          <div className="task-search-card">
            <h3 className="task-title">{result.taskName}</h3>
            <p className="task-info"><strong>Task ID:</strong> {result.taskId}</p>
            <p className="task-info"><strong>Description:</strong> {result.description}</p>
            <p className="task-info"><strong>Progress:</strong> {result.progress}</p>
            <p className="task-info"><strong>Assigned to:</strong> {result.assignedTo}</p>
            <p className="task-info"><strong>Assigned Date:</strong> {result.assignDate}</p>
            <p className="task-info"><strong>Due Date:</strong> {result.dueDate}</p>
            <p className="task-info">
              <strong>Priority:</strong>
              <span className="priority-badge">{result.priority}</span>
            </p>
          </div>
        ) : (
          <div className="employee-search-card">
            <h3 className="employee-name">{result.user}</h3>
            <p className="employee-info"><strong>Email:</strong> {result.email}</p>
            <p className="employee-info"><strong>Employee Code:</strong> {result.employeeCode}</p>
            <p className="employee-info">
              <strong>Role:</strong>
              <span className="role-badge">{result.role}</span>
            </p>
          </div>
        )
      ) : (
        <p>No results to show</p>
      )}
    </div>
  );
};

export default Search;
