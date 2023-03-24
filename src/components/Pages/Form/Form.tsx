import {
  Box,
  Button,
  Chip,
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNewHabit } from "../../../app/features/habit/habitSlice";

const createHabitData = () => {
  return [
    { id: 1, done: false, reward: false },
    { id: 2, done: false, reward: false },
    { id: 3, done: false, reward: false },
  ];
};

const HabitForm = () => {
  const [rewards, setRewards] = useState<string[]>([]);
  const [rewardInput, setRewardInput] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [schemaInput, setSchemaInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: "4rem" }}>
      <form
        onSubmit={(e) => {
          const newHabit = {
            goal: goalInput,
            schema: schemaInput,
            rewards,
            id: Math.floor(Math.random() * 100000),
            startDate: Date.now(),
            habitStrength: {
              strength: 0,
              history: [],
            },
            data: createHabitData(),
          };
          e.preventDefault();
          dispatch(setNewHabit(newHabit));
          navigate("/dashboard");
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
            />

            <Button
              onClick={() => {
                setRewards([...rewards, rewardInput]);
                setRewardInput("");
              }}
            >
              Add
            </Button>
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
            {rewards.map((el) => (
              <Chip
                label={el}
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
