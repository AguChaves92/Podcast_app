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

interface Props {
  data: IPodcast[];
  tableColumns: string[];
  isView?: boolean;
}

const CustomTable = ({ tableColumns, isView = false, data }: Props) => {
  return (
    <Box sx={{
        height:'70vh',
        overflowY:'scroll',
        width:'100%',
        scrollbarwidth: 'thin',
        '&::-webkit-scrollbar': {
            width: '0.4em',
          },
          '&::-webkit-scrollbar-track': {
           display:'none'
          },
         
    }}>
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
                      color: "whitesmoke",
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
              >
                <TableCell>
                  <PlayArrowIcon sx={{ color: "whitesmoke" }} />
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
                        {item.collectionName}
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
