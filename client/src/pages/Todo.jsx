import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Todo() {
  const [task, settask] = useState(null);
  const [todo, setTodo] = useState(null);
  const [IsEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const handleAddTask = (e) => {
    e.preventDefault();
    console.log({ task });

    axios
      .post("http://localhost:3001/addtask", { task })
      .then((response) => {
        setTodo(response.data);
        settask("");
        console.log(response.data);
      })
      .catch((error) =>
        console.log(" data is not transefer in server handle add")
      );
  };
  // get method -------------------------------------
  const getdata = async () => {
    axios.get("http://localhost:3001/readtask").then((res) => {
      console.log(res.data);
      setTodo(res.data);
    });
  };


  //protected todo routes

  const fetchuser = async (e) => {
    // e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/auth", {
        headers: {
          Authorization: "Bearer ".concat(token),
        },
      });
      console.log(response.status);
      if (response.status !== 201) navigate("/login");
    } catch (error) {
      navigate("/login");
      console.log("not valid user for get information");
    }
  };
  useEffect(() => {
    fetchuser();
    getdata();
  }, []);


  const handleDeleteTask = (id) => {
    // e.preventDefault();
    console.log(" Hello Delete CLient", { id });
    axios.post("http://localhost:3001/deletetask", { id }).then((res) => {
      setTodo(res.data);
      settask("");
    });
  };


  const [updatedId, setUpdatedId] = useState(null);

  const handleEditTask = (id, task) => {
    setIsEdit(true);
    console.log("inside edit", id);
    settask(task);
    setUpdatedId(id);
    //  console.log("update id ",updatedId)
  };
  const handleupdateTask = async (e) => {
    // e.preventDefault();
    try {
      await axios
        .post("http://localhost:3001/updatetask", { updatedId, task })
        .then((response) => {
          setTodo(response.data);
        });
    } catch (error) {
      console.log("issues  in update");
    }
  };

  return (
    <>
      <center>
        <h1 className="bg-danger py-5 text-white text-uppercase">TOdoApp</h1>
      </center>

      <div className="container-fluid mx-auto p-5 ">
        <form className="d-flex  justify-content-center" role="search">
          <input
            className="form-control me-2 w-50 "
            type="search"
            placeholder="Enter todo task"
            value={task}
            aria-label="Search"
            onChange={(e) => settask(e.target.value)}
          />

          {IsEdit ? (
            <button
              type="submit"
              className="btn bg-primary text-white"
              onClick={handleupdateTask}
            >
              update
            </button>
          ) : (
            <button
              type="submit"
              className="btn bg-primary text-white "
              onClick={handleAddTask}
            >
              Add todo
            </button>
          )}
        </form>
        <h1>{task} </h1>
      </div>

      {todo?.map((t, i) => (
        <div className="d-flex justify-content-center">
          <ul className="list-group w-50 mx-3 p-2 ">
            <li className="list-group-item  bg-success text-white">
              {t.task} {new Date(t.date).toLocaleDateString()}
            </li>
          </ul>
          <button
            className="btn bg-danger text-white my-2"
            type="submit"
            onClick={() => handleDeleteTask(t.id)}
          >
            Delete
          </button>
          <button
            className="btn bg-primary text-white mx-3 my-2"
            type="submit"
            onClick={() => handleEditTask(t.id, t.task)}
          >
            update
          </button>
        </div>
      ))}
    </>
  );
}

export default Todo;
