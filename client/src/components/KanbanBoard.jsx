import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ['websocket', 'polling']
});

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
    };

    fetchTasks();

    socket.on("task_updated", () => {
      fetchTasks();
    });

    return () => {
      socket.off("task_updated");
    };
  }, []);

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

    const task = tasks.find((task) => task._id === draggableId);
    const newTasks = Array.from(tasks);
    newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, task);

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
      console.error(err);
    }
  };

  return (
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
                <h2>{status}</h2>
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
                          <button onClick={() => handleSmartAssign(task._id)}>
                            Smart Assign
                          </button>
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
  );
};

export default KanbanBoard;
