import React, { useState, useEffect } from 'react';
// import { Todo, Priority, Category } from '@/types/todo';
import { useTodos } from '@/contexts/TodoContext';
import { X, Calendar, Clock, Flag, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';



const priorities = [  { value: 'low', label: 'Low', color: 'bg-priority-low' },
  { value: 'medium', label: 'Medium', color: 'bg-priority-medium' },
  { value: 'high', label: 'High', color: 'bg-priority-high' },
];

const categories = [  { value: 'personal', label: 'Personal' },
  { value: 'work', label: 'Work' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'health', label: 'Health' },
  { value: 'other', label: 'Other' },
];

export const TodoForm = ({ todo, onClose }) => {  const { addTodo, updateTodo } = useTodos();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
 const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('personal');
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || '');
      setPriority(todo.priority);
      setCategory(todo.category);
      setDueDate(todo.dueDate ? format(new Date(todo.dueDate), 'yyyy-MM-dd') : '');
      setReminder(todo.reminder ? format(new Date(todo.reminder), "yyyy-MM-dd'T'HH:mm") : '');
    }
  }, [todo]);

 const handleSubmit = (e) => {    e.preventDefault();
    
    if (!title.trim()) return;

    const todoData = {
      title: title.trim(),
      description: description.trim() || undefined,
      completed: todo?.completed || false,
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      reminder: reminder ? new Date(reminder) : undefined,
    };

    if (todo) {
      updateTodo(todo.id, todoData);
    } else {
      addTodo(todoData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-lg animate-scale-in mx-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            {todo ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              rows={3}
              className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Flag className="h-4 w-4" />
              Priority
            </label>
            <div className="flex gap-2">
              {priorities.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={cn(
                    'flex-1 rounded-lg py-2 text-sm font-medium transition-all',
                    priority === p.value
                      ? `${p.color} text-primary-foreground`
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Tag className="h-4 w-4" />
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCategory(c.value)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
                    category === c.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Due Date & Reminder */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Clock className="h-4 w-4" />
                Reminder
              </label>
              <input
                type="datetime-local"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-secondary py-3 font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-primary py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {todo ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
