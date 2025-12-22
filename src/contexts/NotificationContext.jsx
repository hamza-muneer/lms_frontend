import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTodos } from './TodoContext';const NotificationContext = createContext(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
export const NotificationProvider = ({ children }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { todos } = useTodos();

  useEffect(() => {
    if ('Notification' in window) {
      setHasPermission(Notification.permission === 'granted');
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setHasPermission(permission === 'granted');
    }
  };

  // Check for reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      
      todos.forEach(todo => {
        if (todo.reminder && !todo.completed) {
          const reminderTime = new Date(todo.reminder);
          const diff = reminderTime.getTime() - now.getTime();
          
          // If reminder is within the next minute
          if (diff > 0 && diff <= 60000) {
            const notificationId = `${todo.id}-${reminderTime.getTime()}`;
            
            // Check if we already sent this notification
            if (!notifications.find(n => n.id === notificationId)) {
              // Add to in-app notifications
              setNotifications(prev => [{
                id: notificationId,
                title: 'Task Reminder',
                message: todo.title,
                time: new Date(),
                read: false,
              }, ...prev]);

              // Show browser notification
              if (hasPermission) {
                new Notification('TaskFlow Reminder', {
                  body: todo.title,
                  icon: '/favicon.ico',
                });
              }
            }
          }
        }
      });
    };

    const interval = setInterval(checkReminders, 30000); // Check every 30 seconds
    checkReminders(); // Check immediately

    return () => clearInterval(interval);
  }, [todos, hasPermission, notifications]);

  const markAsRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{
      hasPermission,
      requestPermission,
      notifications,
      markAsRead,
      clearAll,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
