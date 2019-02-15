import React, { Component } from "react";
import InputCSV from "./components/InputCSV";
import Output from "./components/Output";
import Header from "./components/Header";
import InputParams from './components/InputParams'

class App extends Component {
  state = {
    csvData: [],
    dataColumns: [],
    featureColumns: [],
    labelColumns: "",
    parameters: {
      splitTest: null,
      k: null
    }
  };
  getData = val => {
    let dataColumns = val[0].map(col => {
      return ({ value: col, label: col })
    })
    this.setState({ csvData: val, dataColumns });
  };
  getParams = (featureColumns, labelColumns, parameters) => {
    this.setState({
      featureColumns,
      labelColumns,
      parameters: {
        splitTest: parameters.splitTest,
        kValue: parameters.k
      }
    });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <InputCSV sendData={this.getData} />
            <InputParams getParams={this.getParams} dataColumns={this.state.dataColumns}  />
            <Output
            data={this.state.csvData}
            featureColumns={this.state.featureColumns}
            labelColumns={this.state.labelColumns}
            parameters={this.state.parameters}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
