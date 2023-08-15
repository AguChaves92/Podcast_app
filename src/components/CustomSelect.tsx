import { ReactNode, useState } from "react";

import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
  InputLabel,
} from "@mui/material";
import { StyledInput } from "./CustomTextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";

export interface OptionSelect {
  name: string;
  value: string;
}

type Props = {
  options: Array<OptionSelect>;
  label?: string;
  isView?: boolean;
  displayValue?: boolean;
  onChange: (e: string, B: boolean) => void;
  icon?: JSX.Element;
  displayLabel?: boolean;
};

export const CustomSelectComponent = ({
  isView = false,
  options,
  onChange,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [sorting, setSorting] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setSorting(event.target.value as string);
    onChange(event.target.value as string, isView);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDiretion: "row",
        gap: 2,
        width: "100%",
        height: "55px",
        justifyContent: "flex-end",
      }}
    >
      <Box
        style={{
          height: "fit-content",
          overflow: "hidden",
          display: isVisible ? "flex" : "none",
          transition: " left 1.5s ease",
        }}
      >
        <StyledInput />
      </Box>
      <IconButton size="large" onClick={toggleVisibility}>
        <SearchIcon fontSize="inherit" sx={{ color: "whitesmoke" }} />
      </IconButton>
      <FormControl
        variant="standard"
        sx={{
          minWidth: 160,

          color: "whitesmoke",
          "MuiSelect-icon": {
            color: "whitesmoke",
          },
        }}
      >
        <InputLabel id="labelId" sx={{ color: "whitesmoke" }}>
          Order by
        </InputLabel>
        <Select
          MenuProps={{
            PaperProps: {
              style: {
                color: "whitesmoke",

                backgroundColor: "transparent", // Set background color
              },
            },
          }}
          labelId="labelId"
          sx={{
            width: "160px",
            color: "whitesmoke",
            backgroundColor: "transparent",
            ".MuiSvgIcon-root ": {
              fill: "white !important",
            },
          }}
          id="sorting-slect"
          value={sorting}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
