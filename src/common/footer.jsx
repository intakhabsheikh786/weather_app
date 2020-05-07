import React, { Component } from "react";
import { primaryColor } from "../styles/constant";

class Footer extends Component {
  render() {
    return (
      <div style={{ marginTop: 100 }} className="container-fluids">
        <div className="row">
          <div
            style={{
              color: primaryColor.color,
            }}
            className="col-sm-12"
          >
            <h6>© 2020 all right reserved </h6>
            <h6> www.github.com/intakhab</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
