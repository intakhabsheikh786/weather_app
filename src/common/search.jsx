import React, { Component } from "react";
import { primaryColor } from "../styles/constant";
import { Link } from "react-router-dom";
import "../styles/search.css";
class Search extends Component {
  state = {
    city: "",
  };

  handleChange = (e) => {
    let { city } = this.state;
    city = e.currentTarget.value;
    this.setState({ city });
  };

  render() {
    return (
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            flexDirection: "column",
          }}
          className="row"
        >
          <div>
            <input
              className="search_input"
              style={{
                border: "1px solid grey",
                opacity: 0.8,
                borderRadius: 20,
                padding: 10,

                textAlign: "center",
                outline: "none",
              }}
              name="city"
              onChange={this.handleChange}
              type="text"
              placeholder="Enter City Name..."
            />
          </div>
          <div>
            <a href={`/result/?city=${this.state.city}`}>
              <button
                style={{
                  border: "1px solid grey",
                  opacity: 0.8,
                  borderRadius: 20,
                  padding: 10,
                  width: 200,
                  marginTop: 20,
                  textAlign: "center",
                  backgroundColor: primaryColor.color,
                  color: "white",
                }}
              >
                Submit
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
