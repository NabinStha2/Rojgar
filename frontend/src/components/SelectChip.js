import React from "react";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  Grid,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const skills = [
  "React.js",
  "Node.js",
  "Html",
  "Css",
  "Javascript",
  "Java",
  "Python",
  "Flutter",
  "Adobe illustrator",
  "Adobe Photoshop",
  "Kint master",
  "django",
  "PHP",
  "MySQL",
  "Kotlin",
];

const SelectChip = () => {
  const [skillName, setSkillName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkillName(typeof value === "string" ? value.split(",") : value);
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container sx={{ display: "flex", flexDirection: "column" }}>
        <Grid item>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-multiple-chip-label">Skills</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={skillName}
              onChange={handleChange}
              {...register("skillName", { required: true })}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {skills.map((skill) => (
                <MenuItem key={skill} value={skill}>
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default SelectChip;
