import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
  Box,
  Button,
  MobileStepper,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const steps: VideoStepperItem[] = [
  {
    title: "FoBSim Series: E-01",
    url: "https://www.youtube.com/embed/gvAJa3TqWw8?si=zgPeKeUk2Q9J7F27",
  },
  {
    title: "FoBSim Series: E-02",
    url: "https://www.youtube.com/embed/ohmQtdbiv3U?si=FH9o0vbDVPdmFY4H",
  },
  {
    title: "FoBSim Series: E-03",
    url: "https://www.youtube.com/embed/edXibcvJIe8?si=dZeuUef40SddkVxk",
  },
  {
    title: "FoBSim Series: E-04",
    url: "https://www.youtube.com/embed/ufZ-n3ISzsw?si=pTXEq-gipLtLOMCP",
  },
];

function VideoStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography>{steps[activeStep].title}</Typography>
      </Paper>
      <iframe
        width="560"
        height="315"
        src={steps[activeStep].url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
      />
    </Box>
  );
}

export default VideoStepper;
