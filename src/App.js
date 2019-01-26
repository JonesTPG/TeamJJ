import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Courses from "./components/courses";
import Footer from "./components/footer";
import SelectedCourse from "./components/selectedcourse";
import Error from "./components/error";
import About from "./components/about";
import Header from "./components/header";

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = { 
      filter: ''
    }
  }


  handleFilter = (newFilter) => {
    console.log("uusi filter:" + newFilter);
    this.setState({filter: newFilter});
  }

  
  render() {
    
    return (
      <>   
        <BrowserRouter>
        <div>
          <Header 
            updateFilter={this.handleFilter}
            backEnabled={this.state.backEnabled}
          />
            <Switch>
              <Route path="/course" component={SelectedCourse} />
              <Route path="/about" component={About} />
              <Route path="/" 
                     render={(routeProps) => (<Courses {...routeProps} 
                      filter={this.state.filter}/>)} 
                      exact />
              <Route component={Error} />
            </Switch>
        </div>
        </BrowserRouter>
        <Footer />
      </>
    );
  }
}

export default App;
