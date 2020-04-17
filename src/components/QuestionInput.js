import React from "react";
import firebase from "../utils/firebase";

const QuestionInput = ({ question }) => {
  const [name, setName] = React.useState(question.name);
  const [optionA, setOptionA] = React.useState(question.optionA);
  const [optionB, setOptionB] = React.useState(question.optionB);
  const [optionC, setOptionC] = React.useState(question.optionC);
  const [optionD, setOptionD] = React.useState(question.optionD);
  const [answer, setAnswer] = React.useState(question.answer);

  const onUpdate = () => {
    const db = firebase.firestore();
    db.collection("questions")
      .doc(question.id)
      .set({ ...question, name, optionA, optionB, optionC, optionD, answer })
      .then(() =>
        window.M.toast({ html: "Pregunta actualizada correctamente" })
      )
      .catch((error) => {
        window.M.toast({
          html: "Fallo al actualizar la pregunta. Intente más tarde",
        });
      });
  };

  const onDelete = () => {
    const db = firebase.firestore();
    db.collection("questions")
      .doc(question.id)
      .delete()
      .then(() => window.M.toast({ html: "Pregunta eliminada correctamente" }))
      .catch((error) => {
        window.M.toast({
          html: "Fallo al eliminar la pregunta. Intente más tarde",
        });
      });
  };

  return (
    <>
      <div className="row">
        <div className="input-field col s12">
          <input
            id="pregunta"
            type="text"
            class="validate"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
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
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
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
            value={optionC}
            onChange={(e) => setOptionC(e.target.value)}
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
            value={optionD}
            onChange={(e) => setOptionD(e.target.value)}
          />
          <label for="opcionD" class="active">
            Opción D
          </label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6">
          <input
            id="answer"
            type="text"
            class="validate"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <label for="answer" class="active">
            Respuesta
          </label>
        </div>

        <button className="waves-effect waves-light btn" onClick={onUpdate}>
          Actualizar
        </button>

        <button className="waves-effect waves-light btn" onClick={onDelete}>
          Eliminar
        </button>
      </div>
    </>
  );
};

export default QuestionInput;
