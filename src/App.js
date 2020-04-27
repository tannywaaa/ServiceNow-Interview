import React, { Component } from "react";
import "./App.css";
import { Table, Col, Row } from "react-bootstrap";
import Card from "./components/card";
import TableByState from "./components/table_by_state";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const URL =
  "https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server";
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/open">
                <TableByState state={"Open"} />
              </Route>
              <Route path="/inprogress">
                <TableByState state={"In Progress"} />
              </Route>
              <Route path="/closed">
                <TableByState state={"Closed"} />
              </Route>
              <Route path="/resolved">
                <TableByState state={"Resolved"} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
class Home extends Component {
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
    this.get_all_data();
  }
  get_all_data = () => {
    fetch(URL + "/incidents")
      .then(async res => {
        const api = await res.json();
        const incidents_all = api;

        if (!res.ok) {
          // get error message from body or default to response statusText
          const error =
            (incidents_all && incidents_all.message) || res.statusText;
          return Promise.reject(error);
        } else {
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
      })
      .catch(error => {
        // this.setState({ errorMessage: error });
        console.error("There was an error!", error);
      });
  };
  render() {
    if (this.state.incidents_all == null) return <div />;
    let displayrows = [];
    let item = this.state.incidents_all;

    for (let i = 0; i < item.length; i++) {
      let temp_row_element = (
        <tr key={"all incidents" + i}>
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
        <h3>At A Glance</h3>
        <Link to="/">Home</Link>
        <Row>
          <Col>
            <Link to="/open" style={{ color: "black", textDecoration: "none" }}>
              <Card title={"Open"} number={this.state.open} />
            </Link>
          </Col>
          <Col>
            <Link
              to="/inprogress"
              style={{ color: "black", textDecoration: "none" }}
            >
              <Card title={"In Progress"} />
            </Link>
          </Col>
          <Col>
            <Link
              to="/closed"
              style={{ color: "black", textDecoration: "none" }}
            >
              <Card title={"Closed"} />
            </Link>
          </Col>
          <Col>
            <Link
              to="/resolved"
              style={{ color: "black", textDecoration: "none" }}
            >
              <Card title={"Resolved"} />
            </Link>
          </Col>
        </Row>
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
export default App;
