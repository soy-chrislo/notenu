import { type Request, type Response } from "express";
import { databaseUtils } from "../utils";

const { executeQuery } = databaseUtils;

export const getTables = async (req: Request, res: Response): Promise<void> => {
  try {
    const rows = await executeQuery("SHOW TABLES");
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getTable = async (req: Request, res: Response): Promise<void> => {
  const tableName = req.params.name;
  try {
    const rows = await executeQuery(`SELECT * FROM ${tableName}`);
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

interface RolesUser {
  id: number;
  userId: number;
  rolId: number;
}

interface PermissionsUser {
  id: number;
  userId: number;
  permissionId: number;
}

interface RolesResult {
  userId: number | null;
  roles_id: number[];
}

interface PermissionsResult {
  userId: number | null;
  permissions_id: number[];
}

interface RolesAccumulator extends RolesResult {}

interface PermissionsAccumulator extends PermissionsResult {}

export const getRolesByUserId = async (req: Request, res: Response): Promise<void> => {
  // TODO: Ya obtenemos el id del usuario y del rol, basta obtener el nombre de usuario y rol. CHECK
  const table = "roles_users";
  const sql = `SELECT * FROM ${table} WHERE userId = ?`;
  const userId = req.params.id;
  try {
    const rows = await executeQuery<RolesUser>(sql, [userId]);
    // res.json(rows);
    // console.log(rows)
    if (rows.length > 0) {
      const result: RolesResult = rows.reduce(
        (acc: RolesAccumulator, { userId, rolId }) => {
          acc.userId = userId;
          if (!acc.roles_id.includes(rolId)) {
            acc.roles_id.push(rolId);
          }
          return acc;
        },
        { userId: null, roles_id: [] }
      );
      res.json(result);
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getPermissionsByUserId = async (req: Request, res: Response): Promise<void> => {
  const table = "permissions_users";
  const sql = `SELECT * FROM ${table} WHERE userId = ?`;
  const userId = req.params.id;
  try {
    const rows = await executeQuery<PermissionsUser>(sql, [userId]);
    // res.json(rows);
    // console.log(rows)
    if (rows.length > 0) {
      const result: PermissionsResult = rows.reduce(
        (acc: PermissionsAccumulator, { userId, permissionId }) => {
          acc.userId = userId;
          if (!acc.permissions_id.includes(permissionId)) {
            acc.permissions_id.push(permissionId);
          }
          return acc;
        },
        { userId: null, permissions_id: [] }
      );
      res.json(result);
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
