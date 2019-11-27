import React, { Component } from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";
import "./app.css";

export default class App extends Component {
  constructor() {
    super();

    this.id = 0;
    // state
    this.state = {
      todoData: [
        this.createTodoItem("eat"),
        this.createTodoItem("sleep"),
        this.createTodoItem("coding")
      ],
      search: "",
      status: "all"
    };

    // US events
    // DELETE ITEM
    this.deleteItem = id => {
      this.setState(({ todoData }) => {
        const inx = this.findId(todoData, id);
        const newData = [...todoData.slice(0, inx), ...todoData.slice(inx + 1)];
        return { todoData: newData };
      });
    };

    // ADD ITEM
    this.addItem = text => {
      const newItem = this.createTodoItem(text);

      this.setState(({ todoData }) => {
        const newData = [...todoData, newItem];
        return {
          todoData: newData
        };
      });
    };

    // CHANGE PROPERTY DONE
    this.onToggleDone = id => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.changeProps(todoData, id, "done")
        };
      });
    };

    // CHANGE PROPERTY IMPORTANT
    this.onToggleImportant = id => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.changeProps(todoData, id, "important")
        };
      });
    };

    // FILTER SETSTATE CHANGE ( STATUS)
    this.onChangeStatus = text => {
      this.setState(() => {
        return {
          status: text
        };
      });
    };

    // SEARCHING SETSTATE CHANGE (SEARCH)
    this.onSearch = text => {
      this.setState({
        search: text
      });
    };
  }

  /////////////////////////////
  // CHANGE PROPS
  findId(data, id) {
    return data.findIndex(item => item.id === id);
  }
  changeProps(data, id, props) {
    const inx = this.findId(data, id);
    const oldItem = data[inx];
    const newItem = { ...oldItem, [props]: !oldItem[props] };
    return [...data.slice(0, inx), newItem, ...data.slice(inx + 1)];
  }

  createTodoItem(label) {
    return {
      label,
      done: false,
      important: false,
      id: this.id++
    };
  }

  // FILTER
  onFilter(data, status) {
    switch (status) {
      case "all":
        return data;
      case "active":
        return data.filter(item => !item.done);
      case "done":
        return data.filter(item => item.done);
      default:
        return data;
    }
  }

  // SORT
  onSort(text, newData) {
    if (text === "") {
      return newData;
    }

    return newData.filter(
      item => item.label.toLowerCase().indexOf(text) !== -1
    );
  }

  render() {
    const { todoData, search, status } = this.state;
    const doneCount = todoData.filter(item => item.done).length;
    const todoCount = todoData.length - doneCount;
    const newData = this.onFilter(this.onSort(search, todoData), status);
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel">
          <SearchPanel onSearch={this.onSearch} />
          <ItemStatusFilter
            onChangeStatus={this.onChangeStatus}
            status={status}
          />
        </div>
        <TodoList
          todos={newData}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
        />
        <ItemAddForm addItem={this.addItem} />
      </div>
    );
  }
}
