import { Paper, Typography } from "@mui/material";
import appConfig from "../../config.jsx";
import "../../styles/Navbar.scss"; // Import your SCSS file
import useScroll from "../../hooks/useScroll.js";
const Navbar = () => {
  const scrolling = useScroll();

  return (
    <Paper
      className={`navbar ${scrolling ? "fade" : ""}`}
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        borderRadius: 0,
      }}
    >
      <Typography
        variant="title"
        fontWeight={"bold"}
        color="primary.contrastText"
      >
        {appConfig.appName.toPascalCase().toUpperCase()}
      </Typography>
    </Paper>
  );
};

export default Navbar;
