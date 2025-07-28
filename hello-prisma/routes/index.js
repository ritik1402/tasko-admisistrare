import { Router } from "express";
import userRoutes from "../routes/userRoutes.js";
import taskRoutes from "../routes/taskRoutes.js"

const router = Router();

router.use("/api/user", userRoutes);
router.use("/api/task",taskRoutes);


export default router;
