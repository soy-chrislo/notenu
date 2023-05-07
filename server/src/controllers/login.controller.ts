import { Request, Response } from 'express'
import { QueryError, RowDataPacket } from 'mysql2'
import pool from '../config/dbPool';

interface QueryResult extends RowDataPacket{
  // [key: string]: any;
}

function query(sql: string): Promise<QueryResult[]>{
  return new Promise((resolve, reject) => {
    pool.query(sql, (err: QueryError | null, rows: QueryResult[]) => {
      if (err) return reject(err);
      resolve(rows);
    })
  })
}

// function login (req: Request, res: Response){
//   pool.query('SELECT NOW()', (err: QueryError | null, rows: QueryResult) => {
//     if (err) throw err;
//     const data = rows[0]["NOW()"];
//     res.json({
//       message: 'Login!',
//       data
//     })
//   })
// }

async function login (req: Request, res: Response){
  try {
    const rows = await query('SELECT NOW()');
    const data = rows[0]["NOW()"];
    res.json({
      message: 'Login!',
      data
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
}

export default {
  login
}