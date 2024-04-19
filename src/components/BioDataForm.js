import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { calculateBmr } from "./AnalysisFxn";
import "../App.css";

const BioDataForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
  });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = calculateBmr(
      formData.gender,
      formData.weight,
      formData.height,
      formData.age,
      formData.activityLevel
    );
    setResponse(result);
    console.log(formData);
  };

  const clearForm = (e) => {
    setFormData({
      name: "",
      age: "",
      gender: "",
      height: "",
      weight: "",
      activityLevel: "",
    });
    setResponse(null);
  };

  return (
    <div className="container padded font">
      <div className="card border rounded shadow">
        <div className="card-body">
          {response ? (
            // Display the response if available
            <div className="row" role="alert">
              <h4 className="font">DIET WIZARD</h4>
              <h5>
                <strong>BIODATA:</strong>
              </h5>
              <div className="row">
                <div className="col">
                  <p>
                    <strong>NAME: </strong> {formData.name}
                  </p>
                  <p>
                    <strong>AGE: </strong> {formData.age}
                  </p>
                  <p>
                    <strong>GENDER: </strong>{" "}
                    {formData.gender.toLocaleUpperCase().charAt(0)}
                  </p>
                  <p>
                    <strong>BMI: </strong> {response.bmi}
                  </p>
                  <p>
                    <strong>CATEGORY: </strong> {response.category}
                  </p>
                  <p>
                    <strong>BMR: </strong> {response.bmr}
                  </p>
                </div>
              </div>

              <h4>
                <strong>RESULTS: </strong>
              </h4>
              <table className="table-responsive table-bordered">
                <thead>
                  <tr>
                    <th>Food Group</th>
                    <th>Portion</th>
                    <th>Total Calories</th>
                    <th>Food Recommendations</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(response.foodPortions).map(
                    (groupName, index) => (
                      <tr key={index}>
                        <td>{groupName}</td>
                        <td>{response.foodPortions[groupName].portion}</td>
                        <td>{response.foodPortions[groupName].calories}</td>
                        <td>{response.selectedRecommendations[groupName]}</td>
                      </tr>
                    )
                  )}
                  <tr>
                    <td colSpan="2">
                      <strong>Total Calories</strong>
                    </td>
                    <td>
                      <strong>{response.caloriesQty}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* Display other properties as needed */}
              <button
                className="btn d-block text-white mt-2"
                style={{ backgroundColor: "#880808" }}
                onClick={clearForm}
              >
                Clear
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="row p-4 rounded">
              <h3 className="font">DIET WIZARD</h3>
              <h5 className=" mb-4 font">Analysis Form</h5>
              <div className="mb-3">
                <label htmlFor="name" className="form-label"></label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="height"
                  name="height"
                  placeholder="Height(m)"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  name="weight"
                  placeholder="Weight (kg)"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <select
                  className="form-select"
                  id="activityLevel"
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Activity Level</option>
                  <option value="Sedentary">
                    Sedentary (little or no exercise)
                  </option>
                  <option value="Light">
                    Lightly active (light exercise or sports 1-3 days a week)
                  </option>
                  <option value="Moderate">
                    Moderately active (moderate exercise or sports 3-5 days a
                    week)
                  </option>
                  <option value="Very">
                    Very active (hard exercise or sports 6-7 days a week)
                  </option>
                  <option value="Super">
                    Super active (very hard exercise and physical job or 2x
                    training)
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-block text-white "
                style={{ backgroundColor: "#121f57" }}
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BioDataForm;
