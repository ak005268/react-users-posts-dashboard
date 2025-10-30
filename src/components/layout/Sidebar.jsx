import { Link, useLocation } from "react-router-dom";
import { Users, Home } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Users", path: "/", icon: <Users size={18} /> },
  ];

  return (
    <aside className="w-60 bg-white shadow-md flex flex-col">
      <div className="p-4 text-xl font-semibold border-b">User Dashboard</div>
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-2 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
