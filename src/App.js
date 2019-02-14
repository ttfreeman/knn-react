import React, { Component } from "react";
import InputCSV from "./components/InputCSV";
import Output from "./components/Output";
import Header from "./components/Header";

class App extends Component {
  state = {
    csvData: []
  };
  getData = val => {
    this.setState({ csvData: val });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <InputCSV sendData={this.getData} />
            <Output data={this.state.csvData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
