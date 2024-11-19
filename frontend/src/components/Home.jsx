import React, { useRef, useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { Outlet, Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../features/themeSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registration from "./Registration";
import landingImg from "../assets/landing-img-new.png";

function Home() {
  const [isStudent, setIsStudent] = useState(true);
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  const toggleButton = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    toggleButton.current.style.justifyContent =
      theme === "light" ? "flex-start" : "flex-end";
  }, [theme]);
  const toggleTheme = (e) => {
    if (theme == "light") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    dispatch(toggle());
  };

  const toggleRole = () => {
    setIsStudent(!isStudent);
    navigate(isStudent ? "/admin-login" : "/");

  };
  return (
    <div className="w-screen min-h-screen bg-bd dark:bg-bd relative overflow-auto flex flex-col items-center justify-center">
      <ToastContainer />
      {/* <div className="w-full bg-pd dark:bg-p opacity-30 dark:blur-[150px] aspect-square absolute -bottom-10 -left-24 rounded-full blur-3xl" /> */}
      {/* <div className="w-1/2 bg-pd dark:bg-p opacity-20 dark:blur-[150px] aspect-square absolute -top-36 -right-40 rounded-full blur-3xl" /> */}

      <div className=" absolute inset-0 flex flex-col items-center">
        <h1 className=" text-wd dark:text-p text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider font-black py-8 text-center">
          IITJ MESS PORTAL
        </h1>

        <button className="bg-pd dark:bg-p h-10 w-48 sm:h-12 sm:w-64 rounded-lg font-bold" onClick={toggleRole}>
          {isStudent ? "Switch to Admin" : "Switch to Student"}
        </button>
        {/* <button className='relative bg-pd dark:bg-p h-8 w-16 rounded-full p-2 z-40 flex' onClick={toggleTheme} ref={toggleButton}>
              <div className='h-full aspect-square rounded-full bg-wd dark:bg-bd'></div>
            </button> */}
      </div>


      {/* Toggle button */}
      <div className="absolute top-10 right-4">
        <button
          className=" bg-pd dark:bg-p h-8 w-16 sm:h-12 sm:w-24 rounded-full p-2 z-40 flex"
          onClick={toggleTheme}
          ref={toggleButton}
        >
          <div className="h-full aspect-square rounded-full bg-wd dark:bg-bd"></div>
        </button>
      </div>

      {/* <img src={landingImg} alt='land-img' className='max-h-full absolute left-14' /> */}

      <div
        className="max-h-screen w-10/12 sm:w-3/4 md:w-2/3 lg:w-1/3 xl:w-1/4 
          bg-w/20 dark:bg-b/40 
          backdrop-blur-3xl 
          rounded-lg px-4 sm:px-6 md:px-8 lg:px-10
          relative flex flex-col justify-center items-center overflow-y-auto mt-32"
      >

        <Outlet />
      </div>
    </div>
  );
}

export default Home;
