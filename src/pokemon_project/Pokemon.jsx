/* eslint-disable no-unused-expressions */
import { list } from "postcss";
import React, { Component } from "react";
import PokeCard from "./card/PokeCard";

export default class Pokemon extends Component {
  state = {
    isLoading: false,
    listAPI: [],
    listNum: "",
    listPokemon: [],
    loading: 15,
  };
  getPokemonList = async () => {
    this.setState({
      isLoading: true,
    });
    try {
      await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
        .then((res) => res.json())
        .then((json) => {
          const { count, results } = json;
          this.setState({
            listAPI: results,
            isLoading: false,
            listNum: count,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  // getPokemonInfor = async (url) => {
  //   try {
  //     await fetch(url)
  //       .then((res) => res.json())
  //       .then((json) => {
  //         let item = {};
  //         const { sprites, name, species } = json;
  //         item.sprites = sprites;
  //         item.name = name;
  //         item.species = species;
  //         console.log(item);
  //         return item;
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  componentDidMount() {
    console.log("did mount");
    this.getPokemonList();
  }

  componentDidUpdate() {
    // if (this.state.listAPI.length > 0 || this.state.listPokemon.length === 0) {
    //   console.log("did update");
    //   let list = [];
    //   let temp = this.state.listAPI?.map((item, index) => {
    //     const { url } = item;
    //     return this.getPokemonInfor(url);
    //   });
    //   Promise.all([temp]).then((res) => console.log(res));
    // }
  }

  render() {
    return (
      <div>
        <h1>number of pokemon : {this.state.listNum}</h1>
        <div className="flex px-4 gap-4 mx-auto flex-wrap justify-center">
          {this.state.isLoading ? (
            <p>loading...</p>
          ) : (
            this.state.listAPI.slice(0, this.state.loading)?.map((item, index) => {
              return <PokeCard item={item}  key={index} />;
            })
          )}
        </div>
        <div className="flex justify-center mt-5">
          <button
            className="text-4xl p-5 bg-blue-400 animate-pulse rounded-lg "
            onClick={() => {
              this.setState({
                loading: this.state.loading + 3,
              });
            }}
          >
            load more
          </button>
        </div>
      </div>
    );
  }
}
