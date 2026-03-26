import { memo, useRef, useEffect } from "react";
import useClickOutside from "@/hooks/useClickOutside";
const TodoAdd = ({ close, onApply, open }) => {
  //Автофокус с помощью useRef
  const inputRef = useRef(null);
  //кастомный хук
  const modalRef = useClickOutside(() => {
    if (open) {
      close();
    }
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="overlay"></div>
      <div className="todo-add__general-box" ref={modalRef}>
        <div className="todo-add__box">
          <h2 className="todo-add__title">New Note</h2>
          <input
            className="todo-add__input"
            placeholder="Input your note..."
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
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(TodoAdd);
