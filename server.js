const express = require("express");
const app = express();
app.use(express.json());
let tasks = [{ id: 1, title: "Learn node.js", completed: false }];
app.get("/", (req, res) => {
  return res.status(200).send("welcome to taskflow Pro!");
});
app.get("/about", (req, res) => {
  return res.status(200).send("taskflow Pro is a task management app");
});
app.post("/tasks", (req, res) => {
  title: req.body.title.trim();
  if (typeof req.body.title !== "string" || !req.body.title.trim()) {
    return res.status(400).json({
      message: "Title is required",
    });
  } else if (
    req.body.completed !== undefined &&
    typeof req.body.completed !== "boolean"
  ) {
    return res.status(400).json({
      message: "completed type should be of type boolean",
    });
  } else {
    const newId = tasks.length + 1;
    const newTask = {
      id: newId,
      title: req.body.title,
      completed: req.body.completed ?? false,
    };
    tasks.push(newTask);
    return res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  }
});
app.put("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  let searchedTask = tasks.find((task) => task.id === taskId);
  if (!searchedTask) {
    return res.status(404).json({ message: "Does not exist" });
  } else if (typeof req.body.completed !== "boolean") {
    return res
      .status(400)
      .json({ message: "completed must be of type boolean" });
  } else {
    searchedTask.completed = req.body.completed;
    return res.status(200).json({
      message: "changed",
      taskid: `changed to ${req.body.completed}`,
      task_content: searchedTask,
    });
  }
});
app.listen(3000, () => {
  console.log("Server is runing on port 3000");
});
