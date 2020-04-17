import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuizInstructions from "./components/QuizInstructions";
import Play from "./components/Play";
import QuizSummary from "./components/QuizSummary";
import Config from "./pages/Config";
import Wheel from "./components/Wheel";
import Modal from "./components/Modal";

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/play/instructions" exact component={QuizInstructions} />
      <Route path="/play/quiz" exact component={Play} />
      <Route path="/play/quizSummary" exact component={QuizSummary} />
      <Route path="/config" exact component={Config} />
      <Route path="/ruleta" exact component={Wheel} />
      <Route path="/modal" exact component={Modal} />
    </Router>
  );
}
