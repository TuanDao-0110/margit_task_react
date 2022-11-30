import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
const router = ["animal", "pokemon", "formtask", "speedgame", "other",'json_server'];
export default function Template() {
  const param = useLocation();
  const [paramName, setParamName] = useState();
  useEffect(() => {
    setParamName(() => {
      return param.pathname;
    });
  }, [param]);
  return (
    <div>
      <nav className="px-2  bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to={"/"} className="flex items-center">
            <img src={require("./img/logo.png")} className="mr-3 h-14 sm:h-10" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">margit tasks</span>
          </Link>

          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {router?.map((item, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      to={`${item}`}
                      className={`block text-2xl hover:text-blue-300 py-2 pr-4 pl-3 ${paramName?.includes(item) ? "text-blue-300" : "text-white"}`}
                      aria-current="page"
                      // style={({ isActive }) => {}}
                    >
                      {item}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
