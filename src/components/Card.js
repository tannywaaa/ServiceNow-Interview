import React, { Component } from "react";

export default class Card extends Component {
  render() {
    return (
      <div>
        <div className="card">
          <p style={{ paddingLeft: "5%", marginBottom: "0" }}>
            {this.props.title}
          </p>
          <hr className="horizontal_line" />
          <div class="container">
            <h4>{this.props.number}</h4>
          </div>
        </div>
      </div>
    );
  }
}
