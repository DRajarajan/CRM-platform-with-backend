import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  Send, 
  ClipboardList, 
  ChevronLeft,
  ChevronRight,
  GanttChartSquare,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuthStore();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/customers', label: 'Customers', icon: <Users size={20} /> },
    { path: '/segments/new', label: 'Create Segment', icon: <Target size={20} /> },
    { path: '/campaigns/new', label: 'Create Campaign', icon: <Send size={20} /> },
    { path: '/campaigns/history', label: 'Campaign History', icon: <ClipboardList size={20} /> },
  ];

  return (
    <motion.aside
      initial={{ width: 240 }}
      animate={{ width: collapsed ? 80 : 240 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-r border-gray-200 flex flex-col h-full"
    >
      <div className="flex items-center p-4 border-b border-gray-200">
        <GanttChartSquare size={28} className="text-primary-600 mr-3" />
        {!collapsed && (
          <span className="text-xl font-semibold text-gray-800">InsightCRM</span>
        )}
      </div>
      
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center rounded-md px-3 py-2 transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center mb-4">
          {!collapsed && user?.picture && (
            <img 
              src={user.picture} 
              alt={user.name || 'User'} 
              className="w-8 h-8 rounded-full mr-3"
            />
          )}
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-800 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          )}
        </div>
        
        <button
          onClick={logout}
          className="flex w-full items-center rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
        >
          <LogOut size={20} className="mr-3" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
      
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
};

export default Sidebar;