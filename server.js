const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Railway MySQL connection (ONLINE DATABASE)
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

// connect DB
db.connect(err => {
  if (err) {
    console.log("Database connection failed ❌", err);
  } else {
    console.log("Database connected ✅");
  }
});

// ✅ test route
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// ✅ REGISTER
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
  db.query(sql, [username, hashedPassword, role], (err, result) => {
    if (err) {
      return res.status(500).send("Registration failed");
    }
    res.send("User registered successfully");
  });
});

// ✅ LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], async (err, result) => {
    if (err) return res.status(500).send("Server error");

    if (result.length === 0) {
      return res.status(401).send("User not found");
    }

    const validPassword = await bcrypt.compare(password, result[0].password);

    if (!validPassword) {
      return res.status(401).send("Wrong password");
    }

    res.json({
      message: "Login success",
      role: result[0].role
    });
  });
});

// ✅ IMPORTANT FOR RAILWAY PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
