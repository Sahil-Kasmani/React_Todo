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
    return storedTasks ? JSON.parse(storedTasks) : []
  });
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TodoItem[]>([]);


  useEffect(() => {
    if (search) {
      const filtered = eachItem.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
      // console.log(filtered)
    } else {
      setFilteredData([]);
    }
  }, [search, eachItem]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newId = eachItem.length > 0 ? eachItem[eachItem.length - 1].id + 1 : 1;
    const newItem: TodoItem = { id: newId, title: task, checked: false };
    const updatedItems = [...eachItem, newItem];
    setEachItem(updatedItems);
    localStorage.setItem("tasks", JSON.stringify(updatedItems));
    setTask("");
  };


  return (
    <div className="App">
      <h1 className="todo_title">TODO LIST</h1>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <fieldset>
          <div className="todo_input_btn">
            <input
              required
              type="text"
              placeholder="Add item..."
              id="task_name"
              name="task_name"
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
            <button>+Add</button>
          </div>
        </fieldset>
      </form>
      <div className="search_text">
        <input type="text" placeholder="Search..." value={search} onChange={(e) => { setSearch(e.target.value) }} />
      </div>
      <TodoList eachItem={search ? filteredData : eachItem} setEachItem={setEachItem} />

    </div>
  );
};

export default App;
