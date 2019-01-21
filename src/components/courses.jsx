import React, { Component } from "react";
import SelectedCourse from "./selectedcourse";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import axios from "axios";
import "../App.css";

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

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    const { classes } = this.props;

    if (this.state.courses === null) {
      return "loading";
    }

    const filtered = this.state.courses.filter(
      course =>
        course.coursename
          .toLowerCase()
          .indexOf(this.state.filter.toLowerCase()) !== -1
    );

    return (
      <div className="some-page-wrapper">
        <React.Fragment>
          <div>
            <div>
              <AppBar position="fixed">
                <Toolbar className="appbar">
                  <img
                    src="https://image.flaticon.com/icons/svg/910/910350.svg"
                    className={classes.bigAvatar}
                    alt="The choice is yours"
                    style={{
                      margin: "0px 6px 0px -13px",
                      cursor: "pointer",
                      opacity: 0.8
                    }}
                  />
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon className="search" />
                    </div>

                    <InputBase
                      className="search"
                      value={this.state.filter}
                      onChange={this.setFilter}
                      placeholder="Hae kurssia..."
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                    />
                  </div>
                </Toolbar>
              </AppBar>
            </div>
            <div className="row">
              <div className="column">
                <div>
                  <List className={classes.root}>
                    {filtered.slice(0, 12).map(course => (
                      <div className="listElement" key={course._id}>
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
                        <Divider />
                      </div>
                    ))}
                  </List>
                </div>
              </div>
              <div className="column">
                <SelectedCourse courseid={this.state.course_id} />
              </div>
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}
Courses.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Courses);
