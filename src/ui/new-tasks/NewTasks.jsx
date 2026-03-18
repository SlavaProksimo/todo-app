import TodoItem from "../todo-item/TodoItem";

const NewTasks = ({ tasks, setTasks, setOpen, onEditClick }) => {
  return (
    <ul className="todo-list__ul">
      {tasks.map((task) => (
        <div key={task.id}>
          <TodoItem
            title={task.title}
            isDone={task.isDone}
            id={task.id}
            setTasks={setTasks}
            setOpen={setOpen}
            onEditClick={onEditClick}
          />
          <hr />
        </div>
      ))}
    </ul>
  );
};
export default NewTasks;
