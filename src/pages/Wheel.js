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
      "Turismo y Aventura",
      "Geografía",
      "Naturaleza",
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
        <div>
          <div style={{ backgroundColor: "#035F00" }}>
            <h1
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                color: "#FEDBB3",
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
        </div>
      );
    }
  }
}
