const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve frontend files from public folder
app.use(express.static("public"));

// ✅ Database connection (Railway MySQL)
const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("Connected to online SQL database ✅");
    }
});

// ✅ Test route
app.get("/api/test", (req, res) => {
    res.send("Backend API working 🚀");
});

// ✅ Homepage (optional fallback)
app.get("/health", (req, res) => {
    res.send("Server is healthy ✅");
});

// ✅ Railway requires this PORT setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
