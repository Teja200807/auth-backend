const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
//deploy trigger
const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username, password) VALUES (?,?)",
    [username, hash],
    err => {
      if (err) return res.json({ msg: "User exists" });
      res.json({ msg: "Registered successfully" });
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username=?",
    [username],
    async (err, result) => {
      if (result.length === 0)
        return res.json({ msg: "Invalid credentials" });

      const ok = await bcrypt.compare(password, result[0].password);
      if (!ok) return res.json({ msg: "Wrong password" });

      res.json({ msg: "Login success" });
    }
  );
});

app.listen(3000, () => console.log("Server running on port 3000"));

