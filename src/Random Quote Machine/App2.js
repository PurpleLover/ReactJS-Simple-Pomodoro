import React, { Component } from 'react';
import './App2.css';

const QUOTE_URL = 'https://talaikis.com/api/quotes/random/';
const TWEET_URL = 'https://twitter.com/intent/tweet?text=';
const EMPTY_STRING = '';

class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: EMPTY_STRING,
      author: EMPTY_STRING,
    };
  }

  componentWillMount = () => {
    this.getNewQuote();
  }

  formatQuoteToTweet = (quote) => {
    return quote.replace(/ /g, '%20');
    
  }

  getNewQuote = () => {
    fetch(QUOTE_URL)
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          text: resJson.quote,
          author: resJson.author
        });
      })
      .catch((err) => console.log('Error Throw: ' + err));
  }

  render() {
    return (
      <div className="container">
        <div id="quote-box">
          <blockquote id="text">{this.state.text}</blockquote>
          <p id="author">{'- ' + this.state.author}</p>
          <div className="actions">
            <div className="socials">
              <a href={TWEET_URL + this.formatQuoteToTweet(this.state.text) + ' ' + this.formatQuoteToTweet(this.state.author)} type="button" id="tweet-quote">Tweet</a>
            </div>
            <button id="new-quote" onClick={this.getNewQuote}>New Quote</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App2;