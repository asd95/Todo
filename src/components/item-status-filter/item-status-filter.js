import React from "react";
import "./item-status-filter.css";

const ItemStatusFilter = ({ onChangeStatus, status }) => {
  const onChange = text => {
    onChangeStatus(text);
  };

  const btnDate = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "done", label: "Done" }
  ];

  const btn = btnDate.map(({ name, label }) => {
    const isActive = status === name;
    const clazz = isActive ? "btn-info" : "btn-outline-secondary";
    return (
      <button
        type="button"
        className={`btn ${clazz}`}
        onClick={() => onChange(name)}
        key={name}
      >
        {label}
      </button>
    );
  });

  return <div className="btn-group">{btn}</div>;
};

export default  ItemStatusFilter;