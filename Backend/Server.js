const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
require('dotenv').config();

const app = express();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(morgan("dev")); // Logs method, path, status, response time, etc.
app.use(cors());
app.use(express.json());

// Registration endpoint
app.post("/api/register", async (req, res) => {
  const { userId, password, firstName, lastName, address, contactInfo } = req.body;

  try {
    // 🔍 Check if user already exists
    const existingUser = await pool.query(
        "SELECT * FROM login WHERE userid = $1 AND firstname = $2 AND lastname = $3 AND contactinfo = $4",
        [userId, firstName, lastName, contactInfo]
    );
  
    if (existingUser.rows.length > 0) {
        return res.status(409).json({ message: "User is already registered" }); // 409 Conflict
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await pool.query(
      "INSERT INTO login (userid, password, firstname, lastname, address, contactinfo) VALUES ($1, $2, $3, $4, $5, $6)",
      [userId, hashedPassword, firstName, lastName, address, contactInfo]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { userId, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM login WHERE userid = $1", [userId]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        res.status(200).json({ message: "Login successful", user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch user details by userId
app.get("/api/users/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query("SELECT * FROM login WHERE userid = $1", [userId]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      delete user.password; // Exclude password from response
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});