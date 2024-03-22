import { Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";
import { useAuthContext } from "../contexts/authContext";
import React from "react";
import SimulationResultsDialog from "./SimulationResultsDialog";
import SimulationSettings from "./SimulationSettings";
import { SimulationParameters, SimulationResult } from "../@types/simulation";
import { getSimulationSettingsJSON } from "../utils/settingsJsonUtils";

export const RunSimulation = () => {
  const { currentUser } = useAuthContext();
  const [simulation, setSimulation] = useState({
    timestamp: new Date(0).getTime(),
    isRunning: false,
  });
  const [settings, setSettings] = useState<SimulationParameters>({
    bcFunction: "1",
    bcPlacement: "1",
    bcConsensus: "2",
    aiAssistedMining: false,
    numOfFogNodes: 2,
    numOfUsersPerFogNode: 2,
    numOfTaskPerUser: 2,
    numOfMiners: 2,
    numberOfEachMinerNeighbours: 1,
    numOfTXperBlock: 1,
    puzzleDifficulty: 1,
    poetBlockTime: 1,
    maxEnduserPayment: 100,
    minersInitialWalletValue: 1000,
    miningAward: 5,
    delayBetweenFogNodes: 0,
    delayBetweenEndUsers: 0,
    gossipActivated: true,
    automaticPoAMinersAuthorization: true,
    parallelPoWmining: false,
    asymmetricKeyLength: 512,
    numOfDPoSdelegates: 2,
    storPlc: 1,
    // bcFunction: "",
    // bcPlacement: "",
    // bcConsensus: "",
    // aiAssistedMining: false,
    // numOfFogNodes: 0,
    // numOfUsersPerFogNode: 0,
    // numOfTaskPerUser: 0,
    // numOfMiners: 0,
    // numberOfEachMinerNeighbours: 0,
    // numOfTXperBlock: 0,
    // puzzleDifficulty: 0,
    // poetBlockTime: 0,
    // maxEnduserPayment: 0,
    // minersInitialWalletValue: 0,
    // miningAward: 0,
    // delayBetweenFogNodes: 0,
    // delayBetweenEndUsers: 0,
    // gossipActivated: false,
    // automaticPoAMinersAuthorization: false,
    // parallelPoWmining: false,
    // asymmetricKeyLength: 0,
    // numOfDPoSdelegates: 0,
    // storPlc: 0,
  });
  const [simulationResults, setSimulationResults] = useState<
    SimulationResult[]
  >([]);
  const uniqueMessages = new Set();

  const startSimulation = async () => {
    if (!currentUser) {
      console.error("User not logged in.");
      return;
    }

    try {
      const timestamp = Date.now();
      const simParametersJson = getSimulationSettingsJSON(settings);
      setSimulation({
        timestamp: timestamp,
        isRunning: true,
      });
      axios
        .get(
          "https://europe-north1-szte-edu-research-2023.cloudfunctions.net/run-simulation",
          {
            params: {
              uid: currentUser.uid,
              timestamp: timestamp,
              settings: simParametersJson,
            },
          }
        )
        .then(() => {
          setSimulation((prevState) => ({ ...prevState, isRunning: false }));
        })
        .catch((error) => {
          console.error("Error starting simulation:", error);
        });
    } catch (error) {
      console.error("Error starting simulation:", error);
    }
  };

  useEffect(() => {
    if (!simulation.isRunning) return;

    const query = ref(
      db,
      `/fobsim/users/${currentUser?.uid}/${simulation.timestamp}/temp`
    );
    return onValue(query, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() || []; // Set default to empty array
        const newResults: SimulationResult[] = Object.values(data);

        const uniqueNewResults = newResults.filter(
          (result) => !uniqueMessages.has(result.message)
        );

        uniqueNewResults.forEach((result) =>
          uniqueMessages.add(result.message)
        );

        setSimulationResults((prevResults) => [
          ...prevResults,
          ...uniqueNewResults,
        ]);
      }
    });
  }, [simulation]);

  return (
    <Box sx={{ width: "100%" }}>
      <SimulationSettings
        startSimulation={startSimulation}
        simulation={simulation}
        settings={settings}
        setSettings={setSettings}
      />
      {simulationResults.length > 0 && (
        <SimulationResultsDialog simulationResults={simulationResults} />
      )}
    </Box>
  );
};

export default RunSimulation;
