import React, { Fragment, Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import logo from "../assets/img/Logo.png";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import "./styles/Home.css";
import Score from "../components/Score";
import Loading from "../components/Loading";
class Home extends Component {
  state = {
    isSignedIn: false,
    user: null,
    player: null,
    profilePicture: null,
    isLoading: true,
  };
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  componentDidMount = () => {
    this.setState({ isLoading: false });
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
    const { isSignedIn, profilePicture, player, user, isLoading } = this.state;

    return isLoading ? (
      <Loading />
    ) : (
      <Fragment>
        <Helmet>
          <title>Turismo - Trivia</title>
        </Helmet>

        <div className="SubContent">
          {isSignedIn ? (
            <div>
              <div>
                <img src={logo} alt="Logo Turismo" width="200" />
              </div>
              <div className="col s12 m12 l12">
                <div className="card-panel grey lighten-5 z-depth-1">
                  <div className="row valign-wrapper">
                    <div className="col s12">
                      <img
                        src={firebase.auth().currentUser.photoURL}
                        alt="profile"
                        className="circle responsive-img col s2"
                      />
                      <span className="col s10 black-text">
                        Bienvenido {firebase.auth().currentUser.displayName}
                      </span>

                      <Score />
                      <div>
                        <button className="btn-push navy">
                          <Link
                            to={{
                              pathname: "/ruleta",
                              state: {
                                user: user,
                                player: player,
                                profilePicture: profilePicture,
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
              <div className="col s12 m2 l2">
                <button
                  className="btn-push red"
                  onClick={() => firebase.auth().signOut()}
                >
                  Salir
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <img src={logo} alt="Logo Turismo" width="200" />
              </div>
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default Home;
