import { type } from "@testing-library/user-event/dist/type";
import Modal from "./modal/Modal";
import React, { Component } from "react";
import style from "./css/speedgame.module.css";
import { MULTIPLY, PLUS, DIVIDE, MINUS } from "./formula/formula";
import Time from "./Time";
import Round from "./Round";
import CountUpNumber from "./CountUpNumber";
import Button from "@mui/material/Button";

const options = [MULTIPLY, PLUS];
const speedOptions = [1, 2, 3, 4];
const numberLenghtOptions = [1, 2, 3, 4];
export default class SpeedGame_Page extends Component {
  state = {
    time: 5, // default time
    score: 0, // final score is added when user give correct answer
    numberLength: 1, // length of interger number chosen by user
    firstNum: 1, // 1 number generated by application
    secondNum: 1, // 2nd number generated by application
    correctResult: 1, // correctResult to compare when calculate 2 nunber react
    formula: PLUS, // plus + minus + multiply + divide
    round: 10, // round left when user can not answer before time run out/
    speed: 1, // speed is chosen by user
    scoreRatio: 1, // reflect user score as fast/difficulty ==> got more point
    userAnswer: 0, // user answer
    modal: false,
    result: false,
    startGame: false,
  };
  // 1. set time
  // 2. press start to run
  // 3. auto give 1 vs 2 number ==> calculate correct rersult firstNum
  // 4. time run off from time default
  // 5. user have to give the answer for the QUESTION before the time run off
  // 6. user have 3 round
  // 6.1 if you have correct answer ==> it will auto move to the next question ==> add score for user ==> score += scoreRation ==> it will get bigger depend on how far or how fast you can go
  // 6.2 if you have wrong anseer ==> it will remove 1 round out ==> if round ===0 ==> user lose ==> show the modal

  // 1. calculte scoreRatio
  calculteScoreRatio = () => {
    // let { speed, numberLength, formula } = { ...this.state };
    switch (this.state.formula) {
      case MULTIPLY:
        this.setState({ scoreRatio: this.state.speed * this.state.numberLength * 3 });
        return;
      case DIVIDE:
        // this.setState({ scoreRatio: speed * numberLength * 3 });
        return;
      case MINUS:
        // this.setState({ scoreRatio: speed * numberLength * 2 });
        return;
      default:
        this.setState({
          // ...this.state,
          scoreRatio: this.state.speed * this.state.numberLength * 1,
        });
        return;
    }
  };
  // 2. calculate 2 number
  calculateNumber = () => {
    console.log("calculate number");
    // const { firstNum, secondNum, formula } = { ...this.state };
    switch (this.state.formula) {
      case MULTIPLY:
        this.setState({ correctResult: this.state.firstNum * this.state.secondNum });
        console.log(this.state);
        return;
      case DIVIDE:
        // let result = Math.floor(firstNum / secondNum);
        // this.setState({ correctResult: result });
        return;
      case MINUS:
        // this.setState({ correctResult: firstNum - secondNum });
        return;
      default:
        let temp = this.state.firstNum + this.state.secondNum;
        // this.setState({ correctResult: temp });
        this.setState({ ...this.state, correctResult: temp });
        console.log(this.state);
        return;
    }
  };
  // 3. compare user's answer vs  correctAnswer ==> it compare vs set time back to 5 if user still have round/correct -
  // otherwise it will return stop game ==> return modal
  compareResult = () => {
    // let { userAnswer, correctResult, round, score, result } = { ...this.state };
    // compare user' answer vs correct answer
    //  function on active when the time =0
    //    3.1 check that user is correct  ?
    // clearTimeout(this.temp);
    if (this.state.userAnswer === this.state.correctResult) {
      let { score: temp } = this.state;
      temp = temp + this.state.scoreRatio;
      return this.setState({
        score: temp,
        result: true,
        time: 5,
      });
    }
    // 3.2 if wrong ==> remove 1 round
    else if (this.state.userAnswer !== this.state.correctResult) {
      if (this.state.round !== 0) {
        let { round: temp } = this.state;
        temp = temp - 1;
        return this.setState({
          round: temp,
          result: false,
          time: 5,
        });
        // return this.setUpNumber();
      } else {
        return this.setState({
          // ...this.state,
          modal: true,
          result: false,
          startGame: false,
        });
      }
    }
  };
  //4. time count down   ==> also compare auto when it turn 0 ==> move to the next if player answers correct
  temp;

