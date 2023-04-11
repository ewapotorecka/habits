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
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  goal: yup.string().required("Goal is required"),
  schema: yup.string().required("Schema is required"),
  rewards: yup.array().min(1, "Add at least one reward"),
});

const initialValues: {
  goal: string;
  schema: string;
  rewards: { label: string; id: number }[];
} = {
  goal: "",
  schema: "",
  rewards: [],
};

const HabitForm = () => {
  const [rewardInput, setRewardInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const rewardsData = createRewardsData(values.rewards);

      const newHabit: Habit = {
        goal: values.goal,
        schema: values.schema,
        rewards: rewardsData,
        id: crypto.randomUUID(),
        habitStrength: {
          strength: 0,
          history: [],
        },
        data: [...new Array(30)].map(() => false),
        startDate: lightFormat(new Date(), "yyyy-MM-dd"),
      };
      dispatch(setNewHabit(newHabit));
      navigate("/");
    },
  });
  const addReward = () => {
    formik.setFieldValue("rewards", [
      ...formik.values.rewards,
      {
        label: rewardInput,
        id: crypto.randomUUID(),
      },
    ]);
    setRewardInput("");
  };

  return (
    <Box sx={{ padding: "4rem", maxWidth: "50%" }}>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup sx={{ display: "flex", gap: "2rem" }}>
          <FormControl>
            <InputLabel htmlFor="goal">Define your goal</InputLabel>
            <Input
              id="goal"
              name="goal"
              aria-describedby="goal-helper-text"
              value={formik.values.goal}
              onChange={formik.handleChange}
              error={formik.touched.goal && Boolean(formik.errors.goal)}
              inputProps={{ "data-testid": "goal-input" }}
            />

            <FormHelperText id="goal-helper-text" data-testid="goal-helper">
              {!formik.errors.goal
                ? "Keep it simple and specific."
                : formik.touched.goal && formik.errors.goal}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="schema">
              Define schema, that will help you perform your habit
            </InputLabel>
            <Input
              id="schema"
              name="schema"
              aria-describedby="schema-helper-text"
              value={formik.values.schema}
              onChange={formik.handleChange}
              error={formik.touched.schema && Boolean(formik.errors.schema)}
              inputProps={{ "data-testid": "schema-input" }}
            />
            <FormHelperText id="schema-helper-text" data-testid="schema-helper">
              {!formik.errors.schema
                ? "Plan when and where you will do your chosen action. Be consistent: choose a time and place that you encounter every day of the week."
                : formik.touched.schema && formik.errors.schema}
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor="my-input">
              Think about rewards. Add as many as you like.
            </InputLabel>
            <Input
              id="rewards"
              name="rewards"
              aria-describedby="my-helper-text"
              value={rewardInput}
              inputProps={{ "data-testid": "reward-input" }}
              onChange={(e) => setRewardInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  addReward();
                }
              }}
              endAdornment={
                <IconButton
                  color="primary"
                  onClick={() => {
                    addReward();
                  }}
                  data-testid="add-reward"
                >
                  <AddCircleIcon />
                </IconButton>
              }
            />
            <FormHelperText
              id="rewards-helper-text"
              data-testid="rewards-helper"
            >
              {formik.touched.rewards && (formik.errors.rewards as string)}
            </FormHelperText>
          </FormControl>
          <Box
            sx={{
              padding: "2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
            }}
            data-testid="rewards-container"
          >
            <Typography variant="body1">Rewards:</Typography>
            {formik.values.rewards.map((reward) => (
              <Chip
                label={reward.label}
                key={reward.id}
                onDelete={() =>
                  formik.setFieldValue(
                    "rewards",
                    formik.values.rewards.filter(
                      (rewardToDelete) => rewardToDelete.id !== reward.id
                    )
                  )
                }
              />
            ))}
          </Box>
        </FormGroup>
        <Button type="submit" variant="contained" data-testid="create-habit">
          Create new habit
        </Button>
      </form>
    </Box>
  );
};

export default HabitForm;
