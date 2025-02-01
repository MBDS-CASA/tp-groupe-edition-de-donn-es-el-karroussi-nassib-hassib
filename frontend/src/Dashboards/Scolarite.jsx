import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ScolariteDashboard = ({ students, courses, grades }) => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "SCOLARITE") {
    return <p className="text-red-500 text-center mt-6">Access Denied</p>;
  }

  // Count data
  const totalStudents = students.length;
  const totalCourses = courses.length;
  const totalGrades = grades.length;

  // Grade statistics: highest, lowest, average
  const allGrades = grades.map(g => g.grade);
  const avgGrade = allGrades.length ? (allGrades.reduce((sum, g) => sum + g, 0) / allGrades.length).toFixed(2) : "N/A";
  const highestGrade = allGrades.length ? Math.max(...allGrades) : "N/A";
  const lowestGrade = allGrades.length ? Math.min(...allGrades) : "N/A";

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Scolarité Dashboard</h2>

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

      {/* Grade Statistics */}
      <h3 className="text-xl font-bold mt-6 mb-4">Grade Statistics</h3>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">Statistic</th>
            <th className="border border-gray-400 p-2">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border border-gray-400">
            <td className="border border-gray-400 p-2">Average Grade</td>
            <td className="border border-gray-400 p-2">{avgGrade}</td>
          </tr>
          <tr className="border border-gray-400">
            <td className="border border-gray-400 p-2">Highest Grade</td>
            <td className="border border-gray-400 p-2">{highestGrade}</td>
          </tr>
          <tr className="border border-gray-400">
            <td className="border border-gray-400 p-2">Lowest Grade</td>
            <td className="border border-gray-400 p-2">{lowestGrade}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScolariteDashboard;
