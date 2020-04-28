import React, { Component } from "react";
import "./App.css";
import { Table, Row, Col } from "react-bootstrap";
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
      //below states are used to count # for each state
      open: [],
      inprogress: [],
      resolved: [],
      closed: [],
      addShow: false,
      //the below states are used for insert incidents
      number: " ",
      priority: " ",
      description: " ",
      category: " ",
      state: " ",
      created: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "-")
    };
  }
  async componentDidMount() {
    this.get_all_data();
  }
  get_all_data = () => {
    console.log("getting all data");
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
  handleChange = event => {
    this.setState({ number: event.target.value });
  };
  handleChange2 = event => {
    this.setState({ priority: event.target.value });
  };
  handleChange3 = event => {
    this.setState({ description: event.target.value });
  };
  handleChange4 = event => {
    this.setState({ category: event.target.value });
  };
  handleChange5 = event => {
    this.setState({ state: event.target.value });
  };

  handleSubmit = event => {
    this.insert_incident(
      this.state.number,
      this.state.priority,
      this.state.description,
      this.state.category,
      this.state.state,
      this.state.created
    );

    alert("A number was submitted: " + this.state.number);
    event.preventDefault();
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
        <h5>At A Glance</h5>
        <Row>
          <Col xs={6} lg={3}>
            <Link to="/open" style={{ color: "black", textDecoration: "none" }}>
              <Card title={"Open"} number={this.state.open} />
            </Link>
          </Col>
          <Col xs={6} lg={3}>
            <Link
              to="/inprogress"
              style={{ color: "black", textDecoration: "none" }}
            >
              <Card title={"In Progress"} number={this.state.inprogress} />
            </Link>
          </Col>
          <Col xs={6} lg={3}>
            <Link
              to="/closed"
              style={{ color: "black", textDecoration: "none" }}
            >
              <Card title={"Closed"} number={this.state.closed} />
            </Link>
          </Col>
          <Col xs={6} lg={3}>
            <Link
              to="/resolved"
              style={{ color: "black", textDecoration: "none" }}
            >
              <Card title={"Resolved"} number={this.state.resolved} />
            </Link>
          </Col>
        </Row>
        <br />
        <br />
        <h5>All incidents</h5>
        {this.incident_table(displayrows)}

        <button
          onClick={() => {
            this.setState({ addShow: !this.state.addShow });
          }}
        >
          Create A New Incident
        </button>
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
          {this.state.addShow ? this.add_row() : <div></div>}
        </Table>
      </div>
    );
  };
  add_row = () => {
    return (
      <tr>
        <td>
          <input
            type="text"
            value={this.state.number}
            onChange={this.handleChange}
          />
        </td>
        <td>
          <input
            type="text"
            value={this.state.priority}
            onChange={this.handleChange2}
          />
        </td>
        <td>
          <input
            type="text"
            value={this.state.description}
            onChange={this.handleChange3}
          />
        </td>
        <td>
          <input
            type="text"
            value={this.state.category}
            onChange={this.handleChange4}
          />
        </td>

        <td>
          <input
            type="text"
            value={this.state.state}
            onChange={this.handleChange5}
          />
          {/* <Form.Control
            as="select"
            value={this.state.state}
            onChange={this.handleChange5}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
            <option>Resolved</option>
          </Form.Control> */}
        </td>
        <td>{this.state.created}</td>

        <td>
          <button variant="primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </td>
      </tr>
    );
  };

  insert_incident = (
    number,
    priority,
    short_description,
    category,
    state,
    created
  ) => {
    console.log("its happening", state);
    //parameters for insertion:
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number: number,
        priority: priority,
        short_description: short_description,
        category: category,
        state: state,
        sys_created_on: created,
        active: "true"
      })
    };
    //Attempt to insert
    fetch(
      "https://servicenow-ui-coding-challenge-api.netlify.app/.netlify/functions/server/insertIncident",
      requestOptions
    )
      .then(response => {
        if (!response.ok) {
          const error = response.statusText;
          alert(error);
          return Promise.reject(error);
        }

        response.json();
      })
      .then(data => this.get_all_data());
  };
}
export default App;
