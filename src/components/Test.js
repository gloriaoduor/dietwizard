import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  MenuItem,
} from "@mui/material";
import { calculateBmr } from "./AnalysisFxn";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Test() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
  });
  const [response, setResponse] = useState(null);
  const steps = [
    "Personal Info",
    "Metrics",
    "BioData Results",
    "Foods Section",
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 3) {
      const result = calculateBmr(
        formData.gender,
        formData.weight,
        formData.height,
        formData.age,
        formData.activityLevel
      );
      setResponse(result);
      console.log("FormData", formData);
    }
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handleRegenerate = () => {
    const result = calculateBmr(
      formData.gender,
      formData.weight,
      formData.height,
      formData.age,
      formData.activityLevel
    );
    setResponse(result);
    console.log("FormData", formData);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box
            style={{
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <Typography variant="" align="left" gutterBottom>
              Welcome to DietWizard
              <br /> Please enter your details below
            </Typography>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </Box>
        );
      case 1:
        return (
          <Box
            style={{
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            {" "}
            <Typography variant="h6">INSTRUCTIONS:</Typography>
            <ul>
              <li> Enter your weight in KGs</li>
              <li>
                Enter your height in meters by dividing your height by 100
              </li>
              <li> Select your activity level based on how active you are</li>
              <li>Click on Submit to generate your BioData</li>
            </ul>
            <TextField
              label="Height (m)"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Activity Level"
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="Sedentary">
                Sedentary (little or no exercise)
              </MenuItem>
              <MenuItem value="Light">
                {" "}
                Lightly active (light exercise or sports 1-3 days a week)
              </MenuItem>
              <MenuItem value="Moderate">
                {" "}
                Moderately active (moderate exercise or sports 3-5 days a week)
              </MenuItem>
              <MenuItem value="Very">
                Very active (hard exercise or sports 6-7 days a week)
              </MenuItem>
              <MenuItem value="Super">
                Super active (very hard exercise and physical job or 2x
                training)
              </MenuItem>
            </TextField>
          </Box>
        );
      case 2:
        return (
          <Box
            style={{
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            {/* <Typography variant="h5">INSTRUCTIONS:</Typography>
            <p>
              <ol>
                <li>
                  Generate the results (food groups, portion size, total
                  calories, and food recommendations as per the food groups and
                  portion size per serving)
                </li>
              </ol>
            </p> */}
            <Typography variant="h4" align="center">
              BIO DATA
            </Typography>

            <Typography variant="body1" align="left" style={{ margin: "10px" }}>
              Your Results: {formData.name} {formData.age}, ({formData.gender})
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>BMR</TableCell>
                    <TableCell align="right">{response.bmr}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>BMI</TableCell>
                    <TableCell align="right">{response.bmi}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      CATEGORY
                    </TableCell>
                    <TableCell align="right">{response.category}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      CALORIE NEEDS
                    </TableCell>
                    <TableCell align="right">{response.caloriesQty}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody></TableBody>
              </Table>
            </TableContainer>

            <Typography variant="body2" align="left" style={{ margin: "10px" }}>
              To Generate food recommendations, please click on{" "}
              <span style={{ fontWeight: "bold" }}>"NEXT"</span>
            </Typography>
          </Box>
        );
      case 3:
        return (
          <Box
            style={{
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h4" align="center">
              Food Recommendations
            </Typography>

            <TableContainer component={Box} style={{ maxHeight: 400 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Food Group
                    </TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      Portion
                    </TableCell>
                    <TableCell align="right" style={{ fontWeight: "bold" }}>
                      Total Calories
                    </TableCell>
                    <TableCell align="left" style={{ fontWeight: "bold" }}>
                      Food Recommendations
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ fontWeight: "bold" }}
                    ></TableCell>
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
                      {response.caloriesQty}&nbsp;kcal
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="body2" align="left" style={{ margin: "10px" }}>
              Click on <span style={{ fontWeight: "bold" }}>"Regenerate"</span>{" "}
              button to get different set of food suggestions
            </Typography>
            <Button
              onClick={handleRegenerate}
              variant="contained"
              color="success"
            >
              Regenerate
            </Button>
          </Box>
        );
      default:
        return (
          <Box
            style={{
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body2" align="left" style={{ margin: "10px" }}>
              Did You find the App Helpful? Please give your feedback here:{" "}
              <br />
              <a
                href="https://docs.google.com/forms/d/1A01BpW0Ej9Y4M5lnoZlUPDmiX-Bk473X5T7y3Hav5xc/viewform?edit_requested=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Form
              </a>
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography
        variant="h2"
        align="center"
        style={{
          fontFamily: "'Lobster', cursive",
          color: "black",
          marginBottom: "1rem",
        }}
      >
        DIETWIZARD
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box style={{ marginTop: "2rem" }}>{renderStepContent(activeStep)}</Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="contained"
          color="secondary"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          variant="contained"
          color="primary"
          disabled={activeStep === 4}
        >
          {activeStep === steps.length - 3
            ? "Submit"
            : activeStep === steps.length - 1
            ? "Finish"
            : "Next"}
        </Button>
      </Box>
    </Container>
  );
}

export default Test;
