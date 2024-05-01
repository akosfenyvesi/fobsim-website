import {
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DownloadIcon from "@mui/icons-material/Download";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import React, { useState } from "react";
import { formatTimestamp } from "../../../utils/dateTimeUtils";
import {
  SimulationDto,
  SimulationParameters,
} from "../../../@types/simulation";
import SimulationResultsDialog from "../../SimulationResultsDialog";
import ChartDialog from "../../multipleSimulations/components/ChartDialog";
import { ChartData } from "../../../@types/chart";
import {
  convertStringFromFobSimFormat,
  mapFobSimIdToLabel,
} from "../../../utils/settingsJsonUtils";

interface Props {
  simulation: SimulationDto;
  selected: readonly number[];
  setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
  index: number;
}

function EnhancedRow({ simulation, selected, setSelected, index }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [chartDialogOpen, setChartDialogOpen] = useState(false);
  const [chartData, setChartData] = useState<ChartData>({
    xAxis: [],
    xAxisLabel: "",
    elapsedTime: [],
    numberOfTransactions: [],
  });
  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleDownload = (
    event: React.MouseEvent<HTMLButtonElement>,
    downloadUrl: string,
    datetime: string
  ) => {
    event.stopPropagation();

    const anchor = document.createElement("a");
    anchor.href = downloadUrl;

    anchor.download = `${datetime} - temorary files.zip`;

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
  };

  const handleOpenDialog = (event: React.MouseEvent<HTMLTableCellElement>) => {
    event.stopPropagation();
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenChartDialog = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const parameterName = convertStringFromFobSimFormat(
      simulation.extraSimulations.name
    ) as keyof SimulationParameters;

    const extraInputs = [
      simulation.settings[parameterName] as number,
      ...simulation.extraSimulations.inputs,
    ];

    var numberOfTransactions;
    const parameters = [
      "numOfFogNodes",
      "numOfUsersPerFogNode",
      "numOfTaskPerUser",
    ];
    if (parameters.includes(parameterName)) {
      parameters.splice(parameters.indexOf(parameterName), 1);
      numberOfTransactions = extraInputs.map((i) => {
        return (
          i *
          (simulation.settings[
            parameters[0] as keyof SimulationParameters
          ] as number) *
          (simulation.settings[
            parameters[1] as keyof SimulationParameters
          ] as number)
        );
      });
    } else {
      numberOfTransactions =
        simulation.settings["numOfFogNodes"] *
        simulation.settings["numOfUsersPerFogNode"] *
        simulation.settings["numOfTaskPerUser"];
    }

    setChartData({
      xAxis: extraInputs,
      xAxisLabel: mapFobSimIdToLabel(parameterName),
      elapsedTime: simulation.elapsedTime,
      numberOfTransactions: numberOfTransactions,
    });
    setChartDialogOpen(true);
  };

  const handleCloseChartDialog = () => {
    setChartDialogOpen(false);
  };

  if (!simulation.settings) return;
  const settings = simulation.settings as SimulationParameters;
  const formattedDateTime = formatTimestamp(simulation.id);
  const isItemSelected = isSelected(simulation.id);
  const labelId = `enhanced-table-checkbox-${index}`;

  return (
    <>
      <TableRow
        hover
        onClick={(event: React.MouseEvent<unknown, MouseEvent>) =>
          handleClick(event, simulation.id)
        }
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{ "aria-labelledby": labelId }}
          />
        </TableCell>
        <TableCell
          onClick={handleOpenDialog}
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          style={{ cursor: "pointer" }}
        >
          {formattedDateTime}
          <Tooltip
            title="Download generated files"
            children={
              <IconButton
                onClick={(e) =>
                  handleDownload(
                    e,
                    simulation.files.temporaryfiles,
                    formattedDateTime
                  )
                }
              >
                <DownloadIcon />
              </IconButton>
            }
          />
        </TableCell>
        <TableCell align="right">
          {simulation.elapsedTime.length > 1 && (
            <Tooltip
              title="Show chart"
              children={
                <IconButton onClick={(e) => handleOpenChartDialog(e)}>
                  <ShowChartIcon />
                </IconButton>
              }
            />
          )}
          {simulation.elapsedTime[0].toFixed(4)}
        </TableCell>
        <TableCell align="right">{settings.bcFunction}</TableCell>
        <TableCell align="right">{settings.bcPlacement}</TableCell>
        <TableCell align="right">{settings.bcConsensus}</TableCell>
        <TableCell align="right">{settings.numOfFogNodes}</TableCell>
        <TableCell align="right">{settings.numOfUsersPerFogNode}</TableCell>
        <TableCell align="right">{settings.numOfTaskPerUser}</TableCell>
        <TableCell align="right">{settings.numOfMiners}</TableCell>
        <TableCell align="right">
          {settings.numberOfEachMinerNeighbours}
        </TableCell>
        <TableCell align="right">{settings.numOfTXperBlock}</TableCell>
        <TableCell align="right">{settings.puzzleDifficulty}</TableCell>
        <TableCell align="right">{settings.poetBlockTime}</TableCell>
        <TableCell align="right">{settings.maxEnduserPayment}</TableCell>
        <TableCell align="right">{settings.minersInitialWalletValue}</TableCell>
        <TableCell align="right">{settings.miningAward}</TableCell>
        <TableCell align="right">{settings.delayBetweenFogNodes}</TableCell>
        <TableCell align="right">{settings.delayBetweenEndUsers}</TableCell>
        <TableCell align="right">{settings.asymmetricKeyLength}</TableCell>
        <TableCell align="right">{settings.numOfDPoSdelegates}</TableCell>
        <TableCell align="right">{settings.storPlc}</TableCell>
        <TableCell align="center">
          {settings.aiAssistedMining ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </TableCell>
        <TableCell align="center">
          {settings.gossipActivated ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </TableCell>
        <TableCell align="center">
          {settings.automaticPoAMinersAuthorization ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </TableCell>
        <TableCell align="center">
          {settings.parallelPoWmining ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankIcon />
          )}
        </TableCell>
      </TableRow>
      {dialogOpen && (
        <SimulationResultsDialog
          simulationResults={simulation.temp}
          isOpen={dialogOpen}
          handleClose={handleCloseDialog}
        />
      )}
      {chartDialogOpen && (
        <ChartDialog
          isOpen={chartDialogOpen}
          handleClose={handleCloseChartDialog}
          data={chartData}
        />
      )}
    </>
  );
}

export default EnhancedRow;
