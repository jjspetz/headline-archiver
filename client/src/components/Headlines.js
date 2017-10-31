import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios'
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
        this.setState({ articles: data.headlines });
      });
  }

  remove = (article) => {
    // console.log(this.state.articles.indexOf(article))
    this.state.articles.splice(this.state.articles.indexOf(article), 1);
    this.setState({ articles: this.state.articles });
  }

  addArchive = (article) => {
    // console.log(this.state.articles.indexOf(article))
    axios.post('/archive/' + article.title, article)
           .catch(err => {
               console.log(err);
           })
  }

  render() {
    return (
      <div className="Headlines">
          <Header/>
          {(this.state.articles).map((article) =>
            <div key={article.title}>
              <a href={article.link} target='_blank'>
                <h4> {article.title} </h4>
                <p> {article.summary} </p>
              </a>
              <button onClick={() => this.addArchive(article)}>
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
