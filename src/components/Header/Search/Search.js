import React, { Component } from "react";

import "./Search.css";

import SearchIcon from "react-icons/lib/md/search";

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  render() {
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input
            placeholder="Search Your Feed"
            value={this.state.text}
            onChange={(e) => {
              this.setState({ text: e.target.value });
            }}
          />

          <SearchIcon
            id="Search__icon"
            onClick={() =>
              this.props.filterSearchFn(encodeURI(this.state.text))
            }
          />
        </div>
      </section>
    );
  }
}
