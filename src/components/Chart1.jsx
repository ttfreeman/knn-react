import React from "react";
import * as d3 from "d3";

class Chart1 extends React.Component {
  state = {
    data: [
      { width: 200, height: 400, fill: "blue" },
      { width: 100, height: 200, fill: "teal" },
      { width: 50, height: 100, fill: "red" }
    ]
  };
  componentDidMount() {
    this.createSvg();
  }
  componentDidUpdate() {
    this.createSvg();
  }
  createSvg = () => {
    const node = this.node;
    const svg = d3
      .select(node)
      .attr("width", 600)
      .attr("height", 600);

    var rects = svg.selectAll("rect").data(this.state.data);

    rects
      .attr("width", d => d.width)
      .attr("height", (d, i, n) => {
        return d.height;
      });

    rects
      .enter()
      .append("rect")
      .attr("width", d => d.width)
      .attr("height", (d, i, n) => {
        return d.height;
      })
      .attr("fill", d => d.fill);
  };

  render() {
    const style = {
      margin: "1rem",
      border: "1px dashed black",
      maxWidth: "20rem"
    };
    return (
      <div className="card-panel">
        <svg style={style} ref={node => (this.node = node)} />
      </div>
    );
  }
}

export default Chart1;
