import React, { useState } from "react";
import Profile from "./profile";
import "./profile.css";
export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      filteredStudents: [],
      searchedTag: '',
      studentComponentRefs: {},
    };
this.updateTagSearch = this.updateTagSearch.bind(this);
  }
  compareName = (name, e) => {
    return name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
  };
  filterList = (e) => {
    const updatedList = this.state.students.filter((item) => {
      return (
        this.compareName(item.firstName, e) ||
        this.compareName(item.lastName, e) ||
        this.compareName(item.firstName + " " + item.lastName, e)
      );
    });
    this.setState({ filteredStudents: updatedList });
  };
updateTagSearch = (e) => {
  
  this.setState({searchedTag: e.target.value});
}
  componentDidMount() {
    fetch("https://api.hatchways.io/assessment/students")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            students: result.students,
            filteredStudents: result.students
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const searchNameBox = <input className="input-bar" type="text" onChange={this.filterList} placeholder="Search by name" />;
    const searchTagBox = <input className="input-bar" type="text" onChange={this.updateTagSearch }  placeholder="Search by tag"  />;

    const selectNameBox = this.state.filteredStudents.map((option) => {
      return(
      <li className="profile-list" key={option.firstName}>
        <Profile data={option} searchedTag={this.state.searchedTag} />
      </li>
    )});
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
          {searchNameBox}
          {searchTagBox}
          {selectNameBox && <ul>{selectNameBox}</ul>}
        </React.Fragment>
      );
    }
  }
}
