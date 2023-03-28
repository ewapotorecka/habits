import { AppBar, Button, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { Link, useLocation } from "react-router-dom";
import theme from "../../styles/theme";

const Nav = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <AppBar
      position="static"
      sx={{ background: theme.palette.common.black, width: "100%" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{ display: "flex", gap: "2rem", justifyContent: "flex-end" }}
        >
          <Button
            variant={pathname === "/" ? "contained" : "outlined"}
            color="secondary"
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              Dashboard
            </Link>
          </Button>

          <Button
            variant={pathname === "/knowledge" ? "contained" : "outlined"}
            color="secondary"
          >
            <Link
              to="/knowledge"
              style={{
                textDecoration: "none",
              }}
            >
              Knowledge
            </Link>
          </Button>
          <Button
            variant={pathname === "/tracker" ? "contained" : "outlined"}
            color="secondary"
          >
            <Link
              to="/tracker"
              style={{
                textDecoration: "none",
              }}
            >
              Tracker
            </Link>
          </Button>

          <Button
            variant={pathname === "/profile" ? "contained" : "outlined"}
            color="secondary"
          >
            <Link
              to="/profile"
              style={{
                textDecoration: "none",
              }}
            >
              Profile
            </Link>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
