import { useContext, useState, useDeferredValue, useMemo, useRef } from "react";
import { DataContext } from "../../context/DataContext";
import UserCard from "./UserCard";
import { AlertCircle, Users, Search } from "lucide-react";
import LoadingState from "../../components/LoadingState";
import KeyboardListener from "../../components/KeyboardListener"; 
import HeaderWithSearch from "../../components/HeaderWithSearch";

const UsersList = () => {
  
  const { users, loading, error } = useContext(DataContext);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const deferredSearch = useDeferredValue(search);

  const filteredUsers = useMemo(() => {
    const term = deferredSearch.toLowerCase().trim();
    if (!term) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.username.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
  }, [users, deferredSearch]);

  const handleError = () => window.location.reload();

  const handleCtrlK = () => {
    inputRef.current?.focus();
  };

  if (loading)
    return (
      <LoadingState message="Loading users..." subText="Please wait a moment" />
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle size={24} className="text-red-600" />
            <h3 className="text-lg font-semibold text-red-800">
              Error Loading Users
            </h3>
          </div>
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={handleError}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    
    <div className="space-y-6">
      <KeyboardListener keyboard="k" onTrigger={handleCtrlK} />

      <HeaderWithSearch
        title="Users"
        icon={Users}
        count={`${filteredUsers.length} ${
          filteredUsers.length === 1 ? "User" : "Users"
        }`}
      >
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users... (Ctrl + K)"
            className="pl-10 pr-3 py-2 w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-blue-500"
          />
        </div>
      </HeaderWithSearch>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-300">
          <Users size={64} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Users Found
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Try searching with a different keyword.
          </p>
        </div>
      )}
    </div>
  );
};

export default UsersList;
