import { Menu, Bell } from "lucide-react";

const Navbar = ({ toggle }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex justify-between items-center sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          aria-label="Toggle sidebar"
        >
          <Menu size={22} className="text-gray-700" />
        </button>
   
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 ">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-md group-hover:shadow-lg transition-shadow duration-200">
                I
              </div>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                InfinityHub
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
