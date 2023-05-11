import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "",
  port: Number(process.env.DB_PORT) || 3307,
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err) => {
  if (err != null) {
    console.log("Error connecting to database: ", err);
    return;
  }
  console.log(
    `Connected to database ${process.env.DB_NAME?.toUpperCase()} on port ${
      process.env.DB_PORT
    }.`
  );
});

export default pool;
