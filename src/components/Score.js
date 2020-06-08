import React from "react";
import firebase from "../utils/firebase";
import "materialize-css/dist/css/materialize.min.css";

function Score() {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    const db = firebase.firestore();
    const unususbscribe = db
      .collection("score")
      .orderBy("correctAnswers", "desc")
      .limit(3)
      .onSnapshot((snapshot) => {
        const score = [];
        snapshot.forEach((doc) => score.push({ ...doc.data(), id: doc.id }));
        setScores(score);
      });
    return unususbscribe;
  }, []);

  return (
    <div className="Container">
      <div className="row">
        <table className="centered" style={{ color: "black" }}>
          <thead>
            <tr>
              <th colSpan="2">Usuario</th>
              <th>Puntaje</th>
              <th>Intentos</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score) => (
              <tr>
                <td>
                  <img
                    src={score.profilePicture}
                    alt="profile"
                    className="circle responsive-img col s8"
                  />
                </td>
                <td>{score.player}</td>
                <td>{score.correctAnswers}</td>
                <td>{score.attempts}</td>
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
    </div>
  );
}

export default Score;
