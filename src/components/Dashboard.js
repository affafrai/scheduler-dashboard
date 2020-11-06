import React, { Component } from "react";

import classnames from "classnames";

import Loading from "components/Loading";

import Panel from "components/Panel";

import axios from 'axios';

import { setInterview } from "helpers/reducers";

// Import the four helper functions
import {
  getTotalInterviews,
  getLeastPopularTimeSlot,
  getMostPopularDay,
  getInterviewsPerDay
 } from "helpers/selectors";


// fake data
const data = [
  {
    id: 1,
    label: "Total Interviews",
    getValue: getTotalInterviews
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    getValue: getLeastPopularTimeSlot
  },
  {
    id: 3,
    label: "Most Popular Day",
    getValue: getMostPopularDay
  },
  {
    id: 4,
    label: "Interviews Per Day",
    getValue: getInterviewsPerDay
  }
];

class Dashboard extends Component {
  
  state = {
    loading: true,
    focused: null,
    days: [],
    appointments: {},
    interviewers: {}
   };
  // function to take an id and set the state of focused to the value of id.
  selectPanel(id) {
    this.setState(previousState => ({
      focused: previousState.focused !== null ? null : id
    }));
  }
  // check to see if there is saved focus state after we render the application the first tim
  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem("focused"));
    if (focused) {
      this.setState({ focused });
    }
    // When the component mounts we want to request our data
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(([days, appointments, interviewers]) => {
      this.setState({
        loading: false,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data
      });
    });
    
    this.socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    this.socket.onmessage = event => {
      const data = JSON.parse(event.data);
    
      if (typeof data === "object" && data.type === "SET_INTERVIEW") {
        this.setState(previousState =>
          setInterview(previousState, data.id, data.interview)
        );
      }
    };

  }
  // listen for changes to the state
  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }
  // for the cleanup
  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    // conditionally apply a CSS class to the Dashboard root element. It is the dashboard--focused class.
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
     });
    // show Loading component when the state is loading
    if (this.state.Loading){
      return <Loading />
    }

    // Map over the data array and create a new Panel for each of the four data objects
        // Use the this.state.focused value to filter panel data before converting it to components.

    const panels = data
    .filter(
      panel => this.state.focused === null || this.state.focused === panel.id
    )
    .map(panel => (
    <Panel
      key={panel.id}
      label={panel.label}
      // update our render function to look up the value with the latest state each time.
      value={panel.getValue(this.state)}
      // pass our action from the Dashboard component to each Panel component as a prop.
      onSelect={event => this.selectPanel(panel.id)}

    />
    ));
    // Render the panels array as children of the main element.
    return <main className={dashboardClasses} >{panels}</main>;
  }
}

export default Dashboard;
