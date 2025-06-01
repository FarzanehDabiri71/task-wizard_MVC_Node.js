import DB from "../models/db.js";
import Task from "../models/Task.js";

export default class PostController {
  static async addTask(req, res) {
    if (req.body.title) {
      const title = req.body.title;
      const completed = req.body.completed === "on" ? true : false;
      try {
        const task = new Task(title, completed);
        task.save();
        res.redirect("/");
      } catch (error) {
        res.status(400).send(`<h1>${error.message}</h1><p>There was an error saving the task.</p>`);
      }
    } else {
      res.status(400).send(`<h1>Invalid Request</h1><p>Title is required.</p>`);
    }
  }
  static async toggleTask(req, res) {
    if (req.body.id) {
      const task = Task.getTaskById(req.body.id);
      if (task) {
        // console.log(task);
        task.completed = !task.completed;
        task.save();
        res.json(true);
      } else {
        res.status(404).json(404);
      }
    } else {
      res.status(400).json(400);
    }
  }
  static async editTask(req, res) {
    if (req.body.id && req.body.title) {
      console.log(req.body);
      const task = Task.getTaskById(req.body.id);
      if (task) {
        try {
          task.title = req.body.title;
          task.save();
          res.json(true);
        } catch (error) {
          res.status(400).json(error.message);
        }
      } else {
        res.status(400).json("Invalid request.");
      }
    } else {
      res.status(400).json("Task not found.");
    }
  }
  static async deleteTask(req, res) {
    if (req.body.id) {
      try {
        if (DB.deleteTask(req.body.id)) {
          res.json(true);
        } else {
          res.status(404).json("Task not found.");
        }
      } catch (error) {
        res.status(500).json("Server error.");
      }
    } else {
      res.status(400).json("Invalid request.");
    }
  }
}
