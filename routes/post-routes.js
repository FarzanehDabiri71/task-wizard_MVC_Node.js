import express from "express";
import DB from "../models/db.js";
import Task from "../models/Task.js";
import PostController from "../controllers/post-controller.js";

const router = express.Router();

router.post("/add-task", PostController.addTask);

router.post("/toggle-task", PostController.toggleTask);

router.post("/edit-task", PostController.editTask);

router.post("/delete-task", PostController.deleteTask);
export default router;
