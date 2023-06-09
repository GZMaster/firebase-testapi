const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");
const config = require("./config");

const firebaseApp = initializeApp(config.firebaseConfig);
const db = getDatabase(firebaseApp);

module.exports = firebaseApp;
