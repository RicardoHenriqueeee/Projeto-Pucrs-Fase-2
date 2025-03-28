import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Container, ThemeProvider, createTheme } from "@mui/material";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import List from "./pages/List";
import Edit from "./pages/Edit";
import Notification from "./components/Notification";



const theme = createTheme({
  palette: {
    primary: {
      main: '#2E3B55',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #2E3B55 30%, #4A6491 90%)',
        },
      },
    },
  },
});

export default function App() {
  const [notification, setNotification] = useState({ open: false, message: "", severity: "info" });

  const showNotification = (message, severity = "info") => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route 
              path="/register" 
              element={<Register showNotification={showNotification} />} 
            />
            <Route path="/list" element={<List showNotification={showNotification} />} />
            <Route 
              path="/edit/:id" 
              element={<Edit showNotification={showNotification} />} 
            />
          </Routes>
        </Container>
        <Notification 
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      </Router>
    </ThemeProvider>
  );
}