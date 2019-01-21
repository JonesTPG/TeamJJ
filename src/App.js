import React, { Component } from "react";
import "./App.css";
import Courses from "./components/courses";
import Footer from "./components/footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Courses />
        <Footer />
      </div>
    );
  }
}

export default App;
