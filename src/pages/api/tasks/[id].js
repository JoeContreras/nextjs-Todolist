import { dbConnect } from "utils/mongoose";
import Task from "models/Task";

dbConnect();
export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;
  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);
        if (!task)
          return res.status(404).json({ msg: "This task does not exist" });

        return res.status(200).json(task);
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    case "DELETE":
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask)
          return res.status(404).json({ msg: "This task does not exist" });

        return res.status(204).json();
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    case "PUT":
      try {
        const updatedTask = await Task.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!updatedTask)
          return res.status(404).json({ msg: "Task not found" });

        return res.status(200).json(updatedTask);
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
};
