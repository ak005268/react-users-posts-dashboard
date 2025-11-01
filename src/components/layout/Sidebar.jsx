import { Link, NavLink, useLocation } from "react-router-dom";
import { Users, X, Sparkles } from "lucide-react";

const Sidebar = ({ isOpen, toggle }) => {
  const location = useLocation();
  const menu = [{ name: "Users", path: "/", icon: <Users size={20} /> }];

  return (
    <>
      <aside
        className={`bg-white border-r border-gray-200 flex flex-col w-64 
        fixed top-0 left-0 h-screen z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="py-2.5 px-5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
        
            <div>
              <NavLink to="/">
                <h2 className="text-lg font-bold text-gray-800">DashHub</h2>
              </NavLink>
            </div>
          </div>
          <button
            onClick={toggle}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
            Navigation
          </p>
          {menu.map((item) => {
            const isActive = 1;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={toggle}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

  
      </aside>

      {isOpen && (
        <div
          onClick={toggle}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40 transition-opacity duration-300"
        />
      )}
    </>
  );
};

export default Sidebar;
