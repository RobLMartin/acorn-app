import { useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/contexts/auth.context";
import { useSnackbar } from "../../app/contexts/snackbar.context";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar();

  async function handleSubmit() {
    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      showSnackbar("Failed to sign in.", "error");
    }
    setLoading(false);
  }

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleNavigateToSignUp = () => navigate("/auth/signup");

  const handleNavigateToForgotPassword = () =>
    navigate("/auth/forgot-password");

  return (
    <Container>
      <SideBySide>
        <Typography align="left" variant="h5">
          Sign In
        </Typography>
        {loading && <CircularProgress />}
      </SideBySide>
      <TextField label="Email" type="email" required inputRef={emailRef} />
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        required
        inputRef={passwordRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {!showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" onClick={handleSubmit} disabled={loading}>
        Login
      </Button>
      <Typography align="center">
        <StyledLink onClick={handleNavigateToForgotPassword} underline="none">
          Forgot password?
        </StyledLink>
      </Typography>
      <Typography align="center">
        Need an account?{" "}
        <StyledLink onClick={handleNavigateToSignUp} underline="none">
          Sign Up
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
