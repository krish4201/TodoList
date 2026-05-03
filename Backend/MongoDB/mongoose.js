const mongoose = require("mongoose");

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

module.exports = todoModel;
