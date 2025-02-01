let { Course,Grade } = require('../model/schemas');
const mongoose = require("mongoose");



function getAll(req, res) {
    Course.find().then((classes) => {
        res.send(classes);
    }).catch((err) => {
        res.send(err);
    });
}

function create(req, res) {
    let course = new Course();
    course.name = req.body.name;
    course.code = req.body.code;

    course.save()
        .then((course) => {
            res.json({ message: `course saved with id ${course.id}!` });
        })
        .catch((err) => {
            res.send('cant post course ', err);
        });
}

function updateCourse(req, res) {
    const courseId = req.params.id;
    const updateData = req.body;

    Course.findByIdAndUpdate(courseId, updateData, { new: true })
        .then((course) => {
            if (!course) {
                return res.status(404).send({ message: "Course not found" });
            }
            res.send({ message: "Course updated successfully", course });
        })
        .catch((err) => {
            res.status(500).send({ message: "Error updating course", error: err });
        });
}

// courses.js
async function deleteCourse(req, res) {
    const courseId = req.params.id;
    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    try {
        // 🔍 Récupérer toutes les notes
        const allGrades = await Grade.find();
        console.log("📌 Toutes les notes :", allGrades);

        // 🔍 Filtrer les notes liées au cours
        const gradesToDelete = allGrades.filter(grade => grade.course.toString() === courseObjectId.toString());
        console.log("🗑️ Notes à supprimer :", gradesToDelete);

        // 🗑️ Supprimer chaque note une par une
        for (const grade of gradesToDelete) {
            await Grade.findByIdAndDelete(grade._id);
            console.log(`✅ Note supprimée : ${grade._id}`);
        }

        // 🗑️ Supprimer le cours après les notes
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        console.log(`✅ Cours supprimé : ${deletedCourse.name}`);

        res.send({
            message: `Matière "${deletedCourse.name}" et ${gradesToDelete.length} notes supprimées avec succès`,
            deletedCourse
        });

    } catch (err) {
        res.status(500).send({
            message: "Erreur lors de la suppression",
            error: err.message
        });
    }

}



module.exports = { getAll, create, updateCourse, deleteCourse };