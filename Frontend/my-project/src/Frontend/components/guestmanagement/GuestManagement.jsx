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
  IconButton,
  Divider,
  Chip,
} from "@mui/material";
import {
  FaTrash,
  FaFileExcel,
  FaUserPlus,
  FaUsers,
  FaAddressBook,
} from "react-icons/fa";
import * as XLSX from "xlsx";

const eventsList = ["Mehndi", "Barat", "Walima"];
const quickStatus = [
  "Single",
  "With Family",
  "Mr. & Mrs.",
  "2 Persons",
  "4 Persons",
];

export default function GuestListManager() {
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestStatus, setGuestStatus] = useState(""); // Number ki jagah Text Status
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("guestList_v3");
    if (stored) setGuests(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("guestList_v3", JSON.stringify(guests));
  }, [guests]);

  const importContact = async () => {
    try {
      const props = ["name", "tel"];
      const contacts = await navigator.contacts.select(props, {
        multiple: false,
      });
      if (contacts.length > 0) {
        setGuestName(contacts[0].name[0] || "");
        setGuestPhone(
          contacts[0].tel[0] ? contacts[0].tel[0].replace(/\s+/g, "") : "",
        );
      }
    } catch (err) {
      alert("Contact picker not supported or closed.");
    }
  };

  const addGuest = () => {
    if (!guestName.trim() || selectedEvents.length === 0) return;
    const newGuest = {
      name: guestName,
      phone: guestPhone,
      status: guestStatus || "Single",
      events: selectedEvents,
    };
    setGuests([...guests, newGuest]);
    setGuestName("");
    setGuestPhone("");
    setGuestStatus("");
    setSelectedEvents([]);
  };

  const removeGuest = (index) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  const exportToExcel = () => {
    const wsData = [["Name", "Phone", "Status/Count", "Events"]];
    guests.forEach((g) =>
      wsData.push([g.name, g.phone, g.status, g.events.join(", ")]),
    );
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Guest List");
    XLSX.writeFile(wb, "Wedding_Guest_List.xlsx");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#030712",
        py: 6,
        px: 2,
        color: "white",
      }}
    >
      <Paper
        sx={{
          maxWidth: 700,
          mx: "auto",
          p: { xs: 3, md: 5 },
          bgcolor: "rgba(30, 41, 59, 0.5)",
          backdropFilter: "blur(10px)",
          borderRadius: "2rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="900"
            sx={{
              background: "linear-gradient(to right, #ec4899, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            GUEST MANAGER PRO
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<FaAddressBook />}
            onClick={importContact}
            sx={{
              bgcolor: "#334155",
              borderRadius: "1rem",
              "&:hover": { bgcolor: "#475569" },
            }}
          >
            Import Phone
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FaFileExcel />}
            onClick={exportToExcel}
            sx={{
              borderColor: "#10b981",
              color: "#10b981",
              borderRadius: "1rem",
            }}
          >
            Excel Export
          </Button>
        </Stack>

        <Box
          sx={{
            bgcolor: "rgba(15, 23, 42, 0.6)",
            p: 3,
            borderRadius: "1.5rem",
            mb: 4,
          }}
        >
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="Guest Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              InputProps={{ sx: { color: "white", borderRadius: "1rem" } }}
              InputLabelProps={{ sx: { color: "#94a3b8" } }}
            />

            <TextField
              fullWidth
              label="WhatsApp Number"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              InputProps={{ sx: { color: "white", borderRadius: "1rem" } }}
              InputLabelProps={{ sx: { color: "#94a3b8" } }}
            />

            <Box>
              <TextField
                fullWidth
                label="Invitation Status (e.g. With Family)"
                value={guestStatus}
                onChange={(e) => setGuestStatus(e.target.value)}
                placeholder="Single, With Family, 4 People..."
                InputProps={{ sx: { color: "white", borderRadius: "1rem" } }}
                InputLabelProps={{ sx: { color: "#94a3b8" } }}
              />
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1, flexWrap: "wrap", gap: 1 }}
              >
                {quickStatus.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    onClick={() => setGuestStatus(s)}
                    sx={{
                      color: "white",
                      borderColor: "rgba(236, 72, 153, 0.5)",
                      cursor: "pointer",
                    }}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Stack>
            </Box>

            <FormControl fullWidth>
              <InputLabel sx={{ color: "#94a3b8" }}>Invited For</InputLabel>
              <Select
                multiple
                value={selectedEvents}
                onChange={(e) => setSelectedEvents(e.target.value)}
                input={
                  <OutlinedInput
                    label="Invited For"
                    sx={{ borderRadius: "1rem", color: "white" }}
                  />
                }
                renderValue={(selected) => selected.join(", ")}
              >
                {eventsList.map((ev) => (
                  <MenuItem key={ev} value={ev}>
                    <Checkbox checked={selectedEvents.indexOf(ev) > -1} />
                    <ListItemText primary={ev} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              startIcon={<FaUserPlus />}
              onClick={addGuest}
              sx={{
                py: 1.5,
                borderRadius: "1rem",
                fontWeight: "bold",
                background: "linear-gradient(to right, #db2777, #9333ea)",
              }}
            >
              SAVE GUEST
            </Button>
          </Stack>
        </Box>

        <Typography
          variant="h6" className="text-white" 
          sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
        >
          <FaUsers  /> List ({guests.length})
        </Typography>

        <Stack spacing={1.5}>
          {guests.map((g, i) => (
            <Paper
              key={i}
              sx={{
                p: 2,
                borderRadius: "1rem",
                bgcolor: "rgba(255, 255, 255, 0.03)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <Box    >
                <Typography className="text-white capitalize" variant="body1" fontWeight="bold">
                  {g.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                  <b style={{ color: "#8b5cf6" }}>{g.status}</b> • {g.phone} •{" "}
                  <span style={{ color: "#ec4899" }}>
                    {g.events.join(", ")}
                  </span>
                </Typography>
              </Box>
              <IconButton
                onClick={() => removeGuest(i)}
                sx={{ color: "#ef4444" }}
              >
                <FaTrash size={16} />
              </IconButton>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
