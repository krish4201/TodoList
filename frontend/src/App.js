import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [updateTab, setUpdateTab] = useState(false);
  const [UpdateTitle, setUpdateTitle] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateId, setUpdateId] = useState();

  async function fetchData() {
    const todoData = await fetch("http://localhost:8000/get-todo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await todoData.json();
    setData(result);
    console.log(result);
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(id) {
    await fetch("http://localhost:8000/delete-todo/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchData();
  }

  function handleUpdate(id) {
    setUpdateTab(true);
    setUpdateId(id);
  }

  async function handleUpdatebtn() {
    await fetch("http://localhost:8000/update-todo/" + updateId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: UpdateTitle,
        description: updateDescription,
      }),
    });
    setUpdateTitle("");
    setUpdateDescription("");
    setUpdateId();
    setUpdateTab(false);
    fetchData();
  }

  return (
    <>
      <h1>TodoList</h1>
      {data.map(({ _id, title, description }) => {
        return (
          <div key={_id}>
            <h3>{title}</h3>
            <h5>{description}</h5>
            <button
              onClick={() => {
                handleUpdate(_id);
              }}
            >
              Update
            </button>
            <button
              onClick={() => {
                handleDelete(_id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}

      {updateTab && (
        <div className="updateTabContainer">
          <div className="updateTab">
            <input
              placeholder="Title"
              onChange={(e) => {
                setUpdateTitle(e.target.value);
              }}
            />
            <input
              placeholder="Description"
              onChange={(e) => {
                setUpdateDescription(e.target.value);
              }}
            />
            <button onClick={handleUpdatebtn}>Update</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
