import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { TodoList } from '@/components/todo/TodoList';
import { NotificationProvider } from '@/contexts/NotificationContext';

const filterTitles = {
  all: 'All Tasks',
  today: 'Today',
  upcoming: 'Upcoming',
  completed: 'Completed',
  personal: 'Personal',
  work: 'Work',
  shopping: 'Shopping',
  health: 'Health',
  other: 'Other',
};

export const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <NotificationProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <div className="flex flex-1 flex-col">
          <Header onSearch={setSearchQuery} />
          <TodoList filter={activeFilter} title={filterTitles[activeFilter]} />
        </div>
      </div>
    </NotificationProvider>
  );
};

export default Dashboard;
