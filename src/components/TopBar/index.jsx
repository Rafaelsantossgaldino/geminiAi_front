import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import avatarSvg from '../../assets/avatar.svg';

// import imageCompartilhe from '../assets/image/'

const TopBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar
          sx={{
            display: "flex",
            backgroundColor: "transparent",
            height: "7vh",
          }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <IconButton>
                <Avatar src={avatarSvg} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
