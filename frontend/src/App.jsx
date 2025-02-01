import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './common/Header';
import Footer from './common/Footer';
import Login from './auth/Login';
import Register from './auth/Register';
import Students from './components/Students';
import Courses from './components/Courses';
import Grades from './components/Grades';
import AdminDashboard from './Dashboards/Admin';
import EtudiantDashboard from './Dashboards/Etudiant';
import ScolariteDashboard from './Dashboards/Scolarite';
import data from './data.json';
import './styles/global.css';

// Authentication Context
export const AuthContext = createContext(null);

const App = () => {
    const [user, setUser] = useState(null);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        // Load initial data from JSON file
        setStudents(data.map(item => item.student));
        setCourses([...new Set(data.map(item => item.course))]);
        setGrades(data);
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <Router>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/students" element={user ? <Students students={students} /> : <Navigate to="/login" />} />
                        <Route path="/courses" element={user ? <Courses courses={courses} /> : <Navigate to="/login" />} />
                        <Route path="/grades" element={user ? <Grades grades={grades} /> : <Navigate to="/login" />} />
                        <Route path="/dashboard/admin" element={user?.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />} />
                        <Route path="/dashboard/scolarite" element={user?.role === 'SCOLARITE' ? <ScolariteDashboard /> : <Navigate to="/login" />} />
                        <Route path="/dashboard/etudiant" element={user?.role === 'STUDENT' ? <EtudiantDashboard /> : <Navigate to="/login" />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
