import { create } from 'zustand';
import useMessageStore from './useMessageStore';

const useTaskStore = create((set, get) => ({
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],

  addTask: (task) => {
    try {
      if (!task.title.trim()) {
        useMessageStore.getState().setMessage('Task title cannot be empty', 'error');
        return;
      }
      const newTasks = [...get().tasks, task];
      set({ tasks: newTasks });
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      useMessageStore.getState().setMessage('Task added!', 'success');
    } catch {
      useMessageStore.getState().setMessage('Failed to add task', 'error');
    }
  },

  removeTask: (id) => {
    try {
      const newTasks = get().tasks.filter(task => task.id !== id);
      set({ tasks: newTasks });
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      useMessageStore.getState().setMessage('Task removed!', 'success');
    } catch {
      useMessageStore.getState().setMessage('Failed to remove task', 'error');
    }
  },

  toggleTask: (id) => {
    try {
      const sorted = get().tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ).sort((a, b) => a.completed - b.completed); // Sort: incomplete on top
      set({ tasks: sorted });
      localStorage.setItem('tasks', JSON.stringify(sorted));
      useMessageStore.getState().setMessage('Task updated!', 'success');
    } catch {
      useMessageStore.getState().setMessage('Failed to update task', 'error');
    }
  },
}));

export default useTaskStore;