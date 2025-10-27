import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pool from './db.js';
import bcrypt from 'bcrypt';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// ---- USERS ----

// Create new user
app.post('/api/users', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [username, email, passwordHash]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body; // login by email
  try {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // Login successful
    res.json({ id: user.id, username: user.username, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
app.get("/api/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query("SELECT id, username, email FROM users WHERE id = $1", [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      orders: [],
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ---- COMMISSIONS ----

// Create new commission
app.post("/api/commissions", async (req, res) => {
  try {
    const { userId, name, email, details } = req.body;

    if (!name || !email || !details) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await pool.query(
      "INSERT INTO commissions (user_id, name, email, details) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId || null, name, email, details]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting commission:", err);
    res.status(500).json({ error: "Failed to submit commission" });
  }
});

// Get all commissions (for admin)
app.get('/api/commissions', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT c.*, u.username FROM commissions c JOIN users u ON c.user_id = u.id ORDER BY c.id DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- MESSAGES ----

// Send message
app.post('/api/messages', async (req, res) => {
  const { user_id, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO messages (user_id, message) VALUES ($1, $2) RETURNING *',
      [user_id, message]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get messages for admin
app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT m.*, u.username FROM messages m JOIN users u ON m.user_id = u.id ORDER BY m.id DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));