import React, {useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalContext } from "../../GlobalContext";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

const adminGuidelines = () => {

  const { globalVariable, setGlobalVariable } = useGlobalContext();

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

  return (
    <div>
      <div className="w-full min-h-screen bg-white flex items-center justify-center  pt-16 sm:pt-16">
        <div className="bg-white rounded-xl shadow-[0_0px_8px_rgba(0,233,154)] w-full max-w-xl mx-auto m-2">
          {/* <ToastContainer /> */}
          <div className="mb-2">
            <h3 className="text-lg font-medium m-2 text-black justify-center text-center">
              <b>General Guidlines for the Admin </b>
            </h3>
            <hr className="w-full h-0.5 sm:h-1 mx-auto my-2 bg-wd border-0 rounded md:my-4 dark:bg-wd"></hr>
            <ol className="text-black list-decimal pl-6 justify-center items-center m-2">
              <li className="p-2">
                <b>Fingerprint Registration:</b> Access this to register
                fingerprints for students.
              </li>
              <li className="p-2">
                <b>Manage Students: </b>
                <ul className="list-disc pl-6 mt-2">
                  <li className="p-2">
                    <b>Overall:</b> View the complete list of students
                    registered for the mess.
                  </li>
                  <li className="p-2">
                    <b>By Date:</b> Filter student data by specific dates to see
                    who attended on particular days.
                  </li>
                  <li className="p-2">
                    <b>By Roll Number:</b> Search for students by roll number to
                    check individual records or details.
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default adminGuidelines;
