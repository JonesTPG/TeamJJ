import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search"


import { fade } from "@material-ui/core/styles/colorManipulator";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import axios from "axios";
import "../App.css";
import { InputBase } from '@material-ui/core';



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


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          filter: ''
        }
    }

    setFilter = (e) => {
      this.setState({ filter: e.target.value });
      this.props.updateFilter(e.target.value);
    }
  

    render() {

        const { classes } = this.props;

        return ( 
            <div className="some-page-wrapper">
                <AppBar position="fixed">
                    <Toolbar className="appbar">
                    {this.props.backEnabled ? 
                    <Link to="/">
                        <Button>
                            <ArrowBackIosIcon className={classes.button} />
                        </Button>
                    </Link> 
                    
                    : null}
                    

                        <div className={classes.search}>
                        <div className={classes.searchIcon}>
                        
                        <SearchIcon/>
                        </div>
                          <InputBase
                            className="search"
                            value={this.state.filter}
                            onChange={this.setFilter}
                            placeholder="Etsi..."
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput
                            }}
                          >
                          </InputBase>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
         );
    }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
