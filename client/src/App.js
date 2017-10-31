import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Headlines from './components/Headlines';
import Archives from './components/Archives';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
        articles: [],
    }
  }

  componentDidMount() {
    fetch('/data')
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({ articles: data });
      });
  }

  render() {
    return (
      <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        {<Route path='/headlines' render={(props) => (<Headlines articles={this.state.articles}/>)}/>}
        <Route path='/archives' component={Archives}/>
      </Switch>
      </div>
    );
  }
}

export default App;
