import { Box, TextField } from "@mui/material";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  handleChange: (e: string) => void;
  handleClick: () => void;
}

const CustomTextfield = ({ handleChange, handleClick }: Props) => {
  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Call your function here
      handleClick()
    }
  };

  return (
    <StyledInput
      InputProps={{
        startAdornment: <SearchIcon sx={{ color: "whitesmoke" }} onClick={
          handleClick
        }/>,
        autoComplete: "off",
        disableUnderline: true,
      }}
      fullWidth
      placeholder="Search"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(event.target.value);
      }}
      onKeyDown={handleEnterKey}
    />
  );
};

export default CustomTextfield;

export const StyledInput = styled(TextField)({
  borderRadius: "25px",

  svg: {
    marginRight: "0.5rem",
  },
  ".MuiFilledInput-root": {
    color: "rgba(255, 255, 255, 0.40)",
    borderRadius: "100px",
    backgroundColor: "gray",
    paddingLeft: "18px",
  },
  fielset: {
    color: "whitesmoke",
    border: "none",
  },
  ".MuiOutlinedInput-root": {
    height: "45px",
    borderRadius: "15px",
    backgroundColor: "#1A1A1A",
  },
  "& input": {
    color: "rgba(255, 255, 255, 0.40)",
  },
});
