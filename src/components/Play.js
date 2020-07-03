import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import M from "materialize-css";
import classnames from "classnames";
import "./styles/Play.css";
import "../../node_modules/@mdi/font/css/materialdesignicons.min.css";

import isEmpty from "../utils/is-empty";
import questions from "../questions.json";

import correctNotification from "../assets/audio/correct-answer.mp3";
import wrongNotification from "../assets/audio/wrong-answer.mp3";
import buttonSound from "../assets/audio/button-sound.mp3";

const shuffleArray = (questions) => {
  let i = questions.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;
  }
};

class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
      previousRandomNumbers: [],
      time: {},
      uid: null,
      redirect: null,
      categoria: null,
      player: null,
      profilePicture: null,
    };

    this.interval = null;
    this.correctSound = React.createRef();
    this.wrongSound = React.createRef();
    this.buttonSound = React.createRef();
  }

  filtrarPreguntas = (questions, categoria) => {
    let filteredList;
    filteredList = questions.filter(
      (questions) => questions.categoria === categoria
    );

    this.setState({ questions: filteredList });
  };
  //Esta línea fue la que le agregué para jalar los datos de firebase, el problema es que los datos los pone después de que jala los datos del json
  componentDidMount = () => {
    shuffleArray(this.state.questions);
    const {
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion,
    } = this.state;
    this.displayQuestions(
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion
    );
    this.startTimer();
  };
  componentWillMount = () => {
    let prop = this.props.location.state;
    this.filtrarPreguntas(this.state.questions, prop.categoria);

    if (prop === undefined) {
      this.setState({ uid: null, redirect: "/" });
    } else {
      this.setState({
        uid: prop.user,
        redirect: null,
        player: prop.player,
        profilePicture: prop.profilePicture,
      });
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState(
        {
          currentQuestion,
          nextQuestion,
          previousQuestion,
          numberOfQuestions: questions.length,
          answer,
          previousRandomNumbers: [],
        },
        () => {
          this.showOptions();
          this.handleDisableButton();
        }
      );
    } else {
      console.log("No question to display");
    }
  };

  handleOptionClick = (e) => {
    if (
      e.target.innerHTML.toString().toLowerCase() ===
      this.state.answer.toString().toLowerCase()
    ) {
      this.correctTimeout = setTimeout(() => {
        this.correctSound.current.play();
      }, 500);
      this.correctAnswer();
    } else {
      this.wrongTimeout = setTimeout(() => {
        this.wrongSound.current.play();
      }, 500);
      this.wrongAnswer();
    }
  };

  handleNextButtonClick = () => {
    this.playButtonSound();
    if (this.state.nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handlePreviousButtonClick = () => {
    this.playButtonSound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          this.displayQuestions(
            this.state.state,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      );
    }
  };

  handleQuitButtonClick = () => {
    this.playButtonSound();
    if (
      window.confirm("¿Está seguro que desea salir? (Perdera todo el progreso)")
    ) {
      this.props.history.push("/");
    }
  };

  handleButtonClick = (e) => {
    switch (e.target.id) {
      case "next-button":
        this.handleNextButtonClick();
        break;

      case "previous-button":
        this.handlePreviousButtonClick();
        break;

      case "quit-button":
        this.handleQuitButtonClick();
        break;

      default:
        break;
    }
  };

  playButtonSound = () => {
    this.buttonSound.current.play();
  };

  correctAnswer = () => {
    M.toast({
      html: "Respuesta Correcta!",
      classes: "toast-valid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  wrongAnswer = () => {
    M.toast({
      html: "Respuesta Incorrecta!",
      classes: "toast-invalid",
      displayLength: 1500,
    });
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        if (this.state.nextQuestion === undefined) {
          this.endGame();
        } else {
          this.displayQuestions(
            this.state.questions,
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion
          );
        }
      }
    );
  };

  showOptions = () => {
    const options = Array.from(document.querySelectorAll(".option"));

    options.forEach((option) => {
      option.style.visibility = "visible";
    });

    this.setState({
      usedFiftyFifty: false,
    });
  };

  handleHints = () => {
    if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toString().toLowerCase() ===
          this.state.answer.toString().toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });

      while (true) {
        const randomNumber = Math.round(Math.random() * 3);
        if (
          randomNumber !== indexOfAnswer &&
          !this.state.previousRandomNumbers.includes(randomNumber)
        ) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                previousRandomNumbers: prevState.previousRandomNumbers.concat(
                  randomNumber
                ),
              }));
            }
          });
          break;
        }
        if (this.state.previousRandomNumbers.length >= 3) break;
      }
    }
  };

  handleFiftyFifty = () => {
    if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
      const options = document.querySelectorAll(".option");
      const randomNumbers = [];
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toString().toLowerCase() ===
          this.state.answer.toString().toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });

      let count = 0;
      do {
        const randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAnswer) {
          if (
            randomNumbers.length < 2 &&
            !randomNumbers.includes(randomNumber) &&
            !randomNumbers.includes(indexOfAnswer)
          ) {
            randomNumbers.push(randomNumber);
            count++;
          } else {
            while (true) {
              const newRandomNumber = Math.round(Math.random() * 3);
              if (
                !randomNumbers.includes(newRandomNumber) &&
                newRandomNumber !== indexOfAnswer
              ) {
                randomNumbers.push(newRandomNumber);
                count++;
                break;
              }
            }
          }
        }
      } while (count < 2);

      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = "hidden";
        }
      });
      this.setState((prevState) => ({
        fiftyFifty: prevState.fiftyFifty - 1,
        usedFiftyFifty: true,
      }));
    }
  };

  startTimer = () => {
    const countDownTime = Date.now() + 180000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState(
          {
            time: {
              minutes: 0,
              seconds: 0,
            },
          },
          () => {
            this.endGame();
          }
        );
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
            distance,
          },
        });
      }
    }, 1000);
  };

  handleDisableButton = () => {
    if (
      this.state.previousQuestion === undefined ||
      this.state.currentQuestionIndex === 0
    ) {
      this.setState({
        previousButtonDisabled: true,
      });
    } else {
      this.setState({
        previousButtonDisabled: false,
      });
    }

    if (
      this.state.nextQuestion === undefined ||
      this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions
    ) {
      this.setState({
        nextButtonDisabled: true,
      });
    } else {
      this.setState({
        nextButtonDisabled: false,
      });
    }
  };

  endGame = () => {
    alert("¡El juego ha terminado!");
    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      fiftyFiftyUsed: 2 - state.fiftyFifty,
      hintsUsed: 5 - state.hints,
      uid: state.uid,
      player: state.player,
      profilePicture: state.profilePicture,
    };

    setTimeout(() => {
      this.props.history.push("/play/quizSummary", playerStats);
    }, 1000);
  };

  renderSwitch = (categoria) => {
    switch (categoria) {
      case 0:
        return <h2 className="h2">Cultura</h2>;
      case 1:
        return <h2 className="h2">Tradiciones</h2>;
      case 2:
        return <h2 className="h2">Gastronomía</h2>;
      case 3:
        return <h2 className="h2">Naturaleza</h2>;

      case 4:
        return <h2 className="h2">Geografía</h2>;
      default:
        return "foo";
    }
  };

  render() {
    let prop = this.props.location.state;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else {
      const {
        currentQuestion,
        currentQuestionIndex,
        fiftyFifty,
        hints,
        numberOfQuestions,
        time,
      } = this.state;

      return (
        <Fragment>
          <Helmet>
            <title>Trivia</title>
          </Helmet>
          <Fragment>
            <audio ref={this.correctSound} src={correctNotification}></audio>
            <audio ref={this.wrongSound} src={wrongNotification}></audio>
            <audio ref={this.buttonSound} src={buttonSound}></audio>
          </Fragment>
          <div className="quizView">
            <div className="questions">
              {this.renderSwitch(prop.categoria)}
              <div className="lifeline-container">
                <p>
                  <span
                    onClick={this.handleFiftyFifty}
                    className="mdi mdi-set-center mdi-36px lifeline-icon"
                  >
                    <span className="lifeline">{fiftyFifty}</span>
                  </span>
                </p>
                <p>
                  <span
                    onClick={this.handleHints}
                    className="mdi mdi-lightbulb-on-outline mdi-36px lifeline-icon"
                  >
                    <span className="lifeline">{hints}</span>
                  </span>
                </p>
              </div>
              <div className="timer-container">
                <p>
                  <span className="left" style={{ float: "left" }}>
                    {currentQuestionIndex + 1} de {numberOfQuestions}
                  </span>
                  <span
                    className={classnames("right valid", {
                      warning: time.distance <= 120000,
                      invalid: time.distance < 30000,
                    })}
                  >
                    {time.minutes}:{time.seconds}
                    <span className="mdi mdi-clock-outline mdi-24px"></span>
                  </span>
                </p>
              </div>
              <h5 className="h5">{currentQuestion.name}</h5>
              <div className="options-container">
                <p onClick={this.handleOptionClick} className="option">
                  {currentQuestion.optionA}
                </p>
                <p onClick={this.handleOptionClick} className="option">
                  {currentQuestion.optionB}
                </p>
              </div>
              <div className="options-container">
                <p onClick={this.handleOptionClick} className="option">
                  {currentQuestion.optionC}
                </p>
                <p onClick={this.handleOptionClick} className="option">
                  {currentQuestion.optionD}
                </p>
              </div>

              <div className="button-container">
                <button id="quit-button">Salir</button>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

export default Play;
