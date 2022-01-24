import { useState, useCallback } from "react";
import styled from "styled-components";
import navigation, { logo } from "./navigation";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";

import IconButton from "@mui/material/IconButton";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

export default function AppBar() {
  const [open, setOpen] = useState(false);
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = useCallback(
    (to) => {
      navigate(to);
    },
    [navigate]
  );

  const handleOpenAppBar = useCallback(() => setOpen((prev) => !prev), [open]);

  function handleSelected(to) {
    if (location.pathname === to) return true;

    return location.pathname.includes(to) && to !== "/";
  }

  if (!isAuth) return null;

  const numberOfRows = navigation.length + 1;

  return (
    <Container>
      <TopControls rows={numberOfRows}>
        <ButtonContainer onClick={() => handleNavigation(logo.to)}>
          <IconButton>{logo.icon}</IconButton>
        </ButtonContainer>
        {navigation.map(({ to, icon, text }, index) => (
          <ButtonContainer
            key={index}
            onClick={() => handleNavigation(to)}
            isSelected={handleSelected(to)}
          >
            <IconButton>{icon}</IconButton>
          </ButtonContainer>
        ))}
      </TopControls>
      {false && (
        <BottomControls>
          <IconButton onClick={handleOpenAppBar}>
            {open ? (
              <ChevronLeftOutlinedIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightOutlinedIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </BottomControls>
      )}
    </Container>
  );
}

const Container = styled.div`
  grid-area: app-bar;
  background-color: #1c1e2b;
  box-shadow: rgba(0, 0, 0, 0.46) 0px -7px 6px, rgba(0, 0, 0, 0.43) 0px 3px 6px;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: space-between;
`;
const TopControls = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(${({ rows }) => rows}, 64px);
  justify-content: center;
  place-items: center;
`;
const ButtonContainer = styled.div`
  height: 64px;
  width: 64px;
  display: grid;
  place-items: center;

  background-color: ${({ isSelected }) => (isSelected ? "#363a50" : "")};

  &:hover {
    background-color: #363a50;
  }
`;
const BottomControls = styled.div`
  margin-top: auto;
  padding-bottom: 0.5em;
  width: 64px;
  height: fit-content;
  display: grid;
`;
