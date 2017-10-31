import React, { Component } from 'react';
import Header from './Header';
// import './Headlines.css';

class Archives extends Component {
  constructor(props) {
    super(props);
    this.state = {
        articles: props.archived,
    }
  }

  render() {
    return (
      <div className="Archived">
          <Header/>
          {
            (this.state.articles).map((article) =>
            <div key={article.title}>
              <a href={article.link}>
                <h4> {article.title} </h4>
                <p> {article.summary} </p>
              </a>
            </div>)
          }
      </div>
    );
  }
}

export default Archives;
