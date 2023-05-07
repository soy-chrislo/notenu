import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const dbURI = process.env.DB_URI || '';

const dbConnection = mysql.createConnection(dbURI);

dbConnection.connect((err) => {
  if (err) {
    console.log('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to database!');
});

export default dbConnection;
