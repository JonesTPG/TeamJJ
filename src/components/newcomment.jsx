import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../App.css";
import { Link } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: 2,
    color: "#2196f3"
  },
  buttonCancel: {
    margin: 2,
    color: "inherit"
  },
  a: {
    color: "inherit"
  }
});

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      message: null,
      multiline: "Controlled"
    };
  }

  //update state with the current comment text
  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    //prevent the page from reloading
    e.preventDefault();

    //check that the comment has some text and then send it to the server.
    if (this.state.text === null || this.state.text.length < 5) {
      this.setState({
        message: "Kommenttisi on liian lyhyt."
      });
      this.props.updateFunction();
    } else {
      //construct a json object which will be sent to the server
      let data = {
        text: this.state.text,
        courseId: this.props.courseId
      };
      axios
        .post("/api/comments/" + this.props.courseId, data)
        .then(response => {
          this.setState({
            message: "Kommentti tallennettu.",
            text: ""
          });
        });
      this.props.updateFunction();
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="my-form">
          <form onSubmit={this.handleSubmit}>
            <TextField
              className="textField"
              fullWidth
              label="Kirjoita kommentti"
              placeholder="Kirjoita kommentti"
              multiline
              value={this.state.text}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
            <div>
              <Button
                type="submit"
                value="lähetä"
                variant="outlined"
                className={classes.button}
              >
                Lähetä
              </Button>
              <Link to="/">
                <Button
                  color="inherit"
                  value="Peruuta"
                  variant="outlined"
                  className={classes.buttonCancel}
                >
                Peruuta
                </Button>
              </Link>
            </div>
          </form>
          <p>{this.state.message}</p>
        </div>
      </div>
    );
  }
}
NewComment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewComment);
