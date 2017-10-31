import React, { Component } from 'react';
import Header from './Header';
// import './Headlines.css';

class Headlines extends Component {
  constructor(props) {
    super(props);
    this.state = {
        articles: props.articles,
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

  remove = (a) => {
    console.log(this.state.articles.indexOf(a))
    this.state.articles.splice(this.state.articles.indexOf(a), 1);
    this.setState({ articles: this.state.articles });
    // console.log('removed pressed ' + a)
  }

  render() {
    return (
      <div className="Headlines">
          <Header/>
          {(this.state.articles).map((article) =>
            <div key={article.title}>
              <a href={article.link}>
                <h4> {article.title} </h4>
                <p> {article.summary} </p>
              </a>
              <button>
                Save
              </button>
              <button onClick={() => this.remove(article)}>
                X
              </button>
            </div>)
          }
      </div>
    );
  }
}

export default Headlines;
