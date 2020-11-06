import React, { Component } from "react";

import classnames from "classnames";

import Loading from "components/Loading" 

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

    return <main className={dashboardClasses} />;
  }
}

export default Dashboard;
