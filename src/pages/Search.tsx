import { Box, Backdrop, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomSelectComponent } from "../components/CustomSelect";
import CustomTextfield from "../components/CustomTextField";
import CustomTable from "../components/CustomTable";
import { useContextProvider } from "../hook/useMyContextHook";
import { IPodcast } from "../types";
import { useEffect, useState, useMemo } from "react";

const Search = () => {
  const navigate = useNavigate();
  const {
    handleSearch,
    podcastList,
    handleSearchEpisodes,
    searchWord,
    setSearchWord,
    handleSort,
    loading,
    
  } = useContextProvider();

  const [list, setList] = useState<IPodcast[]>(podcastList);

  useEffect(() => {
    setList(podcastList);
  }, [podcastList]);

  const handleNavigate = async (e: number) => {
    await handleSearchEpisodes(e);
    navigate("/view-details");
  };

  console.log(podcastList);

  const renderMemo = useMemo(() => {
    if (loading) {
      return (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      );
    }

    if (list.length > 1) {
      return (
        <>
          <CustomSelectComponent
            options={[
              {
                name: "Newest",
                value: "NEW",
              },
              {
                name: "Oldest",
                value: "OLD",
              },
            ]}
            isView={false}
            onChange={handleSort}
          />
          <CustomTable
            tableColumns={["#", "Name", "Released"]}
            data={list}
            onRowClick={handleNavigate}
          />
        </>
      );
    }
    return null;
  }, [loading, list]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
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
        <CustomTextfield
          handleChange={setSearchWord}
          defaultValue={searchWord}
          handleClick={() => handleSearch(searchWord)}
        />
        {renderMemo}
      </Box>
    </Box>
  );
};

export default Search;
