import { Box, Step, StepLabel, Stepper } from "@mui/material";

const steps = ["Settings", "Simulation parameters"];

function RunSimulation() {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default RunSimulation;
