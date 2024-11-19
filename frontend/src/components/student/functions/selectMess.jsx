import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "./../../GlobalContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { toastOptions } from "./../../../constants/toastConfig";

function SelectMess() {
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  const [selectedMess, setSelectedMess] = useState(null);
  const [messChoice, setMessChoice] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (!user) {
  //     window.location.href = '/sign-in'; // Redirect to SignIn if not logged in
  //     return;
  //   }
  // }, []);

    useEffect(() => {
      if (!globalVariable) {
        window.location.href = "/"; // Redirect to SignIn if not logged in
        return;
      }

      // Decode token to check expiration
      const decodedToken = jwtDecode(globalVariable);
      const currentTime = Date.now() / 1000; // Current time in seconds

      if (decodedToken.exp < currentTime) {
        // Token is expired
        localStorage.removeItem("globalVariable");
        setGlobalVariable("");
        window.location.href = "/";
      }
    }, [globalVariable, setGlobalVariable]);

  const formatDate = (date) => {
    // Format date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleMessSelection = async (mess) => {
    setSelectedMess(`You have chosen ${mess}`);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setMessChoice(mess);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/mess/choose-mess`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${globalVariable}`,
          },
          body: JSON.stringify({
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
            mess: selectedMess,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessage("Your response has been recorded!");
        toast.success("Your response has been recorded", {...toastOptions});
      } else {
        setMessage(data.message || "Failed to save mess choice");
        toast.error(data.message || "Failed to save mess choice", {...toastOptions});
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while saving mess choice");
    }
  };

  return (
    <div className="pt-16 sm:pt-0 h-screen flex justify-center items-center text-center px-2">
      <div
        className="max-h-screen w-10/12 sm:w-3/4 md:w-2/3 lg:w-2/5 xl:w-2/5 
            font-bold
            relative flex justify-center items-center overflow-y-auto rounded-lg shadow-[0_0px_8px_rgba(0,233,154)]"
      >
        <div className="text-white flex flex-col items-center justify-center py-10 px-4">
          <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">
            Welcome to the Student Corner
          </h2>
          <hr className="w-full h-0.5 sm:h-1 mx-auto my-2 bg-wd border-0 rounded md:my-4 dark:bg-wd"></hr>
          <h3 className="text-base sm:text-lg mb-4 sm:mb-6">Choose Your Mess</h3>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setSelectedMess("Old")}
              className={`px-4 sm:px-6 py-1 sm:py-3 text-white rounded-lg shadow-lg transition duration-300 border-2 border-w hover:border-[#00df9a] whitespace-nowrap sm:whitespace-normal sm:w-auto ${selectedMess === "Old" ? "bg-[#00df9a]" : ""}`}
            >
              Old Mess
            </button>
            <button
              onClick={() => setSelectedMess("New")}
              className={`px-4 sm:px-6 py-1 sm:py-3 text-white rounded-lg shadow-lg transition duration-300 border-2 border-w hover:border-[#00df9a] whitespace-nowrap sm:whitespace-normal sm:w-auto ${selectedMess === "New" ? "bg-[#00df9a]" : ""}`}
            >
              New Mess
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-6 w-full max-w-xl">
            <div>
              <label className="block text-sm mb-2 font-semibold">
                Start Date:
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md"
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 font-semibold">
                End Date:
              </label>
              <DatePicker
                label="End Date"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="w-full px-4 py-2 bg-white text-black rounded-lg shadow-md"
                minDate={startDate || new Date()}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          <button
            onClick={handleMessSelection}
            className="w-full px-8 py-3 hover:bg-[#00df9a] text-white font-semibold rounded-lg shadow-lg border-2 border-[#00df9a] transition duration-300"
          >
            Submit
          </button>

          {/* {selectedMess && (
            <p className="mt-4 text-lg font-semibold text-green-300">
              {selectedMess}
            </p>
          )} */}
          {/* {error && (
            <p className="mt-4 text-lg font-semibold text-red-500">{error}</p>
          )} */}
          {message && (
            <p className="mt-4 text-lg font-semibold text-[#00df9a]">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectMess;
