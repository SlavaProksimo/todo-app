import { useCallback, useEffect, useMemo, useRef, useState } from "react";
export const useTodos = ({ closeModal, open, setOpen }) => {
  const getDataFromLocalStorage = () => {
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
  };

  //Сохраняем тудушки после перезагрузки страницы
  const [tasks, setTasks] = useState(getDataFromLocalStorage());

  const [searchTask, setSearchTask] = useState("");
  const [filter, setFilter] = useState("All");

  const [currentTaskId, setCurrentTaskId] = useState(null); // Для редактирование задачи
  // Функция для обработки клика по редактированию
  const editTitleRef = useRef("");
  const handleEditClick = (taskId, taskTitle) => {
    setCurrentTaskId(taskId);
    editTitleRef.current = taskTitle; // Сохраняем заголовок
    setOpen(true);
  };
  //Сохраняем тудушки после перезагрузки страницы
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //Проверка для кнопки Apply, чтобы закрывать модалку только если было что-то введено
  const addNewTask = useCallback(
    (title) => {
      if (title.trim().length > 0) {
        const newTask = {
          id: crypto.randomUUID(),
          title: title.trim(),
          isDone: false,
        };
        setTasks((prev) => [...prev, newTask]);
        closeModal();
      }
    },
    [closeModal],
  );
  // Редактируем задачу
  const updateTask = useCallback(
    (title) => {
      if (currentTaskId !== null) {
        const updatedTasks = tasks.map((task) => {
          if (task.id === currentTaskId && title.trim().length > 0) {
            return {
              ...task,
              title: title,
            };
          }
          return task;
        });
        setTasks(updatedTasks);
        closeModal();
        setCurrentTaskId(null);
        editTitleRef.current = "";
      }
    },
    [tasks, closeModal, currentTaskId],
  );

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

  return {
    tasks,
    setTasks,
    searchTask,
    setFilter,
    addNewTask,
    updateTask,
    handleInputChange,
    showNotFound,
    finalTodos,
    handleEditClick,
    editTitleRef,
    currentTaskId,
    setCurrentTaskId,
  };
};
