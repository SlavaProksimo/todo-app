import { useRef, useEffect } from "react";
import useClickOutside from "@/hooks/useClickOutside";
const ModalEditTask = ({ close, onApply, open, initialValue }) => {
  const inputRef = useRef(null);
  //Кастомный хук для закрытия модалки
  const modalRef = useClickOutside(() => {
    if (open) {
      close();
    }
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = initialValue || "";
    }
  }, [open, initialValue]);

  if (!open) return null;
  return (
    <>
      <div className="overlay"></div>
      <div className="todo-add__general-box" ref={modalRef}>
        <div className="todo-add__box">
          <h2 className="todo-add__title">Edit Note</h2>
          <input
            className="todo-add__input"
            placeholder="Edit your note..."
            ref={inputRef}
          />
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
              onClick={() => onApply(inputRef.current.value)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEditTask;
