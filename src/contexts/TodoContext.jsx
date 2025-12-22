import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const TodoContext = createContext(undefined);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage
  useEffect(() => {
    if (user) {
      const storedTodos = localStorage.getItem(`todos_${user.id}`);
      if (storedTodos) {
        const parsed = JSON.parse(storedTodos);
        setTodos(parsed.map((todo) => ({
          ...todo,
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
          reminder: todo.reminder ? new Date(todo.reminder) : undefined,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        })));
      } else {
        // Add sample todos for new users
        const sampleTodos = [
          {
            id: '1',
            title: 'Welcome to TaskFlow!',
            description: 'This is your first task. Click on it to see details.',
            completed: false,
            priority: 'medium',
            category: 'personal',
            dueDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '2',
            title: 'Complete project proposal',
            description: 'Draft the Q1 project proposal for the marketing team.',
            completed: false,
            priority: 'high',
            category: 'work',
            dueDate: new Date(Date.now() + 86400000),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '3',
            title: 'Buy groceries',
            description: 'Milk, eggs, bread, vegetables',
            completed: true,
            priority: 'low',
            category: 'shopping',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
        setTodos(sampleTodos);
      }
    }
  }, [user]);

  // Save todos to localStorage
  useEffect(() => {
    if (user && todos.length > 0) {
      localStorage.setItem(`todos_${user.id}`, JSON.stringify(todos));
    }
  }, [todos, user]);

  const addTodo = useCallback((todo) => {
    const newTodo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const updateTodo = useCallback((id, updates) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const toggleComplete = useCallback((id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  const getFilteredTodos = useCallback((filter) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    switch (filter) {
      case 'today':
        return todos.filter(todo => {
          if (!todo.dueDate) return false;
          const dueDate = new Date(todo.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === today.getTime() && !todo.completed;
        });
      case 'upcoming':
        return todos.filter(todo => {
          if (!todo.dueDate) return false;
          const dueDate = new Date(todo.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() >= tomorrow.getTime() && !todo.completed;
        });
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'personal':
      case 'work':
      case 'shopping':
      case 'health':
      case 'other':
        return todos.filter(todo => todo.category === filter && !todo.completed);
      default:
        return todos.filter(todo => !todo.completed);
    }
  }, [todos]);

  return (
    <TodoContext.Provider value={{
      todos,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleComplete,
      getFilteredTodos,
    }}>
      {children}
    </TodoContext.Provider>
  );
};