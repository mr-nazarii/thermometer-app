import React from "react";

import "./App.css";

class OutputParagrapgh extends React.Component {
  render() {
    let date = new Date();
    return (
      <>
        <div className="wrapper info-wrapper">
          <ul className="info">
            {this.props.arr.map((el) => {
              return (
                <li
                  key={el + date.getTime().toLocaleString()}
                  className="info-el"
                >
                  {el}
                </li>
              );
            })}
          </ul>
          <button id="del" onClick={this.props.button}>
            Reset History
          </button>
        </div>
      </>
    );
  }
}

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

class App extends React.Component {
  render() {
    return (
      <div>
        <Modifier modify={3} />
      </div>
    );
  }
}

export default App;
