import React, { Component } from 'react';
import Header from './Header';
// import './Headlines.css';

class Archives extends Component {
  // constructor(articles) {
  //   super();
  //   this.state = {
  //       articles: articles,
  //   }
  // }

  render() {
    return (
      <div className="Headlines">
          <Header/>
          {
            // (this.props.articles).map((article) =>
            // <div key={article.title}>
            //   <a href={article.link}>
            //     <h4> {article.title} </h4>
            //     <p> {article.summary} </p>
            //   </a>
            // </div>)
          }
      </div>
    );
  }
}

export default Archives;
