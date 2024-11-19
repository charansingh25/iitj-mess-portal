import React, { useState, useEffect } from "react";
import { useGlobalContext } from "./../../GlobalContext.jsx";


const SelectedMessdata = () => {
  const { globalVariable } = useGlobalContext();
  const [previousData, setPreviousData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPreviousData();
  }, []);

  const fetchPreviousData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/mess/mess-data-previous`,
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
        setPreviousData(data.data.filterData);
        setMessage(data.message);
      } else {
        setMessage("Failed to fetch previous data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen pt-16 sm:pt-16 fixed w-full justify-center items-center text-center px-2">
        
      <div className="min-h-screen flex flex-col">
        <div className="p-6">
          <div className="bg-white items-center justify-center p-6 rounded-lg shadow-[0_0px_8px_rgba(0,233,154)] w-full max-w-3xl mx-auto sticky top-0 z-10">
            <h3 className="text-lg sm:text-xl font-bold text-center m-0 sm:m-2">
              Previous Mess Registration History
            </h3>
            {message && (
              <p className="text-center text-gray-600 mt-2 mb-4">{message}</p>
            )}
          </div>
        </div>

        <div className="px-6 py-6 ">
          <div className="bg-white rounded-lg shadow-[0_0px_8px_rgba(0,233,154)] overflow-hidden max-w-3xl mx-auto">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : previousData && previousData.length > 0 ? (
              <table className="min-w-full">
                <thead className="bg-gray-50 divide-y">
                  <tr>
                    <th className="py-3 px-6 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Chosen Mess
                    </th>
                    <th className="py-3 px-6 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="py-3 px-6 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {previousData.map((record, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-6 whitespace-nowrap text-black font-medium">
                        {record.mess}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-black font-medium">
                        {new Date(record.startDate).toLocaleDateString("en-GB")}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-black font-medium">
                        {new Date(record.endDate).toLocaleDateString("en-GB")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No previous registration data found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedMessdata;