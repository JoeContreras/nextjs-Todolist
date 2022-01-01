import { dbConnect } from "utils/mongoose";
import Task from "models/Task";

dbConnect();
export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    case "POST":
      try {
        const newTask = new Task(body);
        const savedTask = await newTask.save();
        return res.status(201).json(savedTask);
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    default:
      res.status(400).json({ msg: "This method is not supported" });
      break;
  }
}
