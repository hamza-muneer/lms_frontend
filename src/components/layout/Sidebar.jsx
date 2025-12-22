import React from 'react';
// import { FilterType } from '@/contexts/TodoContext';
import { useTodos } from '@/contexts/TodoContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Home,
  Sun,
  CalendarDays,
  CheckCircle2,
  User,
  Briefcase,
  ShoppingCart,
  Heart,
  MoreHorizontal,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';



const mainItems = [
 { filter: 'all', label: 'All Tasks', icon: Home },
  { filter: 'today', label: 'Today', icon: Sun },
  { filter: 'upcoming', label: 'Upcoming', icon: CalendarDays },
  { filter: 'completed', label: 'Completed', icon: CheckCircle2 },
];

const categoryItems = [
  { filter: 'personal', label: 'Personal', icon: User },
  { filter: 'work', label: 'Work', icon: Briefcase },
  { filter: 'shopping', label: 'Shopping', icon: ShoppingCart },
  { filter: 'health', label: 'Health', icon: Heart },
  { filter: 'other', label: 'Other', icon: MoreHorizontal },
];

export const Sidebar = ({  activeFilter,
  onFilterChange,
  isOpen,
  onToggle,
}) => {
  const { getFilteredTodos } = useTodos();
  const { user, logout } = useAuth();

  const getCount = (filter) => {    return getFilteredTodos(filter).length;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-sidebar-foreground">TaskFlow</span>
          </div>
          <button
            onClick={onToggle}
            className="rounded-lg p-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-auto p-4">
          <div className="space-y-1">
            {mainItems.map((item) => (
              <button
                key={item.filter}
                onClick={() => {
                  onFilterChange(item.filter);
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                  activeFilter === item.filter
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </div>
                <span className={cn(
                  'rounded-full px-2 py-0.5 text-xs font-medium',
                  activeFilter === item.filter
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {getCount(item.filter)}
                </span>
              </button>
            ))}
          </div>

          <div className="my-6 border-t border-sidebar-border" />

          <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Categories
          </p>
          <div className="space-y-1">
            {categoryItems.map((item) => (
              <button
                key={item.filter}
                onClick={() => {
                  onFilterChange(item.filter);
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                  activeFilter === item.filter
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </div>
                <span className={cn(
                  'rounded-full px-2 py-0.5 text-xs font-medium',
                  activeFilter === item.filter
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {getCount(item.filter)}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center justify-between rounded-xl bg-sidebar-accent/50 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-destructive"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow-md lg:hidden"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>
    </>
  );
};
