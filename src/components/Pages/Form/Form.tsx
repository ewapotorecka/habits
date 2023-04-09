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
import { Habit } from "../../../app/features/habit/habitTypes";
import lightFormat from "date-fns/lightFormat";
import { createRewardsData } from "../../../utilities/createRewardsData";

const HabitForm = () => {
  const [rewards, setRewards] = useState<{ label: string; id: number }[]>([]);
  const [rewardInput, setRewardInput] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [schemaInput, setSchemaInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: "4rem", maxWidth: "50%" }}>
      <form
        onSubmit={(e) => {
          const rewardsData = createRewardsData(rewards);

          const newHabit: Habit = {
            goal: goalInput,
            schema: schemaInput,
            rewards: rewardsData,
            id: crypto.randomUUID(),
            habitStrength: {
              strength: 0,
              history: [],
            },
            data: [...new Array(30)].map(() => false),
            startDate: lightFormat(new Date(), "yyyy-MM-dd"),
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

                  setRewards([
                    ...rewards,
                    {
                      label: rewardInput,
                      id: Math.floor(Math.random() * 100000),
                    },
                  ]);
                  setRewardInput("");
                }
              }}
              endAdornment={
                <IconButton
                  color="primary"
                  onClick={() => {
                    setRewards([
                      ...rewards,
                      {
                        label: rewardInput,
                        id: Math.floor(Math.random() * 100000),
                      },
                    ]);
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
            {rewards.map((reward) => (
              <Chip
                label={reward.label}
                key={reward.id}
                onDelete={() =>
                  setRewards(
                    rewards.filter(
                      (rewardToDelete) => rewardToDelete.id !== reward.id
                    )
                  )
                }
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
