import { memo, useRef, useEffect } from "react";
const TodoAdd = ({ close, newTaskTitle, onApply, open }) => {
  //Автофокус с помощью useRef
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);
  return (
    <>
      <div className="overlay"></div>
      <div
        className="todo-add__general-box"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="todo-add__box">
          <h2 className="todo-add__title">New Note</h2>
          <input
            className="todo-add__input"
            placeholder="Input your note..."
            defaultValue={newTaskTitle.current}
            onInput={(e) => {
              newTaskTitle.current = e.target.value;
            }}
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
              onClick={onApply}
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
