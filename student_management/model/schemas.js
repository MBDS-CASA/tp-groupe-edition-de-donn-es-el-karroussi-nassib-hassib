let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let StudentSchema = Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

let courseSchema = Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
});

let gradeSchema = Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        validate: {
            validator: async (v) => {
                const student = await mongoose.model('Student').findById(v);
                return !!student;
            },
            message: "L'étudiant spécifié n'existe pas."
        }
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        validate: {
            validator: async (v) => {
                const course = await mongoose.model('Course').findById(v);
                return !!course;
            },
            message: "La matière spécifiée n'existe pas."
        }
    },
    grade: { type: Number, required: true, min: 0, max: 20 },
    date: { type: Date, default: Date.now }
});

gradeSchema.index({ student: 1, course: 1 });
courseSchema.index({ name: 1 });
StudentSchema.index({ lastName: 1, firstName: 1 });

gradeSchema.path('course').validate({
    validator: async function (v) {
        const course = await Course.findById(v);
        return !!course;
    },
    message: "La matière référence une entité inexistante"
});


gradeSchema.path('student').validate({
    validator: async function (v) {
        const student = await Student.findById(v);
        return !!student;
    },
    message: "L'étudiant référence une entité inexistante"
});

courseSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        // Supprime toutes les notes associées à la matière
        await mongoose.model('Grade').deleteMany({ course: doc._id });
        console.log(`Notes supprimées pour la matière ${doc.name}`);
    }
});

StudentSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await mongoose.model('Grade').deleteMany({ student: doc._id });
        console.log(`Toutes les notes associées à l'étudiant ${doc.firstName} ${doc.lastName} ont été supprimées.`);
    }
});


module.exports = {
    Student: mongoose.model('Student', StudentSchema),
    Course: mongoose.model('Course', courseSchema),
    Grade: mongoose.model('Grade', gradeSchema),
};