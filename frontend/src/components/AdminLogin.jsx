import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../constants/toastConfig";
import { Loader2 } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {

  const { globalVariable, setGlobalVariable } = useGlobalContext();
  const [rollnumber, setRollNumber] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role, password, email }),
        }
      );

      // console.log("Printing the login", response);

      const res = await response.json();
      // console.log(globalVariable);
      // console.log("api responce : ", res.data.authToken);
      setGlobalVariable(res.data.authToken);
      // console.log("set global responce : ", globalVariable);

      if (response.ok && role == "admin") {
        setMessage("Login successful! (Login as Admin)");
        toast.success("Login successful! Redirecting...", {...toastOptions});
        // localStorage.setItem("user", JSON.stringify({ rollnumber })); // Save user details in local storage
        navigate("/admin"); 
      } else if (response.ok && role == "mess") {
        setMessage("Login successful! (Login as Mess)");
        toast.success("Login successful! Redirecting...", {...toastOptions});
        // localStorage.setItem("user", JSON.stringify({ rollnumber })); // Save user details in local storage
        navigate("/mess");
      } 
      else {
        setMessage(res.message || "Login failed!");
        toast.error(res.message || "Login failed!", {...toastOptions});
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later.");
      toast.error("An error occurred. Please try again later", {...toastOptions});
    } finally {
      setIsLoading(false);
    }
  };
//   useEffect(() => {
//     // console.log(
//     //   "localStorage globalVariable:",
//     //   localStorage.getItem("globalVariable")
//     // );
//   }, [globalVariable]);


  return (
    <form
      className="flex flex-col h-full w-full text-pd dark:text-p py-12"
      onSubmit={handleSubmit}
    >
      <ToastContainer />
      <input
        required
        type="text"
        className="w-full bg-w p-3 rounded-md mb-4 dark:bg-b"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
      ></input>
      <select
        required
        className="w-full bg-w p-3 rounded-md mb-4 dark:bg-b"
        name="role"
        value={role}
        id="role"
        onChange={(e) => setRole(e.target.value)}
      >
        <option value=""> Select Role</option>
        <option value="admin">Admin</option>
        <option value="mess">Mess</option>
      </select>
      <input
        required
        type="password"
        className="w-full bg-w p-3 rounded-md mb-4 dark:bg-b"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      ></input>

      {/* <p className="text-red font-medium mb-4">{error}</p> */}
      <div className="font-semibold">
        {/* <Link to="/:user"> */}
        <button
          type="submit"
          className="flex items-center justify-center space-x-12 w-full px-8 py-3 rounded-md text-w dark:bg-p bg-pd mr-4"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? "Entering..." : "Enter"}
        </button>
      </div>
    </form>
  )
}

export default AdminLogin
