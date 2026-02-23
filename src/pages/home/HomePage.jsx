import { useState } from "react";
import ButtonAddTodo from "@/ui/button/ButtonAddTodo";
import TodoAdd from "@/ui/todo-add/todoAdd";
import NewTasks from "ui/new-tasks/NewTasks";
import Search from "ui/search/Search";
const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [wrapperActive, setWrapperActive] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const toggleWrapper = () => {
    setWrapperActive(!wrapperActive);
  };
  const closeModal = () => {
    setOpen(false);
    setWrapperActive(false);
  };

  //Проверка для кнопки Apply, чтобы закрывать модалку только если было что-то введено
  const addNewTask = () => {
    console.log(newTaskTitle);
    if (newTaskTitle.trim().length > 0) {
      const newTask = { title: newTaskTitle.trim(), isDone: false };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      closeModal();
    }
  };

  return (
    <div className="general-wrapper" onClick={closeModal}>
      <div
        className={`wrapper ${wrapperActive ? "wrapper-active" : "wrapper"}`}
      >
        <div className="container">
          <div className="todo">
            <h1 className="todo-title">TODO LIST</h1>
            <Search />
            <div className="todo-list">
              <NewTasks tasks={tasks} setTasks={setTasks} />
            </div>
            <div className="btn btn-todo-add">
              <ButtonAddTodo
                open={open}
                setOpen={setOpen}
                toggleWrapper={toggleWrapper}
              />
            </div>
          </div>
        </div>
      </div>
      {open && (
        <TodoAdd
          open={open}
          close={closeModal}
          addNewTask={addNewTask}
          newTaskTitle={newTaskTitle}
          setNewTaskTitle={setNewTaskTitle}
        />
      )}
    </div>
  );
};
export default HomePage;
