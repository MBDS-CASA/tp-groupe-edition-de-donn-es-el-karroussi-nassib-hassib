import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const StudentDashboard = ({ grades }) => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "STUDENT") {
    return <p className="text-red-500 text-center mt-6">Access Denied</p>;
  }

  // Filter grades to show only the logged-in student's grades
  const studentGrades = grades.filter(grade => grade.student.id === user.id);

  if (studentGrades.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No grades found for you.</p>;
  }

  // Calculate statistics
  const allGrades = studentGrades.map(g => g.grade);
  const avgGrade = allGrades.length ? (allGrades.reduce((sum, g) => sum + g, 0) / allGrades.length).toFixed(2) : "N/A";
  const highestGrade = allGrades.length ? Math.max(...allGrades) : "N/A";
  const lowestGrade = allGrades.length ? Math.min(...allGrades) : "N/A";

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">My Dashboard</h2>

      {/* Grade Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded text-center">
          <h3 className="text-xl font-bold">Average Grade</h3>
          <p className="text-2xl">{avgGrade}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded text-center">
          <h3 className="text-xl font-bold">Highest Grade</h3>
          <p className="text-2xl">{highestGrade}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded text-center">
          <h3 className="text-xl font-bold">Lowest Grade</h3>
          <p className="text-2xl">{lowestGrade}</p>
        </div>
      </div>

      {/* Student Grades Table */}
      <h3 className="text-xl font-bold mt-6 mb-4">My Grades</h3>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">Course</th>
            <th className="border border-gray-400 p-2">Grade</th>
            <th className="border border-gray-400 p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {studentGrades.map(grade => (
            <tr key={grade.unique_id} className="border border-gray-400">
              <td className="border border-gray-400 p-2">{grade.course}</td>
              <td className="border border-gray-400 p-2">{grade.grade}</td>
              <td className="border border-gray-400 p-2">{grade.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
