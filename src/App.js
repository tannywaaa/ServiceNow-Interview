import React, { Component } from "react";
import "./App.css";
import { Table } from "react-bootstrap";
import Card from "./components/Card";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>At A Glance</h3>
        <Card title={"aaa"} />
        <h3>All Incidents</h3>
        {this.incident_table()}
      </div>
    );
  }
  incident_table = () => {
    return (
      <div class="incident_table">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };
}

export default App;
