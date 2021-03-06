import React, { Component } from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

import { fade } from "@material-ui/core/styles/colorManipulator";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import axios from "axios";
import "../App.css";

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: null,
      filter: "",
      selectedCourse: null,
      course_id: null //stores the currently selected course id
    };

    this.setSelectedCourse = this.setSelectedCourse.bind(this);
  }

  // fetch data from mlab database, add to courses
  componentDidMount() {
    this.setState({
      filter: this.props.filter
    });
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

  setSelectedCourse(course) {
    this.setState({ course_id: course });
  }

  render() {
    const { classes } = this.props;

    if (this.state.courses === null) {
      return "loading";
    }

    const filtered = this.state.courses.filter(
      course =>
        course.coursename
          .toLowerCase()
          .indexOf(this.props.filter.toLowerCase()) !== -1
    );

    return (
      <div className="some-page-wrapper">
        <React.Fragment>
          <div className="row">
            <div className="column">
              <List className={classes.root}>
                {filtered.slice(0, 12).map(course => (
                  <div className="listElement" key={course._id}>
                    <Link
                      to={{
                        pathname: "/course",
                        search: "?id=" + course._id
                      }}
                    >
                      <ListItem
                        className="listItem"
                        onClick={() => this.setSelectedCourse(course._id)}
                      >
                        {course.courseid}
                        <br />
                        {course.coursename}
                        <ListItemSecondaryAction>
                          <IconButton aria-label="Comments">
                            <ArrowForwardIos />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Link>
                    <Divider />
                  </div>
                ))}
              </List>
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

const styles = theme => ({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    marginRight: 10,
    width: 40,
    height: 40
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingBottom: 30
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  paper: {
    height: 600,
    width: 500
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 500,
      "&:focus": {
        width: 580
      }
    }
  }
});
Courses.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Courses);
