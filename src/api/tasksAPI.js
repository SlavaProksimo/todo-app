// Работа с сервером
const URL = "http://localhost:3001/tasks";

const headers = {
  "Content-Type": "application/json",
};

const tasksAPI = {
  // Получаем все задачи
  getAll: () => {
    return fetch(URL).then((response) => response.json());
  },
  // Добавление задач на сервер
  add: (task) => {
    return fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(task),
    }).then((response) => response.json());
  },
  // Удаление
  delete: (id) => {
    return fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
  },
  // изменение состояние таски
  toggleComplete: (id, newIsDoneValue) => {
    return fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone: newIsDoneValue }),
    });
  },
};

export default tasksAPI;
