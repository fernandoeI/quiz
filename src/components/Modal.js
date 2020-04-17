import React from "react";
import "./styles/Modal.css";

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

  render() {
    const coverClass = this.state.modalOpened
      ? "modal-cover modal-cover-active"
      : "modal-cover";
    const containerClass = this.state.modalOpened
      ? "modal-container modal-container-active"
      : "modal-container";
    return (
      <div>
        <div className={containerClass}>
          <div className="modal-header"></div>
          <div className="modal-body">
            <div className="button">
              <button class="btn-push navy">
                <Link to="/play/quiz">Jugar</Link>
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
