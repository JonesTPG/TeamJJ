import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import "../App.css";

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  paper: {
    paddingBottom: 50,
    backgroundColor: "#FEF!"
  },
  list: {
    marginBottom: theme.spacing.unit * 2
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "#D1D7DC"
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  poweredBy: {
    color: "#000",
    fontWeight: 600
  }
});

function Footer(props) {
  const { classes } = props;
  return (
    <div className="bottomBar">
      <React.Fragment>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <div className="footer">
              <p className={classes.poweredBy}> © Powered by Team J-I</p>
            </div>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
