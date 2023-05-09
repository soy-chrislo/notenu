import { Router } from "express";
import { getTables, getTable, getRolesByUserId, getPermissionsByUserId } from "../controllers/db.controller";

const router = Router();

router.get("/", getTables);

router.get("/:name", getTable);

router.get('/roles/:id', getRolesByUserId);

router.get('/permissions/:id', getPermissionsByUserId);


export default router;