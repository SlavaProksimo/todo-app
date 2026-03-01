import { useState } from "react";
import ButtonAddTodo from "@/ui/button/ButtonAddTodo";
import TodoAdd from "@/ui/todo-add/todoAdd";
import NewTasks from "ui/new-tasks/NewTasks";
import Search from "ui/search/Search";
import NotFound from "@/ui/not-found/NotFound";
import Select from "@/ui/select/Select";
const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [searchTask, setSearchTask] = useState("");
  const [filter, setFilter] = useState("All");

  const [taskToEdit, setTaskToEdit] = useState(null); // Для редактирование задачи
  console.log("2", taskToEdit);
  //Закрыть модалку
  const closeModal = () => {
    setOpen(false);
    setNewTaskTitle("");
    setTaskToEdit(null);
  };

  //Проверка для кнопки Apply, чтобы закрывать модалку только если было что-то введено
  const addNewTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        title: newTaskTitle.trim(),
        isDone: false,
      };
      setTasks((prev) => [...prev, newTask]);
      setNewTaskTitle("");
      closeModal();
    }
  };
  // Редактируем задачу
  const updateTask = () => {
    if (taskToEdit !== null) {
      const updatedTasks = tasks.map((task, index) => {
        if (index === taskToEdit) {
          return {
            ...task,
            title: newTaskTitle.trim(),
          };
        }
        return task;
      });
      setTasks(updatedTasks);
      closeModal();
    }
  };

  //Обработчик клика по карандашу
  const handleApplyClick = () => {
    if (taskToEdit !== null) {
      updateTask();
    } else {
      addNewTask();
    }
  };
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTask(value);
  };
  //поиск задач
  const filteredTodos = searchTask
    ? tasks.filter((task) => task.title?.includes(searchTask.toLowerCase()))
    : tasks;

  //Если задач нету или не найдена , то показываем img
  const showNotFound = filteredTodos.length === 0;
  //Фильтрация для Select
  const filteredBySelect = () => {
    switch (filter) {
      case "All":
      default:
        return filteredTodos;
      case "Complete":
        return filteredTodos.filter((task) => task.isDone === true);
      case "Incomplete":
        return filteredTodos.filter((task) => task.isDone === false);
    }
  };

  const finalTodos = filteredBySelect();

  return (
    <div className="general-wrapper" onClick={closeModal}>
      <div className="container">
        <div className="todo">
          <h1 className="todo-title">TODO LIST</h1>

          <Search
            value={searchTask}
            onInputChange={handleInputChange}
            tasks={tasks}
            setFilter={setFilter}
          />
          {showNotFound && <NotFound />}
          <div className="todo-list">
            <NewTasks
              tasks={finalTodos}
              setTasks={setTasks}
              open={open}
              setOpen={setOpen}
              setNewTaskTitle={setNewTaskTitle}
              newTaskTitle={newTaskTitle}
              setTaskToEdit={setTaskToEdit}
            />
          </div>
          <ButtonAddTodo open={open} setOpen={setOpen} />
        </div>
      </div>
      {open && (
        <TodoAdd
          open={open}
          close={closeModal}
          addNewTask={addNewTask}
          newTaskTitle={newTaskTitle}
          setNewTaskTitle={setNewTaskTitle}
          handleApplyClick={handleApplyClick}
        />
      )}
    </div>
  );
};
export default HomePage;
