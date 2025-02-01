import React, { useState } from "react";

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [courseName, setCourseName] = useState("");

    const addCourse = () => {
        if (courseName.trim()) {
            setCourses([...courses, courseName]);
            setCourseName("");
        }
    };

    return (
        <div className="container">
            <h1>Course Management</h1>
            <input
                type="text"
                placeholder="Enter course name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
            />
            <button onClick={addCourse}>Add Course</button>
            <ul>
                {courses.map((course, index) => (
                    <li key={index}>{course}</li>
                ))}
            </ul>
        </div>
    );
};

export default CourseManagement;
