import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  CircularProgress,
  Button,
  Stack,
} from "@mui/material";
import { Call, SupportAgent, Person, HelpCenter } from "@mui/icons-material";
import { clientHelplineApi } from "../../api/user/clientHelplineApi";
import UserLayout from "../../components/user/UserLayout";

const HelplineClient = () => {
  const [helplineList, setHelplineList] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadHelplines = async () => {
    try {
      setLoading(true);
      // Using the Flag "S" and ToleID "ES25" from your provided JSON
      const res = await clientHelplineApi({ Flag: "S", ToleID: "ES25" });
      if (res.StatusCode === 200) {
        setHelplineList(res.CHLst || []);
      }
    } catch (err) {
      console.error("Error loading helplines:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHelplines();
  }, []);

  return (
    <UserLayout>
      <Box p={3}>
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <HelpCenter color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight="bold">
            Emergency & Support Helplines
          </Typography>
        </Stack>

        <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#3f51b5" }}> {/* Matches Tole Directory Theme */}
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Service</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact Person</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phone Number</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : helplineList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    No helpline contacts found.
                  </TableCell>
                </TableRow>
              ) : (
                helplineList.map((item) => (
                  <TableRow key={item.HelplineID} hover>
                    {/* For Help */}
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <SupportAgent color="action" fontSize="small" />
                        <Typography variant="body1" fontWeight="500">
                          {item.ForHelp}
                        </Typography>
                      </Stack>
                    </TableCell>

                    {/* Contact Name */}
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Person color="disabled" fontSize="small" />
                        <Typography variant="body2">{item.ContactName}</Typography>
                      </Stack>
                    </TableCell>

                    {/* Contact Number */}
                    <TableCell>
                      <Typography variant="body1" sx={{ fontFamily: 'monospace', letterSpacing: 1 }}>
                        {item.Contact}
                      </Typography>
                    </TableCell>

                    {/* Action: Call Button */}
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<Call />}
                        href={`tel:${item.Contact}`}
                        sx={{ 
                          borderRadius: '20px', 
                          textTransform: 'none',
                          boxShadow: 1
                        }}
                      >
                        Call
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </UserLayout>
  );
};

export default HelplineClient;