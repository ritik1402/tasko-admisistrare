import { Router } from "express";
import userRoutes from "../routes/userRoutes.js";
import taskRoutes from "../routes/taskRoutes.js";
import commentRoutes from "../routes/commentRoutes.js";

const router = Router();

router.use("/api/user", userRoutes);
router.use("/api/task",taskRoutes);
router.use("/api/comment",commentRoutes);


export default router;
