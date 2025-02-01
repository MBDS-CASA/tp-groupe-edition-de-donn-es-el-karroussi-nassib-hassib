import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Dummy user data for testing
    const users = [
      { username: "admin", password: "admin123", role: "ADMIN" },
      { username: "scolarite", password: "scolarite123", role: "SCOLARITE" },
      { username: "student", password: "student123", role: "STUDENT" },
    ];

    const foundUser = users.find(user => user.username === credentials.username && user.password === credentials.password);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      
      switch (foundUser.role) {
        case "ADMIN":
          navigate("/dashboard/admin");
          break;
        case "SCOLARITE":
          navigate("/dashboard/scolarite");
          break;
        case "STUDENT":
          navigate("/dashboard/etudiant");
          break;
        default:
          navigate("/");
      }
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 shadow-md rounded" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className="block border p-2 w-full mb-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="block border p-2 w-full mb-4"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
