import React, { Component } from "react";
import Modal from "./modal/Modal";
import Circle from "./Circle";
const cicrle = [1, 2, 3, 4];
export default class Page extends Component {
  state = {
    score: 0,
    active: 0,
    confirmClick: false,
    startGame: false,
    round: 4,
    modal: false,
    pace: 1000,
  };
  onClick = (key) => {
    clearTimeout(this.temp);
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
        confirmClick: true,
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
      let temp = this.state.round;
      let newSpace = this.state.pace;
      if (this.state.round > 0 && this.state.pace !== 1000 && this.state.confirmClick === false) {
        temp--;
      }
      if (this.state.round === 0) {
        this.setState({
          modal: true,
        });
      }
      this.setState({
        // ...this.state,
        pace: newSpace - 10,
        confirmClick: false,
        round: temp,
        active: this.generateRandomNumber(),
      });
    }, time);
  };
  temp;
  time;
  runGame = () => {
    if (!this.state.modal) {
      this.time = this.state.pace;

      this.temp = this.setTime(this.time);
      return;
    }
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
            // disabled={!this.state.startGame}
          >
            start game
          </button>
        </div>
        <Modal modal={this.state.modal} closeModal={this.closeModal} score={this.state.score}></Modal>
      </div>
    );
  }
}
