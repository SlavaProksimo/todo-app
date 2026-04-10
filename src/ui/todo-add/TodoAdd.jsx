import { memo } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { useTextForm } from "@/hooks/useSearchForm";
import clsx from "clsx";

const TodoAdd = ({ close, onApply, open }) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useTextForm({ defaultValues: { text: "" }, mode: "onChange" });

  const hasErrorTodoText = !!errors["text"];
  const todoErrorMessage = errors["text"]?.message;

  // кастомный хук
  const modalRef = useClickOutside(() => {
    if (open) {
      close();
    }
  });

  // Обработчик отправки формы
  const onSubmit = (data) => {
    if (data.text && data.text.trim().length > 0) {
      onApply(data.text);
      reset(); // Очищаем форму после добавления
      close(); // Закрываем модалку
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="overlay"></div>
      <div className="todo-add__general-box" ref={modalRef}>
        <div className="todo-add__box">
          <h2 className="todo-add__title">New Note</h2>
          <input
            autoFocus={open}
            type="text"
            className={clsx({
              "todo-add__input": true,
              "todo-add__input--error": hasErrorTodoText,
            })}
            placeholder="Input your note..."
            {...register("text")}
          />
          {hasErrorTodoText && todoErrorMessage && (
            <div className="error-message todo__error-message">
              {todoErrorMessage}
            </div>
          )}
          <div className="todo-add__btn-box">
            <button
              className="todo-add__btn btn-left"
              type="button"
              onClick={close}
            >
              Cancel
            </button>
            <button
              className="todo-add__btn btn-right"
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(TodoAdd);
