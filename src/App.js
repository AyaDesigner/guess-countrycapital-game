import './App.css';
import React from 'react';
import Game from './components/Game';
import Axios from 'axios';

// import Timer from './components/Timer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      loading: false,
      randomCountryObj: {},
      randomCapitals: [],
      rightAnswer: '',
      score: 0,
      finalMessage: '',
      rightAnswersCounter: 0,
      wrongAnswersCounter: 0,
      gameOver: false
    }
  }

  getCountries = () => {
    Axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => response.data)
      .then(data => {
        console.log(data[0]);
        this.setState({
          countries: data
        })
      })
      .then(this.getRandomCountryAndCapital)
      .then(data => {
        this.setState({
          loading: true
        })
      })
  }

  componentDidMount() {
    this.getCountries();
  }


  getRandomCountryAndCapital = () => {

    const random = this.state.countries[Math.floor(Math.random() * this.state.countries.length)];
    const randomCapital1 = this.state.countries[Math.floor(Math.random() * this.state.countries.length)];
    const randomCapital2 = this.state.countries[Math.floor(Math.random() * this.state.countries.length)];
    const randomCapital3 = this.state.countries[Math.floor(Math.random() * this.state.countries.length)];

    let arrWithAnswers = [];

    arrWithAnswers.push(randomCapital1.capital, randomCapital2.capital, randomCapital3.capital, random.capital);

    arrWithAnswers = arrWithAnswers.sort(() => Math.random() - 0.5);

    this.setState({
      randomCountryObj: random,
      randomCapitals: arrWithAnswers,
      rightAnswer: random.capital
    })

  }

  checkIfAnswerIsRight = (userAnswer) => {

    if (this.state.rightAnswer === userAnswer) {
      if (this.state.score + 2 >= 4) {
        this.setState({
          finalMessage: "Correct answers: " + (this.state.rightAnswersCounter + 1) + "/" + (this.state.rightAnswersCounter + this.state.wrongAnswersCounter + 1),
          gameOver: true
        })
      }
      this.setState({
        score: this.state.score + 2,
        rightAnswersCounter: this.state.rightAnswersCounter + 1
      })
    }
    else {
      this.setState({
        score: this.state.score - 1,
        wrongAnswersCounter: this.state.wrongAnswersCounter + 1
      })
    }
    this.getRandomCountryAndCapital()
  }


  restartGame = () => {
    this.setState({ 
      rightAnswer: '',
      score: 0,
      finalMessage: '',
      rightAnswersCounter: 0,
      wrongAnswersCounter: 0,
      gameOver: false
     });
  }


  render() {
    return (<div>
      {this.state.loading ? <Game
        countryObj={this.state.randomCountryObj}
        capitals={this.state.randomCapitals}
        answer={this.state.rightAnswer}
        score={this.state.score}
        checkAnswer={this.checkIfAnswerIsRight}
        finalMessage={this.state.finalMessage}
        gameOver={this.state.gameOver}
        restartGame={this.restartGame}
      /> : <p>Loading...</p>}

      {/* <div><Timer /></div> */}
      
    </div>);
  }
}

export default App;
