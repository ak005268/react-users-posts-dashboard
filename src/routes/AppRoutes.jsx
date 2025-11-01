import { Routes, Route } from "react-router-dom";
import UsersList from "../pages/userList/UsersList";
import UserDetail from "../pages/userDetail/UserDetail";
import DashboardLayout from "../components/layout/DashboardLayout";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<UsersList />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
