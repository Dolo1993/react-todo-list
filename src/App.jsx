import "./index.css";
import { useState } from "react";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem.trim() === "") return;

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title: newItem, completed: false },
    ]);
    setNewItem("");
  }

  function handleDelete(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  function handleEdit(id) {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setIsEditing(id);
    setEditText(todoToEdit.title);
  }

  function handleEditSubmit(e, id) {
    e.preventDefault();
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title: editText } : todo
      )
    );
    setIsEditing(null);
    setEditText("");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>

      <h1 className="header">Todo List</h1>
      {todos.length === 0 ? (
        <p>No Todos</p>
      ) : (
        <ul className="list">
          {todos.map((todo) => (
            <li key={todo.id}>
              {isEditing === todo.id ? (
                <form onSubmit={(e) => handleEditSubmit(e, todo.id)}>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button type="submit" className="btn">Save</button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setIsEditing(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() =>
                        setTodos((currentTodos) =>
                          currentTodos.map((t) =>
                            t.id === todo.id
                              ? { ...t, completed: !t.completed }
                              : t
                          )
                        )
                      }
                    />
                    {todo.title}
                  </label>
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(todo.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
