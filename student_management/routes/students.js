let {Student} = require('../model/schemas');

function getAll(req, res) {
    Student.find().then((students) => {
        res.send(students);
    }).catch((err) => {
        res.send(err);
    });
}


function create(req, res) {
    console.log( req.body);
    let student = new Student();
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;



    student.save()
        .then((student) => {
                res.json({message: `student saved with id ${student.id}!`});
            }
        ).catch((err) => {
        res.send('cant post student ', err);
    });
}

const { Grade } = require("../model/schemas");
const mongoose = require("mongoose");

async function deleteStudent(req, res) {
    const studentId = req.params.id;
    const studentObjectId = new mongoose.Types.ObjectId(studentId);

    try {
        // 🔍 Vérifier si l'étudiant existe
        const student = await Student.findById(studentId);
        if (!student) return res.status(404).send({ message: "Étudiant non trouvé" });

        // 🔍 Récupérer toutes les notes associées à l'étudiant
        const allGrades = await Grade.find();
        const gradesToDelete = allGrades.filter(grade => grade.student.toString() === studentObjectId.toString());
        console.log("🗑️ Notes à supprimer :", gradesToDelete);
        // Update a student
async function updateStudent(req, res) {
    try {
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        { firstName: req.body.firstName, lastName: req.body.lastName },
        { new: true }
      );
      res.send({ message: "Student updated", student });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
  
 

        // 🗑️ Supprimer chaque note une par une
        for (const grade of gradesToDelete) {
            await Grade.findByIdAndDelete(grade._id);
            console.log(`✅ Note supprimée : ${grade._id}`);
        }

        // 🗑️ Supprimer l'étudiant après avoir supprimé ses notes
        await Student.findByIdAndDelete(studentId);
        console.log(`✅ Étudiant supprimé : ${student.firstName} ${student.lastName}`);

        res.send({
            message: `Étudiant "${student.firstName} ${student.lastName}" et ${gradesToDelete.length} notes supprimées avec succès`,
            deletedStudent: student
        });

    } catch (err) {
        res.status(500).send({
            message: "Erreur lors de la suppression",
            error: err.message
        });
    }
}

 // Update module.exports
 module.exports = { getAll, create, deleteStudent, updateStudent };


