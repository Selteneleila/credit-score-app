import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../../theme";

const CreditScoreReport = ({ client }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingTop: "1rem",
      }}
    >
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography
                variant="h4"
                style={{ fontWeight: "lighter", color: colors.blueAccent[300] }}
              >
                Salary
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>{client?.salary}DT</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                variant="h4"
                style={{ fontWeight: "lighter", color: colors.blueAccent[300] }}
              >
                Account Balance:
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>{client?.accountBalance} DT</Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Typography
                variant="h4"
                style={{ fontWeight: "lighter", color: colors.blueAccent[300] }}
              >
                Previous Credits:
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {client?.penalties
                  ? `${client.previousCredit} /10`
                  : "Not available"}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                variant="h4"
                style={{ fontWeight: "lighter", color: colors.blueAccent[300] }}
              >
                Payment History:
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {client?.penalties
                  ? `${client.paymentHistory} /10`
                  : "Not available"}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                variant="h4"
                style={{ fontWeight: "lighter", color: colors.blueAccent[300] }}
              >
                Penalties:
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {client?.penalties
                  ? `${client.penalties} /10`
                  : "Not available"}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CreditScoreReport;
