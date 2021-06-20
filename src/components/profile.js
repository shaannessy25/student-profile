import React, { useState } from "react";
import "./profile.css";
import InputTag from "./input-tag/input-tag";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      profile: props.data,
      displayScores: false,
      tags: []
    };

    this.displayScores = this.displayScores.bind(this);
    this.handleTags = this.handleTags.bind(this);
  }

  displayScores() {
    this.setState({ displayScores: !this.state.displayScores });
  }
  //input: grades : array of grades
  calculateAverage(grades) {
    //Method calculates grade average of students
    //avg = sum of numbers / totoal numbers
    let average = 0;
    let total = 0;
    for (let i = 0; i < grades.length; i++) {
      total = total + parseInt(grades[i]);
    }
    average = total / grades.length;
    return `${average.toFixed(2)}%`;
  }
  handleTags(tag) {
    let updatedTags = this.state.tags;
    updatedTags.push(tag);
    this.setState({ tags: updatedTags });
  }

  

  render() {
    const display = this.props.searchedTag !== '' ?
      this.state.tags.includes(this.props.searchedTag) ? true : false : true;
    return (
      display && (
        <div>
        <div className="profile-card">
          <img className="profile-pic" src={this.state.profile.pic} alt="profile picture" />
          <div>
            <h3>
              {" "}
              {this.state.profile.firstName} {this.state.profile.lastName}{" "}
            </h3>
            <p>Email: {this.state.profile.email}</p>
            <p>Company: {this.state.profile.company}</p>
            <p>Skill: {this.state.profile.skill} </p>
            <p>Average: {this.calculateAverage(this.state.profile.grades)} </p>
            <InputTag onUpdateTags={this.handleTags} />
            {this.state.displayScores &&
            this.state.profile.grades.map((grade, idx) => {
              return (
                <ul>
                  <li>
                    <span>
                      Test {idx + 1}: {grade}%{" "}
                    </span>
                  </li>
                </ul>
              );
            })}
          </div>
          <button onClick={this.displayScores} className="plus-btn"><i className={this.state.displayScores ? 'fas fa-minus' : 'fas fa-plus'}></i></button>
          </div>


        </div>
      )
    );
  }
}
