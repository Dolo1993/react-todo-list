import { useState } from "react";

export function TodoItem({ completed, id, title, toggleTodo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    editTodo(id, newTitle);
    setIsEditing(false);
  }

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          title
        )}
      </label>
      {isEditing ? (
        <button onClick={handleSave} className="btn btn-save" aria-label="Save todo">
          Save
        </button>
      ) : (
        <button onClick={handleEdit} className="btn btn-edit" aria-label="Edit todo">
          Edit
        </button>
      )}
      <button
        onClick={() => deleteTodo(id)}
        className="btn btn-danger"
        aria-label="Delete todo"
      >
        Delete
      </button>
    </li>
  );
}
