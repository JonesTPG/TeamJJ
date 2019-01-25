import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import axios from "axios";
import "../App.css";

const styles = theme => ({
  button: {
    color: "#fff"
  }
});

class Appbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backEnabled: false,
      courses: null,
      filter: "",
      selectedCourse: null,
      course_id: null //stores the currently selected course id
    };
    this.setFilter = this.setFilter.bind(this);
    this.setSelectedCourse = this.setSelectedCourse.bind(this);
  }

  // fetch data from mlab database, add to courses
  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    axios.get("/api/all").then(response => {
      let data = JSON.parse(response.data);
      this.setState({
        courses: data
      });
    });
  };

  setFilter(e) {
    this.setState({ filter: e.target.value });
  }

  setSelectedCourse(course) {
    this.setState({ course_id: course });
  }

  render() {
    const { backEnabled } = this.state;
    const { classes } = this.props;

    if (this.state.courses === null) {
      return "loading";
    }

    return (
      <div className="some-page-wrapper">
        <React.Fragment>
          <AppBar position="fixed">
            <Toolbar className="appbar">
              <div>
                <Button>
                  <Link to="/">
                    <ArrowBackIosIcon className={classes.button} />
                  </Link>
                </Button>
                {backEnabled}
              </div>
            </Toolbar>
          </AppBar>
        </React.Fragment>
      </div>
    );
  }
}
Appbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Appbar);
