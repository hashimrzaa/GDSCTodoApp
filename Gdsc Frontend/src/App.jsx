import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
const Loader = () => {
  return (
    <div role="status" style={{ display: "flex", justifyContent: "center" }}>
      <svg
        aria-hidden="true"
        className="w-7 h-7 text-white-200 animate-spin  fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
const App = () => {
  const [data, setdata] = useState([]);
  const [loader, setloader] = useState(false);
  const [loader1, setloader1] = useState(false);
  const [loader2, setloader2] = useState(false);
  const [idt, setidt] = useState(null);
  const [idedit, setidedit] = useState(null);

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
    setloader(true);
    if (!text.current?.value) {
      setloader(false);
      await Swal.fire({
        title: "no text are found",
        text: "please enter a text",
      });
      return;
    }
    try {
      setloader(true);
      await axios
        .post("https://gdsc-todo-app.vercel.app/todos", {
          text: text.current.value,
        })
        .then((data) => {
          setfetch(true);
          text.current.value = "";
          setloader(false);
        });
    } catch (error) {
      setloader(false);
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  }

  async function deleteData(id) {
    setidt(id);
    setloader1(true);
    await axios
      .delete(`https://gdsc-todo-app.vercel.app/todos/${id}`)
      .then(async () => {
        setfetch(true);
        setloader1(false);
        await Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
        });
        setidt(null);
      })
      .catch(async (error) => {
        setidt(null);
        setloader1(false);
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  }

  async function editData(id, text) {
    setidedit(id);
    setloader2(true);
    const editText = prompt("edit this todo", text);
    await axios
      .put(`https://gdsc-todo-app.vercel.app/todos/${id}`, {
        text: editText,
      })
      .then((res) => {
        setfetch(true);
        setloader2(false);
        setidedit(null);
      })
      .catch(async (e) => {
        setidedit(null);
        setloader2(false);
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e.message,
        });
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
              {loader ? <Loader /> : " Add"}
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
                    {item?.id == idt ? (
                      loader1 ? (
                        <Loader />
                      ) : (
                        "Delete"
                      )
                    ) : (
                      "Delete"
                    )}
                  </button>
                  <button
                    className="text-white bg-[#1976d2] p-[5px] px-[15px] rounded"
                    onClick={() => editData(item?.id, item?.text)}
                  >
                    {idedit == item?.id ? (
                      loader2 ? (
                        <Loader />
                      ) : (
                        "Edit"
                      )
                    ) : (
                      "Edit"
                    )}
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
