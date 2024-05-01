import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";
import { useAuthContext } from "../contexts/authContext";
import SimulationResultsDialog from "./SimulationResultsDialog";
import SimulationSettings from "./SimulationSettings";
import {
  ExtraSimulations,
  SimulationParameters,
  SimulationResult,
} from "../@types/simulation";
import { toSimulationSettingsJSON } from "../utils/settingsJsonUtils";
import RunMultipleSimulationsDialog from "./multipleSimulations/components/RunMultipleSimulationsDialog";

export const RunSimulation = () => {
  const { currentUser } = useAuthContext();
  const [simulation, setSimulation] = useState({
    timestamp: new Date(0).getTime(),
    isRunning: false,
  });
  const [settings, setSettings] = useState<SimulationParameters>({
    time: new Date(0).getTime(),
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
  });
  const [simulationResults, setSimulationResults] = useState<
    SimulationResult[]
  >([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [multipleSimulatuonsDialogOpen, setMultipleSimulatuonsDialogOpen] =
    useState(false);
  const uniqueMessages = new Set();

  const startSimulation = async (extraSimulations?: ExtraSimulations) => {
    setSimulationResults([]);
    if (!currentUser) {
      console.error("User not logged in.");
      return;
    }

    try {
      const timestamp = Date.now();
      const simParametersJson = toSimulationSettingsJSON(settings);
      setSimulation({
        timestamp: timestamp,
        isRunning: true,
      });
      setDialogOpen(true);
      axios
        .get(
          "https://europe-north1-szte-edu-research-2023.cloudfunctions.net/run-simulation",
          {
            params: {
              uid: currentUser.uid,
              timestamp: timestamp,
              settings: simParametersJson,
              extraSimulations: extraSimulations
                ? JSON.stringify(extraSimulations)
                : null,
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
        const data = snapshot.val() || [];
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

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenMultipleSimulationsDialog = () => {
    setMultipleSimulatuonsDialogOpen(true);
  };

  const handleCloseMultipleSimulationsDialog = () => {
    setMultipleSimulatuonsDialogOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <SimulationSettings
        startSimulation={startSimulation}
        simulation={simulation}
        settings={settings}
        setSettings={setSettings}
        reopenDialog={handleOpenDialog}
        openMultipleSimulationsDialog={handleOpenMultipleSimulationsDialog}
      />
      {dialogOpen && (
        <SimulationResultsDialog
          simulationResults={simulationResults}
          isOpen={dialogOpen}
          handleClose={handleCloseDialog}
        />
      )}
      {multipleSimulatuonsDialogOpen && (
        <RunMultipleSimulationsDialog
          isOpen={multipleSimulatuonsDialogOpen}
          handleClose={handleCloseMultipleSimulationsDialog}
          settings={settings}
          startSimulation={startSimulation}
        />
      )}
    </Box>
  );
};

export default RunSimulation;