  countDown = () => {
    let setSpeed = (1000 / this.state.speed).toFixed(0);
    let { time } = this.state;
    if (time > 0) {
      this.temp = setTimeout(() => {
        this.setState({
          // ...this.state,
          time: time - 1,
        });
      }, setSpeed);
    }
    // else {
    //   this.compareResult();
    // }
  };

  //5. set speed :
  setSpeed = (e) => {
    this.setState({
      // ...this.state,
      speed: e.target.value,
    });
  };
  // 7. generate number 2nd
  setUpNumber = () => {
    let n = this.state.numberLength;
    let length = "1";
    while (n > 0) {
      n--;
      length += "0";
    }
    let numberLength = Number(length) + 1;
    this.setState({
      // ...this.state,
      firstNum: Math.floor(Math.random() * numberLength),
      secondNum: Math.floor(Math.random() * numberLength),
    });
    console.log("set up -> ");
    console.log(this.state);
  };
  // 6 submit you anwser
  handleSubmit = (e) => {
    e.preventDefault();
    for (let i of e.target) {
      if (i.value) {
        this.setState({
          userAnswer: Number(i.value),
        });
      }
    }
  };
  // 8. set up length
  setUpNumberLength = (e) => {
    this.setState({
      // ...this.state,
      numberLength: e.target.value,
    });
  };

  //9. set up your answer :
  setUpanswer = (e) => this.setState({ userAnswer: e.target.value });

  // 10. set start/stop function :
  start = () => {
    this.setUpNumber();
    this.setState({
      startGame: true,
    });
  };
  stop = () => {
    this.setState({
      startGame: false,
    });
  };
  // 11.
  setUp = () => {
    let { startGame } = this.state;
    if (startGame) {
      this.countDown();
    }
  };
  // 12. close modal
  closeModal = () => {
    this.setState({
      modal: false,
    });
    window.location.reload();
  };
  componentDidUpdate(prevProps, prevState) {
    if ((this.state.time === 0 && prevState.time === 1 && !this.state.modal) || this.state.userAnswer !== prevState.userAnswer) {
      console.log("did update calculate number");
      clearTimeout(this.temp);
      this.calculateNumber();
    }
    if (
      prevState.time === 1 &&
      this.state.time === 0 &&
      this.state.startGame &&
      (this.state.score === prevState.score || this.state.round === prevState.round)
    ) {
      console.log("compare result did update");
      clearTimeout(this.temp);
      this.compareResult();
    }
    if (
      (this.state.score !== prevState.score || this.state.round !== prevState.round) &&
      prevState.time === 0 &&
      this.state.time === 5 &&
      this.state.modal === false
    ) {
      console.log("set up new number didupdate");
      this.setUpNumber();
    }
    if (this.state.formula !== prevState.formula) {
      this.calculteScoreRatio();
    }
  }
  // change formula
  handleChangeFormula = (e) => {
    this.setState({
      formula: e.target.value,
    });
    console.log(e.target.value);
  };

  // render formula :
  renderFormula = () => {
    switch (this.state.formula) {
      case PLUS:
        return "+";
      case MULTIPLY:
        return "x";
      case DIVIDE:
        return "/";
      default:
        return "-";
    }
  };

