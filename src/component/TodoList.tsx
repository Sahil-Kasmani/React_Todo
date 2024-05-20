import React, { useEffect, useState } from "react";
import "./TodoList.css";

interface ItemType {
    id: number;
    title: string;
    checked: boolean;
}

interface propType {
    eachItem: any[];
    setEachItem: React.Dispatch<React.SetStateAction<ItemType[]>>;
}

const TodoList: React.FC<propType> = ({ eachItem, setEachItem }: propType) => {
    const [editId, setEditId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    // localStorage data
    const [local_data, setLocalData] = useState<ItemType[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        const data = storedTasks ? JSON.parse(storedTasks) : [];
        setLocalData(data);
    }, [eachItem]);

    const toggleChecked = (id: number) => {
        const updateItems = local_data.map((item: any) => {
            if (item.id === id) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setEachItem(updateItems);
        localStorage.setItem("tasks", JSON.stringify(updateItems));
    };

    const handleDelete = (id: number) => {
        const updatedItems = local_data.filter((item: any) => item.id !== id);
        setEachItem(updatedItems);
        localStorage.setItem("tasks", JSON.stringify(updatedItems));
    };

    const handleEdit = (id: number) => {
        setEditId(id);
        const edit_item = local_data.find((item) => item.id === id);
        setEditValue(edit_item ? edit_item.title : "");
    };

    const handleEditSave = (id: string) => {
        const update = local_data.map((item: any) => {
            if (item.id === id) {
                return { ...item, title: editValue };
            }
            return item;
        });
        setEachItem(update);
        localStorage.setItem("tasks", JSON.stringify(update));
        setEditId(null);
    };

    return (
        <div className="todo">
            {eachItem.length <= 0 ? (
                <p>No Items are available! </p>
            ) : (
                eachItem &&
                eachItem.map((item, index) => (
                    <div key={item.id} className="todo_item">
                        <div className="todo_item__1">
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <label htmlFor={`todo_check_${index}`}>
                                    <input
                                        type="checkbox"
                                        id={`todo_check_${index}`}
                                        checked={item.checked}
                                        onChange={() => toggleChecked(item.id)}
                                    />
                                </label>
                                {item.id === editId ? (
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                    />
                                ) : (
                                    <p className={item.checked ? "checked" : ""}>{item.title}</p>
                                )}
                            </div>
                        </div>

                        <div className="todo_item__2">
                            <button
                                className="todo_delete__btn"
                                onClick={() => handleDelete(item.id)}
                            >
                                Dlt
                            </button>
                            {item.id === editId ? (
                                <button
                                    className="todo_edit__btn"
                                    onClick={() => handleEditSave(item.id)}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="todo_edit__btn"
                                    onClick={() => handleEdit(item.id)}
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
