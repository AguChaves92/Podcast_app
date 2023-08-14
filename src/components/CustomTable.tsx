import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import styled from "@emotion/styled";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { IPodcast } from "../types";
import { howLongAgo } from "../utils/howLongAgo";
import { formatTime } from "../utils/formatTime";
import { useContextProvider } from "../hook/useMyContextHook";

interface Props {
  data: IPodcast[];
  tableColumns: string[];
  isView?: boolean;
  onRowClick: (e: number) => void;
}

const CustomTable = ({
  tableColumns,
  isView = false,
  data,
  onRowClick,
}: Props) => {
  const { isPlaying, selectedTrack } = useContextProvider();

  return (
    <Box
      sx={{
        height: isView ? "40vh" : "60vh",
        overflowY: "scroll",

        scrollbarwidth: "thin",
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          display: "none",
        },
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableColumns.map((el: string) => (
                <CustomCell key={el}>{el}</CustomCell>
              ))}

              {isView && (
                <CustomCell align="right" color="rgba(255, 255, 255, 0.30)">
                  <AccessTimeIcon
                    sx={{
                      color: "rgba(255, 255, 255, 0.30)",
                    }}
                  />
                </CustomCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item: IPodcast) => (
              <TableRow
                key={item.trackId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() =>
                  onRowClick(isView ? item.trackId : item.collectionId)
                }
              >
                <TableCell>
                  {!isPlaying ? (
                    <PlayArrowIcon sx={{ color: "whitesmoke" }} />
                  ) : isPlaying &&
                    isView &&
                    selectedTrack &&
                    selectedTrack.trackId === item.trackId ? (
                    <PauseIcon
                      sx={{
                        borderRadius: "142.5px",
                        backgorundColor: "#5C67DE",
                        color: "white",
                      }}
                    />
                  ) : isPlaying &&
                    !isView &&
                    selectedTrack &&
                    selectedTrack.artistId === item.artistId ? (
                    <PauseIcon
                      sx={{
                        borderRadius: "142.5px",
                        backgorundColor: "#5C67DE",
                        color: "white",
                      }}
                    />
                  ) : (
                    <PlayArrowIcon sx={{ color: "whitesmoke" }} />
                  )}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 2,
                    }}
                  >
                    <img src={item.artworkUrl60} alt="cover" />
                    <Box>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "16px",
                        }}
                      >
                        {isView ? item.trackName : item.collectionName}
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255, 255, 255, 0.30)",
                          fontSize: "14px",
                        }}
                      >
                        {item.artistName}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                {item.description && (
                  <TableCell>
                    <Typography
                      sx={{
                        color: "rgba(255, 255, 255, 0.30)",
                        fontSize: "14px",
                      }}
                    >
                      {item?.description?.length < 10
                        ? item.description
                        : item.description.slice(0, 70)}
                    </Typography>
                  </TableCell>
                )}
                <TableCell>
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.30)",
                      fontSize: "14px",
                    }}
                  >
                    {howLongAgo(item.releaseDate)}
                  </Typography>
                </TableCell>
                {item.trackTimeMillis && (
                  <TableCell
                    align="right"
                    sx={{
                      width: "60px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgba(255, 255, 255, 0.30)",
                        fontSize: "14px",
                      }}
                    >
                      {formatTime(item.trackTimeMillis)}
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomTable;

const CustomCell = styled(TableCell)({
  color: "rgba(255, 255, 255, 0.30)",
});
