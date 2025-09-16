import { CheckCircle2, Home, } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

export const Sidebar = ({ isOpen }: any) => {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', label: 'الشهادات الصحية', icon: Home },
        { path: '/health-insurance', label: 'التأمين الصحي', icon: CheckCircle2 },
    ];

    return (
        <aside className={`${isOpen ? 'w-64' : 'w-0'} bg-white shadow-sm transition-all duration-300 overflow-hidden`}>
            <nav className="p-6">
                <div className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-right transition-colors ${isActive
                                        ? 'bg-purple-50 text-[var(--primary)] border-r-2 border-[var(--primary)]'
                                        : 'text-gray-700 hover:bg-gray-100 bg-gray-50'
                                    }`
                                }
                            >
                                <Icon className={`h-5 w-5 ${isActive ? 'text-[var(--primary)]' : 'text-gray-500'}`} />
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        );
                    })}
                </div>
            </nav>
        </aside>
    );
};