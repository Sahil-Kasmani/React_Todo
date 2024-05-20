import { useEffect, useState } from "react";
import TodoList from "./component/TodoList";

interface TodoItem {
  id: number;
  title: string;
  checked: boolean;
}

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [eachItem, setEachItem] = useState<TodoItem[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<string>("all");
  const [selectValue, setSelectValue] = useState<TodoItem[]>([]);

  useEffect(() => {
    const handleOptionFilter = () => {
      switch (selected) {
        case "complete":
          return eachItem.filter((item) => item.checked);
        case "non-Complete":
          return eachItem.filter((item) => !item.checked);
        case "all":
        default:
          return eachItem;
      }
    };
    setSelectValue(handleOptionFilter());
  }, [selected, eachItem]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newId =
      eachItem.length > 0 ? eachItem[eachItem.length - 1].id + 1 : 1;
    const newItem: TodoItem = { id: newId, title: task, checked: false };
    const updatedItems = [...eachItem, newItem];
    setEachItem(updatedItems);
    localStorage.setItem("tasks", JSON.stringify(updatedItems));
    setTask("");
  };

  const filteredItems = search
    ? eachItem.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    : selected
      ? selectValue
      : eachItem;

  return (
    <div className="App">
      <h1 className="todo_title">TODO LIST</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <fieldset>
          <div className="todo_input_btn">
            <input
              required
              type="text"
              placeholder="Add item..."
              id="task_name"
              name="task_name"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button>+Add</button>
          </div>
        </fieldset>
      </form>
      <div className="filters">
        <div className="select_option">
          <select
            name="optionFilter"
            id="optionFilter"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="all">All</option>
            <option value="complete">Complete</option>
            <option value="non-Complete">Non-Complete</option>
          </select>
        </div>

        <div className="search_text">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <TodoList eachItem={filteredItems} setEachItem={setEachItem} />
    </div>
  );
};

export default App;
