import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Task from "./models/Task.js"

dotenv.config();
const app = express();

app.use(express.json());

const corsOptions = {
    origin: "https://vercel-frontend-smoky.vercel.app", // Replace with your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  };
  app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

  app.get ("/", async (req,res) => {
    res.send("HUM BACKEND KI TARAF SE HAI")
  })
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(Array.isArray(tasks) ? tasks : []); // Ensure array response
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});


app.post("/tasks", async (req, res) => {
  const { text } = req.body;
  const newTask = new Task({ text });
  await newTask.save();
  res.json(newTask);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
