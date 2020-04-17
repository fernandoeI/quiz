import React, { Fragment, Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import logo from "../assets/img/Logo.png";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import classes from "./styles/Home.module.css";

const videoSource = "https://quizsierra.000webhostapp.com/sparkling_water.mp4";
class Home extends Component {
  state = { isSignedIn: false };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
      console.log("user", user);
    });
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Turismo - Quiz</title>
        </Helmet>
        <div className={classes.Container}>
          <video autoPlay="autoplay" loop="loop" className="">
            <source src={videoSource} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={classes.Content}>
            <div className={classes.SubContent}>
              <div style={{ textAlign: "center" }}>
                <img src={logo} alt="Logo Turismo" width="250" />
              </div>
              <h1></h1>

              {this.state.isSignedIn ? (
                <div>
                  <div class="col s12 m8 offset-m2 l6 offset-l3">
                    <div class="card-panel grey lighten-5 z-depth-1">
                      <div class="row valign-wrapper">
                        <div class="col s2">
                          <img
                            src={firebase.auth().currentUser.photoURL}
                            alt="profile picture"
                            class="circle responsive-img"
                          />
                        </div>
                        <div class="col s10">
                          <span class="black-text">
                            Bienvenido {firebase.auth().currentUser.displayName}
                          </span>
                          <button
                            onClick={() => firebase.auth().signOut()}
                            className="btn"
                          >
                            Cerrar Sesión!
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link to="/ruleta" className={classes.BtnPlay}>
                        JUGAR
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
