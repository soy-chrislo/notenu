import pool from "../config/dbPool";
import { type QueryError , type RowDataPacket } from "mysql2";

async function executeQuery<T>(sql: string, params?: unknown[]): Promise<T[]> {
  return await new Promise((resolve, reject) => {
    if (params != null) {
      pool.query(
        sql,
        params,
        (err: QueryError | null, rows: RowDataPacket[]) => {
          if (err != null) { reject(err); return; }
          if (rows.length === 0) { reject({ message: "No rows found" }); return; }
          resolve(rows as T[]);
        }
      );
    } else {
      pool.query(sql, (err: QueryError | null, rows: RowDataPacket[]) => {
        if (err != null) { reject(err); return; }
        resolve(rows as T[]);
      });
    }
  });
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
  executeQuery,
};
