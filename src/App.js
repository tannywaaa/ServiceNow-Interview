import React, { Component } from "react";
import "./App.css";
import { Table } from "react-bootstrap";
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
      closed: [],
      addShow: false
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

        <Link
          to="/open"
          style={{ color: "black", textDecoration: "none", padding: "0" }}
        >
          <Card title={"Open"} number={this.state.open} />
        </Link>

        <Link
          to="/inprogress"
          style={{ color: "black", textDecoration: "none" }}
        >
          <Card title={"In Progress"} />
        </Link>

        <Link to="/closed" style={{ color: "black", textDecoration: "none" }}>
          <Card title={"Closed"} />
        </Link>

        <Link to="/resolved" style={{ color: "black", textDecoration: "none" }}>
          <Card title={"Resolved"} />
        </Link>

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
          <input type="text" id="number" name="number"></input>
        </td>
        <td>
          <input type="text" id="priority" name="priority"></input>
        </td>
        <td>
          <input type="text" id="sdescription" name="description"></input>
        </td>
        <td>
          <input type="text" id="category" name="category"></input>
        </td>
        <td>
          <input type="text" id="state" name="state"></input>
        </td>
        <td>
          <input type="text" id="created" name="created"></input>
        </td>
        <td>
          <button
            variant="primary"
            onClick={() => {
              this.add_new_incident();
            }}
          >
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
    date
  ) => {
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
        created: date
      })
    };
    //Attempt to insert
    fetch(URL + "/insertIncident", requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
  };
}
export default App;
