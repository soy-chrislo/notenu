import { Request, Response } from "express";
import { databaseUtils } from "../utils";

const { executeQuery } = databaseUtils;

export const getTables = async (req: Request, res: Response) => {
  try {
    const rows = await executeQuery("SHOW TABLES");
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export const getTable = async (req: Request, res: Response) => {
  const tableName = req.params.name;
  try {
    const rows = await executeQuery(`SELECT * FROM ${tableName}`);
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

interface RolesUser {
  id: number;
  user_id: number;
  rol_id: number;
}

interface PermissionsUser {
  id: number;
  user_id: number;
  permission_id: number;
}

interface RolesResult {
  user_id: number | null;
  roles_id: number[];
}

interface PermissionsResult {
  user_id: number | null;
  permissions_id: number[];
}

interface RolesAccumulator extends RolesResult{
}

interface PermissionsAccumulator extends PermissionsResult {
}

export const getRolesByUserId = async (req: Request, res: Response) => {
  // TODO: Ya obtenemos el id del usuario y del rol, basta obtener el nombre de usuario y rol. CHECK
  const table = "roles_users"
  const sql = `SELECT * FROM ${table} WHERE user_id = ?`;
  const userId = req.params.id;
  try {
    const rows = await executeQuery<RolesUser>(sql, [userId]);
    // res.json(rows);
    // console.log(rows)
    if (rows.length > 0) {
      const result: RolesResult = rows.reduce((acc: RolesAccumulator, { user_id, rol_id }) => {
        acc.user_id = user_id;
        if (acc.roles_id.indexOf(rol_id) === -1) {
          acc.roles_id.push(rol_id);
        }
        return acc;
      }, { user_id: null, roles_id: [] });
      res.json(result);
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export const getPermissionsByUserId = async (req: Request, res: Response) => {
  const table = "permissions_users"
  const sql = `SELECT * FROM ${table} WHERE user_id = ?`;
  const userId = req.params.id;
  try {
    const rows = await executeQuery<PermissionsUser>(sql, [userId]);
    // res.json(rows);
    // console.log(rows)
    if (rows.length > 0) {
      const result: PermissionsResult = rows.reduce((acc: PermissionsAccumulator, { user_id, permission_id }) => {
        acc.user_id = user_id;
        if (acc.permissions_id.indexOf(permission_id) === -1) {
          acc.permissions_id.push(permission_id);
        }
        return acc;
      }, { user_id: null, permissions_id: [] });
      res.json(result);
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }

}