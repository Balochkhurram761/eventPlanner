import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

export default function EventTodoList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved
      ? JSON.parse(saved)
      : [];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const removeTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Event To-Do List
      </h2>

      <div className="bg-white shadow-lg rounded-2xl p-5 w-full max-w-sm">
        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task (e.g. dj , hall etc"
            className="flex-grow border rounded-lg px-3 py-2 focus:outline-none"
          />
          <button
            onClick={addTask}
            className="ml-2 bg-pink-600 text-white px-4 py-2 rounded-lg  hover:bg-pink-700 transition-colors duration-300 cursor-pointer"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-slate-50 p-2 rounded-lg"
            >
              <span
                className={`cursor-pointer ${
                  task.startsWith(" ")
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {task}
              </span>
              <button
                onClick={() => removeTask(index)}
                className="bg-pink-600 text-white px-4 py-2 rounded-lg  hover:bg-pink-700 transition-colors duration-300 cursor-pointer"
              >
                <IoMdClose />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
