import React from "react";
import trainTestSplit from "../analyses/trainTestSplit";
import knn from "../analyses/knn";

class Output extends React.Component {
  state = { prediction: [], expected: [] };

  trainModel = () => {
    this.setState({ prediction: [], expected: [] });
    var data = this.props.data;

    var { features, labels, testFeatures, testLabels } = trainTestSplit(data, {
      featureColumns: ["lat", "long", "sqft_lot", "sqft_living"],
      labelColumns: ["price"],
      shuffle: true,
      splitTest: 10
    });

    testFeatures.forEach((element, i) => {
      const result = knn(features, labels, element, 10);
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
      <div className="card-panel">
        <h4>Analysis</h4>
        <p>Data length= {this.props.data.length}</p>
        <button
          onClick={this.trainModel}
          disabled={this.props.data.length <= 0}
          className="btn waves-effect waves-light"
        >
          Train - Predict
          <i className="material-icons right">play_arrow</i>
        </button>
        {this.state.prediction.length > 0 && this.renderTable()}
      </div>
    );
  }
}

export default Output;
