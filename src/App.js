import React, { useState } from "react";
import "./App.css";
import BioDataForm from "./components/BioDataForm";
import dietImg from "./assets/diet3.svg";

function App() {
  const [showForm, setShowForm] = useState(false);
  const handleGetStarted = () => {
    setShowForm(true);
  };
  return (
    <div className="min-vh-100">
      <div className="landing-page">
        {/* <div className="background-image"></div> */}
        <div className="container content">
          {!showForm ? (
            <div>
              <div className="text-section">
                <h1 className="font-title mb-5">DIET WIZARD</h1>
                <img
                  src={dietImg}
                  alt="diet"
                  className="w-50 mx-auto d-block my-4"
                />
                <p className="body-font">
                  <h5
                    style={{ textAlign: "center", textJustify: "inter-word" }}
                  >
                    {/* Simplifies healthy eating by providing personalized guidance
                    based
                    <br />
                    on your unique needs, ensuring a balanced diet tailored to
                    your goals.
                    <br /> */}
                    Whether you want to maintain, gain, or lose weight, this app
                    helps you <br />
                    make informed choices for a healthier lifestyle.
                  </h5>
                </p>
                <button
                  className="btn btn-lg text-white"
                  style={{ backgroundColor: "#121f57" }}
                  onClick={handleGetStarted}
                >
                  Get Started
                </button>
              </div>
            </div>
          ) : (
            <BioDataForm /> // Your analysis form component
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
