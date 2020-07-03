import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import answer from "../assets/img/answer.png";
import fiftyFifty from "../assets/img/fiftyFifty.PNG";
import hints from "../assets/img/hints.PNG";
import options from "../assets/img/options.PNG";

import "./styles/QuizInstructions.css";

const QuizInstructions = () => (
  <Fragment>
    <Helmet>
      <title>Ayuda</title>
    </Helmet>
    <div className="instructions">
      <h1 className="h1">¿Cómo jugar?</h1>
      <p>Asegurate de leer esta guia hasta el final.</p>
      <ul className="browser-default" id="main-list">
        <li>El juego tiene una duración máxima de 3 minutos</li>
        <li>Cada partida consta de 20 preguntas.</li>
        <li>
          Cada pregunta tiene 4 opciones.
          <img className="img" src={options} alt="Quiz App options example" />
        </li>
        <li>
          Toca la opción que mejor responda la pregunta
          <img className="img" src={answer} alt="Quiz App answer example" />
        </li>
        <li>
          Cada partida tiene 7 ayudas:
          <ul id="sublist">
            <li>2 50-50 Pistas</li>
            <li>5 Pistas</li>
          </ul>
        </li>
        <li>
          Utiliza la 50-50 pista tocando el icono
          <span className="mdi mdi-set-center mdi-36px lifeline-icon"></span>
          eliminará 2 respuestas incorrectas, dejando la respuesta correcta y
          una incorrecta
          <img
            className="img"
            src={fiftyFifty}
            alt="Quiz App Fifty-Fifty example"
          />
        </li>
        <li>
          Utiliza 1 pista tocando el icono
          <span className="mdi mdi-lightbulb-on mdi-36px lifeline-icon"></span>
          eliminará una respuesta incorrecta dejando dos respuestas incorrectas
          y una correcta. Puede usar tantas sugerencias como sea posible en una
          sola pregunta.
          <img className="img" src={hints} alt="Quiz App hints example" />
        </li>
        <li>
          Siéntete libre de abandonar el juego en cualquier momento. En ese caso
          su puntaje no será revelado
        </li>
        <li>El temporizador comienza tan pronto como se carga el juego.</li>
        <li>Pon a prueba tus coonocimientos chocos.</li>
      </ul>
      <div>
        <span className="right">
          <Link to="/">Entiendo, regresar...</Link>
        </span>
      </div>
    </div>
  </Fragment>
);

export default QuizInstructions;
