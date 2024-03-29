import React, { Component } from "react";
import "./item-add-form.css";

export default class ItemAddForm extends Component {
constructor() {
  super();
  
  this.state = {
    label: ''
  }

  this.onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }
  
  this.onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label ==='') {
      return;
    }
    this.props.addItem(this.state.label);
    this.setState({
      label: ''
    })
  }
  
}

  render() {
    return (
      <form className="item-add-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="Input next task"
          value={this.state.label}
        />

        <button
          className="btn btn-outline-secondary "
        >
          Add Item
        </button>
      </form>
    );
  }
}
