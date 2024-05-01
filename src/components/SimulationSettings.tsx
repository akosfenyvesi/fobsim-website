import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import React, { useState } from "react";
import { Simulation, SimulationParameters } from "../@types/simulation";
import { CustomForm } from "../@types/form";

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

const initialForm: CustomForm = {
  numOfFogNodes: {
    label: "Number of fog nodes",
    disabled: false,
    error: false,
    errorMessage: "Must be at least 1",
  },
  numOfUsersPerFogNode: {
    label: "Number of users per fog node",
    disabled: false,
    error: false,
    errorMessage: "Must be at least 1",
  },
  numOfTaskPerUser: {
    label: "Number of tasks per user",
    disabled: false,
    error: false,
    errorMessage: "Must be at least 1",
  },
  numOfMiners: {
    label: "Number of miners",
    disabled: false,
    error: false,
    errorMessage: "Must be between 2 and 1500",
  },
  numberOfEachMinerNeighbours: {
    label: "Number of each miner's neighbours",
    disabled: false,
    error: false,
    errorMessage: "Must be between 1 and number of miners minus 1",
  },
  numOfTXperBlock: {
    label: "Number of transactions per block",
    disabled: false,
    error: false,
    errorMessage: "Must be at least 1",
  },
  puzzleDifficulty: {
    label: "Puzzle difficulty",
    disabled: false,
    error: false,
    errorMessage: "Must be between 1 and 64",
  },
  poetBlockTime: {
    label: "Poet block time",
    disabled: false,
    error: false,
    errorMessage: "Must be at least 1",
  },
  maxEnduserPayment: {
    label: "Max enduser payment",
    disabled: false,
    error: false,
    errorMessage: "Can't be less than 0",
  },
  minersInitialWalletValue: {
    label: "Miners' initial wallet value",
    disabled: false,
    error: false,
    errorMessage: "Can't be less than 0",
  },
  miningAward: {
    label: "Mining award",
    disabled: false,
    error: false,
    errorMessage: "Can't be less than 0",
  },
  delayBetweenFogNodes: {
    label: "Delay between fog nodes",
    disabled: false,
    error: false,
    errorMessage: "Can't be less than 0",
  },
  delayBetweenEndUsers: {
    label: "Delay between endusers",
    disabled: false,
    error: false,
    errorMessage: "Can't be less than 0",
  },
  aiAssistedMining: {
    label: "Ai assisted mining",
    disabled: false,
    error: false,
  },
  gossipActivated: {
    label: "Gossip activated",
    disabled: false,
    error: false,
  },
  automaticPoAMinersAuthorization: {
    label: "Automatic PoA miners authorization",
    disabled: false,
    error: false,
  },
  parallelPoWmining: {
    label: "Parallel PoW mining",
    disabled: false,
    error: false,
  },
  asymmetricKeyLength: {
    label: "Asymmetric key length",
    disabled: false,
    error: false,
    errorMessage: "Must be a power of 2",
  },
  numOfDPoSdelegates: {
    label: "Number of DPoS delegates",
    disabled: false,
    error: false,
    errorMessage: "Must be between 1 and number of miners",
  },
  storPlc: {
    label: "storPlc",
    disabled: false,
    error: false,
  },
};

type Props = {
  startSimulation: () => Promise<void>;
  simulation: Simulation;
  settings: SimulationParameters;
  setSettings: React.Dispatch<React.SetStateAction<SimulationParameters>>;
  reopenDialog: () => void;
  openMultipleSimulationsDialog: () => void;
};

