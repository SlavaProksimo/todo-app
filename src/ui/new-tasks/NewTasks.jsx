import TodoItem from "../todo-item/TodoItem";

const NewTasks = ({ tasks, setTasks }) => {
  return (
    <ul className="todo-list__ul">
      {tasks.map((task, index) => (
        <div key={index}>
          <TodoItem
            title={task.title}
            isDone={task.isDone}
            index={index}
            tasks={tasks}
            setTasks={setTasks}
          />
          <hr />
        </div>
      ))}
    </ul>
  );
};
export default NewTasks;
