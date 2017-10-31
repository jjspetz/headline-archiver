import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

class LandingPage extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  getHeadlines = () => {
    console.log('pressed');
  }

  render() {
    return (
      <div>
        <div className="LandingPage">
          <h1>The News Archiver</h1>
          <Link to='/headlines'>
            <button className='btn btn-primary main-btn' onClick={this.getHeadlines}>
              Search the Headlines
            </button>
          </Link>
          <Link to='/archives'>
            <button className='btn btn-primary main-btn'>
              Peruse the Archives
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default LandingPage;
