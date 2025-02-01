import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Students = ({ students, setStudents }) => {
  const { user } = useContext(AuthContext);
  const [newStudent, setNewStudent] = useState({ firstname: "", lastname: "" });
  const [editingStudent, setEditingStudent] = useState(null);

  // Handle Input Changes
  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  // Add a New Student (Only SCOLARITE)
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.firstname || !newStudent.lastname) {
      alert("All fields are required!");
      return;
    }

    const updatedStudents = [
      ...students,
      { id: students.length + 1, firstname: newStudent.firstname, lastname: newStudent.lastname }
    ];
    setStudents(updatedStudents);
    setNewStudent({ firstname: "", lastname: "" });
    alert("Student added successfully!");
  };

  // Edit a Student
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setNewStudent({ firstname: student.firstname, lastname: student.lastname });
  };

  // Save Edited Student
  const handleSaveEdit = () => {
    setStudents(students.map(student => (student.id === editingStudent.id ? newStudent : student)));
    setEditingStudent(null);
    setNewStudent({ firstname: "", lastname: "" });
    alert("Student updated successfully!");
  };

  // Delete a Student (Only SCOLARITE)
  const handleDelete = (id) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
    alert("Student deleted successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Students</h2>

      {/* Show Students */}
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">First Name</th>
            <th className="border border-gray-400 p-2">Last Name</th>
            {user?.role === "SCOLARITE" && <th className="border border-gray-400 p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            (user.role === "SCOLARITE" || (user.role === "STUDENT" && student.id === user.id)) && (
              <tr key={student.id} className="border border-gray-400">
                <td className="border border-gray-400 p-2">{student.firstname}</td>
                <td className="border border-gray-400 p-2">{student.lastname}</td>
                {user?.role === "SCOLARITE" && (
                  <td className="border border-gray-400 p-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEditStudent(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            )
          ))}
        </tbody>
      </table>

      {/* Add/Edit Student Form (Only SCOLARITE) */}
      {user?.role === "SCOLARITE" && (
        <form onSubmit={editingStudent ? handleSaveEdit : handleAddStudent} className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-bold mb-2">{editingStudent ? "Edit Student" : "Add Student"}</h3>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={newStudent.firstname}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={newStudent.lastname}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            required
          />
          <button
            type="submit"
            className={`p-2 w-full rounded text-white ${editingStudent ? "bg-blue-500" : "bg-green-500"}`}
          >
            {editingStudent ? "Save Changes" : "Add Student"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Students;
