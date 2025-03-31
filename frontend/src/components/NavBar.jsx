import { Link} from "react-router-dom";
import { toast } from "react-hot-toast";
import { Home, ClipboardList, Calendar, User, LogOut, Bell } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const {logout} = useAuthStore();
  
  const handleLogout = () => {
    logout();
  };


  return (
    <nav className="bg-white shadow-md w-full">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo + Home Link */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <Home size={24} />
            NITK Sports
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link to="/equipment" className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition">
            <ClipboardList size={20} />
            Equipment
          </Link>

          <Link to="infrastructure" className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition">
            <Calendar size={20} />
            Infrastructure
          </Link>

          
        </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition flex items-center gap-2"
          >
            <LogOut size={20} />
            Logout
          </button>
        
      </div>
    </nav>
  );
};

export default Navbar;
    