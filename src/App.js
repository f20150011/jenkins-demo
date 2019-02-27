import React, { Component } from 'react';
import './App.css';

import SearchForm from "./components/searchform";
import Menu from "./components/router";

class App extends Component {
  render() {
    return (
      <div>
        React
        {/* <SearchForm>Search Form</SearchForm> */}
        <Menu></Menu>
        {/* <router-outlet></router-outlet> */}
      </div> // everything must be inside a root element cant add two dom elements
    );
  }
}

export default App;
