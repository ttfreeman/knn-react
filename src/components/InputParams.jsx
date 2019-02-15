import React from 'react';
import Select from 'react-select'

class InputParams extends React.Component {
    state = {
        options: [],
        multiValue: [],
        singleValue: "",
        parameters: {
            splitTest: undefined,
            k: undefined
        }
    }


    handleOnChange1(value) {
        this.setState({ multiValue: value });
    }
    handleOnChange2(value) {
        this.setState({ singleValue: value });
    }
    // handleOnChangeST(value) {
    //     this.setState(parameters.splitTest: );
    // }
    // handleOnChangeK(value) {
    //     this.setState(parameters.k);
    // }
    handleSubmit = (e) => {
        e.preventDefault();
        const featureColumns = this.state.multiValue.map(val => val.value)
        const labelColumns = [this.state.singleValue.value];
        this.setState({
            parameters: {
                splitTest: e.target.elements.splitTest.value.trim(),
                k: e.target.elements.kValue.value.trim()
            }
        }, () => { this.props.getParams(featureColumns, labelColumns, this.state.parameters) });

    }

    render() {
        return (

            <div className = "card-panel " style={{margin: "1rem 2rem"}} >
                        <form onSubmit={this.handleSubmit}>
                            <h4>Input Parameters</h4>
                                <p>Number of columns= {this.props.dataColumns.length}</p>
                                <label>Select feature columns</label>
                                <Select
                                  options={this.props.dataColumns}
                                  onChange={this.handleOnChange1.bind(this)}
                                  value={this.state.multiValue}
                                  showNewOptionAtTop={false}
                                    isMulti={true}
                                />
                                <label>Select label columns</label>
                                <Select
                                  options={this.props.dataColumns}
                                  onChange={this.handleOnChange2.bind(this)}
                                  value={this.state.singleValue}
                                  showNewOptionAtTop={false}
                                    isMulti={false}
                                />
                                <label>Split test</label>
                                <input
                                type="text"
                                name="splitTest"
                                placeholder={"Split test size"}
                                onChange={this.handleChangeST}
                                required
                                />
                                <label>K value</label>
                                <input
                                type="text"
                                name="kValue"
                                placeholder={"K value"}
                                onChange={this.handleChangeK}
                                required
                                />
                                <button disabled={this.props.dataColumns.length <= 0} className="btn green" >Submit</button>
                </form>
                            </div>)
    }
}

export default InputParams
