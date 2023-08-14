import { Box, Typography } from "@mui/material";
import { useContextProvider } from "../../hook/useMyContextHook";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { ReactNode, useState } from "react";
import { NextSvg } from "../../assets/NextSvg";
import { BackSvg } from "../../assets/BackSvg";
import { ShuffleSvg } from "../../assets/ShuffleSvg";
import { IPodcast } from "../../types";

interface Props {
  icon: ReactNode;
}

export const SVGComponent = ({ icon, ...props }: Props) => {
  return <Box {...props}>{icon}</Box>;
};

const Playbar = () => {
  const { selectedTrack, isPlaying, handlePlay } = useContextProvider();
  const [track, setTrack] = useState<IPodcast>(selectedTrack);

  return (
    <Box
      sx={{
        display: "absolute",
        bottom: 0,
        right: 0,
        height: "120px",
        width: "fullscreen",
        background: "#1A1A1A",
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          height: "100%",
        }}
      >
        <img
          src={selectedTrack.artworkUrl60}
          alt="track img"
          style={{
            height: "100%",
          }}
        />
        <Box>
          <Typography
            sx={{
              color: "whitesmoke",
              fontSize: "16px",
            }}
          >
            {selectedTrack.trackName}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.30)",
              fontSize: "16px",
            }}
          >
            {selectedTrack.artistName}
          </Typography>
        </Box>
        <ShuffleSvg />
        <BackSvg />
        {isPlaying ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "70px",
              width: "70px",
              fontSize: "48px",
              color: "white",
              borderRadius: "166.667px",
              backgroundColor: "#5C67DE",
            }}
          >
            <PauseIcon
              sx={{
                fontSize: "48px",
              }}
            />
          </Box>
        ) : (
          <PlayArrowIcon
            sx={{
              fontSize: "48px",
              color: "white",
            }}
          />
        )}

        <NextSvg />
      </Box>
    </Box>
  );
};

export default Playbar;
