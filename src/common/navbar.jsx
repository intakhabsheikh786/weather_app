import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import { primaryColor } from "../styles/constant";
import logo from "../assets/logo.jpg";
class NavbarComponent extends Component {
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        style={styles.navbar}
        variant="light"
      >
        <Link to="/">
          <Navbar.Brand>
            <img src={logo} width={40} height={40} alt="logo" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle
          style={{ backgroundColor: primaryColor.color }}
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link style={styles.navbar_link1_color} to="result">
              How It works ?
            </Link>

            <Link style={styles.navbar_link1_color} to="api">
              Api Info
            </Link>

            <Link style={styles.navbar_link1_color} to="about">
              About
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const styles = {
  navbar: {
    backgroundColor: "white",
  },
  navbar_link_color: {
    color: primaryColor.color,
    fontSize: 20,
  },
};

export default NavbarComponent;
