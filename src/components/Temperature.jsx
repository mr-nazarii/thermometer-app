import React from "react";

class Temperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: this.props.temperature,
      min: this.props.min,
      max: this.props.max,
    };
  }

  handleMinus = (event) => {
    if (this.state.temperature > this.state.min) {
      if (this.state.temperature - this.props.modify < this.state.min) {
      } else {
        const temp = this.state.temperature;
        const room = this.props.title;
        const time = new Date().toLocaleString();
        const action = `-${this.props.modify}`;

        this.props.historyOutput(temp, room, time, action);
        this.setState({
          temperature: this.state.temperature - this.props.modify,
        });
      }
    }
  };

  handlePlus = (event) => {
    if (this.state.temperature < this.state.max) {
      if (this.state.temperature + this.props.modify > this.state.max) {
      } else {
        const temp = this.state.temperature;
        const room = this.props.title;
        const time = new Date().toLocaleString();
        const action = `+${this.props.modify}`;

        this.props.historyOutput(temp, room, time, action);
        this.setState({
          temperature: this.state.temperature + this.props.modify,
        });
      }
    }
  };

  getTempClassName = () => {
    let tempClassName = ["temperature-display"];

    if (this.state.temperature < 10) {
      tempClassName.push("cold");
    } else if (this.state.temperature > 17) {
      tempClassName.push("hot");
    } else {
      tempClassName.push("neutral");
    }
    return tempClassName.join(" ");
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <h2>{this.props.title} room</h2>
          <div className="app-container">
            <div className="temperature-display-container">
              <div className={this.getTempClassName()}>
                {this.state.temperature}
              </div>
            </div>
            <div className="button-container">
              <button onClick={this.handleMinus}>-</button>
              <button onClick={this.handlePlus}>+</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Temperature;
