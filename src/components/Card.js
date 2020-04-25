import React, { Component } from "react";

export default class Card extends Component {
  render() {
    return (
      <div>
        <div className="card">
          <p style={{ paddingLeft: "5%" }}>{this.props.title}</p>
          <hr
            style={{
              height: "1px",
              width: "70%",
              color: "gray",
              backgroundColor: "gray",
              marginTop: "0.1%"
            }}
          />
        </div>
      </div>
    );
  }
}