function SimulationSettings({
  startSimulation,
  simulation,
  settings,
  setSettings,
  reopenDialog,
  openMultipleSimulationsDialog,
}: Props) {
  const [form, setForm] = useState<CustomForm>(initialForm);

  const handlePlacementChange = (
    prop: keyof SimulationParameters,
    value: string
  ) => {
    handleChange(prop, value);
  };

  const handleConsensusChange = (
    prop: keyof SimulationParameters,
    value: string
  ) => {
    handleChange(prop, value);

    setForm({
      // TODO
      ...form,
      poetBlockTime: {
        ...form.poetBlockTime,
        disabled: value !== "4",
      },
      numOfDPoSdelegates: {
        ...form.numOfDPoSdelegates,
        disabled: value !== "5",
      },
      parallelPoWmining: {
        ...form.parallelPoWmining,
        disabled: value !== "1",
      },
    });
  };

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
    validateForm();

    if (!formContainsErrors()) startSimulation();
  };

  const validateForm = () => {
    setForm({
      ...form,
      numOfFogNodes: {
        ...form.numOfFogNodes,
        error: settings.numOfFogNodes < 1,
      },
      numOfUsersPerFogNode: {
        ...form.numOfUsersPerFogNode,
        error: settings.numOfUsersPerFogNode < 1,
      },
      numOfTaskPerUser: {
        ...form.numOfTaskPerUser,
        error: settings.numOfTaskPerUser < 1,
      },
      numOfMiners: {
        ...form.numOfMiners,
        error:
          settings.numOfMiners < 2 ||
          settings.numOfMiners > 1500 ||
          (settings.bcPlacement === "1" &&
            settings.numOfMiners > settings.numOfFogNodes),
        errorMessage:
          settings.bcPlacement === "1" &&
          settings.numOfMiners > settings.numOfFogNodes
            ? "Must be less than number of fog nodes"
            : "Must be between 2 and 1500",
      },
      numberOfEachMinerNeighbours: {
        ...form.numberOfEachMinerNeighbours,
        error:
          settings.numberOfEachMinerNeighbours < 1 ||
          settings.numberOfEachMinerNeighbours > settings.numOfMiners - 1,
      },
      numOfTXperBlock: {
        ...form.numOfTXperBlock,
        error: settings.numOfTXperBlock < 1,
      },
      puzzleDifficulty: {
        ...form.puzzleDifficulty,
        error: settings.puzzleDifficulty < 1 || settings.puzzleDifficulty > 64,
      },
      poetBlockTime: {
        ...form.poetBlockTime,
        error: settings.poetBlockTime < 1,
      },
      maxEnduserPayment: {
        ...form.maxEnduserPayment,
        error: settings.maxEnduserPayment < 1,
      },
      minersInitialWalletValue: {
        ...form.minersInitialWalletValue,
        error: settings.minersInitialWalletValue < 0,
      },
      miningAward: {
        ...form.miningAward,
        error: settings.miningAward < 0,
      },
      delayBetweenFogNodes: {
        ...form.delayBetweenFogNodes,
        error: settings.delayBetweenFogNodes < 0,
      },
      delayBetweenEndUsers: {
        ...form.delayBetweenEndUsers,
        error: settings.delayBetweenEndUsers < 0,
      },
    });
  };

  const formContainsErrors = () => {
    for (const key in form) {
      if (
        !form[key as keyof CustomForm].disabled &&
        form[key as keyof CustomForm].error
      ) {
        return true;
      }
    }

    return false;
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
              onChange={(e) =>
                handlePlacementChange("bcPlacement", e.target.value)
              }
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
              onChange={(e) =>
                handleConsensusChange("bcConsensus", e.target.value)
              }
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
              label={form.numOfFogNodes.label}
              error={form.numOfFogNodes.error}
              helperText={
                form.numOfFogNodes.error && form.numOfFogNodes.errorMessage
              }
              disabled={form.numOfFogNodes.disabled}
            />
            <Tooltip title={form.numOfUsersPerFogNode.label}>
              <TextField
                id="numOfUsersPerFogNode"
                type="number"
                value={settings.numOfUsersPerFogNode}
                onChange={(e) =>
                  handleChange("numOfUsersPerFogNode", e.target.value)
                }
                label={form.numOfUsersPerFogNode.label}
                error={form.numOfUsersPerFogNode.error}
                helperText={
                  form.numOfUsersPerFogNode.error &&
                  form.numOfUsersPerFogNode.errorMessage
                }
                disabled={form.numOfUsersPerFogNode.disabled}
              />
            </Tooltip>
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
              label={form.numOfTaskPerUser.label}
              error={form.numOfTaskPerUser.error}
              helperText={
                form.numOfTaskPerUser.error &&
                form.numOfTaskPerUser.errorMessage
              }
              disabled={form.numOfTaskPerUser.disabled}
            />

            <TextField
              id="numOfMiners"
              type="number"
              value={settings.numOfMiners}
              onChange={(e) => handleChange("numOfMiners", e.target.value)}
              label={form.numOfMiners.label}
              error={form.numOfMiners.error}
              helperText={
                form.numOfMiners.error && form.numOfMiners.errorMessage
              }
              disabled={form.numOfMiners.disabled}
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
              label={form.numberOfEachMinerNeighbours.label}
              error={form.numberOfEachMinerNeighbours.error}
              helperText={
                form.numberOfEachMinerNeighbours.error &&
                form.numberOfEachMinerNeighbours.errorMessage
              }
              disabled={form.numberOfEachMinerNeighbours.disabled}
            />

            <TextField
              id="numOfTXperBlock"
              type="number"
              value={settings.numOfTXperBlock}
              onChange={(e) => handleChange("numOfTXperBlock", e.target.value)}
              label={form.numOfTXperBlock.label}
              error={form.numOfTXperBlock.error}
              helperText={
                form.numOfTXperBlock.error && form.numOfTXperBlock.errorMessage
              }
              disabled={form.numOfTXperBlock.disabled}
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
              label={form.puzzleDifficulty.label}
              error={form.puzzleDifficulty.error}
              helperText={
                form.puzzleDifficulty.error &&
                form.puzzleDifficulty.errorMessage
              }
              disabled={form.puzzleDifficulty.disabled}
            />

            <TextField
              id="poetBlockTime"
              type="number"
              value={settings.poetBlockTime}
              onChange={(e) => handleChange("poetBlockTime", e.target.value)}
              label={form.poetBlockTime.label}
              error={form.poetBlockTime.error}
              helperText={
                form.poetBlockTime.error && form.poetBlockTime.errorMessage
              }
              disabled={form.poetBlockTime.disabled}
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
              label={form.maxEnduserPayment.label}
              error={form.maxEnduserPayment.error}
              helperText={
                form.maxEnduserPayment.error &&
                form.maxEnduserPayment.errorMessage
              }
              disabled={form.maxEnduserPayment.disabled}
            />

            <TextField
              id="minersInitialWalletValue"
              type="number"
              value={settings.minersInitialWalletValue}
              onChange={(e) =>
                handleChange("minersInitialWalletValue", e.target.value)
              }
              label={form.minersInitialWalletValue.label}
              error={form.minersInitialWalletValue.error}
              helperText={
                form.minersInitialWalletValue.error &&
                form.minersInitialWalletValue.errorMessage
              }
              disabled={form.minersInitialWalletValue.disabled}
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
              label={form.miningAward.label}
              error={form.miningAward.error}
              helperText={
                form.miningAward.error && form.miningAward.errorMessage
              }
              disabled={form.miningAward.disabled}
            />

            <TextField
              id="delayBetweenFogNodes"
              type="number"
              value={settings.delayBetweenFogNodes}
              onChange={(e) =>
                handleChange("delayBetweenFogNodes", e.target.value)
              }
              label={form.delayBetweenFogNodes.label}
              error={form.delayBetweenFogNodes.error}
              helperText={
                form.delayBetweenFogNodes.error &&
                form.delayBetweenFogNodes.errorMessage
              }
              disabled={form.delayBetweenFogNodes.disabled}
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
              label={form.delayBetweenEndUsers.label}
              error={form.delayBetweenEndUsers.error}
              helperText={
                form.delayBetweenEndUsers.error &&
                form.delayBetweenEndUsers.errorMessage
              }
              disabled={form.delayBetweenEndUsers.disabled}
            />

            <TextField
              id="asymmetricKeyLength"
              type="number"
              value={settings.asymmetricKeyLength}
              onChange={(e) =>
                handleChange("asymmetricKeyLength", e.target.value)
              }
              label={form.asymmetricKeyLength.label}
              error={form.asymmetricKeyLength.error}
              helperText={
                form.asymmetricKeyLength.error &&
                form.asymmetricKeyLength.errorMessage
              }
              disabled={form.asymmetricKeyLength.disabled}
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
              label={form.numOfDPoSdelegates.label}
              disabled={form.numOfDPoSdelegates.disabled}
              onChange={(e) =>
                handleChange("numOfDPoSdelegates", e.target.value)
              }
              error={form.numOfDPoSdelegates.error}
              helperText={
                form.numOfDPoSdelegates.error &&
                form.numOfDPoSdelegates.errorMessage
              }
            />

            <TextField
              id="storPlc"
              type="number"
              value={settings.storPlc}
              label={form.storPlc.label}
              onChange={(e) => handleChange("storPlc", e.target.value)}
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
              label={form.aiAssistedMining.label}
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
              label={form.gossipActivated.label}
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
              label={form.automaticPoAMinersAuthorization.label}
            />

            <FormControlLabel
              control={
                <Switch
                  id="parallelPoWmining"
                  checked={settings.parallelPoWmining}
                  disabled={form.parallelPoWmining.disabled}
                  onChange={(e) =>
                    handleChange("parallelPoWmining", e.target.checked)
                  }
                />
              }
              label={form.parallelPoWmining.label}
            />
          </Stack>
          <Stack direction="column" justifyContent="center">
            <Stack direction="row" justifyContent="center">
              <Button type="submit" disabled={simulation.isRunning}>
                {simulation.isRunning
                  ? "Simulation Running"
                  : "Start Simulation"}
              </Button>
              {simulation.isRunning && (
                <Tooltip title="Reopen dialog">
                  <IconButton onClick={reopenDialog}>
                    <OpenInNewIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
            <Divider />
            {!simulation.isRunning && (
              <Button onClick={openMultipleSimulationsDialog}>
                Run Multiple Simulations
              </Button>
            )}
          </Stack>
        </FormControl>
      </Box>
    </Container>
  );
}

export default SimulationSettings;
