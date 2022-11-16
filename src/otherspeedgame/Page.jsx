import React, { Component } from "react";
import Modal from "./modal/Modal";
import Circle from "./Circle";
const cicrle = [1, 2, 3, 4];
export default class Page extends Component {
  state = {
    score: 0,
    active: 1,
    time: 4,
    startGame: false,
    round: 4,
    modal: false,
  };
  onClick = (key) => {
    let { score: newScore, round: life } = this.state;
    if (this.state.round) {
      if (this.state.active === key) {
        newScore++;
      } else {
        life--;
      }
      this.setState({
        score: newScore,
        round: life,
      });
    } else {
      this.setState({
        modal: true,
      });
    }
  };

  renderCircles = () => {
    return cicrle.map((item, index) => {
      return <Circle key={index} value={item} onClick={this.onClick} gamestart = {this.state.startGame} active={this.state.active}></Circle>;
    });
  };

  runGame = () => {
    let n = 4;
    if (!this.state.modal) {
      setTimeout(() => {
        this.setState({
          ...this.state,
          active: Math.floor(Math.random() * 3) + 1,
        });
      }, 1000);
    }
  };
  closeModal = () => {
    this.setState({
      modal: false,
    });
    window.location.reload();
  };
  render() {
    return (
      <div className="relative">
        <div className="flex w-3/4 mx-auto justify-between mt-10">{this.renderCircles()}</div>
        <div className="text-center">
          Score : <span className="text-2xl"> {this.state.score}</span>
          Round : <span className="text-2xl"> {this.state.round}</span>
          {this.state.startGame ? this.runGame() : ""}
        </div>
        <button
          className="text-center"
          onClick={() => {
            this.setState({
              startGame: true,
            });
          }}
        >
          start game
        </button>
        <Modal modal={this.state.modal} closeModal={this.closeModal} score={this.state.score}></Modal>
      </div>
    );
  }
}
