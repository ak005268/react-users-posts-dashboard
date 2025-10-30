import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";

const UsersList = () => {
  const { users, loading, error } = useContext(DataContext);

  if (loading) return <div className="text-center mt-10">Loading users...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/user/${user.id}`}
            className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-blue-600">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">{user.company.name}</p>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default UsersList;
