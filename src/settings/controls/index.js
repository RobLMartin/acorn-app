import styled from "styled-components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";

export default function Controls() {
  return (
    <Container>
      <ListItem disablePadding>
        <ListItemIcon></ListItemIcon>
        <Typography variant="h6">Settings</Typography>
      </ListItem>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-gap: 2em;
  width: 200px;
  height: fit-content;
`;
