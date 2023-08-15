import { Box, Typography } from "@mui/material";
import { CustomSelectComponent } from "../components/CustomSelect";
import CustomTextfield from "../components/CustomTextField";
import CustomTable from "../components/CustomTable";
import { useContextProvider } from "../hook/useMyContextHook";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PauseIcon from "@mui/icons-material/Pause";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { TickSvg } from "../assets/TickSvg";
import { useNavigate } from "react-router-dom";
import { IPodcast } from "../types";
import { useEffect, useState } from "react";

const ViewDetail = () => {
  const {
    searchWord,
    setSearchWord,
    handleSearch,
    podcastEpiosdesList,
    chooseTrack,
    isPlaying,
    handlePlay,
    handleSort,
  } = useContextProvider();

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };

  const [list, setList] = useState<IPodcast[]>([] as IPodcast[]);
  const [podcastName, setPodcastName] = useState<string>('');
console.log(podcastEpiosdesList)
  useEffect(() => {
    setList(podcastEpiosdesList);
  }, [podcastEpiosdesList]);

  useEffect(()=>{
    if(podcastEpiosdesList.length> 1){
      setPodcastName(podcastEpiosdesList[0].collectionName)
    }
  },[podcastEpiosdesList.length])

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
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1A1A1A",
              borderRadius: "15px",
              width: "65px",
              height: "40px",
            }}
            onClick={handleNavigate}
          >
            <ArrowBackIosIcon
              sx={{
                color: "whitesmoke",
                fontSize: "22px",
              }}
            />
          </Box>

          <CustomTextfield
            defaultValue={searchWord}
            handleChange={setSearchWord}
            handleClick={() => handleSearch(searchWord)}
          />
        </Box>
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
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box
              sx={{
                width: "80%",
              }}
            >
              <Typography
                sx={{
                  fontSize: podcastName.length > 50 ? "18px" : "32px",
                  color: "white",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {podcastName}
              </Typography>
            </Box>
            <TickSvg />
          </Box>
          <Box width="20%">
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
                {
                  name: "Duration ASC",
                  value: "MILI_ASC",
                },
                {
                  name: "Duration DESC",
                  value: "MILI_DESC",
                },
              ]}
              isView={true}
              onChange={handleSort}
            />
          </Box>
        </Box>

        <CustomTable
          isView={true}
          tableColumns={["#", "Name", "Topic", "Released"]}
          data={list}
          onRowClick={chooseTrack}
        />
      </Box>
    </Box>
  );
};

export default ViewDetail;
