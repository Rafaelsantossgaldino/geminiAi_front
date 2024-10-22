import { ThemeProvider } from "@mui/material";
import TopBar from "./components/TopBar";
import theme from "./styles/theme";
import { Outlet } from "react-router-dom";

import "./styles/global.css";
import "./styles/fonts.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <TopBar />
      
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
