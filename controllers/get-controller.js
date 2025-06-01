import { rootPath } from "../app.js";
import Task from "../models/Task.js";

export default class GetController {
  static homeController(req, res) {
    const tasks = Task.getAllTasks();
    res.sendFile(rootPath + "/views/home.html");
  }
}
