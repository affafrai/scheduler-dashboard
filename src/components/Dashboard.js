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

  render() {
    const dashboardClasses = classnames("dashboard");
    // show Loading component when the state is loading
    if (this.state.Loading){
      return <Loading />
    }
    // Map over the data array and create a new Panel for each of the four data objects
    const panels = data.map(panel => (
      <Panel
      key={panel.id}
      id={panel.id}
      label={panel.label}
      value={panel.value}
      />
    ));
    // Render the panels array as children of the main element.
    return <main className={dashboardClasses} >{panels}</main>;
  }
}

export default Dashboard;
