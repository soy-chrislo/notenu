import { Request, Response } from 'express'
import { databaseUtils } from '../utils';

const { executeQuery } = databaseUtils;


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

// async function login (req: Request, res: Response){
//   try {
//     const rows = await query('SELECT NOW()');
//     const data = rows[0]["NOW()"];
//     res.json({
//       message: 'Login!',
//       data
//     })
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: 'Internal server error'
//     });
//   }
// }

interface User {
  id: number;
  username: string;
  roles?: string[];
  permissions?: string[];  
}

async function login (req: Request, res: Response){
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required'
    })
  };
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";  
  const params = [username, password];
  try {
    const rows = await executeQuery<User>(query, params);
    if (rows.length === 0) {
      return res.status(401).json({
        message: 'Credentials are not valid'
      });
    }
    const user = rows[0];
    res.status(200).json({
      message: 'Login success',
      user: {
        id: user.id,
        username: user.username,
        // TODO: Agregar permissions y roles a la base de datos con relaciones.
        // El frontend los espera.
        roles: user.roles,
        permissions: user.permissions
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'login error'
    });
  }

}

export default {
  login
}