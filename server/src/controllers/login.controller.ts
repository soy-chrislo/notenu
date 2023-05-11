import { type Request, type Response } from "express";
import { databaseUtils } from "../utils";
import jwtUtils from "../utils/jwtUtils";

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

async function login(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  const { username, password } = req.body;
  if (username === "" || password === "" || username === undefined || password === undefined) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  const params = [username, password];
  try {
    const rows = await executeQuery<User>(query, params);
    if (rows.length === 0) {
      return res.status(400).json({
        message: "Credentials are not valid",
      });
    }
    const user = rows[0];
    const payload = {
      id: user.id,
      username: user.username,
      roles: user.roles,
      permissions: user.permissions,
    }
    const token = jwtUtils.encryptToken(payload);
    res.status(200).json({
      status: 200,
      message: "Login success",
      user: payload,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "login error",
    });
  }
  return res;
}

async function verifyToken(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
  if (req.headers.authorization === undefined) {
    return res.status(401).json({
      message: "Token is required",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token === undefined || token === "") {
    return res.status(401).json({
      message: "Token is required",
    });
  }
  try {
    const payload = jwtUtils.decryptToken(token);
    res.status(200).json({
      status: 200,
      message: "Token is valid",
      payload,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "Token is invalid",
    });
  }
  return res;
}

export default {
  login,
  verifyToken,
};
