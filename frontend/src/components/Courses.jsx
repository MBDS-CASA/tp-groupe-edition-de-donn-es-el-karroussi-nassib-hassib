import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Courses = ({ courses, setCourses }) => {
  const { user } = useContext(AuthContext);
  const [newCourse, setNewCourse] = useState({ name: "", code: "" });
  const [editingCourse, setEditingCourse] = useState(null);

  // Handle Input Changes
  const handleChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  // Add a New Course (Only SCOLARITE)
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.name || !newCourse.code) {
      alert("All fields are required!");
      return;
    }

    const updatedCourses = [
      ...courses,
      { id: courses.length + 1, name: newCourse.name, code: newCourse.code },
    ];
    setCourses(updatedCourses);
    setNewCourse({ name: "", code: "" });
    alert("Course added successfully!");
  };

  // Edit a Course
  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setNewCourse({ name: course.name, code: course.code });
  };

  // Save Edited Course
  const handleSaveEdit = () => {
    setCourses(courses.map(course => (course.id === editingCourse.id ? newCourse : course)));
    setEditingCourse(null);
    setNewCourse({ name: "", code: "" });
    alert("Course updated successfully!");
  };

  // Delete a Course (Only SCOLARITE)
  const handleDelete = (id) => {
    const updatedCourses = courses.filter(course => course.id !== id);
    setCourses(updatedCourses);
    alert("Course deleted successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>

      {/* Show Courses */}
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">Course Name</th>
            <th className="border border-gray-400 p-2">Course Code</th>
            {user?.role === "SCOLARITE" && <th className="border border-gray-400 p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border border-gray-400">
              <td className="border border-gray-400 p-2">{course.name}</td>
              <td className="border border-gray-400 p-2">{course.code}</td>
              {user?.role === "SCOLARITE" && (
                <td className="border border-gray-400 p-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleEditCourse(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Course Form (Only SCOLARITE) */}
      {user?.role === "SCOLARITE" && (
        <form onSubmit={editingCourse ? handleSaveEdit : handleAddCourse} className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-bold mb-2">{editingCourse ? "Edit Course" : "Add Course"}</h3>
          <input
            type="text"
            name="name"
            placeholder="Course Name"
            value={newCourse.name}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            name="code"
            placeholder="Course Code"
            value={newCourse.code}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            required
          />
          <button
            type="submit"
            className={`p-2 w-full rounded text-white ${editingCourse ? "bg-blue-500" : "bg-green-500"}`}
          >
            {editingCourse ? "Save Changes" : "Add Course"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Courses;
