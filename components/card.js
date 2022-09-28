import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box,
  Chip,
  Popover,
} from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import Modal from "@mui/material";
import TextField from "@mui/material";
import Departments from "./departments";
import { Colors } from "./departments";

export default function BasicCard(props) {
  const [anchor, setAnchor] = useState(null);
  const openPopover = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2, width: 275 }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            where: <strong>{props.where}</strong>
          </Typography>
          <br/>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          description: 
          </Typography>
          <Typography>{props.description}</Typography>
          <br/>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            when: <strong>{props.issue.when.split("T")[0]}</strong>
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            availability time: <strong>{props.issue.availability_time}</strong>
          </Typography>
        </Box>
      </Popover>
      <Card sx={{ width: 275, height: 410, pb: 1 }}>
        <CardMedia
          component="img"
          height="190"
          image={props.issue.image ?? "/default_background.jpg"}
          alt="Issue Photo"
        />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.where}
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            component="div"
            onClick={openPopover}
          >
            {props.description.slice(0, 80)}...
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
              when: {props.issue.when.toString().split("T")[0]}
            </Typography>
            <Chip
              label={Departments[Number(props.issue.department)]}
              sx={{
                color: "white",
                backgroundColor: Colors[Number(props.issue.department)],
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </>
  );
}