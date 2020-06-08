import React from "react";
import "./styles/Modal.css";

//importacion de iconos
import CulturaIcon from "@material-ui/icons/AccountBalance";
import TradicionIcon from "@material-ui/icons/EmojiPeople";
import GastronomiaIcon from "@material-ui/icons/LocalBar";
import TurismoIcon from "@material-ui/icons/Map";
import GeografiaIcon from "@material-ui/icons/Public";

//importacion de colores
import red from "@material-ui/core/colors/red";
import amber from "@material-ui/core/colors/amber";
import teal from "@material-ui/core/colors/teal";
import deepOrange from "@material-ui/core/colors/deepOrange";
import green from "@material-ui/core/colors/green";

import { Link } from "react-router-dom";
export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpened: true,
    };

    this.modalToggle = this.modalToggle.bind(this);
  }

  modalToggle() {
    this.setState({ modalOpened: !this.state.modalOpened });
  }

  renderSwitch(categoria) {
    switch (categoria) {
      case 0:
        return (
          <div key="0">
            <h5>Cultura</h5>
            <CulturaIcon style={{ fontSize: 100, color: red[900] }} />
          </div>
        );
      case 1:
        return (
          <div key="1">
            <h5>Tradiciones</h5>
            <TradicionIcon style={{ fontSize: 100, color: amber[500] }} />
          </div>
        );
      case 2:
        return (
          <div key="2">
            <h5>Gastronomía</h5>
            <GastronomiaIcon style={{ fontSize: 100, color: teal[700] }} />
          </div>
        );
      case 3:
        return (
          <div key="3">
            <h5>Naturaleza</h5>
            <TurismoIcon style={{ fontSize: 100, color: deepOrange[500] }} />
          </div>
        );

      case 4:
        return (
          <div key="4">
            <h5>Geografía</h5>
            <GeografiaIcon style={{ fontSize: 100, color: green[900] }} />
          </div>
        );
      default:
        return "foo";
    }
  }

  render() {
    const coverClass = this.state.modalOpened
      ? "modal-cover modal-cover-active"
      : "modal-cover";
    const containerClass = this.state.modalOpened
      ? "modal-container modal-container-active"
      : "modal-container";
    const { categoria, uid, player, profilePicture } = this.props;

    return (
      <div>
        <div className={containerClass}>
          <div className="modal-header"></div>
          <div className="modal-body">
            {this.renderSwitch(categoria)}
            <div className="button">
              <button className="btn-push navy">
                <Link
                  to={{
                    pathname: "/play/quiz",
                    state: {
                      user: uid,
                      categoria: categoria,
                      player: player,
                      profilePicture: profilePicture,
                    },
                  }}
                  style={{ color: "#FFF" }}
                >
                  Jugar
                </Link>
              </button>
            </div>
          </div>
          <div className="modal-footer"></div>
        </div>

        <div className={coverClass} onClick={this.modalToggle}></div>
      </div>
    );
  }
}
