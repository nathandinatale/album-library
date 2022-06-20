import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login";
import Albums from "./Pages/Albums";
import Album from "./Pages/Album";
import User from "./Pages/User";
import Dashboard from "./Pages/Dashboard";
import { RouterRoutesProps } from "./types";

const RouterRoutes = ({ token, role }: RouterRoutesProps) => (
  <Routes>
    <Route path="/" element={<Login />} />
    {token && (
      <>
        <Route path="albums" element={<Albums />} />
        <Route path="albums/:id" element={<Album />} />
        <Route path="users/:id" element={<User />} />
      </>
    )}
    {role === "ADMIN" && <Route path="dashboard" element={<Dashboard />} />}
    {!token && <Route path="*" element={<Navigate to="/" replace />} />}
    {token && <Route path="*" element={<Navigate to="/albums" replace />} />}
  </Routes>
);

export default RouterRoutes;
