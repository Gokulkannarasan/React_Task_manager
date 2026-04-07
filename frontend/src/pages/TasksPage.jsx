import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Tasklist from "../components/Tasklist";
import {
  gettask,
  addtask,
  deletetask,
  updatetask,
  updatetitle
} from "../api/tasksApi";
import Addtask from "../components/Addtask";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const { user, logout } = useContext(AuthContext);
  const navigate=useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);// that array is called as dependency
  

  const handleLogout=()=>{

      logout();
      navigate("/login");

  };

  

  // 🔹 Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await gettask();
      setTasks(response.data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  // 🔹 Add task
  const addtasks = async (newTitle) => {
    try {
      const response = await addtask(newTitle);
      setTasks(prev => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // 🔹 Update title
  const handleupdate = async (id, newTitle) => {
    try {
      await updatetitle(id, newTitle);

      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, title: newTitle } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // 🔹 Delete task
  const deletetasks = async (id) => {
    try {
      await deletetask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // 🔹 Toggle completed
  const toggleTask = async (id) => {
    try {
      const taskToToggle = tasks.find(task => task.id === id);

      await updatetask(id, !taskToToggle.completed);

      setTasks(prev =>
        prev.map(task =>
          task.id === id
            ? { ...task, completed: !task.completed }
            : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // 🔹 Search + Filter Logic
  const filteredTasks = tasks
    .filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(task => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    });

  return (
  <div className="container mt-4">

    {/* 🔹 Header */}
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h3 style={{color:"blue"}}><bold>Task Manager</bold></h3>
      <div>
        <span className="me-3">{user?.email}</span>
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>

    {/* 🔹 Add Task */}
    <div className="card p-3 shadow mb-4 bg-primary-subtle border-primary">
      <Addtask onAdd={addtasks} />
    </div>

    {/* 🔹 Search + Filter */}
    <div className="card p-3 shadow mb-4">
      <div className="row g-2 align-items-center">
        
        {/* Search */}
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className="col-md-6 text-md-end">
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className="btn btn-outline-success me-2"
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className="btn btn-outline-warning"
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>

      </div>
    </div>

    {/* 🔹 Task List */}
    <div className="card p-3 shadow">
      <Tasklist
        tasks={filteredTasks}
        deletetask={deletetasks}
        toggleTask={toggleTask}
        onEdit={handleupdate}
      />
    </div>

  </div>
);
}

export default App;



