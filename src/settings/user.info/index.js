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
import { styled as muistyled } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

const Input = muistyled("input")({
  display: "none",
});

export default function UserInfo() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [photo, setPhoto] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, saveEmail, savePassword, uploadAvatar, removeAvatar } =
    useAuth();
  const { showSnackbar } = useSnackbar();

  function handleSubmit() {
    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      promises.push(saveEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(savePassword(passwordRef.current.value));
    }

    setLoading(true);
    Promise.all(promises)
      .then(() => {
        showSnackbar("Account information updated successfully!", "success");
      })
      .catch(() =>
        showSnackbar("Failed to updated account information.", "error")
      )
      .finally(() => {
        setLoading(false);
        passwordRef.current.value = "";
      });
  }

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  function handleChange(e) {
    setPhoto(e.target.files[0]);
    e.target.value = "";
  }

  async function handleUploadAvatar() {
    setLoading(true);
    try {
      await uploadAvatar(photo);
      setPhoto(null);
    } catch {
      showSnackbar("Failed to upload image", "error");
    }
    setLoading(false);
  }

  async function handleRemoveAvatar() {
    setLoading(true);
    await removeAvatar();
    setPhoto(null);
    setLoading(false);
  }

  return (
    <Container>
      <Paper>
        <SideBySide>
          <Typography variant="h5">Account</Typography>
          {loading && <CircularProgress />}
        </SideBySide>
        <Typography variant="h6" align="left">
          Avatar
        </Typography>
        <FlexStart>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={handleChange}
            />
            <Avatar
              src={currentUser.photoURL}
              sx={{ width: 100, height: 100, cursor: "pointer" }}
            />
          </label>
          <RightContent>
            <FileNameDisplay>
              <Typography variant="caption">{photo?.name}</Typography>
            </FileNameDisplay>
            <UploadContainer>
              <Button
                variant="contained"
                component="span"
                disabled={!photo}
                onClick={handleUploadAvatar}
              >
                Upload
              </Button>

              <Button onClick={handleRemoveAvatar}>Remove</Button>
            </UploadContainer>
          </RightContent>
        </FlexStart>
        <Divider />
        <TextField
          label="Email"
          type="email"
          required
          inputRef={emailRef}
          defaultValue={currentUser.email}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          inputRef={passwordRef}
          placeholder="Leave blank to keep the same password."
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
        <ButtonContainer>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            Update
          </Button>
        </ButtonContainer>
      </Paper>
    </Container>
  );
}

const Container = styled.div``;

const Paper = styled.div`
  display: grid;
  padding: 2em;
  background-color: #fff;
  border-radius: 10px;
  grid-template-rows: auto 1fr;
  gap: 2em;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  width: 500px;
`;

const ButtonContainer = styled.div`
  margin-left: auto;
`;

const SideBySide = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
`;

const FlexStart = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2em;
`;

const UploadContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: fit-content;
  gap: 2em;
`;

const RightContent = styled.div`
  display: grid;
`;
const FileNameDisplay = styled.div`
  height: 22px;
`;
