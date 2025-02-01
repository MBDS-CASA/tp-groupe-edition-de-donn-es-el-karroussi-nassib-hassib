import { useEffect, useState } from "react";
import { fetchStudents, fetchCourses, fetchGrades } from "../api";

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            setStudents(await fetchStudents());
            setCourses(await fetchCourses());
            setGrades(await fetchGrades());
        };
        loadData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h2>Students</h2>
                <ul>
                    {students.map((student) => (
                        <li key={student._id}>
                            {student.firstName} {student.lastName}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Courses</h2>
                <ul>
                    {courses.map((course) => (
                        <li key={course._id}>{course.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Grades</h2>
                <ul>
                    {grades.map((grade) => (
                        <li key={grade._id}>
                            {grade.student.firstName} - {grade.course.name}: {grade.grade}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
