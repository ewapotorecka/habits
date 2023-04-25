/* eslint-disable indent */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { toggleDone } from "../../../../../app/features/habit/habitSlice";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import theme from "../../../../../styles/theme";
import { useState } from "react";
import { grey } from "@mui/material/colors";
import compareAsc from "date-fns/compareAsc";
import { add } from "date-fns";

const Day = ({
  done,
  index,
  reward,
  startDate,
}: {
  done: boolean;
  index: number;
  reward?: { label: string; day: number };
  startDate: string;
}) => {
  const dispatch = useDispatch();
  const [rewardVisible, setRewardVisible] = useState(false);
  const isActive =
    compareAsc(
      new Date(),
      new Date(add(new Date(startDate), { days: index }))
    ) >= 0;

  return (
    <Box
      sx={{
        color: theme.palette.common.black,
        borderRadius: "100%",
        background: done
          ? theme.palette.secondary.main
          : isActive
          ? "white"
          : grey[500],
        width: "3rem",
        height: "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isActive ? "pointer" : "default",
        pointerEvents: isActive ? "auto" : "none",
      }}
      onClick={() => {
        if (!done && reward) {
          setRewardVisible(true);
        }
        dispatch(toggleDone(index));
      }}
    >
      {done && <CheckCircleIcon />}
      {!done && <Typography variant="subtitle2">{index + 1}</Typography>}
      <Dialog
        open={rewardVisible}
        onClose={() => setRewardVisible(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ ".MuiPaper-root": { padding: "2rem 4rem" } }}
      >
        <DialogTitle id="alert-dialog-title">{"Reward!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {reward?.label}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setRewardVisible(false);
            }}
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Day;
