import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { SimulationResult } from "../@types/simulation";

type Props = {
  simulationResults: SimulationResult[];
  isOpen: boolean;
  handleClose: () => void;
};

function SimulationResultsDialog({
  simulationResults,
  isOpen,
  handleClose,
}: Props) {
  return (
    <Dialog
      onClose={handleClose}
      maxWidth="md"
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Simulation Results
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
        {simulationResults.map((result, index) => (
          <Typography gutterBottom key={index}>
            {result &&
              result.message.split("\n").map((line, lineIndex) => (
                <React.Fragment key={`${index}-${lineIndex}`}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SimulationResultsDialog;
