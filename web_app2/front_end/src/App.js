/*Try to do react imports before the local imports*/
import React, { Component } from 'react';
import axios from 'axios';

import Header from './modules/header/header.js'
import Content from './modules/content/content.js'
import Auth from './modules/auth/auth.js'
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor(props) {
    super(props);
    this.whichTab = this.whichTab.bind(this);
    this.state = {tab: 0};
  }


      whichTab = (filterValue) =>  {
        if(filterValue!==this.state.tab){
        this.setState({tab: filterValue});
      }
    }

  
  render() {
    return ( 

      <div className="App">
        <Header tabFunc={this.whichTab}></Header>

        <Content dataTab={this.state.tab}></Content>
        <Auth></Auth>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>

    );
  }
}

export default App;
