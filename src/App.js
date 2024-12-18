import React, { useState } from "react";
import "./App.css";
import BioDataForm from "./components/BioDataForm";
import dietImg from "./assets/diet3.svg";
import Test from "./components/Test";

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
                    Whether you want to maintain, gain, or lose weight, this app
                    helps you <br />
                    make informed choices for a healthier lifestyle.
                    <br />
                    Click here to get started
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
            <Test /> // Your analysis form component
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
