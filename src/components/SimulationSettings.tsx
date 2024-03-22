import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import React, { FormEventHandler, useState } from "react";
import { Simulation, SimulationParameters } from "../@types/simulation";

interface KeyValuePair {
  [key: string]: string;
}

const bcFunctions: KeyValuePair = {
  "1": "Data Management",
  "2": "Computational services",
  "3": "Payment",
  "4": "Identity Management",
};
const bcPlacements: KeyValuePair = { "1": "Fog Layer", "2": "End-User layer" };
const bcConsensuses: KeyValuePair = {
  "1": "Proof of Work (PoW)",
  "2": "Proof of Stake (PoS)",
  "3": "Proof of Authority (PoA)",
  "4": "Proof of Elapsed Time (PoET)",
  "5": "Delegated Proof of Stake (DPoS)",
};

type Props = {
  startSimulation: () => Promise<void>;
  simulation: Simulation;
  settings: SimulationParameters;
  setSettings: React.Dispatch<React.SetStateAction<SimulationParameters>>;
};

function SimulationSettings({
  startSimulation,
  simulation,
  settings,
  setSettings,
}: Props) {
  const handleChange = (
    prop: keyof SimulationParameters,
    value: string | boolean
  ) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [prop]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startSimulation();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ minWidth: 400 }}>
        <FormControl
          component="form"
          sx={{ m: 1, minWidth: 300 }}
          onSubmit={handleSubmit}
        >
          <Stack
            sx={{ minWidth: 0, marginTop: 2 }}
            spacing={2}
            direction="column"
            justifyContent="center"
          >
            <TextField
              required
              id="function"
              select
              value={settings.bcFunction}
              onChange={(e) => handleChange("bcFunction", e.target.value)}
              label="Function of the Blockchain network"
            >
              {Object.entries(bcFunctions).map(([key, name]) => (
                <MenuItem key={key} value={key}>
                  {name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              id="placement"
              select
              value={settings.bcPlacement}
              onChange={(e) => handleChange("bcPlacement", e.target.value)}
              label="Placement of the Blockchain network"
            >
              {Object.entries(bcPlacements).map(([key, name]) => (
                <MenuItem key={key} value={key}>
                  {name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              id="consensus"
              select
              value={settings.bcConsensus}
              onChange={(e) => handleChange("bcConsensus", e.target.value)}
              label="Consensus algorithm of the Blockchain network"
            >
              {Object.entries(bcConsensuses).map(([key, name]) => (
                <MenuItem key={key} value={key}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack
            sx={{ minWidth: 0, marginTop: 2 }}
            spacing={2}
            direction="row"
            justifyContent="center"
          >
            <TextField
              id="numOfFogNodes"
              type="number"
              value={settings.numOfFogNodes}
              onChange={(e) => handleChange("numOfFogNodes", e.target.value)}
              label="Number of fog nodes"
            />

            <TextField
              id="numOfUsersPerFogNode"
              type="number"
              value={settings.numOfUsersPerFogNode}
              onChange={(e) =>
                handleChange("numOfUsersPerFogNode", e.target.value)
              }
              label="Number of users per fog node"
            />
          </Stack>

          <Stack
            sx={{ minWidth: 0, marginTop: 2 }}
            spacing={2}
            direction="row"
            justifyContent="center"
          >
            <TextField
              id="numOfTaskPerUser"
              type="number"
              value={settings.numOfTaskPerUser}
              onChange={(e) => handleChange("numOfTaskPerUser", e.target.value)}
              label="Number of tasks per user"
            />

            <TextField
              id="numOfMiners"
              type="number"
              value={settings.numOfMiners}
              onChange={(e) => handleChange("numOfMiners", e.target.value)}
              label="Number of miners"
            />
          </Stack>

          <Stack
            sx={{ minWidth: 0, marginTop: 2 }}
            spacing={2}
            direction="row"
            justifyContent="center"
          >
            <TextField
              id="numberOfEachMinerNeighbours"
              type="number"
              value={settings.numberOfEachMinerNeighbours}
              onChange={(e) =>
                handleChange("numberOfEachMinerNeighbours", e.target.value)
              }
              label="Number of each miner's neighbours"
            />

            <TextField
              id="numOfTXperBlock"
              type="number"
              value={settings.numOfTXperBlock}
              onChange={(e) => handleChange("numOfTXperBlock", e.target.value)}
              label="Number of transactions per block"
            />
          </Stack>

          <Stack
            sx={{ minWidth: 0, marginTop: 2 }}
            spacing={2}
            direction="row"
            justifyContent="center"
          >
            <TextField
              id="puzzleDifficulty"
              type="number"
              value={settings.puzzleDifficulty}
              onChange={(e) => handleChange("puzzleDifficulty", e.target.value)}
              label="Puzzle difficulty"
            />

            <TextField
              id="poetBlockTime"
              type="number"
              value={settings.poetBlockTime}
              onChange={(e) => handleChange("poetBlockTime", e.target.value)}
              label="Poet block time"
            />
          </Stack>

          <Stack
            sx={{ minWidth: 0, marginTop: 2 }}
            spacing={2}
            direction="row"
            justifyContent="center"
          >
            <TextField
              id="maxEnduserPayment"
              type="number"
              value={settings.maxEnduserPayment}
              onChange={(e) =>
                handleChange("maxEnduserPayment", e.target.value)
              }
              label="Max enduser payment"
            />

            <TextField
              id="minersInitialWalletValue"
              type="number"
              value={settings.minersInitialWalletValue}
              onChange={(e) =>
                handleChange("minersInitialWalletValue", e.target.value)
              }
              label="Miners' initial wallet value"
            />
          </Stack>

          <Stack
            sx={{ minWidth: 0, marginTop: 2 }}
            spacing={2}
            direction="row"
            justifyContent="center"
          >
            <TextField
              id="miningAward"
              type="number"
              value={settings.miningAward}
              onChange={(e) => handleChange("miningAward", e.target.value)}
              label="Mining award"
            />

            <TextField
              id="delayBetweenFogNodes"
              type="number"
              value={settings.delayBetweenFogNodes}
              onChange={(e) =>
                handleChange("delayBetweenFogNodes", e.target.value)
              }
              label="Delay between fog nodes"
            />
          </Stack>

          <Stack
            sx={{ minWidth: 0, marginTop: 2 }}
            spacing={2}
            direction="row"
            justifyContent="center"
          >
            <TextField
              id="delayBetweenEndUsers"
              type="number"
              value={settings.delayBetweenEndUsers}
              onChange={(e) =>
                handleChange("delayBetweenEndUsers", e.target.value)
              }
              label="Delay between endusers"
            />

            <TextField
              id="asymmetricKeyLength"
              type="number"
              value={settings.asymmetricKeyLength}
              onChange={(e) =>
                handleChange("asymmetricKeyLength", e.target.value)
              }
              label="Asymmetric key length"
            />
          </Stack>

          <Stack
            sx={{ minWidth: 0, marginTop: 2 }}
            spacing={2}
            direction="row"
            justifyContent="center"
          >
            <TextField
              id="numOfDPoSdelegates"
              type="number"
              value={settings.numOfDPoSdelegates}
              onChange={(e) =>
                handleChange("numOfDPoSdelegates", e.target.value)
              }
              label="Number of DPoS delegates"
            />

            <TextField
              id="storPlc"
              type="number"
              value={settings.storPlc}
              onChange={(e) => handleChange("storPlc", e.target.value)}
              label="Stor plc"
            />
          </Stack>

          <Stack
            sx={{ minWidth: 0, marginTop: 2 }}
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <FormControlLabel
              control={
                <Switch
                  id="aiAssistedMining"
                  checked={settings.aiAssistedMining}
                  onChange={(e) =>
                    handleChange("aiAssistedMining", e.target.checked)
                  }
                />
              }
              label="Ai assisted mining"
            />

            <FormControlLabel
              control={
                <Switch
                  id="gossipActivated"
                  checked={settings.gossipActivated}
                  onChange={(e) =>
                    handleChange("gossipActivated", e.target.checked)
                  }
                />
              }
              label="Gossip activated"
            />
          </Stack>

          <Stack
            sx={{ minWidth: 0 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <FormControlLabel
              control={
                <Switch
                  id="automaticPoAMinersAuthorization"
                  checked={settings.automaticPoAMinersAuthorization}
                  onChange={(e) =>
                    handleChange(
                      "automaticPoAMinersAuthorization",
                      e.target.checked
                    )
                  }
                />
              }
              label="Automatic PoA miners authorization"
            />

            <FormControlLabel
              control={
                <Switch
                  id="parallelPoWmining"
                  checked={settings.parallelPoWmining}
                  onChange={(e) =>
                    handleChange("parallelPoWmining", e.target.checked)
                  }
                />
              }
              label="Parallel PoW mining"
            />
          </Stack>
          <Button
            type="submit"
            // onClick={startSimulation}
            disabled={simulation.isRunning}
          >
            {simulation.isRunning ? "Simulation Running" : "Start Simulation"}
          </Button>
        </FormControl>
      </Box>
    </Container>
  );
}

export default SimulationSettings;
