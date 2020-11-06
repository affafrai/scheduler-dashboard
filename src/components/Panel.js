import React, {Component} from "react";

 

// represent each of the four panels; we will pass the relevant data to each one.
export default class Panel extends Component {

  render() {
    // ++destructure id and onSelect since we use them in Dashboard
    const { label, value, onSelect } = this.props;

    return (
      <section 
      // we pass onSelect fuction from dashboard to activate focused on click
        className="dashboard__panel"onClick={onSelect}>
        <h1 className="dashboard__panel-header">{label}</h1>
        <p className="dashboard__panel-value">{value}</p>
      </section>
    );
  }
}