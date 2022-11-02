import React, { Component } from "react";
import Card from "./Card";
import { animals, birds } from "./data";
export default class Animal_page extends Component {
  state = {
    animals,
    birds,
  };
  likeFn = (name) => {
    let index = this.state.birds.findIndex((bird) => bird.name === name);
    this.setState({ ...this.state.birds[index], likes: this.state.birds[index].likes++ });
  };
  disLikeFn = (name) => {
    let index = this.state.birds.findIndex((bird) => bird.name === name);
    this.setState({ ...this.state.birds[index], likes: this.state.birds[index].likes-- });
  };
  searching = (value) => {
    if (!value) {
      this.setState({
        birds,
        animals,
      });
    } else {
      this.setState({ ...this.state, birds: this.state.birds.filter((bird) => bird.name.toLowerCase().includes(value.toLowerCase())) });
    }
    // console.log(this.state.birds.filter((bird) => bird.name.toLowerCase().includes(value.toLowerCase())));
  };
  deleteCard = (name) => {
    this.setState({ ...this.state, birds: this.state.birds.filter((bird) => bird.name !== name) });
  };
  renderedCard = () => {
    return (
      <>
        <div className="flex flex-wrap gap-5 justify-center">
          {this.state.birds?.map((bird, index) => (
            <Card key={index} bird={bird} likeFn={this.likeFn} deleteFn={this.deleteCard} disLikeFn={this.disLikeFn}></Card>
          ))}
        </div>
      </>
    );
  };
  render() {
    return (
      <div>
        <h1 className="text-center text-lime-800 text-5xl">This is bird project</h1>
        <h2 className="text-center text-lime-300 text-2xl">Animal : {this.state.birds.length} </h2>
        <div className="flex justify-center">
          <input
            placeholder="Searching animal by name"
            className="text-4xl border-2 border-rose-200 w-1/3 p-5 mb-20 mt-10 "
            onChange={(e) => {
              this.searching(e.target.value);
            }}
          ></input>
        </div>
        {this.renderedCard()}
      </div>
    );
  }
}
