import React, { Fragment, Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import logo from "../assets/img/Logo.png";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import classes from "./styles/Home.module.css";
import Score from "../components/Score";

const videoSource = "https://quizsierra.000webhostapp.com/fondo.mp4";
class Home extends Component {
  state = { isSignedIn: false, user: null, player: null, profilePicture: null };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isSignedIn: true,
          user: user.uid,
          player: user.displayName,
          profilePicture: user.photoURL,
        });
      } else {
        this.setState({ isSignedIn: false });
      }
    });
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Turismo - Quiz</title>
        </Helmet>
        <div className={classes.Container}>
          <video autoPlay="autoplay" loop="loop">
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
                  <div className="col s12 m12 l12">
                    <div className="card-panel grey lighten-5 z-depth-1">
                      <div className="row valign-wrapper">
                        <div className="col s12">
                          <img
                            src={firebase.auth().currentUser.photoURL}
                            alt="profile"
                            className="circle responsive-img"
                          />
                          <span className="col s12 black-text">
                            Bienvenido {firebase.auth().currentUser.displayName}
                          </span>

                          <Score />
                          <div className="button">
                            <button className="btn-push navy">
                              <Link
                                to={{
                                  pathname: "/ruleta",
                                  state: {
                                    user: this.state.user,
                                    player: this.state.player,
                                    profilePicture: this.state.profilePicture,
                                  },
                                }}
                                style={{ color: "#FFF" }}
                              >
                                JUGAR
                              </Link>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col s12 m5 l5 button">
                    <button
                      className="btn-push red"
                      onClick={() => firebase.auth().signOut()}
                    >
                      Salir
                    </button>
                  </div>
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
