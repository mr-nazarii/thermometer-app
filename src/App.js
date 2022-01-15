import React from "react";
import Modifier from "./components/Modifier.jsx";

import "./App.css";

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
