import { useState } from "react";
import "./TodoList.css";

interface propType {
    eachItem: any[];
    setEachItem: any;
}

const TodoList = ({ eachItem, setEachItem }: propType) => {
    const [editId, setEditId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    const toggleChecked = (id: string) => {
        const updateItems = eachItem.map((item) => {
            if (item.id === id) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setEachItem(updateItems);
        localStorage.setItem("tasks", JSON.stringify(updateItems));
    };

    const handleDlt = (id: string) => {
        const updatedItems = eachItem.filter((item) => item.id !== id);
        console.log(updatedItems);
        setEachItem(updatedItems);
        localStorage.setItem("tasks", JSON.stringify(updatedItems));
    };

    const handleEdit = (id: string) => {
        setEditId(id);
        const edit_item = eachItem.find((item) => {
            return item.id === id;
        });
        setEditValue(edit_item ? edit_item.title : "");
        console.log(edit_item.title);
    };

    const handleEditSave = (id: string) => {
        const update = eachItem.map((item) => {
            if (item.id === id) {
                return { ...item, title: editValue };
            }
            return item;
        });
        setEachItem(update);
        localStorage.setItem("tasks", JSON.stringify(update))
        setEditId(null);
    };

    return (
        <div className="todo">
            {eachItem.length <= 0 ? (
                <p>No Items are available! </p>
            ) : (
                eachItem &&
                eachItem.map((data, index) => (
                    <div key={data.id} className="todo_item">
                        <div className="todo_item__1">
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <label htmlFor={`todo_check_${index}`}>
                                    <input
                                        type="checkbox"
                                        id={`todo_check_${index}`}
                                        checked={data.checked}
                                        onChange={() => toggleChecked(data.id)}
                                    />
                                </label>
                                {data.id === editId ? (
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => {
                                            setEditValue(e.target.value);
                                        }}
                                    />
                                ) : (
                                    <p className={data.checked ? "checked" : ""}>{data.title}</p>
                                )}
                            </div>
                        </div>

                        <div className="todo_item__2">
                            <button
                                className="todo_delete__btn"
                                onClick={() => {
                                    handleDlt(data.id);
                                }}
                            >
                                Dlt
                            </button>
                            {data.id === editId ? (
                                <button
                                    className="todo_edit__btn"
                                    onClick={() => {
                                        handleEditSave(data.id);
                                    }}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="todo_edit__btn"
                                    onClick={() => {
                                        handleEdit(data.id);
                                    }}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TodoList;
