import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import "./styles/Rewards.css";

const QuizInstructions = () => (
  <Fragment>
    <Helmet>
      <title>Recompensas</title>
    </Helmet>
    <div className="rewards">
      <h2 className="header center">Recompensas</h2>

      <div className="col s12 m6">
        <div className="card horizontal">
          <div className="card-image">
            <img
              src="https://lorempixel.com/100/190/nature/6"
              alt="recompensa1"
            />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <p>2x1 en Hoteles Misión "Villahermosa"</p>
              <ul>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Nunc maximus justo at ex dapibus lacinia.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="col s12 m6">
        <div className="card horizontal">
          <div className="card-image">
            <img
              src="https://lorempixel.com/100/190/nature/6"
              alt="recompensa2"
            />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <p>2x1 en Hoteles Misión "Villahermosa"</p>
              <ul>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Nunc maximus justo at ex dapibus lacinia.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span className="right">
          <Link to="/">Entiendo, regresar...</Link>
        </span>
      </div>
    </div>
  </Fragment>
);

export default QuizInstructions;
