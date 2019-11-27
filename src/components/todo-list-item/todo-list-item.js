import React from "react";
import "./todo-list-item.css";

const TodoListItem = ({
  label,
  onDeleted,
  onToggleImportant,
  onToggleDone,
  important,
  done
}) => {
  let classNames = "todo-list-item";
  let classImportant = "btn-outline-success";
  if (done) {
    classNames += " done";
  }
  if (important) {
    classNames += " important";
    classImportant = "btn-success";
  }

  return (
    <span className={classNames}>
      <span className="todo-list-item-label" onClick={onToggleDone}>
        {label}
      </span>

      <span>
        <button
          type="button"
          className={`btn ${classImportant} btn-sm`}
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation" />
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={onDeleted}
        >
          <i className="fa fa-trash-o" />
        </button>
      </span>
    </span>
  );
};

export default TodoListItem;
