import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Courses from "./components/courses";
import Footer from "./components/footer";
import SelectedCourse from "./components/selectedcourse";
import Error from "./components/error";
import About from "./components/about";

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/course" component={SelectedCourse} />
            <Route path="/about" component={About} />
            <Route path="/" component={Courses} exact />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </>
    );
  }
}

export default App;
