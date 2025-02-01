import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Student Management System</h1>
      <nav>
        {user ? (
          <>
            <Link to="/" className="mr-4">Home</Link>
            {user.role === "ADMIN" && <Link to="/admin" className="mr-4">Admin Dashboard</Link>}
            {user.role === "SCOLARITE" && <Link to="/scolarite" className="mr-4">Scolarite Dashboard</Link>}
            {user.role === "STUDENT" && <Link to="/student" className="mr-4">My Dashboard</Link>}
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-green-500 px-3 py-1 rounded">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
