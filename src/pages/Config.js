import React from "react";
import firebase from "../utils/firebase";
import QuestionInput from "../components/QuestionInput";
import "materialize-css/dist/css/materialize.min.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function Config() {
  const [questions, setQuestions] = React.useState([]);
  const [newQuestionName, setNewQuestionName] = React.useState();
  const [newQuestionOptionA, setNewQuestionOptionA] = React.useState();
  const [newQuestionOptionB, setNewQuestionOptionB] = React.useState();
  const [newQuestionOptionC, setNewQuestionOptionC] = React.useState();
  const [newQuestionOptionD, setNewQuestionOptionD] = React.useState();
  const [newQuestionAnswer, setNewQuestionAnswer] = React.useState();

  React.useEffect(() => {
    const db = firebase.firestore();
    const unususbscribe = db.collection("questions").onSnapshot((snapshot) => {
      const questionData = [];
      snapshot.forEach((doc) =>
        questionData.push({ ...doc.data(), id: doc.id })
      );
      setQuestions(questionData);
    });
    return unususbscribe;
  }, []);

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("questions")
      .add({
        name: newQuestionName,
        answer: newQuestionAnswer,
        optionA: newQuestionOptionA,
        optionB: newQuestionOptionB,
        optionC: newQuestionOptionC,
        optionD: newQuestionOptionD,
      })
      .then(window.M.toast({ html: "Pregunta agregada correctamente" }))
      .catch((error) => {});
  };

  return (
    <div className="Container">
      {/* <!-- Navbar goes here -->

<!-- Page Layout here --> */}

      <div className="FormQuestions">
        <div className="col s12 m8 l9">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="pregunta"
                type="text"
                class="validate"
                value={newQuestionName}
                onChange={(e) => setNewQuestionName(e.target.value)}
              />
              <label for="pregunta" class="active">
                Pregunta
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input
                id="opcionA"
                type="text"
                class="validate"
                value={newQuestionOptionA}
                onChange={(e) => setNewQuestionOptionA(e.target.value)}
              />
              <label for="opcionA" class="active">
                Opción A
              </label>
            </div>

            <div className="input-field col s6">
              <input
                id="opcionB"
                type="text"
                class="validate"
                value={newQuestionOptionB}
                onChange={(e) => setNewQuestionOptionB(e.target.value)}
              />
              <label for="opcionB" class="active">
                Opción B
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input
                id="opcionC"
                type="text"
                class="validate"
                value={newQuestionOptionC}
                onChange={(e) => setNewQuestionOptionC(e.target.value)}
              />
              <label for="opcionC" class="active">
                Opción C
              </label>
            </div>

            <div className="input-field col s6">
              <input
                id="opcionD"
                type="text"
                class="validate"
                value={newQuestionOptionD}
                onChange={(e) => setNewQuestionOptionD(e.target.value)}
              />
              <label for="opcionD" class="active">
                Opción D
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input
                id="respuesta"
                type="text"
                class="validate"
                value={newQuestionAnswer}
                onChange={(e) => setNewQuestionAnswer(e.target.value)}
              />
              <label for="respuesta" class="active">
                Respuesta
              </label>
            </div>
            <div className="col s6">
              <button class="waves-effect waves-light btn" onClick={onCreate}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <ul class="collapsible">
          {questions.map((question) => (
            <li key={question.name}>
              <div class="collapsible-header">
                {question.name}
                <span className="badge">
                  <ExpandMoreIcon />
                </span>
              </div>
              <div class="collapsible-body">
                <QuestionInput question={question} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Config;
