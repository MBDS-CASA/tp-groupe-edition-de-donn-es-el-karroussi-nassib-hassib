import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = ({ students, courses, grades }) => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "ADMIN") {
    return <p className="text-red-500 text-center mt-6">Access Denied</p>;
  }

  // Calculate total counts
  const totalStudents = students.length;
  const totalCourses = courses.length;
  const totalGrades = grades.length;

  // Calculate average grade per course
  const courseStats = courses.map(course => {
    const courseGrades = grades.filter(grade => grade.course === course.name);
    const avgGrade = courseGrades.length
      ? (courseGrades.reduce((sum, g) => sum + g.grade, 0) / courseGrades.length).toFixed(2)
      : "N/A";
    
    return { course: course.name, avgGrade };
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded text-center">
          <h3 className="text-xl font-bold">Total Students</h3>
          <p className="text-2xl">{totalStudents}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded text-center">
          <h3 className="text-xl font-bold">Total Courses</h3>
          <p className="text-2xl">{totalCourses}</p>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded text-center">
          <h3 className="text-xl font-bold">Total Grades</h3>
          <p className="text-2xl">{totalGrades}</p>
        </div>
      </div>

      {/* Course Statistics */}
      <h3 className="text-xl font-bold mt-6 mb-4">Course Averages</h3>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">Course</th>
            <th className="border border-gray-400 p-2">Average Grade</th>
          </tr>
        </thead>
        <tbody>
          {courseStats.map(({ course, avgGrade }) => (
            <tr key={course} className="border border-gray-400">
              <td className="border border-gray-400 p-2">{course}</td>
              <td className="border border-gray-400 p-2">{avgGrade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
