"use strict";
const {
	collection,
	addDoc,
	getFirestore,
	getDoc,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
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

const getStudent = async (req, res, next) => {
	try {
		const id = req.params.id;
		const docRef = doc(db, "students", id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const student = new Student(
				docSnap.id,
				docSnap.data().firstName,
				docSnap.data().lastName,
				docSnap.data().fatherName,
				docSnap.data().classEnrolled,
				docSnap.data().age,
				docSnap.data().phoneNumber,
				docSnap.data().subject,
				docSnap.data().year,
				docSnap.data().semester,
				docSnap.data().status
			);
			res.status(200).send(student);
		} else {
			res.status(404).send("No student record found");
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
};

const updateStudent = async (req, res, next) => {
	try {
		const id = req.params.id;
		const data = req.body;
		const docRef = doc(db, "students", id);
		await updateDoc(docRef, data);
		res.status(200).send("Student record updated successfully");
	} catch (error) {
		res.status(400).send(error.message);
	}
};

const deleteStudent = async (req, res, next) => {
	try {
		const id = req.params.id;
		const docRef = doc(db, "students", id);
		await deleteDoc(docRef);
		res.status(200).send("Student record deleted successfully");
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports = {
	addStudent,
	getAllStudents,
	getStudent,
	updateStudent,
	deleteStudent,
};
