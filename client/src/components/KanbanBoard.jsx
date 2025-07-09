import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import io from "socket.io-client";
import AddTask from "./AddTask";
import Modal from "./Modal";
import {
  PlusCircle,
  BrainCircuit,
  ListTodo,
  Timer,
  CheckCircle,
} from "lucide-react";

const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    socket.on("task_updated", () => {
      fetchTasks();
    });

    return () => {
      socket.off("task_updated");
    };
  }, []);

  const handleTaskAdded = (task) => {
    setTasks([...tasks, task]);
    setShowAddTask(false);
    socket.emit("task_update");
  };

  const handleSmartAssign = async (taskId) => {
    try {
      await axios.post(`/api/tasks/${taskId}/smart-assign`);
      socket.emit("task_update");
    } catch (err) {
      console.error(err);
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const originalTasks = [...tasks];
    const task = tasks.find((task) => task._id === draggableId);

    // Optimistically update the UI
    const optimisticTasks = tasks.map((t) =>
      t._id === draggableId ? { ...t, status: destination.droppableId } : t
    );
    setTasks(optimisticTasks);

    const updatedTask = {
      ...task,
      status: destination.droppableId,
      version: task.version,
    };

    try {
      await axios.put(`/api/tasks/${draggableId}`, updatedTask, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      socket.emit("task_update");
    } catch (err) {
      // Revert to the original state if the update fails
      setTasks(originalTasks);
      console.error("Failed to update task. Reverting changes.", err);
      alert("Error: Could not update the task. Please try again.");
    }
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  const columnIcons = {
    Todo: <ListTodo className="column-icon" />,
    "In Progress": <Timer className="column-icon" />,
    Done: <CheckCircle className="column-icon" />,
  };

  return (
    <>
      <div className="add-task-container">
        <button
          onClick={() => setShowAddTask(true)}
          className="btn btn-primary"
        >
          <PlusCircle size={18} /> Add Task
        </button>
      </div>
      <Modal show={showAddTask} onClose={() => setShowAddTask(false)}>
        <AddTask onTaskAdded={handleTaskAdded} />
      </Modal>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {["Todo", "In Progress", "Done"].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-list"
                >
                  <h2>
                    {columnIcons[status]} {status}
                  </h2>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`task-card ${
                              snapshot.isDragging ? "dragging" : ""
                            }`}
                          >
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                            <p>Priority: {task.priority}</p>
                            <p>Assigned to: {task.assignedTo?.username}</p>
                            <div className="smart-assign-container">
                              <button
                                onClick={() => handleSmartAssign(task._id)}
                                className="btn-smart-assign"
                              >
                                <BrainCircuit size={16} /> Smart Assign
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default KanbanBoard;
