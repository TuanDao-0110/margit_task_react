import React from "react";
import style from "./modal.module.css";
export default function Modal(props) {
  const { display } = props;
  const { closeModal, score } = props;
  if (display) {
    return (
      <div className={style["bg"]}>
        <div
          className="relative h-full"

          // onClick={closeModal}
        >
          <button className="absolute top-1 left-5 text-8xl text-blue-400 hover:text-blue-800" onClick={closeModal}>
            x
          </button>
          <div className=" h-full w-full  flex justify-center align-middle  translate-y-1/3">
            <div className="">
              <h1 className="text-6xl  font-sans text-center text-red-500 ">Final Score </h1>
              <div className="bg-blue-100 w-ful mx-auto p-20 rounded-md mt-5 flex flex-wrap">{score}</div>
              <div className="flex w-full justify-around mt-5">
                <button
                  onClick={() => {}}
                  className="inline-block w-1/2 px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Score
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <></>;
  }
}
