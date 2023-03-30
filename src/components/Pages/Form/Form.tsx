import {
  Box,
  Button,
  Chip,
  FormControl,
  FormGroup,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNewHabit } from "../../../app/features/habit/habitSlice";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { createHabitData } from "../../../utilities/createHabitData";

const HabitForm = () => {
  const [rewards, setRewards] = useState<string[]>([]);
  const [rewardInput, setRewardInput] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [schemaInput, setSchemaInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: "4rem", maxWidth: "50%" }}>
      <form
        onSubmit={(e) => {
          const newHabit = {
            goal: goalInput,
            schema: schemaInput,
            rewards,
            id: Math.floor(Math.random() * 100000),
            habitStrength: {
              strength: 0,
              history: [],
            },
            data: createHabitData(),
          };
          e.preventDefault();
          dispatch(setNewHabit(newHabit));
          navigate("/");
        }}
      >
        <FormGroup sx={{ display: "flex", gap: "2rem" }}>
          <FormControl>
            <InputLabel htmlFor="goal-input">Define your goal</InputLabel>
            <Input
              id="goal-input"
              aria-describedby="goal-input-helper-text"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
            />
            <FormHelperText id="goal-input-helper-text">
              Keep it simple and specific.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="schema-input">
              Define schema, that will help you perform your habit
            </InputLabel>
            <Input
              id="schema-input"
              aria-describedby="schema-input-helper-text"
              value={schemaInput}
              onChange={(e) => setSchemaInput(e.target.value)}
            />
            <FormHelperText id="schema-input-helper-text">
              Plan when and where you will do your chosen action. Be consistent:
              choose a time and place that you encounter every day of the week.
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor="my-input">
              Think about rewards. Add as many as you like.
            </InputLabel>
            <Input
              id="reward"
              aria-describedby="my-helper-text"
              value={rewardInput}
              onChange={(e) => setRewardInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  setRewards([...rewards, rewardInput]);
                  setRewardInput("");
                }
              }}
              endAdornment={
                <IconButton
                  color="primary"
                  onClick={() => {
                    setRewards([...rewards, rewardInput]);
                    setRewardInput("");
                  }}
                >
                  <AddCircleIcon />
                </IconButton>
              }
            />
          </FormControl>
          <Box
            sx={{
              padding: "2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Typography variant="body1">Rewards:</Typography>
            {rewards.map((el, idx) => (
              <Chip
                label={el}
                key={`${idx}-${el}`}
                onDelete={() => {
                  const rewardsCopy = [...rewards];
                  rewardsCopy.splice(
                    rewardsCopy.findIndex((element) => element === el),
                    1
                  );
                  setRewards(rewardsCopy);
                }}
              />
            ))}
          </Box>
        </FormGroup>
        <Button type="submit" variant="contained">
          Create new habit
        </Button>
      </form>
    </Box>
  );
};

export default HabitForm;
