import React, { Component } from "react";
import Card from "./Card";
import { animals, birds } from "./data";
export default class Animal_page extends Component {
  state = {
    specie: birds,
    type: false,
    load: 6,
  };
  likeFn = (name) => {
    let index = this.state.specie.findIndex((item) => item.name === name);
    this.setState({ ...this.state.specie[index], likes: this.state.specie[index].likes++ });
  };
  disLikeFn = (name) => {
    let index = this.state.specie.findIndex((item) => item.name === name);
    this.setState({ ...this.state.specie[index], likes: this.state.specie[index].likes-- });
  };
  searching = (value) => {
    if (!value) {
      this.setState(() => {
        let specie;
        this.state.type ? (specie = birds) : (specie = animals);
        return { ...this.state, specie: specie };
      });
    } else {
      this.setState({ ...this.state, specie: this.state.specie.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())) });
    }
    // console.log(this.state.specie.filter((bird) => bird.name.toLowerCase().includes(value.toLowerCase())));
  };
  deleteCard = (name) => {
    this.setState({ ...this.state, specie: this.state.specie.filter((item) => item.name !== name) });
  };
  renderedCard = () => {
    return (
      <>
        <div className="flex flex-wrap gap-5 justify-center">
          {this.state.specie?.slice(0, this.state.load).map((item, index) => (
            <Card key={index} bird={item} likeFn={this.likeFn} deleteFn={this.deleteCard} disLikeFn={this.disLikeFn}></Card>
          ))}
        </div>
      </>
    );
  };
  loadMore = () => {
    this.setState({
      load: this.state.load + 3,
    });
  };
  render() {
    return (
      <div className="bg-stone-500">
        <div className="flex justify-center hover:scale-125 transition-all duration-150 ">
          <button
            className="text-4xl bg-teal-400 my-5 rounded-md p-5 text-center "
            onClick={() => {
              this.setState({
                type: !this.state.type,
              });
              this.state.type
                ? this.setState({
                    specie: birds,
                  })
                : this.setState({
                    specie: animals,
                  });
            }}
          >
            switch between animal vs bird
          </button>
        </div>
        <h1 className="text-center text-lime-800 text-5xl">This is {!this.state.type ? "bird" : "animals"} project</h1>
        <h2 className="text-center text-lime-300 text-2xl">Animal : {this.state.specie.length} </h2>
        <div className="flex justify-center">
          <input
            placeholder={`Searching ${this.state.type ? "animal" : "bird"} by name`}
            className="text-4xl border-2 border-rose-200 w-2/3 p-5 mb-20 mt-10 "
            onChange={(e) => {
              this.searching(e.target.value);
            }}
          ></input>
        </div>
        {this.renderedCard()}
        <div className="flex justify-center  ">
          <button
            className="text-2xl animate-pulse duration-75 bg-slate-400 p-5 rounded-lg my-5"
            onClick={() => {
              this.loadMore();
            }}
          >
            load more
          </button>
        </div>
      </div>
    );
  }
}
