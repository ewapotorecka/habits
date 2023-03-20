import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { toggleDone } from "../../../app/features/habit/habitSlice";
import { RootState } from "../../../app/store";
import CelebrationIcon from "@mui/icons-material/Celebration";

const Item = ({
  element,
}: {
  element: { id: number; done?: boolean; reward: boolean };
}) => {
  const dispatch = useDispatch();

  return (
    <Grid
      item
      lg={1.7}
      sx={{
        border: "2px solid #564E58",
        color: "#564E58",
        borderRadius: "4px",
        background: element.done ? "#F0CF65" : "white",
        minHeight: "6rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={() => {
        dispatch(toggleDone(element.id));
      }}
    >
      {element.done && element.reward && <CelebrationIcon />}
      {!element.done && <Typography variant="h6">{element.id}</Typography>}
    </Grid>
  );
};

const Calendar = () => {
  const habit = useSelector((state: RootState) => state.habit);

  return (
    <Box>
      <Typography variant="h3">{habit.goal}</Typography>
      <Typography variant="body2">{habit.schema}</Typography>

      <Grid
        container
        rowGap={1}
        columnGap={1}
        sx={{
          display: "flex",
          padding: "4rem 0",
          justifyContent: "center",
        }}
      >
        {habit.data.map((el) => (
          <Item element={el} />
        ))}
      </Grid>
    </Box>
  );
};

export default Calendar;
