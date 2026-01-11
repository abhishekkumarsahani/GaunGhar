import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, Dialog, DialogTitle, DialogContent, Chip, CircularProgress,
  Stack, Divider, Avatar, Grid
} from "@mui/material";
import {
  Info, Close, Event, AccessTime, LocationOn, Person, CalendarMonth, Visibility
} from "@mui/icons-material";
import { clientEventApi } from "../../api/user/clientEventApi";
import UserLayout from "../../components/user/UserLayout";

const getImageUrl = (path) => {
  if (!path) return "";
  return `/api/images?path=${encodeURIComponent(path)}`;
};

const EventDetailsModal = ({ open, onClose, data }) => {
  if (!data) return null;

  const infoRow = (icon, label, value) => (
    <Box display="flex" alignItems="center" gap={1} mb={1.5}>
      {React.cloneElement(icon, { sx: { color: "#757575", fontSize: 20 } })}
      <Typography variant="body1">
        <Box component="span" sx={{ fontWeight: "bold", mr: 0.5 }}>{label}:</Box>
        {value || "-"}
      </Typography>
    </Box>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box display="flex" justifyContent="space-between" alignItems="center" px={3} py={2}>
        <Typography variant="h6">Event Details</Typography>
        <IconButton onClick={onClose} size="small"><Close /></IconButton>
      </Box>
      <Divider />
      <DialogContent sx={{ p: 4 }}>
        <Box display="flex" gap={3} alignItems="center" mb={4}>
          <Avatar
            src={getImageUrl(data.Banner)}
            variant="rounded"
            sx={{ width: 100, height: 100, bgcolor: "#f0f0f0" }}
          >
            <Event sx={{ fontSize: 50 }} />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">{data.Title}</Typography>
            <Chip label={data.EveType === "M" ? "Meeting" : "Event"} size="small" sx={{ mt: 1 }} />
          </Box>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={12}>{infoRow(<CalendarMonth />, "Date", `${data.DateFrom} to ${data.DateTo}`)}</Grid>
          <Grid item xs={12}>{infoRow(<AccessTime />, "Time", `${data.TimeFrom} - ${data.TimeTo}`)}</Grid>
          <Grid item xs={12}>{infoRow(<LocationOn />, "Venue", data.Venue)}</Grid>
          <Grid item xs={12}>{infoRow(<Person />, "Organized By", data.OrganisedBy)}</Grid>
          <Grid item xs={12}>{infoRow(<Visibility />, "Views", data.NoOfView)}</Grid>
        </Grid>

        {data.Description && (
          <Box mt={3}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Description</Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: "#fafafa" }}>
              <Typography variant="body2">{data.Description}</Typography>
            </Paper>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

const EventClient = () => {
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const res = await clientEventApi({ ToleID: "ES25", EventType: "1", Flag: "S" });
      if (res.StatusCode === 200) setEventList(res.EventInfoLst || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const viewEvent = async (eventId) => {
    try {
      setLoading(true);
      const res = await clientEventApi({ ToleID: "ES25", EventID: eventId, Flag: "SI" });
      if (res.StatusCode === 200 && res.EventInfoLst?.length > 0) {
        setSelectedEvent(res.EventInfoLst[0]);
        setDetailOpen(true);
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { loadEvents(); }, []);

  return (
    <UserLayout>
      <Box p={3}>
        <Typography variant="h5" mb={3} fontWeight="bold">Events Directory</Typography>
        <Paper sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: "#3f51b5" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Banner</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Event Title</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Schedule</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Venue</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && eventList.length === 0 ? (
                <TableRow><TableCell colSpan={5} align="center" sx={{ py: 5 }}><CircularProgress /></TableCell></TableRow>
              ) : (
                eventList.map((e) => (
                  <TableRow key={e.EventID} hover>
                    <TableCell>
                      <Avatar src={getImageUrl(e.Banner)} variant="rounded" sx={{ width: 45, height: 45 }}>
                        <Event fontSize="small" />
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="bold">{e.Title}</Typography>
                      <Typography variant="caption" color="text.secondary">Type: {e.EveType}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{e.DateFrom}</Typography>
                      <Typography variant="caption" color="text.secondary">{e.TimeFrom}</Typography>
                    </TableCell>
                    <TableCell><Typography variant="body2">{e.Venue}</Typography></TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => viewEvent(e.EventID)} sx={{ bgcolor: "#e8eaf6" }}>
                        <Info fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
        <EventDetailsModal open={detailOpen} onClose={() => setDetailOpen(false)} data={selectedEvent} />
      </Box>
    </UserLayout>
  );
};

export default EventClient;