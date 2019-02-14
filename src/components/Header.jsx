import React from "react";

class Header extends React.Component {
  state = {};
  render() {
    return (
      <nav>
        <div className="nav-wrapper" style={{ padding: "0 1.5rem" }}>
          <a href="#" className="brand-logo">
            React-Tensorflow
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="collapsible.html">Signup</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
