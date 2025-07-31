import { create } from "zustand";

const useTaskStore = create((set) => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  return {
    tasks: savedTasks,
    addTask: (name) =>
      set((state) => {
        const newTask = { id: Date.now(), name, completed: false };
        const updatedTasks = [...state.tasks, newTask];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
      }),
    toggleTask: (id) =>
      set((state) => {
        const updatedTasks = state.tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
      }),
    deleteTask: (id) =>
      set((state) => {
        const updatedTasks = state.tasks.filter((task) => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
      }),
  };
});

export default useTaskStore;