  render() {
    return (
      <div className={style["main"]}>
        {this.setUp()}
        <div className="w-3/4 m-auto">
          <h1 className="text-center text-3xl text-blue-300"> speed game </h1>
          {/* game result */}
          <div>
            <div className="flex justify-between">
              <div>
                <h2 className="text-center text-3xl py-5">Your Time Left</h2>
                <Time value={Math.floor((this.state.time / 5) * 100)}></Time>
              </div>
              <div className="pt-40">
                result :{" "}
                <span className={`${!this.state.result ? "text-red-400" : "text-green-600"} text-4xl`}>{!this.state.result ? "wrong" : "true"}</span>
              </div>
              <div>
                <h2 className="text-center text-3xl py-5 text-green-800">Your round left</h2>
                <Round value={Math.floor((this.state.round / 10) * 100)}></Round>
              </div>
            </div>
          </div>
          {/* game setting */}
          <div className="flex justify-around flex-wrap pt-5 w-full">
            <div className="w-1/3">
              <h3 className="text-2xl w-full text-center">set speed</h3>
              <select
                defaultValue={this.state.formula}
                disabled={this.state.startGame}
                className=" p-2 w-full border-r-amber-300 rounded-sm border-2 text-2xl font-serif text-center capitalize"
                onChange={this.setSpeed}
              >
                {speedOptions.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              {/* <input type="number" onChange={this.setSpeed} disabled={this.state.startGame} className="w-full" /> */}
            </div>

            <div className="w-1/3">
              <h3 className="text-2xl w-full text-center"> choose your fomular</h3>
              <select
                defaultValue={this.state.formula}
                disabled={this.state.startGame}
                className=" p-2 w-full border-r-amber-300 rounded-sm border-2 text-2xl font-serif text-center capitalize"
                onChange={(e) => {
                  this.handleChangeFormula(e);
                  this.calculteScoreRatio();
                }}
              >
                {options.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              {/* game display includes  formula vs user input  */}
            </div>

            <div className="w-1/3">
              <h3 className="text-2xl w-full text-center">set up number length</h3>
              <select
                defaultValue={this.state.formula}
                disabled={this.state.startGame}
                className=" p-2 w-full border-r-amber-300 rounded-sm border-2 text-2xl font-serif text-center capitalize"
                onChange={(e) => {
                  this.setUpNumberLength(e);
                }}
              >
                {numberLenghtOptions.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              {/* <input
                className="w-full"
                disabled={this.state.startGame}
                type="number"
                onChange={(e) => {
                  this.setUpNumberLength(e);
                }}
              /> */}
            </div>
          </div>
          {/* game display */}
          <div className="flex w-full justify-center py-5">
            <p className="text-4xl">
              <CountUpNumber number={this.state.firstNum}></CountUpNumber>
              <span className="text-blue-500 text-7xl px-5">{this.renderFormula()}</span>
              <CountUpNumber number={this.state.secondNum}></CountUpNumber>
            </p>
          </div>
          {/* input result vs control button */}
          <div>
            <form onSubmit={this.handleSubmit} className="flex w-full justify-evenly">
              <input
                type="number"
                name=""
                id=""
                min={0}
                placeholder="Your anwser"
                className="w-80"
                onChange={(e) => {
                  this.setState({
                    // ...this.state,
                    // userAnswer: Number(e.target.value),
                  });
                }}
              />
              {/* <button className="bg-blue-300 p-4 rounded-md">answer</button> */}
              <Button variant="outlined" type="submit">
                answer{" "}
              </Button>
            </form>
            <div className="text-center">
              <p className="text-4xl my-5 ">
                your score : <span className="text-green-700">{this.state.score}</span>
              </p>
              <Button
                disabled={this.state.startGame}
                size="large"
                color="primary"
                variant="outlined"
                onClick={() => {
                  this.start();
                }}
              >
                start{" "}
              </Button>
              --------
              <Button
                size="large"
                color="error"
                variant="outlined"
                disabled={!this.state.startGame}
                onClick={() => {
                  this.stop();
                }}
              >
                stop{" "}
              </Button>
              --------
              <Button
                size="large"
                color="secondary"
                variant="outlined"
                onClick={() => {
                  window.location.reload();
                }}
              >
                refresh game{" "}
              </Button>
            </div>
          </div>
        </div>

        <div></div>
        <div>correct result :{this.state.correctResult}</div>
        <div> user answer : {this.state.userAnswer}</div>
        <div>your round : {this.state.round}</div>
        <Modal display={this.state.modal} closeModal={this.closeModal} score={this.state.score}></Modal>
      </div>
    );
  }
}
