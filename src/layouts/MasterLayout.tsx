import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icons/Abu_Dawas.png';
import LogoutDialog from '../components/dialog/LogoutDialog';
import { Sidebar } from '../components/navigation/Sidebar';
import { useAuth } from '../hooks/useAuth';

export const MasterLayout = ({ children }: any) => {
  const [logoutDialog, setLogoutDialog] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout }: any = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const openLogoutDialog = () => {
    setLogoutDialog(true)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-600  cursor-pointer hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <h1 className="text-xl font-semibold text-gray-800">لوحة التحكم</h1>
            <img src={logo} style={{
              width: "40px", height: "40px",
            }} alt="" className=' rounded-full border border-gray-300' />
          </div>

          <div className="flex items-center  space-x-4">
            <button
              onClick={openLogoutDialog}
              className="flex items-center cursor-pointer space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-73px)]">
        <Sidebar isOpen={sidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-10 p-2 sm:p-6">
          {children}
        </main>
        {
          <LogoutDialog
            logout={handleLogout}
            open={logoutDialog}
            setOpen={() => setLogoutDialog(false)}
          />
        }
      </div>
    </div>
  );
};