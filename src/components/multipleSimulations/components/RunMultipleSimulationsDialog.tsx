import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import {
  ExtraSimulations,
  SimulationParameters,
} from "../../../@types/simulation";
import { convertSringToFobSimFormat } from "../../../utils/settingsJsonUtils";

interface KeyValuePair {
  [key: string]: string;
}

const parameters: KeyValuePair = {
  numOfFogNodes: "Number of fog nodes",
  numOfUsersPerFogNode: "Number of users per fog node",
  numOfTaskPerUser: "Number of tasks per user",
  numOfMiners: "Number of miners",
  numberOfEachMinerNeighbours: "Number of each miner's neighbours",
  numOfTXperBlock: "Number of transactions per block",
  puzzleDifficulty: "Puzzle difficulty",
  poetBlockTime: "Poet block time",
  maxEnduserPayment: "Max enduser payment",
  minersInitialWalletValue: "Miners' initial wallet value",
  miningAward: "Mining award",
  delayBetweenFogNodes: "Delay between fog nodes",
  delayBetweenEndUsers: "Delay between endusers",
  asymmetricKeyLength: "Asymmetric key length",
  numOfDPoSdelegates: "Number of DPoS delegates",
};

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  settings: SimulationParameters;
  startSimulation: (extraSimulations?: ExtraSimulations) => Promise<void>;
};

function RunMultipleSimulationsDialog({
  isOpen,
  handleClose,
  settings,
  startSimulation,
}: Props) {
  var [selectedParameter, setSelectedParameter] = useState<ExtraSimulations>({
    name: "numOfFogNodes",
    inputs: [settings["numOfFogNodes" as keyof SimulationParameters] as number],
  });
  const handleParameterChange = (value: string) => {
    setSelectedParameter({
      name: value,
      inputs: [settings[value as keyof SimulationParameters] as number],
    });
  };

  const handleParameterValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    setSelectedParameter((prevState) => {
      const updatedInputs = [...prevState.inputs]; // Create a copy of the inputs array
      updatedInputs[index] = parseInt(event?.target.value);
      return { ...prevState, inputs: updatedInputs };
    });
  };

  const handleRemoveParameter = () => {
    setSelectedParameter((prevState) => ({
      ...prevState,
      inputs: prevState.inputs.slice(0, -1),
    }));
  };

  const handleAddParameter = () => {
    setSelectedParameter((prevState) => ({
      ...prevState,
      inputs: [
        ...prevState.inputs,
        settings[prevState.name as keyof SimulationParameters] as number,
      ],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var extraSettings: ExtraSimulations = {
      name: convertSringToFobSimFormat(selectedParameter.name) ?? "",
      inputs: selectedParameter.inputs,
    };

    startSimulation(extraSettings);
  };

  return (
    <Dialog
      onClose={handleClose}
      maxWidth="md"
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Run Multiple Simulations
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <FormControl
        component="form"
        sx={{ m: 1, minWidth: 300 }}
        onSubmit={handleSubmit}
      >
        <DialogContent dividers>
          <Typography>
            You can run up to 10 simulations at the same time. Choose one
            parameter that you would like to change:
          </Typography>
          <Stack
            sx={{ minWidth: 0, marginTop: 2 }}
            spacing={2}
            direction="column"
            justifyContent="center"
          >
            <Stack direction="row" spacing={2}>
              <TextField
                required
                id="parameterName"
                select
                value={selectedParameter.name}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => handleParameterChange(e.target.value)}
                label="Name of parameter"
                style={{ flexGrow: 1 }}
              >
                {Object.entries(parameters).map(([key, name]) => (
                  <MenuItem key={key} value={key}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
              <IconButton
                disabled={selectedParameter.inputs.length === 1}
                onClick={handleRemoveParameter}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton
                disabled={selectedParameter.inputs.length === 10}
                onClick={handleAddParameter}
              >
                <AddIcon />
              </IconButton>
            </Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="originalValue"
                  type="number"
                  value={
                    settings[
                      selectedParameter.name as keyof SimulationParameters
                    ]
                  }
                  label={parameters[selectedParameter.name] + " (original)"}
                  disabled
                />
              </Grid>
              {selectedParameter.inputs.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <TextField
                    id="parameterValue"
                    type="number"
                    key={index}
                    value={item}
                    onChange={(
                      e: React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                      >
                    ) => handleParameterValueChange(e, index)}
                    label={parameters[selectedParameter.name]}
                  />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" autoFocus>
            Start Simulations
          </Button>
        </DialogActions>
      </FormControl>
    </Dialog>
  );
}

export default RunMultipleSimulationsDialog;
