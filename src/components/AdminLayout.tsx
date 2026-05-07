import React, { ReactNode, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  BarChart3, 
  MessageSquare, 
  ShieldAlert, 
  Settings, 
  Menu, 
  X,
  GraduationCap,
  Bell,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  key?: string;
}

function SidebarItem({ to, icon: Icon, label, onClick }: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-white/10 hover:text-white",
          isActive ? "bg-primary text-white" : "text-slate-400"
        )
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </NavLink>
  );
}

export function AdminLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const sessionStr = localStorage.getItem('adminSession');
  const adminData = sessionStr ? JSON.parse(sessionStr) : { full_name: 'Administrator', role: 'admin' };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/login');
  };

  const sidebarItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/courses', icon: BookOpen, label: 'Courses' },
    { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/admin/reviews', icon: MessageSquare, label: 'Reviews' },
    { to: '/admin/security', icon: ShieldAlert, label: 'Security' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen">
      <div className="mesh-bg" />
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 bg-sidebar border-r border-sidebar-border md:block text-sidebar-foreground">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center px-6">
            <NavLink to="/admin" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-sm">VG</div>
              <span>Vidhi Gyan</span>
            </NavLink>
          </div>
          <ScrollArea className="flex-1 px-4 py-4">
            <nav className="flex flex-col gap-1">
              {sidebarItems.map((item) => (
                <SidebarItem 
                  key={item.to} 
                  to={item.to} 
                  icon={item.icon} 
                  label={item.label} 
                />
              ))}
            </nav>
          </ScrollArea>
          <div className="bg-primary/5 border-t border-sidebar-border p-4 mt-auto">
            <div className="flex items-center justify-between px-2 py-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-accent shadow-sm flex items-center justify-center text-accent-foreground text-[10px] font-bold">
                  {adminData.full_name?.substring(0,2).toUpperCase() || 'AD'}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white truncate max-w-[100px]">{adminData.full_name || 'Admin'}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider">{adminData.role || 'Admin'}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-slate-400 hover:text-rose-500 hover:bg-rose-500/10">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border md:hidden shadow-xl text-sidebar-foreground"
            >
              <div className="flex h-16 items-center justify-between px-6">
                <NavLink to="/admin" className="flex items-center gap-2 font-bold text-xl text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-sm">VG</div>
                  <span>Vidhi Gyan</span>
                </NavLink>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:bg-white/10">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <ScrollArea className="h-[calc(100vh-4rem)] px-4 py-6">
                <nav className="flex flex-col gap-2">
                  {sidebarItems.map((item) => (
                    <SidebarItem 
                      key={item.to} 
                      to={item.to} 
                      icon={item.icon} 
                      label={item.label} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                    />
                  ))}
                </nav>
              </ScrollArea>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold tracking-tight text-foreground">
                {sidebarItems.find(item => item.to === window.location.pathname)?.label || 'Dashboard'}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> System Live
            </div>
            <Button variant="ghost" size="icon" className="bg-slate-100 h-10 w-10 text-slate-600 hover:bg-slate-200">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <motion.div
            key={window.location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
