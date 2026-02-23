const TodoAdd = ({ close, addNewTask, newTaskTitle, setNewTaskTitle }) => {
  return (
    <div className="todo-add__general-box" onClick={(e) => e.stopPropagation()}>
      <div className="todo-add__box">
        <h2 className="todo-add__title">New Note</h2>
        <input
          className="todo-add__input"
          placeholder="Input your note..."
          value={newTaskTitle}
          onInput={(event) => setNewTaskTitle(event.target.value)}
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
            onClick={addNewTask}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoAdd;
