import React from "react";

import "./wheel.css";
import Modal from "../Modal";

export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      isVisible: false,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem() {
    if (this.state.selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * this.props.items.length);
      this.setState({ selectedItem });
      setTimeout(() => this.setState({ isVisible: true }), 5000);
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem);
      }
    } else {
      this.setState({ selectedItem: null });
      setTimeout(() => this.setState({ isVisible: false }), 500);
      setTimeout(this.selectItem, 500);
    }
  }

  render() {
    const { selectedItem, isVisible } = this.state;
    const { items, uid, player, profilePicture } = this.props;

    const wheelVars = {
      "--nb-item": items.length,
      "--selected-item": selectedItem,
    };
    const spinning = selectedItem !== null ? "spinning" : "";

    return (
      <div className="wheel-container">
        <div
          className={`wheel ${spinning}`}
          style={wheelVars}
          onClick={this.selectItem}
        >
          {items.map((item, index) => (
            <div
              className="wheel-item"
              key={index}
              style={{ "--item-nb": index }}
            ></div>
          ))}
        </div>
        {isVisible && (
          <Modal
            categoria={selectedItem}
            uid={uid}
            player={player}
            profilePicture={profilePicture}
          />
        )}
      </div>
    );
  }
}
