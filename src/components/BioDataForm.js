import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { calculateBmr } from "./AnalysisFxn";
import "../App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
    <div style={{ minWidth: "1000px" }} className="container padded font">
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
              <div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Food Group</TableCell>
                        <TableCell align="right">Portion</TableCell>
                        <TableCell align="right">Total Calories</TableCell>
                        <TableCell align="left">Food Recommendations</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(response.foodPortions).map(
                        (groupName, index) => (
                          <TableRow key={index}>
                            <TableCell component="th">{groupName}</TableCell>
                            <TableCell align="right">
                              {response.foodPortions[groupName].portion}
                            </TableCell>
                            <TableCell align="right">
                              {response.foodPortions[groupName].calories}
                            </TableCell>
                            <TableCell align="left">
                              {response.selectedRecommendations[groupName]}
                            </TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        )
                      )}
                      <TableRow>
                        <TableCell component="th" colSpan={2}>
                          Total Calories
                        </TableCell>
                        <TableCell component="th" align="right">
                          {response.caloriesQty}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              {/* Display other properties as needed */}
              <div className="row">
                <div className="column">
                  <button
                    className="btn text-white mt-2"
                    style={{ backgroundColor: "#880808", minWidth: "100px" }}
                    onClick={clearForm}
                  >
                    Clear
                  </button>
                </div>
                <div className="column">
                  <button
                    className="btn text-white mt-2"
                    style={{ backgroundColor: "#000000", minWidth: "100px" }}
                    onClick={handleSubmit}
                  >
                    Regenerate
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="row p-4 rounded">
              <h1 className="font">DIET WIZARD</h1>

              <h5>INSTRUCTIONS:</h5>
              <p>
                <ol>
                  <li>
                    Fill in the analysis form. Remember to enter your weight in
                    KGs and your height in meters by multiplying your height by
                    100 and selecting your age and activity level based on how
                    active you are
                  </li>
                  <li> Click on Generate to get the Bio Data</li>
                  <li>
                    Generate the results (food groups, portion size, total
                    calories and food recommendations as per the food groups and
                    portion size per serving )
                  </li>
                  <li>
                    Press the Regenerate button if you need the application to
                    give you more food suggestions{" "}
                  </li>
                </ol>
              </p>

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
                <label htmlFor="name" className="form-label">
                  Enter your height in meters
                </label>
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
                <label htmlFor="name" className="form-label">
                  Enter your weight in KGs
                </label>
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
                <label htmlFor="name" className="form-label">
                  Select your activity level based on how active you are on a
                  daily basis
                </label>
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
