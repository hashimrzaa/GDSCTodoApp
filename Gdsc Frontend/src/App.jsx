import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const App = () => {
  const [data, setdata] = useState([]);
  const text = useRef();
  const [fetch, setfetch] = useState(false);
  useEffect(() => {
    async function getData() {
      await axios("https://gdsc-todo-app.vercel.app/todoS").then((data) => {
        setdata(data?.data);
      });
    }
    getData();
    setfetch(false);
  }, [fetch]);

  async function addData(e) {
    e.preventDefault();
    if (!text.current?.value) {
      await Swal.fire({
        title: "no text are found",
        text: "please enter a text",
      });
      return;
    }
    try {
      await axios
        .post("https://gdsc-todo-app.vercel.app/todos", {
          text: text.current.value,
        })
        .then((data) => {
          setfetch(true);
          text.current.value = "";
        });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  }

  async function deleteData(id) {
    await axios.delete(`https://gdsc-todo-app.vercel.app/todos/${id}`).then(() => {
      setfetch(true);
    });
  }

  async function editData(id, text) {
    const editText = prompt("edit this todo", text);
    await axios
      .put(`https://gdsc-todo-app.vercel.app/todos/${id}`, {
        text: editText,
      })
      .then((res) => {
        setfetch(true);
      });
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[20px] p-[20px] pt-[0] w-[90%] m-[auto]">
        <div className="bg-white w-[100%] sticky top-0">
          <div className="text-[5rem]  bg-white w-[100%] text-center ">
            Todos
          </div>
          <form
            className="flex  gap-[10px] flex-wrap w-[100%] bg-white pb-3"
            onSubmit={addData}
          >
            <input
              ref={text}
              type="text"
              className="border-[2px] items-center border-[#1976d2] w-[100%] p-[10px] rounded"
            />
            <button
              type="submit"
              className=" text-white bg-[#1976d2] p-[10px] w-[100%] rounded  "
            >
              Add
            </button>
          </form>
        </div>
        <ul className="flex items-center flex-col gap-[25px] w-[100%] ">
          {data.map((item, index) => {
            return (
              <li
                key={index}
                className="gap-[20px] border-[2px] border-[#1976d2] w-[100%] p-[10px] rounded flex justify-between items-center flex-wrap overflow-auto "
              >
                <span>{item?.text}</span>{" "}
                <span className="flex justify-center items-center gap-5 flex-wrap">
                  <button
                    className="text-white bg-[#1976d2] p-[5px] px-[15px] rounded"
                    onClick={() => deleteData(item?.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-white bg-[#1976d2] p-[5px] px-[15px] rounded"
                    onClick={() => editData(item?.id, item?.text)}
                  >
                    Edit
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default App;
