import { useState } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { user } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Mock notifications
  const notifications = [
    { id: 1, message: 'New customer registered', time: '5 minutes ago', read: false },
    { id: 2, message: 'Campaign "Summer Sale" completed', time: '1 hour ago', read: false },
    { id: 3, message: 'Weekly report available', time: '3 hours ago', read: true },
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      <div className="flex items-center md:hidden">
        <button className="rounded-md p-2 text-gray-500 hover:bg-gray-100">
          <Menu size={20} />
        </button>
      </div>
      
      <div className="hidden max-w-md flex-1 md:block">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Search customers, campaigns..."
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 focus:outline-none"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-xs font-medium text-white">
                {unreadCount}
              </span>
            )}
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 rounded-md border border-gray-200 bg-white py-2 shadow-lg"
              >
                <div className="border-b border-gray-100 px-4 py-2">
                  <h3 className="text-sm font-medium">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 ${
                            !notification.read ? 'bg-primary-50' : ''
                          }`}
                        >
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <p className="text-sm text-gray-500">No notifications</p>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-100 px-4 py-2">
                  <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
                    Mark all as read
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex items-center">
          {user?.picture ? (
            <img
              src={user.picture}
              alt={user.name || 'User'}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
              {user?.name?.charAt(0) || '?'}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;