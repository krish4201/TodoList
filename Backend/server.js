const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/todo")
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

const todoschema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: String,
});

const todoModel = mongoose.model("todo", todoschema);

//add item to list
app.post("/add-todo", async (req, res) => {
  try {
    const { title, description } = req.body;

    const todoList = new todoModel({ title, description });
    await todoList.save();

    res.status(201).json(todoList);
    console.log("Todo Added");
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ message: "Error" });
  }
});

//get item from list
app.get("/get-todo", async (req, res) => {
  try {
    const todolist = await todoModel.find();

    res.json(todolist);
    console.log("Got the Todo Item");
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ message: "Error" });
  }
});

//delete item from the list
app.delete("/delete-todo/:id", async (req, res) => {
  try {
    const deletedItem = await todoModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "deleted" });
    console.log(deletedItem + " deleted");
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ message: "Error" });
  }
});

//update item from the list
app.put("/update-todo/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;

    const updateTodo = await todoModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true },
    );
    res.json(updateTodo);
    console.log("Updated");
  } catch (error) {
    console.log("Error " + error);
    res.status(500).json({ message: "Error" });
  }
});

app.listen(8000, () => {
  console.log("Server is run at " + 8000);
});
