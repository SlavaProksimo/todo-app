import { createContext, useContext, useMemo } from "react";
// Создаем контекст
const ValidationContext = createContext(null);
const validationRules = {
  // проверка на пробелы
  notEmptyOrSpaces: (value) => {
    if (!value || value.length === 0) return true;

    if (value.trim().length === 0) {
      return "Поле не может содержать только пробелы";
    }

    return true;
  },
  // проверка на спец. символы
  noSpecialChars: (value) => {
    if (!value || value.length === 0) return true;
    const specialChars = /[<>@#$%^&*()_+=[\]{};:'"\\|,./?`~]/;
    if (specialChars.test(value)) {
      return "Нельзя использовать спецсимволы: < > @ # $ % & и другие";
    }

    return true;
  },
  // макс длина
  maxLength: (max) => (value) => {
    if (!value || value.length === 0) return true;
    if (value.length > max) return `Максимум ${max} символов`;
    return true;
  },
};
// Провайдер
export const ValidationProvider = ({ children }) => {
  const validations = useMemo(
    () => ({
      // Для создания и редактирования задачи
      forTask: {
        validate: {
          notEmptyOrSpaces: validationRules.notEmptyOrSpaces,
          noSpecialChars: validationRules.noSpecialChars,
          maxLength: validationRules.maxLength(100),
        },
      },

      // Для поиска
      forSearch: {
        validate: {
          notEmptyOrSpaces: validationRules.notEmptyOrSpaces,
          noSpecialChars: validationRules.noSpecialChars,
          maxLength: validationRules.maxLength(50),
        },
      },
    }),
    [],
  );

  return (
    <ValidationContext.Provider value={validations}>
      {children}
    </ValidationContext.Provider>
  );
};

// Хук для использования
export const useValidation = () => {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error("useValidation must be used within ValidationProvider");
  }
  return context;
};
