

import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Paper, TextField, Button, Stack, 
  IconButton, Checkbox, ListItemText, List, ListItem, Divider 
} from "@mui/material";
import { FaTrash, FaPlus, FaClipboardList, FaCheckCircle } from "react-icons/fa";

export default function EventTodoList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("event_tasks_v2");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("event_tasks_v2", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      bgcolor: "#030712", // Wahi deep dark background
      py: 6, px: 2, 
      color: "white" 
    }}>
      <Paper sx={{ 
        maxWidth: 500, 
        mx: "auto", 
        p: { xs: 3, md: 4 }, 
        bgcolor: "rgba(30, 41, 59, 0.5)", // Glassmorphism effect
        backdropFilter: "blur(12px)",
        borderRadius: "2rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
      }}>
        
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight="900" sx={{ 
            background: "linear-gradient(to right, #ec4899, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-1px"
          }}>
            EVENT TO-DO
          </Typography>
          <Typography variant="body2" sx={{ color: "#94a3b8", mt: 1, opacity: 0.8 }}>
            Manage DJ, Hall, Catering & more
          </Typography>
        </Box>

        {/* Input Section */}
        <Box sx={{ 
          bgcolor: "rgba(15, 23, 42, 0.6)", 
          p: 2, borderRadius: "1.5rem", 
          border: "1px solid rgba(236, 72, 153, 0.2)",
          mb: 4 
        }}>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              placeholder="Add task (e.g. Booking DJ...)"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              InputProps={{ 
                sx: { 
                  color: "white", 
                  borderRadius: "1rem",
                  bgcolor: "rgba(255,255,255,0.05)" 
                } 
              }}
            />
            <Button
              variant="contained"
              onClick={addTask}
              sx={{ 
                borderRadius: "1rem",
                minWidth: "60px",
                background: "linear-gradient(to right, #db2777, #9333ea)",
                "&:hover": { background: "linear-gradient(to right, #be185d, #7e22ce)" }
              }}
            >
              <FaPlus />
            </Button>
          </Stack>
        </Box>

        {/* Task List */}
        <Typography variant="subtitle1" className="text-white" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <FaClipboardList className="text-white" /> Pending Tasks ({tasks.filter(t => !t.completed).length})
        </Typography>

        <Stack spacing={1.5}>
          {tasks.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: "#64748b", py: 4 }}>
              Your list is empty. Start adding!
            </Typography>
          ) : (
            tasks.map((task) => (
              <Paper key={task.id} sx={{ 
                p: 1.5, 
                borderRadius: "1.2rem", 
                bgcolor: task.completed ? "rgba(16, 185, 129, 0.05)" : "rgba(255, 255, 255, 0.03)",
                border: task.completed ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(255,255,255,0.05)",
                display: "flex", 
                alignItems: "center",
                transition: "0.3s"
              }}>
                <Checkbox 
                  checked={task.completed} 
                  onChange={() => toggleComplete(task.id)}
                  sx={{ color: "#8b5cf6", '&.Mui-checked': { color: "#10b981" } }}
                />
                <ListItemText 
                  primary={task.text} 
                  sx={{ 
                    color: task.completed ? "#94a3b8" : "white",
                    textDecoration: task.completed ? "line-through" : "none"
                  }} 
                />
                <IconButton onClick={() => removeTask(task.id)} sx={{ color: "#ef4444" }}>
                  <FaTrash size={16} />
                </IconButton>
              </Paper>
            ))
          )}
        </Stack>

        {/* Footer Stats */}
        {tasks.length > 0 && (
          <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: "#10b981", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5 }}>
              <FaCheckCircle /> {tasks.filter(t => t.completed).length} Tasks Finished
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}