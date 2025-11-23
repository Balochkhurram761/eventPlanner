import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  Typography,
  Paper,
  Stack,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import * as XLSX from "xlsx";

const events = ["Mehndi", "Barat", "Walima"];

export default function GuestListManager() {
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [guests, setGuests] = useState([]);

  //  Load saved guests
  useEffect(() => {
    const stored = localStorage.getItem("guestList");
    if (stored) setGuests(JSON.parse(stored));
  }, []);

  //  Save guests
  useEffect(() => {
    localStorage.setItem("guestList", JSON.stringify(guests));
  }, [guests]);

  //  Add Guest
  const addGuest = () => {
    if (!guestName.trim() || selectedEvents.length === 0) return;
    const newGuest = {
      name: guestName,
      persons: Number(guestCount),
      events: selectedEvents,
    };
    setGuests([...guests, newGuest]);
    setGuestName("");
    setGuestCount(1);
    setSelectedEvents([]);
  };

  //  Remove Guest
  const removeGuest = (index) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  //  Export to Excel
  const exportToExcel = () => {
    const wsData = [["Name", "Persons", "Events"]];
    guests.forEach((g) =>
      wsData.push([g.name, g.persons, g.events.join(", ")])
    );

    const wb = XLSX.utils.book_new(); // create new file excel
    const ws = XLSX.utils.aoa_to_sheet(wsData); // array data convert to excel
    XLSX.utils.book_append_sheet(wb, ws, "Guest List");
    XLSX.writeFile(wb, "GuestList.xlsx");
  };

  return (
    <Box sx={{ p: 4, maxWidth: 700, mx: "auto" }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ color: pink[700] }}
      >
        Guest List Manager
      </Typography>

      {/* Input Section */}
      <Stack direction="" gap={2} spacing={2} mb={3} flexWrap="wrap">
        <TextField
          label="Guest Name"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          fullWidth
          sx={{ minWidth: 200 }}
        />

        <TextField
          label="Count"
          type="number"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
          sx={{ width: 100 }}
        />

        {/* Multi Select Events */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Events</InputLabel>
          <Select
            multiple
            value={selectedEvents}
            onChange={(e) => setSelectedEvents(e.target.value)}
            input={<OutlinedInput label="Events" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {events.map((event) => (
              <MenuItem key={event} value={event}>
                <Checkbox checked={selectedEvents.indexOf(event) > -1} />
                <ListItemText primary={event} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={addGuest}
          sx={{
            backgroundColor: "#e91e63", 
            "&:hover": {
              backgroundColor: "#c2185b", 
            },
          }}
        >
          Add
        </Button>
      </Stack>

      {/* Guest List */}
      <Stack spacing={1}>
        {guests.map((g, i) => (
          <Paper
            key={i}
            sx={{
              p: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>
              <strong>{g.name}</strong> — {g.persons} person(s) <br />
              <small>Events: {g.events.join(", ")}</small>
            </Typography>
            <Button
              color="error"
              variant="outlined"
              size="small"
              onClick={() => removeGuest(i)}
            >
              Remove
            </Button>
          </Paper>
        ))}
      </Stack>

      {/* Export Button */}
      {guests.length > 0 && (
        <Box mt={3}>
          <Button
            variant="contained"
            color="success"
            startIcon={<span></span>}
            onClick={exportToExcel}
          >
            Export to Excel
          </Button>
        </Box>
      )}
    </Box>
  );
}
