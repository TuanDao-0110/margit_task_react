import React, { Component } from "react";
import Modal from "./modal/Modal";
import Circle from "./Circle";
import start from "./sound/click.mp3";
import clicky from "./sound/clicky.mp3";
import error from "./sound/error.mp3";
import layout from "./sound/layout.mp3";
// import { bounce } from "react-animations";
import "animate.css";

let startSound = new Audio(start);
let click = new Audio(clicky);
let errorSound = new Audio(error);
let layoutSound = new Audio(layout);
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
    let { score: newScore, round: life } = this.state;
    if (this.state.round) {
      if (this.state.active === key) {
        click.currentTime = 0;
        click.play();
        newScore++;
        life++;
      } else {
        errorSound.currentTime = 0;
        errorSound.play();
        life--;
      }
      this.setState({
        ...this.state,
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
      clearTimeout(this.temp);
    }, time);
  };
  temp;
  time;
  runGame = () => {
    if (!this.state.modal) {
      this.time = this.state.pace;
      if (!layoutSound.played) {
        layoutSound.play();
      }
      this.temp = this.setTime(this.time);
      return;
    }
  };

  closeModal = () => {
    window.location.reload();
  };
  componentDidUpdate(prevprop, prevState) {
    if (prevState.active !== this.state.active) {
      console.log("did update");
      // clearTimeout(this.temp);
    }
  }

  render() {
    return (
      <div className="relative animate__animated  animate__rotateIn min-h-screen flex flex-col justify-evenly ">
        {this.state.modal && layoutSound.pause()}
        <div className="flex w-full mx-auto justify-around mt-10">{this.renderCircles()}</div>
        <div className="text-center space-x-5">
          Score : <span className="text-6xl text-green-500"> {this.state.score}</span>
          Round : <span className="text-6xl text-green-500"> {this.state.round}</span>
          {console.log("render")}
          {this.state.startGame ? this.runGame() : ""}
        </div>
        <div className="flex justify-center space-x-3 capitalize">
          <button
            className="bg-blue-200 p-7 rounded-md text-3xl mt-5 hover:bg-blue-700 delay-700 transition-all"
            onClick={() => {
              startSound.play();
              layoutSound.play();
              this.setState({
                startGame: true,
              });
            }}
            // disabled={!this.state.startGame}
          >
            start game
          </button>
          <button
            className="bg-blue-200 p-7 rounded-md text-3xl mt-5 hover:bg-blue-700 delay-700 transition-all"
            onClick={() => {
              window.location.reload();
            }}
          >
            {" "}
            stop game
          </button>
        </div>
        <Modal modal={this.state.modal} closeModal={this.closeModal} score={this.state.score}></Modal>
      </div>
    );
  }
}
