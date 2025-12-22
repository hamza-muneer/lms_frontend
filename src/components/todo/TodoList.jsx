import React, { useState } from 'react';
import { useTodos } from '@/contexts/TodoContext';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { Plus, ListTodo } from 'lucide-react';

export const TodoList = ({ filter, title }) => {
  const { getFilteredTodos } = useTodos();
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const todos = getFilteredTodos(filter);

  const handleEdit = (todo) => {
        setEditingTodo(todo);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  return (
    <div className="flex-1 overflow-auto p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-medium text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 rounded-2xl bg-accent p-4">
                <ListTodo className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground">No tasks yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a new task to get started
              </p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onEdit={handleEdit} />
            ))
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <TodoForm todo={editingTodo} onClose={handleCloseForm} />
      )}
    </div>
  );
};
