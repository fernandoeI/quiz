import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link, Redirect } from "react-router-dom";

import "./styles/QuizSummary.css";
import firebase from "../utils/firebase";
import "materialize-css/dist/css/materialize.min.css";

class QuizSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hintsUsed: 0,
      fiftyFiftyUsed: 0,
      user: "",
      isSignedIn: false,
      uid: null,
      player: null,
      profilePicture: null,
    };
  }

  componentDidMount() {
    const { state } = this.props.location;
    if (state) {
      this.setState({
        score: (state.score / state.numberOfQuestions) * 100,
        numberOfQuestions: state.numberOfQuestions,
        numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
        correctAnswers: state.correctAnswers,
        wrongAnswers: state.wrongAnswers,
        hintsUsed: state.hintsUsed,
        fiftyFiftyUsed: state.fiftyFiftyUsed,
        uid: state.uid,
        player: state.player,
        profilePicture: state.profilePicture,
      });

      // let query = userScore
      //   .where("user", "!=", null)
      //   .get()
      //   .then((snapshot) => {
      //     if (snapshot.empty) {
      //       console.log("No matching documents.");
      //       return;
      //     }

      //     snapshot.forEach((doc) => {
      //       console.log(doc.id, "=>", doc.data());
      //     });
      //   })
      //   .catch((err) => {
      //     console.log("Error getting documents", err);
      //   });
    }
  }

  saveData = () => {
    const db = firebase.firestore();
    const ref = db.collection("score").doc(this.state.uid);
    ref.get().then((doc) => {
      if (doc.exists) {
        const userRef = db.collection("score").doc(this.state.uid);
        const increaseBy = firebase.firestore.FieldValue.increment(
          this.state.correctAnswers
        );
        const increaseByAttempts = firebase.firestore.FieldValue.increment(1);
        userRef.update({
          score: this.state.score,
          correctAnswers: increaseBy,
          wrongAnswers: this.state.wrongAnswers,
          hintsUsed: this.state.hintsUsed,
          fiftyFiftyUsed: this.state.fiftyFiftyUsed,
          attempts: increaseByAttempts,
        });
      } else {
        db.collection("score")
          .doc(this.state.uid)
          .set({
            score: this.state.score,
            correctAnswers: this.state.correctAnswers,
            wrongAnswers: this.state.wrongAnswers,
            hintsUsed: this.state.hintsUsed,
            fiftyFiftyUsed: this.state.fiftyFiftyUsed,
            user: this.state.uid,
            attempts: 1,
            player: this.state.player,
            profilePicture: this.state.profilePicture,
          })
          .then(window.M.toast({ html: "Puntaje agregado correctamente" }))
          .catch((error) => {});
      }
    });
  };

  render() {
    const { state } = this.props.location;
    let stats, remark;
    const userScore = this.state.score;

    if (userScore <= 30) {
      remark = "¡Necesitas practicar más!";
    } else if (userScore > 30 && userScore <= 50) {
      remark = "¡Más suerte para la próxima!";
    } else if (userScore <= 70 && userScore > 50) {
      remark = "¡Puedes hacerlo mejor!";
    } else if (userScore >= 71 && userScore <= 84) {
      remark = "¡Lo hiciste genial!";
    } else {
      remark = "¡Eres un autentico choco!";
    }

    if (state !== undefined) {
      stats = (
        <Fragment>
          <div style={{ textAlign: "center" }}>
            <span className="mdi mdi-check-circle-outline success-icon"></span>
            <h4>La trivia ha finalizado</h4>
          </div>

          <div className="container stats">
            <h4>{remark}</h4>
            <h4>Tu puntaje es: {this.state.score.toFixed(0)}&#37;</h4>
            <span className="stat left">Numero total de preguntas: </span>
            <span className="right">{this.state.numberOfQuestions}</span>
            <br />
            <span className="stat left">Numero de preguntas contestadas: </span>
            <span className="right">
              {this.state.numberOfAnsweredQuestions}
            </span>
            <br />
            <span className="stat left">Numero de respuestas correctas: </span>
            <span className="right">{this.state.correctAnswers}</span> <br />
            <span className="stat left">
              Numero de respuestas incorrectas:{" "}
            </span>
            <span className="right">{this.state.wrongAnswers}</span>
            <br />
            <span className="stat left">Pistas usadas: </span>
            <span className="right">{this.state.hintsUsed}</span>
            <br />
            <span className="stat left">50-50 usados: </span>
            <span className="right">{this.state.fiftyFiftyUsed}</span>
          </div>
          <section>
            <ul>
              <li>
                <Link to="/ruleta" onClick={this.saveData}>
                  Jugar de nuevo
                </Link>
              </li>
              <li>
                <Link to="/" onClick={this.saveData}>
                  Volver al inicio
                </Link>
              </li>
            </ul>
          </section>
        </Fragment>
      );
    } else {
      stats = (
        <section>
          <h1 className="no-stats">No hay puntaje disponible</h1>
          <ul>
            <li>
              <Link to="/ruleta">Intentar la trivia</Link>
            </li>
            <li>
              <Link to="/">Volver al inicio</Link>
            </li>
          </ul>
        </section>
      );
    }
    return (
      <Fragment>
        <Helmet>
          <title>Trivia</title>
        </Helmet>
        <div className="quiz-summary">{stats}</div>
      </Fragment>
    );
  }
}

export default QuizSummary;
