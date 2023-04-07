const express = require("express");
const {
	addStudent,
	getAllStudents,
	getStudent,
	updateStudent,
	deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();

router.post("/student", addStudent);
router.get("/students", getAllStudents);
router
	.get("/student/:id", getStudent)
	.put("/student/:id", updateStudent)
	.delete("/student/:id", deleteStudent);

module.exports = router;
