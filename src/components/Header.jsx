import React from "react";

class Header extends React.Component {
  state = {};
  render() {
    return (
      <nav>
        <div className="nav-wrapper green lighten-2" >
          <button href="#" className="brand-logo green flat" style={{ padding: "0.5rem 2rem", margin: "0.3rem 2rem" }}>
            KNN ANALYSIS with Tensorflow.js
          </button>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <button href="#" className="green flat" style={{ padding: "0.5rem 2rem", margin: "auto 2rem"}} disabled  >Signup</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
