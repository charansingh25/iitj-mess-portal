import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
// import { useGlobalContext } from "../GlobalContext";
import { Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Registration() {
  // const { globalVariable, setGlobalVariable } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [rollnumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      toast.error("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    const role = "students";
    const dataToSend = {
      role,
      email,
      rollnumber,
      password,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // setGlobalVariable(data.data.authToken);
        setMessage("User registered successfully!");

        // Show success toast and navigate after a short delay
        toast.success("Registration successful! Redirecting...");
        setTimeout(() => {
          navigate("/student");
        }, 2000);
      } else {
        setMessage(data.message || "Registration failed!");
        toast.error(data.message || "Registration failed!");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

    return (
        <form className='flex flex-col h-full w-full text-pd py-12 dark:text-p' onSubmit={handleSubmit}>
            <input
                className="w-full bg-w p-3 rounded-md mb-4 dark:bg-b"
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Email Address"
            ></input>

            <input
                className="w-full bg-w p-3 rounded-md mb-4 dark:bg-b"
                type="text"
                id="rollNumber"
                name="rollNumber"
                value={rollnumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
                placeholder="Roll Number"
                disabled={isLoading}
            ></input>

            <input
                className="w-full bg-w p-3 rounded-md mb-4 dark:bg-b"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                disabled={isLoading}
            ></input>

            <input
                className="w-full bg-w p-3 rounded-md mb-4 dark:bg-b"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Password"
                disabled={isLoading}
            ></input>

            <button
                type="submit"
                className="w-full px-8 py-3 rounded-md text-w bg-pd mr-4 dark:bg-p"
                disabled={isLoading}
            >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isLoading ? "Signing up..." : "Sign Up"}
            </button>

            <div className="text-center mt-2">
              <Link className="text-w dark:text-p justify-center text-sm underline underline-offset-8" to="/">
                Already Registered?
              </Link>
            </div>

        </form>
    );
}

export default Registration;
