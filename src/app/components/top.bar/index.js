import { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/auth.context";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import Popper from "@mui/material/Popper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Fade from "@mui/material/Fade";

export default function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const { isAuth, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuth) return null;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  function handleClickItem(to) {
    setOpen(false);
    navigate(to);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleLogout() {
    setOpen(false);
    logout();
  }

  return (
    <Container>
      <Avatar
        src={currentUser.photoURL}
        sx={{ color: "#8493bd", backgroundColor: "#eff5ff" }}
        alt="fm"
      />
      <IconButton size="small" onClick={handleClick}>
        <ExpandMoreOutlinedIcon fontSize="small" />
      </IconButton>
      <Popper
        onMouseLeave={handleClose}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
        sx={{ zIndex: 1000 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <List>
                <ListItem disablePadding dense>
                  <ListItemButton onClick={() => handleClickItem("/settings")}>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding dense>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Container>
  );
}

// grid-area: top-bar;
const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  place-items: center;
  gap: 1em;
  z-index: 1200;
  padding: 0.5em 1em 1em 1em;
`;

const Paper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;
