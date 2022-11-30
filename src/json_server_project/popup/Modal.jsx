import { info } from "autoprefixer";
import React from "react";
import { setData } from "../service";
import style from "./modal.module.css";
export default function Modal(props) {
  const { display } = props;
  const { displayInfor, closeModal, emptyState, infor, state } = props;
  if (display) {
    return (
      <div className={style["bg"]}>
        <div
          className="relative"

          // onClick={closeModal}
        >
          <button className="absolute top-1 left-5 text-8xl text-blue-400 hover:text-blue-800" onClick={closeModal}>
            x
          </button>
          <div className="  w-full  flex justify-center align-middle ">
            <div className="">
              <h1 className="text-6xl  font-sans text-center text-red-500 ">User information </h1>
              <div className="bg-blue-100 w-ful mx-auto p-20 rounded-md mt-5 flex flex-wrap">{displayInfor()}</div>
              <div className="flex w-full justify-around mt-5">
                <button
                  onClick={() => {
                    closeModal();
                    infor.id = state.length + 1;
                    setData("http://localhost:4000/notes", infor);
                    emptyState();
                  }}
                  className="inline-block w-1/2 px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  upload my data
                </button>
                <button
                  onClick={() => {
                    closeModal();
                    emptyState();
                  }}
                  className="inline-block w-1/2 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  no
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
