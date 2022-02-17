import { useRef, useState, useEffect } from "react";
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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

export default function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const streetAddressRef = useRef();
  const cityRef = useRef();
  const zipRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("NC");
  const [logoFile, setLogoFile] = useState(null);
  const [logoURL, setLogoURL] = useState(null);
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { showSnackbar } = useSnackbar();

  async function handleSubmit() {
    try {
      setLoading(true);

      const formData = {
        restaurantName: nameRef.current.value,
        streetAddress: streetAddressRef.current.value,
        city: cityRef.current.value,
        state: state,
        zip: zipRef.current.value,
      };
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        formData,
        logoFile
      );

      navigate("/");
    } catch (err) {
      console.log(err);
      showSnackbar("Failed to create an account.", "error");
    }
    setLoading(false);
  }
  const handleSelectChange = (e) => {
    setState(e.target.value);
  };
  useEffect(() => {
    if (logoFile) {
      setLogoURL(URL.createObjectURL(logoFile));
    }
  }, [logoFile]);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleNavigateToLogin = () => navigate("/auth");

  return (
    <Container>
      <div></div>
      <RightPanel>
        <Content>
          <SideBySide>
            <Typography align="left" variant="h5">
              Register
            </Typography>
            {loading && <CircularProgress />}
          </SideBySide>

          <LogoInputContainer>
            {logoURL && (
              <LogoPreview
                style={{
                  backgroundImage: `url(${logoURL})`,
                }}
              />
            )}
            <input
              accept="image/*"
              type="file"
              id="select-image"
              hidden
              onChange={(e) => setLogoFile(e.target.files[0])}
            />
            <label htmlFor="select-image">
              <Button color="primary" component="span">
                {!logoURL ? "Upload Logo" : "Choose Another File"}
              </Button>
            </label>
          </LogoInputContainer>
          <TextField
            label="Restaurant Name"
            type="text"
            required
            inputRef={nameRef}
          />
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
          <TextField
            label="Street Address"
            type="text"
            required
            inputRef={streetAddressRef}
          />
          <AddressContainer>
            <TextField label="City" type="text" required inputRef={cityRef} />
            <FormControl>
              <InputLabel id="state">State</InputLabel>
              <Select
                labelId="state"
                value={state}
                label="State"
                onChange={(e) => handleSelectChange(e)}
              >
                <MenuItem value="NC">NC</MenuItem>
                <MenuItem value="SC">SC</MenuItem>
                <MenuItem value="GA">GA</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Zip" type="text" required inputRef={zipRef} />
          </AddressContainer>

          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            Create Account
          </Button>
          <Typography align="center">
            Already have an account?{" "}
            <StyledLink onClick={handleNavigateToLogin} underline="none">
              Login
            </StyledLink>
          </Typography>
        </Content>
      </RightPanel>
    </Container>
  );
}

const Content = styled.div`
  display: grid;
  gap: 2em;
  height: fit-content;
  width: 100%;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 700px;
  height: 100%;
`;

const RightPanel = styled.div`
  background-color: white;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 0 6em;
`;

const StyledLink = styled(Link)`
  cursor: pointer;
`;

const SideBySide = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
`;

const AddressContainer = styled.div`
  display: flex;

  gap: 0 1rem;
  & div:nth-child(1) {
    flex: 3 1 0;
  }

  & div:nth-child(n + 2) {
    flex: 1 1 0;
  }
`;

const LogoInputContainer = styled.div`
  display: flex;
  margin: 0px auto;
  flex-flow: column nowrap;
  align-items: center;
`;

const LogoPreview = styled.div`
  width: 200px;
  height: 200px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;
