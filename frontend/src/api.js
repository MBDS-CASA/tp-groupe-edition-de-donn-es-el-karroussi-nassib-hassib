const API_URL = "http://localhost:8010/api";

export const fetchStudents = async () => {
    const response = await fetch(`${API_URL}/students`);
    return response.json();
};

export const fetchCourses = async () => {
    const response = await fetch(`${API_URL}/courses`);
    return response.json();
};

export const fetchGrades = async () => {
    const response = await fetch(`${API_URL}/grades`);
    return response.json();
};

export const authenticateUser = async (token) => {
    const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    });
    return response.json();
};
