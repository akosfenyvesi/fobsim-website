import React from "react";
import { Order } from "../../../@types/table";
import {
  SimulationDto,
  SimulationParameters,
} from "../../../@types/simulation";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedRow from "./EnhancedRow";
import { deleteEntry } from "../../../utils/firebaseDbUtils";
import { useAuthContext } from "../../../contexts/authContext";

const sortSimulations = (
  simulations: SimulationDto[],
  property: keyof SimulationParameters,
  isAsc: boolean
) => {
  return [...simulations].sort((a, b) => {
    var aValue;
    var bValue;
    if (property === "time") {
      aValue = a.id;
      bValue = b.id;
    } else if (property === "elapsedTime") {
      aValue = a.elapsedTime;
      bValue = b.elapsedTime;
    } else {
      aValue = a.settings[property as keyof typeof a.settings];
      bValue = b.settings[property as keyof typeof b.settings];
    }

    if (aValue && bValue) {
      if (aValue < bValue) {
        return isAsc ? -1 : 1;
      }
      if (aValue > bValue) {
        return isAsc ? 1 : -1;
      }
    }
    return 0;
  });
};

interface Props {
  simulations: SimulationDto[];
}

function EnhancedTable({ simulations }: Props) {
  const { currentUser } = useAuthContext();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof SimulationParameters>("time");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof SimulationParameters
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = simulations.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleDelete = (_: React.MouseEvent<unknown>) => {
    if (!currentUser) return;

    selected.map((selected) => {
      const path = `/fobsim/users/${currentUser.uid}/${selected}`;
      deleteEntry(path);
    });

    setSelected([]);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - simulations.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      sortSimulations(simulations, orderBy, order === "asc").slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [simulations, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDelete={handleDelete}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size="medium">
            <EnhancedTableHead
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              order={order}
              orderBy={orderBy}
              rowCount={simulations.length}
            />
            <TableBody>
              {visibleRows.map((simulation, index) => (
                <EnhancedRow
                  key={index}
                  simulation={simulation}
                  selected={selected}
                  setSelected={setSelected}
                  index={index}
                />
              ))}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    style={{
                      height: 62 * emptyRows,
                      padding: 0,
                    }}
                  />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={simulations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default EnhancedTable;
