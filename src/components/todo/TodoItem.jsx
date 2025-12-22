import React from 'react';
// import { Todo } from '@/types/todo';
import { useTodos } from '@/contexts/TodoContext';
import { Check, Calendar, Clock, Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';



const priorityColors = {
  high: 'border-priority-high bg-priority-high/5',
  medium: 'border-priority-medium bg-priority-medium/5',
  low: 'border-priority-low bg-priority-low/5',
};

const priorityDots = {
  high: 'bg-priority-high',
  medium: 'bg-priority-medium',
  low: 'bg-priority-low',
};

const categoryLabels = {
  personal: 'Personal',
  work: 'Work',
  shopping: 'Shopping',
  health: 'Health',
  other: 'Other',
};

export const TodoItem = ({ todo, onEdit }) => { 
   const { toggleComplete, deleteTodo } = useTodos();

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div
      className={cn(
        'group relative rounded-xl border-l-4 bg-card p-4 shadow-card transition-all duration-200 hover:shadow-md animate-fade-in',
        priorityColors[todo.priority],
        todo.completed && 'opacity-60'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => toggleComplete(todo.id)}
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200',
            todo.completed
              ? 'border-primary bg-primary'
              : 'border-muted-foreground/40 hover:border-primary'
          )}
        >
          {todo.completed && (
            <Check className="h-3 w-3 text-primary-foreground animate-check" />
          )}
        </button>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={cn(
                'font-medium text-foreground transition-all duration-200',
                todo.completed && 'line-through text-muted-foreground'
              )}
            >
              {todo.title}
            </h3>
            <span className={cn('h-2 w-2 rounded-full', priorityDots[todo.priority])} />
          </div>

          {todo.description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {todo.description}
            </p>
          )}

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-secondary px-2 py-0.5 font-medium">
              {categoryLabels[todo.category]}
            </span>

            {todo.dueDate && (
              <span className={cn('flex items-center gap-1', isOverdue && 'text-destructive font-medium')}>
                <Calendar className="h-3 w-3" />
                {format(new Date(todo.dueDate), 'MMM d')}
              </span>
            )}

            {todo.reminder && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {format(new Date(todo.reminder), 'h:mm a')}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(todo)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
