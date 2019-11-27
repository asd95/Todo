import React, { Component } from "react";
import "./search-panel.css";

export default class SearchPanel extends Component {
  constructor() {
    super();

    this.state = {
      search: ""
    };

    this.onChange = e => {
      const search =  e.target.value.toLowerCase();
      this.setState({
        search 
      })
      this.props.onSearch(search);
    };
  }
  
  render() {
    return (
      <input
        type="text"
        placeholder="search"
        className="form-control search-input"
        onChange={this.onChange}
        value={this.state.search}
      />
    );
  }
}
