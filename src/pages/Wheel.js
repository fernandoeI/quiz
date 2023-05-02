import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Wheel from "../components/wheel/wheel";
import "./styles/Wheel.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.places = [
      "Cultura",
      "Tradiciones",
      "Gastronomía",
      "Naturaleza y Aventura",
      "Geografía",
    ];
    this.state = {
      uid: null,
      redirect: null,
      player: null,
      profilePicture: null,
    };
  }
  componentWillMount() {
    let prop = this.props.location.state;
    if (prop === undefined) {
      this.setState({ uid: null, redirect: "/" });
    } else {
      this.setState({
        uid: prop.user,
        redirect: null,
        player: prop.player,
        profilePicture: prop.profilePicture,
      });
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    } else {
      return (
        <div className="view">
          <div
            style={{
              backgroundColor: "#438633",
              paddingTop: 5,
            }}
          >
            <h1
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                color: "#FEDBB3",
                fontSize: "40pt",
              }}
            >
              Comencemos
            </h1>
          </div>
          <Wheel
            items={this.places}
            uid={this.state.uid}
            player={this.state.player}
            profilePicture={this.state.profilePicture}
          />

          <div
            style={{
              backgroundColor: "#438633",
              textAlign: "center",
              padding: 10,
            }}
          >
            <h1
              style={{
                fontWeight: "bolder",
                color: "#FEDBB3",
                fontSize: "4rem",
              }}
            >
              Toca la ruleta para girar
            </h1>
          </div>
        </div>
      );
    }
  }
}
