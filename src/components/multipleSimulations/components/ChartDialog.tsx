import CloseIcon from "@mui/icons-material/Close";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Switch,
} from "@mui/material";
import { ChartData } from "../../../@types/chart";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  data: ChartData;
};

function ChartDialog({ isOpen, handleClose, data }: Props) {
  const [checked, setChecked] = useState(false);
  const [yAxis, setYAxys] = useState<number[]>(data.elapsedTime);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    if (event.target.checked) {
      if (typeof data.numberOfTransactions === "number") {
        const elapsedTimeArray = [];
        for (let i = 0; i < data.elapsedTime.length; i++) {
          elapsedTimeArray.push(
            data.numberOfTransactions / data.elapsedTime[i]
          );
        }
        setYAxys(elapsedTimeArray);
      } else {
        const elapsedTimeArray = [];
        for (let i = 0; i < data.elapsedTime.length; i++) {
          elapsedTimeArray.push(
            data.numberOfTransactions[i] / data.elapsedTime[i]
          );
        }
        setYAxys(elapsedTimeArray);
      }
    } else {
      setYAxys(data.elapsedTime);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      maxWidth="md"
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Simulation Results Chart
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
      <DialogContent dividers>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Elapsed time (s)</Grid>
          <Grid item>
            <Switch
              checked={checked}
              onChange={handleChange}
              value="checked"
              color="default"
            />
          </Grid>
          <Grid item>Tx / s</Grid>
        </Grid>
        <LineChart
          xAxis={[{ data: data.xAxis, label: data.xAxisLabel }]}
          yAxis={[{ label: checked ? "Tx / s" : "Elapsed Time (s)" }]}
          series={[
            {
              curve: "linear",
              data: yAxis,
            },
          ]}
          width={500}
          height={300}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ChartDialog;
