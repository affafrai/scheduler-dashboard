import React, { Component } from "react";

import classnames from "classnames";

import Loading from "components/Loading";

import Panel from "components/Panel";


// fake data
const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

class Dashboard extends Component {
  
  state = {
    Loading: false
  };
  // function to take an id and set the state of focused to the value of id.
  selectPanel(id) {
    this.setState(previousState => ({
      focused: previousState.focused !== null ? null : id
    }));
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
      id={panel.label}
      label={panel.label}
      value={panel.value}
      // pass our action from the Dashboard component to each Panel component as a prop.
      onSelect={event => this.selectPanel(panel.id)}

    />
    ));
    // Render the panels array as children of the main element.
    return <main className={dashboardClasses} >{panels}</main>;
  }
}

export default Dashboard;
