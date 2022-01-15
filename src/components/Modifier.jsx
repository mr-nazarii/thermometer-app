import React from "react";

import OutputParagrapgh from "./OutputParagrapgh.jsx";
import Temperature from "./Temperature.jsx";

class Modifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modify: this.props.modify,
      arr: [],
    };
  }

  historyOutput = (temp, room, time, action) => {
    const fullInfo = ` Action: ${action} | Temperature:${temp} | Time: ${time} | Room:${room} Room`;
    let exists = JSON.parse(localStorage.getItem("arr"));
    if (exists) {
      exists.push(fullInfo);
      const newArr = JSON.stringify(exists);
      localStorage.setItem("arr", newArr);
      this.setState({ arr: exists }, () => {
        let str = JSON.stringify(this.state.arr);

        localStorage.setItem("arr", str);
      });
    } else {
      this.setState({ arr: [...this.state.arr, fullInfo] }, () => {
        let str = JSON.stringify(this.state.arr);

        localStorage.setItem("arr", str);
      });
    }
  };

  handleMinus = (event) => {
    if (this.state.modify > 1) {
      this.setState({
        modify: this.state.modify - 1,
      });
    }
  };

  handlePlus = (event) => {
    if (this.state.modify < 5) {
      this.setState({
        modify: this.state.modify + 1,
      });
    }
  };

  localChecker() {
    let exists = localStorage.getItem("arr");
    if (exists) {
      return JSON.parse(exists);
    } else {
      return this.state.arr;
    }
  }

  button = () => {
    localStorage.removeItem("arr");
    this.setState({ arr: [] });
  };

  render() {
    return (
      <div className="main-wrapper">
        <div>
          <OutputParagrapgh arr={this.localChecker()} button={this.button} />
        </div>
        <div>
          <Temperature
            temperature={15}
            title={"Living"}
            min={0}
            max={25}
            modify={this.state.modify}
            historyOutput={this.historyOutput}
          />
          <Temperature
            temperature={12}
            title={"Bed"}
            min={3}
            max={23}
            modify={this.state.modify}
            historyOutput={this.historyOutput}
          />
          <div className="wrapper">
            <h2>Modifier</h2>
            <div className="app-container">
              <div className="temperature-display-container">
                <div className="temperature-display modifyer">
                  {this.state.modify}
                </div>
              </div>
              <div className="button-container">
                <button onClick={this.handleMinus}>-</button>
                <button onClick={this.handlePlus}>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modifier;
