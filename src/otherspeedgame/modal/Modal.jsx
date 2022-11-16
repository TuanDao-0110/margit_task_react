import React from "react";
import style from "../css/modal.module.css";
export default function Modal(props) {
  const { modal, closeModal, score } = props;

  if (modal) {
    return (
      <div className={style["bg"]}>
        <div
          className="relative"

          // onClick={closeModal}
        >
          <button
            className="absolute top-1 p-5 left-5 text-8xl text-blue-400 hover:text-blue-800"
            onClick={() => {
              window.location.reload();
            }}
          >
            x
          </button>
          <div className=" h-full w-3/4  mx-auto flex justify-center align-middle  translate-y-1/3">
            <div className="">
              <h1 className="text-6xl  font-sans text-center text-red-500 ">Final Score </h1>
              <div className="bg-blue-100 w-3/4 text-5xl text-center mx-auto p-2 rounded-md mt-5 ">{score}</div>
              <div className="flex w-full justify-around mt-5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
