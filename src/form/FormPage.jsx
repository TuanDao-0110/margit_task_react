import React from "react";
import { useState } from "react";
import Modal from "./modal/Modal";
import style from "./modal/formpage.module.css";
export default function FormPage() {
  // 1. create form task
  // 2. state control firstname, lastName, phoneNum, role, message
  const [state, setState] = useState({
    modal: false,
    infor: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      role: "",
      message: "",
    },
  });
  const emptyState = () => {
    setState({
      modal: false,
      infor: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        role: "",
        message: "",
      },
    });
  };
  const handleSend = (e) => {
    e.preventDefault();
    !state.infor.role
      ? alert("Select Your role")
      : setState({
          ...state,
          modal: true,
        });
  };
  const handleChange = (e, key) => {
    let newValue = { ...state.infor };
    newValue[key] = e.target.value;
    setState({
      modal: false,
      infor: newValue,
    });
  };
  const displayFormInput = () => {
    let display = [];
    for (let i in state.infor) {
      let content = ``;
      if (i !== "role") {
        content = (
          <div key={i} className="w-full flex align-middle justify-center mb-2 ">
            <label className="w-1/3 text-xl">{i}</label>
            {i === "message" ? (
              <textarea
                value={state.infor[i]}
                type="text"
                required
                className="w-2/3 p-2 border-r-amber-300 rounded-sm border-2 text-2xl font-serif h-56"
                onChange={(e) => {
                  handleChange(e, i);
                }}
              />
            ) : (
              <input
                required
                value={state.infor[i]}
                type="text"
                className="w-2/3 p-2 border-r-amber-300 rounded-sm border-2 text-2xl font-serif "
                onChange={(e) => {
                  handleChange(e, i);
                }}
              />
            )}
          </div>
        );
      } else {
        content = (
          <div key={i} className="w-full flex justify-between mb-2  ">
            <label className="w-1/3 text-xl">{i}</label>
            <select
              // value={state.infor[i]}
              className="w-2/3 p-2 border-r-amber-300 rounded-sm border-2 text-2xl font-serif text-center capitalize"
              onChange={(e) => {
                handleChange(e, i);
              }}
            >
              <option value="teacher">teacher</option>
              <option value="student">student</option>
              <option value="officer">officer</option>
              <option value="security">security</option>
            </select>
          </div>
        );
      }
      display.push(content);
    }
    return display;
  };
  const displayInfor = () => {
    let dispay = [];
    for (let i in state.infor) {
      dispay.push(
        <div
          // className="w-full flex justify-between"
          className={style["paper"]}
        >
          <p>{i} </p>
          <span className="bg-red-100 font-serif ">{state.infor[i]}</span>
        </div>
      );
    }

    return dispay;
  };
  const closeModal = () => {
    setState({
      ...state,
      modal: false,
    });
  };
  return (
    <div>
      <Modal display={state.modal} infor={state.infor} displayInfor={displayInfor} closeModal={closeModal} emptyState={emptyState}></Modal>
      {/* form */}
      <div className="bg-blue-400 w-3/4 mx-auto pb-10 px-10 " onSubmit={handleSend}>
        <h1 className="text-3xl text-center mt-2">form</h1>
        <form className="flex flex-wrap pt-10">
          {displayFormInput()}
          <div className="w-full flex justify-center my-5 ">
            <button
              type="submit"
              className="inline-block w-fit px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      {/* display infor live */}
      <div className="bg-blue-100 w-3/4 mx-auto pb-10 px-10 mt-5 flex flex-wrap ">{displayInfor()}</div>
    </div>
  );
}
