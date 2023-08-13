import { Box } from "@mui/material";

import { CustomSelectComponent } from "../components/CustomSelect";
import CustomTextfield from "../components/CustomTextField";
import CustomTable from "../components/CustomTable";
import { useState } from "react";
import { useContextProvider } from "../hook/useMyContextHook";


const Search = () => {
  const {handleSearch, podcastList}= useContextProvider()
  const [searchWord, setSearchWord] = useState<string>("");
  const handleChange = (e: string) => {
    setSearchWord(e);
  };


  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "full",
        height: "full",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "822px",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <CustomTextfield handleChange={handleChange} handleClick={()=>handleSearch(searchWord)}/>
        <CustomSelectComponent />
        <CustomTable tableColumns={["#", "Name", "Released"]} data={podcastList}/>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default Search;
