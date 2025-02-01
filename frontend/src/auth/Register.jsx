import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "STUDENT" });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Normally, this would send data to the backend
    localStorage.setItem("newUser", JSON.stringify(newUser));
    alert("User registered successfully! Please log in.");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 shadow-md rounded" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleChange}
          className="block border p-2 w-full mb-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleChange}
          className="block border p-2 w-full mb-4"
          required
        />
        <select name="role" value={newUser.role} onChange={handleChange} className="block border p-2 w-full mb-4">
          <option value="STUDENT">Student</option>
          <option value="SCOLARITE">Scolarite</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit" className="bg-green-600 text-white p-2 w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
