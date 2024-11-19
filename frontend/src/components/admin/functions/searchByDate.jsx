import React, { useState } from "react";
import { useGlobalContext } from "./../../GlobalContext.jsx";

const SearchByDate = () => {
  const [date, setDate] = useState("");
  const { globalVariable } = useGlobalContext();
  const [studentData, setStudentData] = useState(null);
  const [message, setMessage] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSearch = async () => {
    if (!date) {
      setMessage("Please select a date.");
      return;
    }

    try {
      console.log(
        `${import.meta.env.VITE_BACKEND_URL}/mess/mess-data-byDate/${date}`
      );
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/mess/mess-data-byDate/${date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${globalVariable}`,
          },
        }
      );
      const data = await response.json();

      if (data.statusCode === 200) {
        setStudentData(data.data);
        setMessage(data.message);
      } else {
        setMessage("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("An error occurred while fetching data.");
    }
  };

  const mealTypes = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  return (
    <div className="h-screen pt-16 sm:pt-16 justify-center items-center text-center px-2 flex flex-col">
      {/* Search Section */}
      <div className="items-center max-w-md justify-center p-6 sticky top-0 z-10 ">
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-[0_0px_8px_rgba(0,233,154)] w-full max-w-md">
          <h3 className="text-2xl font-bold text-center text-gray-700 mb-4">
            Student Data By Date
          </h3>

          <div className="flex gap-4">
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              onClick={handleSearch}
              className="px-6 py-2 text-white focus:outline-none whitespace-nowrap rounded-lg shadow-lg border-2 border-[#00df9a] hover:bg-[#00df9a]"
            >
              Search
            </button>
          </div>

          {message && (
            <p className="mt-4 text-gray-600 text-center">{message}</p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Table Section */}
        {studentData && (
          <div className="px-6 py-4">
            <div className="bg-white w-full rounded-lg shadow-[0_0px_8px_rgba(0,233,154)] overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                      Roll Number
                    </th>
                    <th className="py-3 px-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                      Mess Name
                    </th>
                    {mealTypes.map((type) => (
                      <th
                        key={type}
                        className="py-3 px-4 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {type}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(studentData).map(([rollNumber, details]) => (
                    <tr key={rollNumber} className="hover:bg-[#334942]">
                      <td className="py-4 px-4 whitespace-nowrap text-black font-medium">
                        {rollNumber}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-black font-medium">
                        {details.messName}
                      </td>
                      {mealTypes.map((type) => (
                        <td key={type} className="py-4 px-4 text-xl whitespace-nowrap">
                          {details.mealsTaken.some(
                            (meal) => meal.type === type
                          ) ? (
                            <span className="text-[#00df9a] font-bold">✓</span>
                          ) : (
                            <span className="text-[#ff3932] font-bold">✗</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchByDate;
