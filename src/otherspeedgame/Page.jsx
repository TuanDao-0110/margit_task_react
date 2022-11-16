import React, { Component } from "react";
import Modal from "./modal/Modal";
import Circle from "./Circle";
const cicrle = [1, 2, 3, 4];
export default class Page extends Component {
  state = {
    score: 0,
    active: 0,
    time: 4,
    startGame: false,
    round: 4,
    modal: false,
    pace: 3000,
  };
  onClick = (key) => {
    let { score: newScore, round: life } = this.state;
    if (this.state.round) {
      if (this.state.active === key) {
        newScore++;
        life++;
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
      return <Circle key={index} value={item} onClick={this.onClick} gamestart={this.state.startGame} active={this.state.active}></Circle>;
    });
  };
  getRndInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  generateRandomNumber = () => {
    let temp = this.getRndInt(1, 4);
    while (temp === this.state.active) {
      temp = this.getRndInt(1, 4);
    }
    return temp;
  };
  moveRound = () => {
    this.setState({
      round: this.state.round - 1,
    });
  };
  setTime = (time) => {
    return setTimeout(() => {
      this.setState({
        // ...this.state,
        active: this.generateRandomNumber(),
      });
    }, time);
  };
  temp;
  runGame = () => {
    if (!this.state.round) {
      return;
    }
    this.setState({
      round: this.state.round - 1,
    });
    setTimeout(this.runGame(), this.state.pace);
  };

  closeModal = () => {
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
        <div className="flex justify-center">
          <button
            className="bg-blue-200 p-7 rounded-md text-3xl mt-5 hover:bg-blue-700 delay-700 transition-all"
            onClick={() => {
              this.setState({
                startGame: true,
              });
            }}
          >
            start game
          </button>
        </div>
        <Modal modal={this.state.modal} closeModal={this.closeModal} score={this.state.score}></Modal>
      </div>
    );
  }
}
