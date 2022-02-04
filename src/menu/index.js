import { useState } from "react";
import MenuDroppable from "./menu.droppable";
import { useMenu } from "../app/contexts/menu.context";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function Menu() {
  const { saveMenu, isLoading, newSection } = useMenu();
  const [sectionName, setSectionName] = useState("");

  const handleAddSection = () => {
    if (!sectionName) return;

    newSection(sectionName);
    setSectionName("");
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSectionName(value);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <TextField
          variant="filled"
          fullWidth
          onChange={handleChange}
          value={sectionName}
        />
        <Button onClick={handleAddSection}>New</Button>
      </div>
      <MenuDroppable />
      <Button variant="contained" onClick={saveMenu} disabled={isLoading}>
        {isLoading ? <CircularProgress /> : "Save"}
      </Button>
    </div>
  );
}
