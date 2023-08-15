import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { useContextProvider } from "../../hook/useMyContextHook";
import Playbar from "./PlayBar";

const Layout = () => {
  const { selectedTrack } = useContextProvider();
  const renderPlayBar = useMemo(() => {
    if (selectedTrack && selectedTrack.artistId) {
      return <Playbar />;
    } else {
      return null;
    }
  }, [selectedTrack]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "100vh",
        width: "100%",
      }}
    >
      <Outlet />
      {renderPlayBar}
    </Box>
  );
};

export default Layout;
