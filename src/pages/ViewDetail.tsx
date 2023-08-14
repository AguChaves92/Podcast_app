import { Box, Typography } from "@mui/material";
import { CustomSelectComponent } from "../components/CustomSelect";
import CustomTextfield from "../components/CustomTextField";
import CustomTable from "../components/CustomTable";
import { useContextProvider } from "../hook/useMyContextHook";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PauseIcon from "@mui/icons-material/Pause";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const ViewDetail = () => {
  const {
    searchWord,
    setSearchWord,
    handleSearch,
    podcastEpiosdesList,
    chooseTrack,
    isPlaying,
    handlePlay,
  } = useContextProvider();

  return podcastEpiosdesList.length === 0 ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={podcastEpiosdesList.length === 0}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
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
          width: "850px",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CustomTextfield
          defaultValue={searchWord}
          handleChange={setSearchWord}
          handleClick={() => handleSearch(searchWord)}
        />
        <img
          src="/Banner.png"
          alt="banner"
          style={{
            height: "300px",
            width: "full",
          }}
        />

        <Box
          sx={{
            display: "flex",
            width: "850px",
            justifyContent: "space-between",
          }}
        >
          {isPlaying ? (
            <PauseIcon
              sx={{
                borderRadius: "142.5px",
                backgorundColor: "#5C67DE",
                color: "white",
                fontSize: "50px",
              }}
              onClick={handlePlay}
            />
          ) : (
            <PlayCircleIcon
              sx={{
                borderRadius: "142.5px",
                backgorundColor: "#5C67DE",
                color: "white",
                fontSize: "50px",
              }}
              onClick={handlePlay}
            />
          )}

          <Typography
            sx={{
              fontSize: "32px",
              color: "white",
              fontWeight: 700,
            }}
          >
            {podcastEpiosdesList[1].collectionName}
          </Typography>
          <Box width="20%">
            <CustomSelectComponent />
          </Box>
        </Box>

        <CustomTable
          isView={true}
          tableColumns={["#", "Name", "Topic", "Released"]}
          data={podcastEpiosdesList}
          onRowClick={chooseTrack}
        />
      </Box>
    </Box>
  );
};

export default ViewDetail;
