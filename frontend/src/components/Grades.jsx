import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Grades = ({ grades, setGrades }) => {
  const { user } = useContext(AuthContext);
  const [newGrade, setNewGrade] = useState({ studentId: "", course: "", grade: "" });

  // Handle Input Changes
  const handleChange = (e) => {
    setNewGrade({ ...newGrade, [e.target.name]: e.target.value });
  };

  // Add a New Grade (Only SCOLARITE)
  const handleAddGrade = (e) => {
    e.preventDefault();
    if (!newGrade.studentId || !newGrade.course || !newGrade.grade) {
      alert("All fields are required!");
      return;
    }

    const updatedGrades = [
      ...grades,
      { unique_id: grades.length + 1, student: { id: newGrade.studentId }, course: newGrade.course, grade: Number(newGrade.grade) }
    ];
    setGrades(updatedGrades);
    alert("Grade added successfully!");
  };

  // Delete a Grade (Only SCOLARITE)
  const handleDelete = (id) => {
    const updatedGrades = grades.filter(grade => grade.unique_id !== id);
    setGrades(updatedGrades);
    alert("Grade deleted successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Grades</h2>

      {/* Show Grades */}
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">Student ID</th>
            <th className="border border-gray-400 p-2">Course</th>
            <th className="border border-gray-400 p-2">Grade</th>
            {user?.role === "SCOLARITE" && <th className="border border-gray-400 p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            (user.role === "SCOLARITE" || (user.role === "STUDENT" && grade.student.id === user.id)) && (
              <tr key={grade.unique_id} className="border border-gray-400">
                <td className="border border-gray-400 p-2">{grade.student.id}</td>
                <td className="border border-gray-400 p-2">{grade.course}</td>
                <td className="border border-gray-400 p-2">{grade.grade}</td>
                {user.role === "SCOLARITE" && (
                  <td className="border border-gray-400 p-2">
                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(grade.unique_id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            )
          ))}
        </tbody>
      </table>

      {/* Add New Grade (Only SCOLARITE) */}
      {user?.role === "SCOLARITE" && (
        <form onSubmit={handleAddGrade} className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-bold mb-2">Add Grade</h3>
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={newGrade.studentId}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            name="course"
            placeholder="Course Name"
            value={newGrade.course}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="number"
            name="grade"
            placeholder="Grade"
            value={newGrade.grade}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            required
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
            Add Grade
          </button>
        </form>
      )}
    </div>
  );
};

export default Grades;
