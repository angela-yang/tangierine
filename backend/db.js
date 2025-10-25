import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Iam1000%awesome",
  port: 5432, 
});

pool.connect()
  .then(() => console.log("Connected to database!"))
  .catch(err => console.error("Database connection error:", err));

export default pool;