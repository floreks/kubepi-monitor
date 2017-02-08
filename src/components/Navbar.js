import React from "react";
import Logo from "./assets/kubepi-logo.png";
import "./Navbar.scss";

export default class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <header className="navbar">
          <h1 className="navbar-info">
            <img className="navbar-logo" src={Logo}/>
            <div className="navbar-text">KubePi Monitor</div>
          </h1>
        </header>
    );
  }
}
