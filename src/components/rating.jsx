import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: "#2196f3"
  }
});

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRating: "",
      infoMessage: ""
    };
  }

  //if the user navigates to a new course, clear the previous rating
  componentDidUpdate(prevProps, prevState) {
    if (this.props.courseId !== prevProps.courseId) {
      this.clearRating();
    }
  }

  //submit the rating to the server
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.selectedRating === "") {
      console.log("ei arviointia");
      this.setState({
        infoMessage: "Valitse kurssille arvio asteikolla 1-5."
      });
      return;
    }
    console.log("annettu arviointi: " + this.state.selectedRating);

    //construct a json object which will be sent to the server
    let data = {
      rating: this.state.selectedRating.toString()
    };

    axios
      .post("/api/course/" + this.props.courseId + "/rating", data)
      .then(() => {
        this.setState({
          infoMessage: "Arvostelu tallennettu."
        });
        this.props.updateFunction();
      });
  };

  //clears the css classes so the stars appear black
  clearRating = () => {
    for (let i = 1; i <= 5; i++) {
      let element = document.getElementById(i + "-rating");
      element.classList.remove("checked");
    }
    this.setState({
      selectedRating: ""
    });
  };

  //updates the rating starts via css classes, and updates react state with correct rating value
  handleOptionChange = rating => {
    //when user gives a rating, make the stars orange up to the rated value
    for (let i = rating; i >= 1; i--) {
      let element = document.getElementById(i + "-rating");
      element.classList.add("checked");
    }
    //and if there was orange stars beyond the given rate, make them black again
    for (let i = rating + 1; i <= 5; i++) {
      let element = document.getElementById(i + "-rating");
      element.classList.remove("checked");
    }
    //update the state so we can send the given rate to api when user wants to
    this.setState({
      selectedRating: rating
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <p>Arvostele kurssi:</p>
        <form onSubmit={this.handleSubmit}>
          <span
            id="1-rating"
            className="fa fa-star"
            onClick={() => this.handleOptionChange(1)}
          />
          <span
            id="2-rating"
            className="fa fa-star"
            onClick={() => this.handleOptionChange(2)}
          />
          <span
            id="3-rating"
            className="fa fa-star"
            onClick={() => this.handleOptionChange(3)}
          />
          <span
            id="4-rating"
            className="fa fa-star"
            onClick={() => this.handleOptionChange(4)}
          />
          <span
            id="5-rating"
            className="fa fa-star"
            onClick={() => this.handleOptionChange(5)}
          />
          <Button
            type="submit"
            value="lähetä"
            variant="outlined"
            className={classes.button}
          >
            Arvostele
          </Button>
        </form>
        <p>{this.state.infoMessage}</p>
      </>
    );
  }
}

export default withStyles(styles)(Rating);
