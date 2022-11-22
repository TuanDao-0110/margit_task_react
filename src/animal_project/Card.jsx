import React, { Component } from "react";
import style from "./Card.module.css";
export default class Card extends Component {
  imgSrc = "https://source.unsplash.com/500x400/?";

  render() {
    let { name, likes } = this.props.bird;
    let likeFn = this.props.likeFn;
    let deleteFn = this.props.deleteFn;
    let disLikeFn = this.props.disLikeFn;
    return (
      <div className={style["card"]}>
        {/* <img src={require(`${this.imgSrc}bird`)} /> */}
        <img src={`https://source.unsplash.com/500x400/?${name}`} alt=""></img>
        <div className={style["details"]}>
          <h2 className="text-center text-4xl ">{name ? name : "name not found"}</h2>
          <button
            className={style["quit"]}
            onClick={() => {
              deleteFn(name);
            }}
          >
            X
          </button>
          <div className="flex w-10/12 mx-auto justify-between bg-blue-100  text-4xl rounded-md p-3  ">
            <span>
              <button
                onClick={() => {
                  disLikeFn(name);
                }}
                className={style["like"]}
              >
                👎
              </button>
            </span>
            <span>
              {likes} <span className="text-red-300 ">♥</span>
            </span>
            <span>
              <button
                onClick={() => {
                  likeFn(name);
                }}
                className={style["like"]}
              >
                👍
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
