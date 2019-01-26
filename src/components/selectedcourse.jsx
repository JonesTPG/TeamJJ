import React, { Component } from "react";
import Comment from "./comment";
import NewComment from "./newcomment";

import Rating from "./rating";
import axios from "axios";
import queryString from "query-string";
import Appbar from "./appbar";
import "../App.css";
import { throws } from "assert";

class SelectedCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: {
        rating: 0
      }, //stores the currently selected course's information
      comments: null, //stores the comments related to selected course
      id: null //NEW: gets the id from url
    };
  }

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    this.setState({
      id: parsed.id
    });
    this.getSelectedCourse(parsed.id);
    this.getComments(parsed.id); 
  }

  //this component is dependent from the course id it gets, so we have to listen to
  //possible changes
  componentDidUpdate(prevProps, prevState) {
    if (this.props.courseid !== prevProps.courseid) {
      this.getSelectedCourse(this.state.id);
      this.getComments(this.state.id);
    }
  }

  //fetches the selected course's information from the server. the id is given to this component as a prop
  getSelectedCourse = id => {
    axios.get("/api/course/" + id).then(response => {
      let data = JSON.parse(response.data);
      this.setState({
        selected: data
      });
      this.updateRatingBar();
    });
  };

  //fetch the comments of a certain course from the database
  getComments = id => {
    axios.get("/api/comments/" + id).then(response => {
      let data = JSON.parse(response.data);
      if (data.length === 0) {
        this.setState({
          comments: null
        });

        return;
      }
      this.setState({
        comments: data
      });
    });
  };

  //when a user posts a comment, this function is called from the child component.
  updateComments = () => {
    this.getComments(this.state.id);
  };

  updateRating = () => {
    this.getSelectedCourse(this.state.id);
   
  };

  updateRatingBar = () => {
    console.log('rating: ' + this.state.selected.rating)
    const element = document.getElementById("progress");
    const ratingPercentage = this.state.selected.rating * 20;
    const ratingString = ratingPercentage.toString() + "%";
    element.style["width"] = ratingString;
  };

  render() {
   

    
    //there are no comments, so don't render the comments list
    if (this.state.comments === null) {
      return (
        <div className="some-page-wrapper">
          <React.Fragment>
            
            <div className="selectedCourse">
              <div className="course-view">
                <h3>
                  {this.state.selected.coursename}{" "}
                  {this.state.selected.courseid}
                  <hr />
                </h3>
                <h4>Kurssin rating: {this.state.selected.rating}</h4>

                <div className="progress-bar">
                  <div id="progress" />
                </div>

                <Rating
                  courseId={this.state.id}
                  updateFunction={this.updateRating}
                />

                <div className="comments-list">
                  <p>Ei kommentteja.</p>

                  <div className="new-comment">
                    <NewComment
                      courseId={this.state.id}
                      updateFunction={this.updateComments}
                    />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        </div>
      );
    }

    //course is selected and it has comments, display the information
    else {
      return (
        <div>
         
          <div className="some-page-wrapper">
            <React.Fragment>
              <div className="row">
                <div className="column">
                  <div className="selectedCourse">
                    <div className="course-view">
                      <h3>
                        {this.state.selected.coursename}{" "}
                        {this.state.selected.courseid}
                        <hr />
                      </h3>
                      <h4>
                        Kurssin rating: {this.state.selected.rating.toFixed(2)}
                      </h4>

                      <div className="progress-bar">
                        <div id="progress" />
                      </div>

                      <Rating
                        courseId={this.state.id}
                        updateFunction={this.updateRating}
                      />
                      <div className="comments-list">
                        <ul>
                          {this.state.comments.map((comment, index) => (
                            <div key={comment._id}>
                              <Comment
                                text={comment.text}
                                upvotes={comment.upvotes}
                                downvotes={comment.downvotes}
                                username={comment.username}
                                commentId={comment._id}
                                index={index}
                              />{" "}
                              <hr />
                            </div>
                          ))}
                        </ul>
                      </div>

                      <div className="new-comment">
                        <NewComment
                          courseId={this.state.id}
                          updateFunction={this.updateComments}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          </div>
        </div>
      );
    }
  }
}

export default SelectedCourse;
