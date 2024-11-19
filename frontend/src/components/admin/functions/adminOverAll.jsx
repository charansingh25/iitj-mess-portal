// OverallStudents.jsx
import { useState, useEffect } from "react";
import { useGlobalContext } from "./../../GlobalContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "./../../../constants/toastConfig";
import "react-toastify/dist/ReactToastify.css";


function AdminOverAll() {
  const { globalVariable } = useGlobalContext();
  const [oldMessCount, setOldMessCount] = useState([]);
  const [newMessCount, setNewMessCount] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessCount = async () => {
      try {
        const oldResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/mess/get-mess-data/Old`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${globalVariable}`,
            },
          }
        );
        const oldData = await oldResponse.json();
        if (oldResponse.ok) {
          setOldMessCount([
            oldData.data.previousDayCount,
            oldData.data.todayCount,
            oldData.data.nextDayCount,
          ]);
        } else {
          throw new Error(oldData.message);
        }

        const newResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/mess/get-mess-data/New`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${globalVariable}`,
            },
          }
        );

        const newData = await newResponse.json();
        if (newResponse.ok) {
          setNewMessCount([
            newData.data.previousDayCount,
            newData.data.todayCount,
            newData.data.nextDayCount,
          ]);
        } else {
          throw new Error(newData.message);
        }
      } catch (error) {
        console.error("Error during mess data fetching:", error);
        // console.log()
        toast.error(error.message || "An error occurred. Please try again", {...toastOptions});
      }
    };

    fetchMessCount();
  }, [globalVariable]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-3xl mx-auto m-2 p-2 bg-gray-800 text-white rounded-xl shadow-[0_0px_8px_rgba(0,233,154)]">
        <h2 className="text-xl sm:text-2xl m-2 font-bold text-center mb-4 text-white">
          Number of Students Registered
        </h2>
        <hr className="w-full h-0.5 sm:h-1 mx-auto my-2 bg-wd border-0 rounded md:my-4 dark:bg-wd"></hr>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Old Mess Data</h3>
            <p>Previous Day: {oldMessCount[0]}</p>
            <p>Today: {oldMessCount[1]}</p>
            <p>Next Day: {oldMessCount[2]}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">New Mess Data</h3>
            <p>Previous Day: {newMessCount[0]}</p>
            <p>Today: {newMessCount[1]}</p>
            <p>Next Day: {newMessCount[2]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOverAll;
