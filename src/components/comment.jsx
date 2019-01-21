import React, { Component } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import ThumbsUpIcon from "@material-ui/icons/ThumbUp";
import ThumbsDownIcon from "@material-ui/icons/ThumbDown";
import "../App.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";



class Comment extends Component {
  constructor(props) {
    super(props);

    // const {text, upvotes, downvotes, username} = props;
    // console.log(text, upvotes, downvotes, username)

    this.state = {
      increment: 0,
      decrement: 0
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {
    //get upvotes and downvotes for the specific comment
    axios.get("/api/comment/" + this.props.commentId).then(response => {
      var data = JSON.parse(response.data);
      this.setState({
        increment: data.upvotes,
        decrement: -data.downvotes
      });
    });
  }

  increment() {
    //post request add upvote

    let data = {
      vote: "upvote"
    };

    axios
      .post("/api/comment/" + this.props.commentId + "/vote", data)
      .then(response => {
        this.setState({
          increment: this.state.increment + 1
        });
      });
  }

  decrement() {
    let data = {
      vote: "downvote"
    };

    axios
      .post("/api/comment/" + this.props.commentId + "/vote", data)
      .then(response => {
        this.setState({
          decrement: this.state.decrement - 1
        });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="commentWriter">Anonymous</div>
        <strong>kommentti {this.props.index + 1}</strong>
        <p className="comment-text">{this.props.text}</p>
        <div>
          {this.state.increment}
          <IconButton
            aria-label="ThumbUp"
            className={classes.button}
            onClick={this.increment}
          >
            <ThumbsUpIcon />
          </IconButton>
          <IconButton
            aria-label="Delete"
            onClick={this.decrement}
            className={classes.button}
          >
            <ThumbsDownIcon />
          </IconButton>
          {this.state.decrement}
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  button: {
    color: "#2196f3"
  }
});

Comment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comment);
