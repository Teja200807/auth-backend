const mysql = require("mysql2");

const DATABASE_URL = "mysql://root:CPafSjcVeqnXjSSOSkIbXNWbgMRdYdgA@centerbeam.proxy.rlwy.net:24901/railway";

const db = mysql.createConnection(DATABASE_URL);

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to ONLINE MySQL database");
});

module.exports = db;
