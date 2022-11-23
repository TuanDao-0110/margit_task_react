/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./pokecard.module.css";
export default function PokeCard(props) {
  const getPokemonInfor = async (url) => {
    try {
      await fetch(url)
        .then((res) => res.json())
        .then((json) => {
          let item = {};
          const { sprites, name, species } = json;
          item.sprites = sprites;
          item.name = name;
          item.species = species;
          setState({
            isLoading: false,
            item,
          });
          return item;
        });
    } catch (error) {
      console.log(error);
    }
  };
  const [state, setState] = useState({
    isLoading: true,
    item: [],
  });
  useEffect(() => {
    setState({
      isLoading: true,
    });
    setTimeout(() => {
      getPokemonInfor(props.item.url);
    }, 1000);
  }, []);
  return state.isLoading ? (
    <p>new loading...</p>
  ) : (
    <div className="md:w-1/4 w-full mt-5 overflow-hidden">
      <div className="w-full md:w-full mx-auto text-center ">
        <div className="flex max-w-md mx-auto xl:max-w-2xl p-5 min-w-0 break-words bg-gray-200 w-full mb-6 overflow-hidden  shadow-lg rounded-xl">
          <div className="card w-full  flex flex-col  gap-2 translate-y-5 hover:-translate-y-20 duration-200 ">
            <div className="card-header w-full mx-auto flex justify-center h-full flex-col ">
              <img className="w-full " src={`${state.item.sprites.other.dream_world.front_default}`} alt="tailwind-card-image" width={"40px"} />
              <a href="#">
                <h4 className="font-semibold">Material Design 3</h4>
              </a>
              <p className="opacity-20 hover:opacity-100 mb-4">
                The time is now for it to be okay to be great. People in this world shun people for being great. For being a bright color. For
                standing out.
              </p>
              <button className="" data-ripple-light="true">
                <Link to={`${state.item.name}`}>Read More</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
