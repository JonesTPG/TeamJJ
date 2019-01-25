import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import "../App.css";

const styles = theme => ({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 40,
    height: 40
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    alignItems: "center",
    top: "auto",
    bottom: 0,
    backgroundColor: "#D1D7DC"
  },
  toolbar: {
    alignItems: "center"
  },
  poweredBy: {
    color: "#000",
    fontWeight: 600,
    margin: "0px 6px 8px 10px",
    alignItems: "center"
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
            <div className="footer-align">
              <img
                src="https://image.flaticon.com/icons/svg/910/910350.svg"
                className={classes.bigAvatar}
                alt="The choice is yours"
                style={{
                  margin: "0px 6px 8px -13px",
                  cursor: "pointer",
                  opacity: 0.8
                }}
              />
            </div>
            <p className={classes.poweredBy}> 2019 © Powered by Team J-I</p>
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
