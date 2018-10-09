import React, { Component } from 'react';
import './App.css';
import Explore from './components/Explore';
import Search from './components/Search';
import Photo from './components/Photo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Explore} />
          <Route path="/photo/:id" component={Photo} />
          <Route path="/search" component={Search} />
        </div>
      </Router>
    );
  }
}

export default App;
