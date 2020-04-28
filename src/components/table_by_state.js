import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const URL =
  "https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server";
export class table_by_state extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents_all: [],
      count: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state !== this.props.state) {
      // nextProps.myProp has a different value than our current prop
      console.log("new update" + nextProps.state + " old: " + this.props.state);
      this.get_data_by_state(nextProps.state);
    }
  }
  componentDidMount() {
    this.get_data_by_state(this.props.state);
  }
  //get data based on its state inserted in app.js
  get_data_by_state = state_requested => {
    fetch(URL + "/incidentsByState?state=" + state_requested)
      .then(async res => {
        const api = await res.json();
        const incidents_all = api;

        // check for error response
        if (!res.ok) {
          const error =
            (incidents_all && incidents_all.message) || res.statusText;
          return Promise.reject(error);
        } else {
          let count_number = incidents_all.length;
          this.setState({ incidents_all, count: count_number });
        }
      })
      .catch(error => {
        // this.setState({ errorMessage: error });
        console.error("There was an error!", error);
      });
  };

  render() {
    if (this.props.state == null) {
      return <div />;
    }
    if (this.state.incidents_all == null) return <div />;
    let displayrows = [];
    let item = this.state.incidents_all;

    for (let i = 0; i < item.length; i++) {
      let temp_row_element = (
        <tr key={"incident by state" + i}>
          <td>{item[i].number}</td>
          <td>{item[i].priority}</td>
          <td>{item[i].short_description}</td>
          <td>{item[i].category}</td>
          <td>{item[i].state}</td>
          <td>{item[i].sys_created_on}</td>
        </tr>
      );
      displayrows.push(temp_row_element);
    }
    return (
      <div className="content">
        <h2>
          <Link to="/" style={{ textDecoration: "none" }}>
            ◂☰
          </Link>
          {this.props.state} &nbsp;
          <small>{this.state.count}</small>
        </h2>

        <br />
        {this.incident_table(displayrows)}
      </div>
    );
  }

  // display all incidents
  incident_table = row_item => {
    return (
      <div className="incident_table">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Number</th>
              <th>Priority</th>
              <th>Short description</th>
              <th>Category</th>
              <th>State</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>{row_item}</tbody>
        </Table>
      </div>
    );
  };
}
export default table_by_state;
