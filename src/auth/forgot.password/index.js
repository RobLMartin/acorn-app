import { useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/contexts/auth.context";
import { useSnackbar } from "../../app/contexts/snackbar.context";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";

export default function Login() {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const { showSnackbar } = useSnackbar();

  async function handleSubmit() {
    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);
      showSnackbar("Check your inbox for further instructions.", "success");
    } catch {
      showSnackbar("Failed to reset password.", "error");
    }
    setLoading(false);
  }

  const handleNavigateToLogin = () => navigate("/auth");

  return (
    <Container>
      <SideBySide>
        <Typography align="left" variant="h5">
          Forgot Password?
        </Typography>
        {loading && <CircularProgress />}
      </SideBySide>
      <Typography align="left">
        Enter your details to receive a reset link.
      </Typography>
      <TextField label="Email" type="email" required inputRef={emailRef} />
      <Button variant="contained" onClick={handleSubmit} disabled={loading}>
        Reset Password
      </Button>
      <Typography align="center">
        <StyledLink onClick={handleNavigateToLogin} underline="none">
          Login
        </StyledLink>
      </Typography>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  gap: 2em;
  height: fit-content;
  width: 100%;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
`;

const SideBySide = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
`;
