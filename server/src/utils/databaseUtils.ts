import pool from "../config/dbPool";
import { QueryError } from "mysql2";
import { RowDataPacket } from "mysql2";


function executeQuery
  <T>
  (sql: string, params?: unknown[]): Promise<T[]>{
    return new Promise((resolve, reject) => {
      if (params) {
        pool.query(sql, params, (err: QueryError | null, rows: RowDataPacket[]) => {
          if (err) return reject(err);
          if (rows.length === 0) return reject({ message: "No rows found" });
          resolve(rows as T[]);
        })
      } else {
        pool.query(sql, (err: QueryError | null, rows: RowDataPacket[]) => {
          if (err) return reject(err);
          resolve(rows as T[]);
        })
      }
    })
}

// function executeQuery 
//   (sql: string, params?: string[]): Promise<QueryResult[]>{
//   return new Promise((resolve, reject) => {
//     if (params) {
//       pool.query(sql, params, (err: QueryError | null, rows: QueryResult[]) => {
//         if (err) return reject(err);
//         resolve(rows);
//       })
//     } else {
//       pool.query(sql, (err: QueryError | null, rows: QueryResult[]) => {
//         if (err) return reject(err);
//         resolve(rows);
//       })
//     }
//   })
// }


export default {
  executeQuery
}
