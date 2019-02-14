import React from "react";
import Papa from "papaparse";

class InputCSV extends React.Component {
  state = {
    csvfile: undefined,
    loadingStage: 0,
    loadingProgress: 0
  };

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0],
      loadingStage: 0
    });
  };

  importCSV = () => {
    this.setState({ loadingStage: 1 });
    const { csvfile } = this.state;
    const streamData = [];
    Papa.parse(csvfile, {
      complete: result => {
        this.setState({ loadingStage: 2 });
      },
      error: error => {
        console.log(error.message);
        this.setState({ loadingStage: 3 });
      },
      header: false,
      skipEmptyLines: true,
      dynamicTyping: true,
      step: row => {
        streamData.push(row.data[0]);
        this.setState({
          loadingProgress: (row.meta.cursor / csvfile.size) * 100
        });
        this.props.sendData(streamData);
      }
    });
  };

  renderLoading = () => {
    let progress = this.state.loadingProgress + "%";
    switch (this.state.loadingStage) {
      case 1:
        return (
          <div className="progress">
            <div className="determinate" style={{ width: progress }} />
          </div>
        );
      case 2:
        return (
          <button className="btn">
            <span>&#10003;</span>
          </button>
        );
      case 3:
        return (
          <button className="btn">
            <span>&#9747;</span>
          </button>
        );
      default:
        return (
          <button
            onClick={this.importCSV}
            className="btn"
            disabled={!this.state.csvfile}
          >
            Upload now!
          </button>
        );
    }
  };

  render() {
    return (
      <div
        style={{
          maxWidth: "20rem",
          border: "dotted black 1px",
          padding: "1rem",
          margin: "1rem 0"
        }}
      >
        <h4>Import CSV File!</h4>
        <input
          type="file"
          name="file"
          placeholder={null}
          onChange={this.handleChange}
        />
        <p>{this.state.loadingProgress}</p>
        {this.renderLoading()}
      </div>
    );
  }
}

export default InputCSV;
