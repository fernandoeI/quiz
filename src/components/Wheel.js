import React from "react";
import "./styles/Wheel.css";
import CulturaIcon from "@material-ui/icons/AccountBalance";
import TradicionIcon from "@material-ui/icons/SportsKabaddi";
import GastronomiaIcon from "@material-ui/icons/LocalBar";
import TurismoIcon from "@material-ui/icons/Map";
import AventuraIcon from "@material-ui/icons/Pool";
import GeografiaIcon from "@material-ui/icons/Public";
import NaturalezaIcon from "@material-ui/icons/Eco";
import Modal from "./Modal";

import grey from "@material-ui/core/colors/grey";

export default function Wheel() {
  const [name, setName] = React.useState("circle");
  const [categoria, setCategoria] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  const startRotation = () => {
    setIsVisible(false);
    setName("circle start-rotate");
    setTimeout(() => {
      setName("circle start-rotate stop-rotate");
      setTimeout(() => setIsVisible(true), 500);
    }, Math.floor(Math.random() * 5000) + 1);
  };

  return (
    <div>
      <div className="arrow"></div>
      <ul className={name}>
        <li className="li">
          <div className="text" spellCheck="false">
            <CulturaIcon style={{ color: grey[50] }} />
            <h6 className="h6">Cultura</h6>
          </div>
        </li>
        <li className="li">
          <div className="text" spellCheck="false">
            <TradicionIcon style={{ color: grey[50] }} />
            <h6 className="h6">Tradiciones</h6>
          </div>
        </li>
        <li className="li">
          <div className="text" spellCheck="false">
            <GastronomiaIcon style={{ color: grey[50] }} />
            <h6 className="h6">Gastronomía</h6>
          </div>
        </li>
        <li className="li">
          <div className="text" spellCheck="false">
            <TurismoIcon style={{ color: grey[50] }} />
            <h6 className="h6">Turismo</h6>
          </div>
        </li>
        <li className="li">
          <div className="text" spellCheck="false">
            <AventuraIcon style={{ color: grey[50] }} />
            <h6 className="h6">Aventura</h6>
          </div>
        </li>
        <li className="li">
          <div className="text" spellCheck="false">
            <GeografiaIcon style={{ color: grey[50] }} />
            <h6 className="h6">Geografía</h6>
          </div>
        </li>
        <li className="li">
          <div className="text" spellCheck="false">
            <NaturalezaIcon style={{ color: grey[50] }} />
            <h6 className="h6">Naturaleza</h6>
          </div>
        </li>
      </ul>

      <div className="button">
        <a href="#" class="btn-push navy" onClick={startRotation}>
          Girar
        </a>
      </div>
      {isVisible && <Modal />}
    </div>
  );
}
