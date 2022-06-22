
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
   size="15";
   apiKey=process.env.REACT_APP_NEWS_KEY
   state={
      progress:0
   }
   setProgress=(progress)=>{
     this.setState({progress:progress})
   }

  render() {
    return (
      
      <div>
        <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        
      />
        <NavBar/>
        {/* <News  apiKey={this.apiKey}  pageSize={this.size} key="general" country="in" category="general"/> */}
        {/* in react router
use exact for exact matching and re-rendering  of components.
use unique key for every components inside components. */}

        <Routes>
        <Route exact path="/sports"   element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="sports" pageSize={this.size} country="in" category="sports"/>} />
        <Route exact path="/health"  element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="health" pageSize={this.size} country="in" category="health"/>} />
        <Route exact path="/business"  element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="business" pageSize={this.size} country="in" category="business"/>} />
        <Route exact path="/entertainment"  element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="entertinment" pageSize={this.size} country="in" category="entertainment"/>} />
        <Route exact path="/general"   element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" pageSize={this.size} country="in" category="general"/>} />
        <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="science" pageSize={this.size} country="in" category="science"/>} />
        <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="technology" pageSize={this.size} country="in" category="technology"/>} />
        
      </Routes>
             
      </Router>
      </div>
      
    )
  }
}

