// Работа с сервером
const URL = import.meta.env.VITE_API_URL;

const headers = {
  "Content-Type": "application/json",
};

const tasksAPI = {
  // Получаем все задачи
  getAll: async () => {
    // return fetch(URL).then((response) => response.json());
    const response = await fetch(URL);
    return response.json();
  },
  // Добавление задач на сервер
  add: async (task) => {
    // return fetch(URL, {
    //   method: "POST",
    //   headers,
    //   body: JSON.stringify(task),
    // }).then((response) => response.json());
    const response = await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(task),
    });
    return response.json();
  },
  // Удаление
  delete: async (id) => {
    // return fetch(`${URL}/${id}`, {
    //   method: "DELETE",
    // });
    await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
  },
  // изменение состояние таски
  toggleComplete: async (id, newIsDoneValue) => {
    // return fetch(`${URL}/${id}`, {
    //   method: "PATCH",
    //   headers,
    //   body: JSON.stringify({ isDone: newIsDoneValue }),
    // });
    const response = await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone: newIsDoneValue }),
    });
    return response.json();
  },
};

export default tasksAPI;
