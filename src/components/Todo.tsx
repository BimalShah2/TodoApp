"use client";
import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority?: string;
  deadline?: string;
  comments?: string;
}

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const openEditModal = (todo: Todo | null = null) => {
    setCurrentTodo(todo || { id: 0, title: "", completed: false });
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setCurrentTodo(null);
    setIsEditing(false);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (currentTodo) {
      setCurrentTodo({
        ...currentTodo,
        [e.target.name]: e.target.value,
      });
    }
  };

  const saveEdit = () => {
    if (currentTodo) {
      if (currentTodo.id) {
        // Edit existing todo
        setTodos(
          todos.map((todo) =>
            todo.id === currentTodo.id ? currentTodo : todo
          )
        );
      } else {
        // Add new todo
        setTodos([...todos, { ...currentTodo, id: Math.random(), completed: false }]);
      }
      closeEditModal();
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "today") {
      const today = new Date().toISOString().split("T")[0];
      return todo.deadline === today;
    } else if (filter === "pending") {
      return !todo.completed;
    } else if (filter === "overdue") {
      const today = new Date().toISOString().split("T")[0];
      return todo.deadline && todo.deadline < today && !todo.completed;
    } else {
      return !todo.completed;
    }
  });

  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-200 border border-gray-400 p-8 rounded shadow-lg w-full max-w-2xl">
        <div className="flex justify-between mb-4">
          <div>
            <button onClick={() => setFilter("today")} className={`mr-4 p-2 rounded ${filter === "today" ? "bg-green-900 text-white" : "bg-green-700"}`}>
              Today
            </button>
            <button onClick={() => setFilter("pending")} className={`mr-4 p-2 rounded ${filter === "pending" ? "bg-green-900 text-white" : "bg-green-700"}`}>
              Pending
            </button>
            <button onClick={() => setFilter("overdue")} className={`mr-4 p-2 rounded ${filter === "overdue" ? "bg-green-900 text-white" : "bg-green-700"}`}>
              Overdue
            </button>
          </div>
          <button onClick={() => openEditModal()} className="bg-blue-500 rounded text-white p-2">
            + Add Task
          </button>
        </div>
        <h2 className="text-xl font-bold mb-2">Tasks</h2>
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between p-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-2"
              />
              <span className={`flex-1 ${todo.completed ? "line-through" : ""}`}>
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white p-1 ml-2"
              >
                Delete
              </button>
              <button
                onClick={() => openEditModal(todo)}
                className="bg-yellow-500 text-white p-1 ml-2"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-bold mt-4">Completed</h2>
        <ul>
          {completedTodos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between p-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-2"
              />
              <span className={`flex-1 ${todo.completed ? "line-through" : ""}`}>
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 text-white p-1 ml-2"
              >
                Delete
              </button>
              <button
                onClick={() => openEditModal(todo)}
                className="bg-yellow-500 text-white p-1 ml-2"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
        {isEditing && currentTodo && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 border rounded shadow-lg m-4">
              <h2 className="text-xl font-bold mb-4">Task Details</h2>
              <div className="mb-4">
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentTodo.title}
                  onChange={handleEditChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Priority</label>
                <select
                  name="priority"
                  value={currentTodo.priority || ""}
                  onChange={handleEditChange}
                  className="border p-2 w-full"
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={currentTodo.deadline || ""}
                  onChange={handleEditChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Comments</label>
                <textarea
                  name="comments"
                  value={currentTodo.comments || ""}
                  onChange={handleEditChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button onClick={closeEditModal} className="bg-gray-500 text-white p-2 mr-2">
                  Cancel
                </button>
                <button onClick={saveEdit} className="bg-blue-500 text-white p-2">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;