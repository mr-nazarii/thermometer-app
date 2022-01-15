import React from "react";

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

export default OutputParagrapgh;
