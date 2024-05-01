import React from "react";
import { Column, Order } from "../../../@types/table";
import { SimulationParameters } from "../../../@types/simulation";
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";

const columns: readonly Column[] = [
  {
    id: "time",
    align: "left",
    disablePadding: true,
    label: "Date",
    tooltip: "Date",
    minWidth: 180,
  },
  {
    id: "elapsedTime",
    align: "right",
    disablePadding: false,
    label: "Time",
    tooltip: "Elapsed time (s)",
    minWidth: 100,
  },
  {
    id: "bcFunction",
    align: "right",
    disablePadding: false,
    label: "Function",
    tooltip:
      "1 - Data Management\n2 - Computational services\n3 - Payment\n4 - Identity Management",
    minWidth: 70,
  },
  {
    id: "bcPlacement",
    align: "right",
    disablePadding: false,
    label: "Placement",
    tooltip: "1 - Fog layer\n2 - End-user layer",
    minWidth: 70,
  },
  {
    id: "bcConsensus",
    align: "right",
    disablePadding: false,
    label: "Consensus",
    tooltip:
      "1 - Proof of Work (PoW)\n2 - Proof of Stake (PoS)\n3 - Proof of Authority (PoA)\n4 - Proof of Elapsed Time (PoET)\n5 - Delegated Proof of Stake (DPoS)",
    minWidth: 70,
  },
  {
    id: "numOfFogNodes",
    align: "right",
    disablePadding: false,
    label: "Fog Nodes",
    tooltip: "Number of fog nodes",
    minWidth: 70,
  },
  {
    id: "numOfUsersPerFogNode",
    align: "right",
    disablePadding: false,
    label: "Users",
    tooltip: "Number of users per fog node",
    minWidth: 70,
  },
  {
    id: "numOfTaskPerUser",
    align: "right",
    disablePadding: false,
    label: "Tasks",
    tooltip: "Number of users per fog node",
    minWidth: 70,
  },
  {
    id: "numOfMiners",
    align: "right",
    disablePadding: false,
    label: "Miners",
    tooltip: "Number of miners",
    minWidth: 100,
  },
  {
    id: "numberOfEachMinerNeighbours",
    align: "right",
    disablePadding: false,
    label: "Neighbours",
    tooltip: "Number of each miner's neighbours",
    minWidth: 100,
  },
  {
    id: "numOfTXperBlock",
    align: "right",
    disablePadding: false,
    label: "Txs",
    tooltip: "Number of transactions per block",
    minWidth: 100,
  },
  {
    id: "puzzleDifficulty",
    align: "right",
    disablePadding: false,
    label: "Difficulty",
    tooltip: "Puzzle difficulty",
    minWidth: 100,
  },
  {
    id: "poetBlockTime",
    align: "right",
    disablePadding: false,
    label: "PoEt",
    tooltip: "Poet block time",
    minWidth: 100,
  },
  {
    id: "maxEnduserPayment",
    align: "right",
    disablePadding: false,
    label: "Payment",
    tooltip: "Max enduser payment",
    minWidth: 100,
  },
  {
    id: "minersInitialWalletValue",
    align: "right",
    disablePadding: false,
    label: "Wallet",
    tooltip: "Miners' initial wallet value",
    minWidth: 100,
  },
  {
    id: "miningAward",
    align: "right",
    disablePadding: false,
    label: "Award",
    tooltip: "Mining award",
    minWidth: 100,
  },
  {
    id: "delayBetweenFogNodes",
    align: "right",
    disablePadding: false,
    label: "Fog delay",
    tooltip: "Delay between fog nodes",
    minWidth: 100,
  },
  {
    id: "delayBetweenEndUsers",
    align: "right",
    disablePadding: false,
    label: "User delay",
    tooltip: "Delay between endusers",
    minWidth: 100,
  },
  {
    id: "asymmetricKeyLength",
    align: "right",
    disablePadding: false,
    label: "Key length",
    tooltip: "Asymmetric key length",
    minWidth: 100,
  },
  {
    id: "numOfDPoSdelegates",
    align: "right",
    disablePadding: false,
    label: "Delegates",
    tooltip: "Number of DPoS delegates",
    minWidth: 100,
  },
  {
    id: "storPlc",
    align: "right",
    disablePadding: false,
    label: "Stor plc",
    tooltip: "Stor plc",
    minWidth: 100,
  },
  {
    id: "aiAssistedMining",
    align: "center",
    disablePadding: false,
    label: "Ai",
    tooltip: "Ai assisted mining",
    minWidth: 100,
  },
  {
    id: "gossipActivated",
    align: "center",
    disablePadding: false,
    label: "Gossip",
    tooltip: "Gossip acticvated",
    minWidth: 100,
  },
  {
    id: "automaticPoAMinersAuthorization",
    align: "center",
    disablePadding: false,
    label: "Authorization",
    tooltip: "Automatic PoA miners authorization",
    minWidth: 100,
  },
  {
    id: "parallelPoWmining",
    align: "center",
    disablePadding: false,
    label: "Parallel mining",
    tooltip: "Parallel PoW mining",
    minWidth: 100,
  },
];

interface Props {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof SimulationParameters
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: Props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler =
    (property: keyof SimulationParameters) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all simulations",
            }}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            padding={column.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === column.id ? order : false}
            style={{ minWidth: column.minWidth }}
          >
            <Tooltip title={column.tooltip} arrow>
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
              >
                <>{column.label}</>
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
