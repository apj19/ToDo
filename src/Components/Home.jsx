import React, { useState } from "react";
import { button, Input } from "@material-tailwind/react";

import { Alert } from "@material-tailwind/react";
import { Tooltip, Button } from "@material-tailwind/react";
import "animate.css";

function Home() {
  const [task, setTask] = useState("");

  const [tasklist, setTasklist] = useState({ show: true, list: [] });
  const [completedtask, setcompletedTask] = useState({ show: false, list: [] });

  const [btn, setBtn] = useState("Submit");

  const [editMode, setEditMode] = useState(false);
  const [tasknumber, setTaskNumber] = useState(0);
  const [showalert, setshowalert] = useState({
    show: false,
    type: "",
    message: "",
  });

  function taskChanged(event) {
    // console.log(event.target.value);
    setTask(event.target.value);
  }

  function addToTaskList(event) {
    // console.log(tasklist);
    // console.log(event);
    // console.log(editMode);
    // setshowalert(true);

    setTask("");
    if (task == "") {
      setshowalert({
        show: true,
        type: "text-red-500",
        message: "Please Enter value",
      });
      setTimeout(() => {
        setshowalert(false);
      }, 500);
    } else {
      setshowalert({ show: true, type: "text-white", message: "Task Added" });
      setTimeout(() => {
        setshowalert(false);
      }, 500);
      if (editMode) {
        tasklist.list[tasknumber] = task;
        setEditMode(false);
        setBtn("Submit");
      } else {
        // setTasklist([...tasklist,task]);
        setTasklist({ show: true, list: [...tasklist.list, task] });
        setcompletedTask({ show: false, list: [...completedtask.list] });

        // tasklist.push(task);
      }
    }
  }

  function editTask(index) {
    // console.log(index);
    setBtn("Edit");
    setTask(tasklist.list[index]);
    setEditMode(true);

    setTaskNumber(index);
  }
  function deleteTask(index) {
    setshowalert({
      show: true,
      type: "text-blue-500",
      message: "Task Completed",
    });
    setTimeout(() => {
      setshowalert(false);
    }, 500);
    setcompletedTask({
      show: false,
      list: [...completedtask.list, tasklist.list[index]],
    });
    tasklist.list.splice(index, 1);
    setTasklist({ show: true, list: [...tasklist.list] });
  }
  function pendigTasks() {
    setTasklist({ show: true, list: [...tasklist.list] });
    setcompletedTask({ show: false, list: [...completedtask.list] });
  }
  function completedTasks1() {
    setTasklist({ show: false, list: [...tasklist.list] });
    setcompletedTask({ show: true, list: [...completedtask.list] });
  }
  function deleteTaskPermanentely(index) {
    // console.log(index);
    setshowalert({ show: true, type: "text-red-500", message: "Task Deleted" });
    setTimeout(() => {
      setshowalert(false);
    }, 500);
    //  setcompletedTask({show:false,list:[...completedtask.list,tasklist.list[index]]});
    completedtask.list.splice(index, 1);
    setcompletedTask({ show: true, list: [...completedtask.list] });
    // setTasklist({show:true,list:[...tasklist.list]})
  }
  function restoretask(index) {
    setshowalert({
      show: true,
      type: "text-blue-500",
      message: "Task Restored",
    });
    setTimeout(() => {
      setshowalert(false);
    }, 500);
    // console.log(index);
    // console.log(completedtask.list[index]);
    setTasklist({
      show: false,
      list: [...tasklist.list, completedtask.list[index]],
    });

    completedtask.list.splice(index, 1);
    setcompletedTask({ show: true, list: [...completedtask.list] });
  }

  function allComplete() {
    setshowalert({
      show: true,
      type: "text-blue-500",
      message: "All Task Completed",
    });
    setTimeout(() => {
      setshowalert(false);
    }, 500);
    setcompletedTask({
      show: false,
      list: [...completedtask.list, ...tasklist.list],
    });
    setTasklist({ show: true, list: [] });
  }

  function allDelete(){
    setshowalert({
        show: true,
        type: "text-red-500",
        message: "All Task Deleted",
      });
      setTimeout(() => {
        setshowalert(false);
      }, 500);
      setcompletedTask({ show: true, list: [] });

  }


  return (
    <div className=" flex flex-col  backdrop-blur-sm text-white max-w-[30rem] rounded-[10px] py-4 relative ">
      {showalert.show && (
        <p
          className={`absolute top-4 ml-[5%] tracking-widest  w-[90%] text-center  ${showalert.type} `}
        >
          {showalert.message}
        </p>
      )}

      <h1 className="text-center py-4 mt-8 text-[1.5rem]">Task Manager</h1>

      <div className="flex gap-4 px-4 pb-4 text-white border-b border-dotted ">
        <Input
          className="text-white"
          variant="outlined"
          label="Add Task"
          value={task}
          onChange={taskChanged}
        />
        <Button variant="gradient" onClick={(event) => addToTaskList(event)}>
          {btn}
        </Button>
      </div>
      <div className="flex justify-around items-center my-2 pb-2 border-b border-dotted">
        {/* <button className='active:bg-violet-700' >Pending</button> */}
        <button className="focus:scale-110" onClick={pendigTasks}>
          Pending
        </button>
        <button className="  focus:scale-110" onClick={completedTasks1}>
          Completed
        </button>
      </div>
      {/* pending tasklist */}
      {tasklist.show &&
        tasklist.list.map((t, i) => (
          <div
            key={i}
            className="flex justify-between items-center mx-4  animate__animated animate__fadeIn ease-in-out cursor-pointer"
          >
            <p className="px-4 py-2 rounded text-[1.2rem]  ">{t}</p>

            <div className="flex gap-8 mr-4">
              {/* editIcon */}
              <Tooltip className="" content="Edit">
                <svg
                  className="w-4 h-4 fill-red-500 cursor-pointer "
                  onClick={(event) => editTask(i)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                </svg>
              </Tooltip>
              <Tooltip content="Complete">
                <svg
                  onClick={(event) => deleteTask(i)}
                  className="w-4 h-4 fill-blue-500 cursor-pointer "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
              </Tooltip>
            </div>
          </div>
        ))}
      {tasklist.show && tasklist.list.length > 1 && (
        <Tooltip content="Mark All Completed">
          <button
            className="hover:text-blue-500 cursor-pointer"
            onClick={allComplete}
          >
            Complete All
          </button>
        </Tooltip>
      )}

      {completedtask.show &&
        completedtask.list.map((t, i) => (
          <div
            key={i}
            className="flex justify-between items-center mx-4  animate__animated animate__fadeIn ease-in-out cursor-pointer"
          >
            <p className="px-4 py-2 rounded text-[1.2rem]  ">{t}</p>

            <div className="flex gap-8 mr-4">
              {/* editIcon */}
              <Tooltip className="" content="Restore">
                <i
                  onClick={(e) => restoretask(i)}
                  className="fa-solid fa-rotate-right text-[1rem] text-blue-500 "
                ></i>
              </Tooltip>
              <Tooltip content="Delete">
                <i
                  onClick={(e) => deleteTaskPermanentely(i)}
                  className="fa-solid fa-trash text-[1rem] text-red-500 "
                ></i>
              </Tooltip>
            </div>
          </div>
        ))}
        {completedtask.show && completedtask.list.length >1 &&
        <Tooltip content="Delete All">
        <button
          className="text-red-500 cursor-pointer" 
          onClick={allDelete} 
        >
          Delete All
        </button>
      </Tooltip>
        }
    </div>
  );
}

export default Home;
