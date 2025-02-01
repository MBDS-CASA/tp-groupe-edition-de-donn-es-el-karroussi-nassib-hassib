const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Student, Course, Grade } = require('./model/schemas');
const json2csv = require('json2csv').parse;

// Middleware
app.use(bodyParser.json());

// Security Middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token !== 'admin-token') {
        return res.status(403).json({ message: 'Access Denied' });
    }
    next();
};

// Statistics API
app.get('/api/stats', async (req, res) => {
    try {
        const studentCount = await Grade.distinct("student.id").then(students => students.length);
        const courseCount = await Grade.distinct("course").then(courses => courses.length);
        const avgGrades = await Grade.aggregate([
            { $group: { _id: "$course", avgGrade: { $avg: "$grade" } } }
        ]);
        
        res.json({ studentCount, courseCount, avgGrades });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ranking API
app.get('/api/rankings', async (req, res) => {
    try {
        const studentRankings = await Grade.aggregate([
            { $group: { _id: "$student.id", avgGrade: { $avg: "$grade" }, student: { $first: "$student" } } },
            { $sort: { avgGrade: -1 } }
        ]);
        res.json(studentRankings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CSV Export API
app.get('/api/export/csv', async (req, res) => {
    try {
        const grades = await Grade.find();
        const gradeCSV = json2csv(grades.map(g => ({
            unique_id: g.unique_id,
            course: g.course,
            student_firstname: g.student.firstname,
            student_lastname: g.student.lastname,
            student_id: g.student.id,
            date: g.date,
            grade: g.grade
        })));
        
        res.attachment('grades.csv');
        res.send(gradeCSV);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Secure editing
app.put('/api/students/:id', authMiddleware, async (req, res) => {
    try {
        const updatedData = {
            "student.firstname": req.body.firstname,
            "student.lastname": req.body.lastname,
            "student.id": req.body.id
        };
        const student = await Grade.findOneAndUpdate({ "student.id": req.params.id }, updatedData, { new: true });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(8010, () => console.log('Server running on port 8010'));
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;