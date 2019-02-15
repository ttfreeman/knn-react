import React from "react";
import trainTestSplit from "../analyses/trainTestSplit";
import knn from "../analyses/knn";

class Output extends React.Component {
  state = { prediction: [], expected: [] };

  trainModel = () => {
    this.setState({ prediction: [], expected: [] });
    var data = this.props.data;
    // debugger;
    var { features, labels, testFeatures, testLabels } = trainTestSplit(data, {
      featureColumns: this.props.featureColumns,
      labelColumns: this.props.labelColumns,
      shuffle: true,
      splitTest: parseFloat(this.props.parameters.splitTest)
    });

    testFeatures.forEach((element, i) => {
      const result = knn(features, labels, element, parseFloat(this.props.parameters.kValue));
      this.setState(prevState => ({
        prediction: [...prevState.prediction, result],
        expected: [...prevState.expected, testLabels[i][0]]
      }));
    });
  };

  renderTable() {
    const rows = this.state.prediction.map((row, i) => {
      return (
        <tr key={i}>
          <td>{row}</td>
          <td>{this.state.expected[i]}</td>
          <td>
            {((this.state.expected[i] - row) * 100) / this.state.expected[i]}
          </td>
        </tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Prediction</th>
            <th>Expected</th>
            <th>Error(%)</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="card-panel " style={{margin: "1rem 2rem"}} >
        <h4>Analysis</h4>
        <p>Data length= {this.props.data.length}</p>
        <button
          onClick={this.trainModel}
          disabled={this.props.data.length <= 0}
          className="btn green waves-effect waves-light"
        >
          Train - Predict
          <i className="material-icons right">play_arrow</i>
        </button>
        {this.props.featureColumns.length > 0 && this.renderTable()}
      </div>
    );
  }
}

export default Output;
