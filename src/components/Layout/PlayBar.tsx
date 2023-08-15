import { Box, Typography, Slider, Button } from "@mui/material";
import { useContextProvider } from "../../hook/useMyContextHook";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { ReactNode, useState, useRef, useEffect, useCallback } from "react";
import { NextSvg } from "../../assets/NextSvg";
import { BackSvg } from "../../assets/BackSvg";
import { ShuffleSvg } from "../../assets/ShuffleSvg";
import { IPodcast } from "../../types";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import { Repeat } from "../../assets/RepeatSvg";

interface Props {
  icon: ReactNode;
}

export const SVGComponent = ({ icon, ...props }: Props) => {
  return <Box {...props}>{icon}</Box>;
};

const Playbar = () => {
  const {
    selectedTrack,
    isPlaying,
    setIsPlaying,
    handleNext,
    handleBack,
    shuffleList,
  } = useContextProvider();
  const [track, setTrack] = useState<IPodcast>(selectedTrack);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(selectedTrack? Number(selectedTrack.trackTimeMillis) :0);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const playAnimationRef = useRef<number>();

  const handleRestart = () => {
    if (
      audioRef &&
      audioRef.current &&
      progressBarRef &&
      progressBarRef.current
    ) {
      audioRef.current.currentTime = 0;
      progressBarRef.current.value = "0";
      setTimeProgress(0);
    }
  };

  console.log(selectedTrack.trackTimeMillis)

  const onLoadedMetadata = () => {
    if (audioRef && audioRef.current && progressBarRef.current) {
      const seconds = audioRef.current.duration;
      console.log(seconds)
      setDuration(
        seconds
        );

      progressBarRef.current.max = seconds as unknown as string;
    }
  };
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const repeat = useCallback(() => {
    if (
      progressBarRef &&
      progressBarRef.current &&
      progressBarRef.current.value !== undefined
    ) {
      const currentTime = audioRef.current?.currentTime;
      setTimeProgress(Number(currentTime));
      progressBarRef.current.value = currentTime as unknown as string;
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(Number(progressBarRef.current.value) / duration) * 100}%`
      );
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  useEffect(() => {
    setTrack(selectedTrack);
    setDuration(selectedTrack.trackTimeMillis as number);
  }, [selectedTrack]);

  useEffect(() => {
    setTimeProgress(0);
    if (track) audioRef.current?.play();
  }, [track]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const handleProgressChange = () => {
    if (
      audioRef.current &&
      audioRef.current.currentTime &&
      progressBarRef.current &&
      progressBarRef.current.value
    )
      audioRef.current.currentTime = Number(progressBarRef.current.value);
  };

  const formatCurrentTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

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
          justifyContent: "space-between",
          gap: 4,
          height: "100%",
          pr: 4,
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

        <Box
          sx={{
            display: "flex",
            gap: 4,
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "100%",
            width: "500px",
          }}
        >
          <Box onClick={shuffleList}>
            <ShuffleSvg />
          </Box>
          <Box onClick={handleBack}>
            <BackSvg />
          </Box>
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
              onClick={togglePlayPause}
            >
              <PauseIcon
                sx={{
                  fontSize: "48px",
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "70px",
                width: "70px",
                borderRadius: "166.667px",
                backgroundColor: "transparent",
              }}
              onClick={togglePlayPause}
            >
              <PlayArrowIcon
                sx={{
                  fontSize: "48px",
                  color: "white",
                }}
              />
            </Box>
          )}
          <audio
            src={track.episodeUrl}
            ref={audioRef}
            onLoadedMetadata={onLoadedMetadata}
          />
          <Box onClick={handleNext}>
            <NextSvg />
          </Box>
          <Box onClick={handleRestart}>
            <Repeat />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "16px",
            }}
          >
            {formatCurrentTime(timeProgress)}
          </Typography>
          <input
            type="range"
            ref={progressBarRef}
            defaultValue="0"
            onChange={handleProgressChange}
            style={{
              width: "419px",
              height: "5px",
              borderRadius: "10px",
              background: "grey",
              color: "white",
            }}
          />
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.3)",
              fontSize: "16px",
            }}
          >
            {formatCurrentTime(duration)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              background: "none",
              width: "30px",
              height: "30px",
              borderRadius: "9999px",
            }}
            onClick={() => setMuteVolume((prev) => !prev)}
          >
            {muteVolume || volume < 5 ? (
              <VolumeOffIcon sx={{ color: "white" }} />
            ) : (
              <VolumeMuteIcon sx={{ color: "white" }} />
            )}
          </Button>

          <Slider
            sx={{
              color: "white",
              width: "100px",
              height: "5px",
              "& .MuiSlider-thumb": {
                width: 10, // Set the width of the thumb
                height: 10, // Set the height of the thumb
              },
            }}
            aria-label="Volume"
            value={volume}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Playbar;
