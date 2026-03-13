import { useCallback, useEffect, useMemo, useRef, useState } from "react";
export const useTodos = ({ closeModal, open }) => {
  //Сохраняем тудушки после перезагрузки страницы
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        return JSON.parse(savedTasks);
      }
      return [];
    } catch (error) {
      console.error("Ошибка LocalStorage");
      return [];
    }
  });

  const newTaskTitle = useRef("");

  const [searchTask, setSearchTask] = useState("");
  const [filter, setFilter] = useState("All");

  const taskToEdit = useRef(null); // Для редактирование задачи

  //Сохраняем тудушки после перезагрузки страницы
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //Проверка для кнопки Apply, чтобы закрывать модалку только если было что-то введено
  const addNewTask = useCallback(() => {
    if (newTaskTitle.current.trim().length > 0) {
      const newTask = {
        id: crypto.randomUUID(),
        title: newTaskTitle.current.trim(),
        isDone: false,
      };
      setTasks((prev) => [...prev, newTask]);
      newTaskTitle.current = "";
      closeModal();
    }
  }, [newTaskTitle, closeModal]);
  // Редактируем задачу
  const updateTask = useCallback(() => {
    if (taskToEdit.current !== null) {
      const updatedTasks = tasks.map((task) => {
        if (
          task.id === taskToEdit.current &&
          newTaskTitle.current.trim().length > 0
        ) {
          return {
            ...task,
            title: newTaskTitle.current,
          };
        }
        return task;
      });
      setTasks(updatedTasks);
      closeModal();
      taskToEdit.current = null;
    }
  }, [tasks, closeModal, newTaskTitle]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTask(value);
  };
  //поиск задач
  const filteredTodos = useMemo(() => {
    return searchTask
      ? tasks.filter((task) => task.title?.includes(searchTask.toLowerCase()))
      : tasks;
  }, [searchTask, tasks]);

  //Если задач нету или не найдена , то показываем img
  const showNotFound = filteredTodos.length === 0;
  //Фильтрация для Select
  const filteredBySelect = useMemo(() => {
    switch (filter) {
      case "All":
      default:
        return filteredTodos;
      case "Complete":
        return filteredTodos.filter((task) => task.isDone === true);
      case "Incomplete":
        return filteredTodos.filter((task) => task.isDone === false);
    }
  }, [filter, filteredTodos]);

  const finalTodos = filteredBySelect;

  useEffect(() => {
    if (!open) {
      newTaskTitle.current = "";
      taskToEdit.current = null;
    }
  }, [open]);

  return {
    tasks,
    setTasks,
    newTaskTitle,
    searchTask,
    setFilter,
    addNewTask,
    updateTask,
    handleInputChange,
    showNotFound,
    finalTodos,
    taskToEdit,
  };
};
