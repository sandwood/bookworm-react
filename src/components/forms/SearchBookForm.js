import React, { Component } from "react";
import axios from "axios";
import { Form, Dropdown } from "semantic-ui-react";

class SeacrhBookFrom extends Component {
  state = {
    query: "",
    loading: false,
    options: [],
    books: {}
  };
  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({
      query: data
    });
    this.timer = setTimeout(this.fetchOptions, 1000);
  };

  fetchOptions = () => {
    if (!this.state.query) return;
    this.setState({ loading: true });
    axios
      .get(`/api/books/search?q=${this.state.query}`)
      .then(res => res.data.books);
  };

  render() {
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for a book by title"
          value={this.state.query}
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
        />
      </Form>
    );
  }
}

export default SeacrhBookFrom;
