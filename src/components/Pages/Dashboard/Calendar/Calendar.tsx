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
import { useSelector, useDispatch } from "react-redux";
import { toggleDone } from "../../../../app/features/habit/habitSlice";
import { RootState } from "../../../../app/store";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import theme from "../../../../styles/theme";
import { useState } from "react";

const Day = ({
  done,
  index,
  reward,
}: {
  done: boolean;
  index: number;
  reward?: { label: string; day: number };
}) => {
  const dispatch = useDispatch();
  const [rewardVisible, setRewardVisible] = useState(false);
  return (
    <Box
      sx={{
        color: theme.palette.common.black,
        borderRadius: "100%",
        background: done ? theme.palette.secondary.main : "white",
        width: "3rem",
        height: "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={() => {
        console.log(done, reward, "click");
        if (!done && reward) {
          console.log("yaaaay", reward.label);
          setRewardVisible(true);
          //   dispatch(toggleDone(index));
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
            onClick={() => setRewardVisible(false)}
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

const Calendar = () => {
  const habit = useSelector((state: RootState) => state.habit);
  console.log(habit);

  return (
    <Box>
      <Box sx={{ padding: "4rem", textAlign: "start" }}>
        <Typography variant="h4" color={theme.palette.common.white}>
          {habit.goal.toLocaleUpperCase()}
        </Typography>
        <Typography variant="subtitle1" color={theme.palette.common.white}>
          {habit.schema}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          padding: "4rem",
        }}
      >
        {habit.data.map((done, index) => (
          <Day
            done={done}
            key={index}
            index={index}
            reward={habit.rewards.filter((el) => el.day === index + 1)[0]}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Calendar;
