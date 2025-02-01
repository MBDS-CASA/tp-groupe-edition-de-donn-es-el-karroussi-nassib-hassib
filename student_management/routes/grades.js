let {Grade, Student, Course} = require('../model/schemas');

function getAll(req, res) {
    Grade.find()
        .populate('student')
        .populate('course')
        .then((grades) => {
            res.send(grades);
        }).catch((err) => {
        res.send(err);
    });
}


function create(req, res) {
    let grade = new Grade();

    grade.student = req.body.student;
    grade.course = req.body.course;
    grade.grade = req.body.grade;
    grade.date = req.body.date;

    grade.save()
        .then((grade) => {
                res.json({message: `grade saved with id ${grade.id}!`});
            }
        ).catch((err) => {
        console.log(err);
        res.status(400).send('cant post grade ', err.message);
    });
}
// Update a grade
async function updateGrade(req, res) {
    try {
      const grade = await Grade.findByIdAndUpdate(
        req.params.id,
        { 
          student: req.body.student,
          course: req.body.course,
          grade: req.body.grade,
          date: req.body.date 
        },
        { new: true }
      );
      res.send({ message: "Grade updated", grade });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
  
const deleteGrade = async (req, res) => {
    try {
        const grade = await Grade.findByIdAndDelete(req.params.id);

        if (!grade) {
            return res.status(404).send({ message: "Note non trouvée" });
        }

        res.send({
            message: `Note ${grade._id} supprimée`,
            deletedGrade: grade
        });

    } catch (err) {
        res.status(500).send({
            message: "Erreur lors de la suppression de la note",
            error: err.message
        });
    }
};

// Ajouter à module.exports
module.exports = { getAll, create, updateGrade,deleteGrade };
