import React, { Component } from "react";
import "./App.css";
import { Table } from "react-bootstrap";
import Card from "./components/Card";

const URL =
  "https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server/incidents";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incidents_all: [],
      open: [],
      inprogress: [],
      resolved: [],
      closed: []
    };
  }
  async componentDidMount() {
    const res = await fetch(URL);
    const api = await res.json();
    const incidents_all = api;

    console.log(incidents_all[0]);
    let open = 0,
      inprogress = 0,
      resolved = 0,
      closed = 0;

    api.forEach(element => {
      if (element.state === "Open") {
        open++;
      } else if (element.state === "In Progress") {
        inprogress++;
      } else if (element.state === "Resolved") {
        resolved++;
      } else if (element.state === "Closed") {
        closed++;
      }
    });
    console.log("open", open);

    this.setState({
      incidents_all,
      open: open,
      inprogress: inprogress,
      resolved: resolved,
      closed: closed
    });
  }
  render() {
    let displayrows = [];
    let item = this.state.incidents_all;

    for (let i = 0; i < item.length; i++) {
      let temp_row_element = (
        <tr>
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
      <div className="App">
        <h3>At A Glance</h3>
        <Card href="/" title={"aaa"} />
        <h3>All Incidents</h3>
        {this.incident_table(displayrows)}
      </div>
    );
  }
  incident_table = row_item => {
    return (
      <div class="incident_table">
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

export default App;
