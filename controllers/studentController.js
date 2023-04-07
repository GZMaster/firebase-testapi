"use strict";
const {
	collection,
	addDoc,
	getFirestore,
	Firestore,
	getDocs,
} = require("firebase/firestore");
const firebaseApp = require("../db");
const Student = require("../models/student");

const db = getFirestore(firebaseApp);

const addStudent = async (req, res, next) => {
	try {
		const data = req.body;
		const docRef = await addDoc(collection(db, "students"), data);
		res.send("Document written with ID: " + docRef.id);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

const getAllStudents = async (req, res, next) => {
	try {
		const querySnapshot = await getDocs(collection(db, "students"));
		const studentsArray = [];
		if (querySnapshot.empty) {
			res.status(404).send("No student record found");
		} else {
			querySnapshot.forEach((doc) => {
				const student = new Student(
					doc.id,
					doc.data().firstName,
					doc.data().lastName,
					doc.data().fatherName,
					doc.data().classEnrolled,
					doc.data().age,
					doc.data().phoneNumber,
					doc.data().subject,
					doc.data().year,
					doc.data().semester,
					doc.data().status
				);
				studentsArray.push(student);
			});
			res.status(200).send(studentsArray);
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports = {
	addStudent,
	getAllStudents,
};
