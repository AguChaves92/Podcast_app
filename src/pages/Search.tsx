import { Box } from "@mui/material";
import { useNavigate  } from 'react-router-dom';
import { CustomSelectComponent } from "../components/CustomSelect";
import CustomTextfield from "../components/CustomTextField";
import CustomTable from "../components/CustomTable";
import { useState } from "react";
import { useContextProvider } from "../hook/useMyContextHook";


const Search = () => {
  const navigate=useNavigate ()
  const {handleSearch, podcastList, handleSearchEpisodes, podcastEpiosdesList, searchWord, setSearchWord}= useContextProvider()



  const handleNavigate= (e:number)=>{
     handleSearchEpisodes(e)
     navigate('/view-details')
  }
  


  console.log(podcastEpiosdesList )

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "full",
        height: "100%",
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
        <CustomTextfield handleChange={setSearchWord} handleClick={()=>handleSearch(searchWord)}/>
        <CustomSelectComponent />
        <CustomTable tableColumns={["#", "Name", "Released"]} data={podcastList} onRowClick={handleNavigate}/>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default Search;
