import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { deleteHandler, getData } from "./service";
import style from "./popup/formpage.module.css";
import Modal from "./popup/Modal";

const url = "http://localhost:4000/notes";
export default function Page() {
  const [state, setState] = useState();
  const [infor, setInfor] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    role: "",
    message: "",
  });

  const [modal, setModal] = useState(false);
  const emptyInfor = () => {
    setInfor({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      role: "",
      message: "",
    });
  };
  const handleChange = (e, key) => {
    let newValue = { ...infor };
    newValue[key] = e.target.value;
    setInfor(() => {
      return newValue;
    });

    setModal(false);
  };

  const displayFormInput = () => {
    let display = [];
    for (let i in infor) {
      let content = ``;
      if (i !== "role") {
        content = (
          <div key={i} className="w-full flex align-middle justify-center mb-2 ">
            <label className="w-1/3 text-xl">{i}</label>
            {i === "message" ? (
              <textarea
                value={infor[i]}
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
                value={infor[i]}
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
              //   value={infor[i]}
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
  const closeModal = () => {
    setModal(false);
  };
  const handleSend = (e) => {
    e.preventDefault();
    console.log("send");
    !infor.role ? alert("Select Your role") : setModal(true);
  };
  const displayInfor = () => {
    let dispay = [];
    for (let i in infor) {
      dispay.push(
        <div
          // className="w-full flex justify-between"
          className={style["paper"]}
        >
          <p>{i} </p>
          <span className="bg-red-100 font-serif ">{infor[i]}</span>
        </div>
      );
    }

    return dispay;
  };
  const displayData = () => {
    return state?.map((item, index) => {
      const { firstname, lastname, phone, role, message, id } = item;
      return (
        <tr key={index} className=" border-cyan-300 border-4 py-5">
          <th> {firstname}</th>
          <th> {lastname}</th>
          <th> {phone}</th>
          <th> {role}</th>
          <th> {message}</th>
          <th>
            <button
              className="bg-red-800 rounded-3xl text-red-100 text-sm p-2 hover:bg-red-300 duration-75"
              onClick={() => {
                console.log(id);
                deleteHandler(url, id, setState);
              }}
            >
              delete
            </button>
          </th>
        </tr>
      );
    });
  };
  useEffect(() => {
    getData("http://localhost:4000/notes", setState);
  }, []);
  useEffect(() => {
    getData("http://localhost:4000/notes", setState);
  }, [modal]);

  return (
    <div className="h-screen">
      <Modal state={state} display={modal} infor={infor} displayInfor={displayInfor} closeModal={closeModal} emptyState={emptyInfor}></Modal>

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
      <div className="flex justify-center flex-wrap py-10">
        <h1 className="text-3xl w-full text-center mb-5 text-rose-600">all data </h1>
        <table>
          <tr className="text-center border-4 border-cyan-400">
            <th className="border-2 border-cyan-300 px-5">first name</th>
            <th className="border-2 border-cyan-300 px-5">last name</th>
            <th className="border-2 border-cyan-300 px-5">phone</th>
            <th className="border-2 border-cyan-300 px-5">role</th>
            <th className="border-2 border-cyan-300 px-5">message</th>
            <th className="border-2 border-cyan-300 px-5">delete</th>
          </tr>
          {displayData()}
        </table>
      </div>
    </div>
  );
}
