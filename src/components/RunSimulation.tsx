import {
  Box,
  Button,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  // Step,
  // StepLabel,
  // Stepper,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { child, DataSnapshot, onValue, ref, get } from "firebase/database";
import { useAuthContext } from "../contexts/authContext";
import React from "react";

// const steps = ["Settings", "Simulation parameters"];

// const bcFunctions = [
//   "Data Management",
//   "Computational services",
//   "Payment",
//   "Identity Management",
// ];
// const bcPlacements = ["Fog Layer", "End-User layer"];
// const bcConesensuses = [
//   "Proof of Work (PoW)",
//   "Proof of Stake (PoS)",
//   "Proof of Authority (PoA)",
//   "Proof of Elapsed Time (PoET)",
//   "Delegated Proof of Stake (DPoS)",
// ];

export type SimulationResult = {
  message: string;
};

export const RunSimulation = () => {
  const { currentUser } = useAuthContext();
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationResults, setSimulationResults] = useState<
    SimulationResult[]
  >([]);

  const startSimulation = async () => {
    if (!currentUser) {
      console.error("User not logged in.");
      return;
    }

    try {
      setSimulationRunning(true);
      axios
        .get(
          "https://europe-north1-szte-edu-research-2023.cloudfunctions.net/run-simulation",
          {
            params: {
              uid: currentUser.uid,
              function: "1",
              placement: "1",
              consensus_algorithm: "1",
              ai_assisted_mining: "n",
            },
          }
        )
        .then(() => {
          setSimulationRunning(false);
        })
        .catch((error) => {
          console.error("Error starting simulation:", error);
        });
    } catch (error) {
      console.error("Error starting simulation:", error);
    }
  };

  useEffect(() => {
    const query = ref(db, `/users/${currentUser?.uid}/simulation-results`);
    return onValue(query, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() || []; // Set default to empty array
        const newResults: SimulationResult[] = Object.values(data);
        setSimulationResults((prevResults) => [...prevResults, ...newResults]);
        console.log(simulationResults);
      }
    });
  }, []);

  // const dbRef = ref(db);
  // get(child(dbRef, `users/${currentUser?.uid}/simulation-results`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  return (
    <Box sx={{ width: "100%" }}>
      <Button onClick={startSimulation} disabled={simulationRunning}>
        {simulationRunning ? "Simulation Running" : "Start Simulation"}
      </Button>
      {simulationResults.length > 0 && (
        <div>
          <h2>Simulation Results</h2>
          <ul>
            {simulationResults.map((result, index) => (
              <li key={index}>
                {result.message &&
                  result.message.split("\n").map((line, lineIndex) => (
                    <React.Fragment key={`${index}-${lineIndex}`}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box> */}

      {/* <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
        <InputLabel id="select-function-label">
          Function of the Blockchain network
        </InputLabel>
        <Select
          labelId="select-function-label"
          id="select-function"
          value={bcFunction}
        >
          {bcFunctions.map((f) => (
            <MenuItem value={f}>{f}</MenuItem>
          ))}
        </Select>
      </FormControl> */}
    </Box>
  );
};

export default RunSimulation;
