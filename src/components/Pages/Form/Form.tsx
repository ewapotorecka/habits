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
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  goal: yup.string().required("Goal is required"),
  schema: yup.string().required("Schema is required"),
  rewards: yup.array().min(1, "Add at least one reward"),
});

const HabitForm = () => {
  const [rewardInput, setRewardInput] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      goal: "",
      schema: "",
      rewards: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newHabit: Habit = {
        goal: values.goal,
        schema: values.schema,
        rewards: values.rewards,
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
            />

            <FormHelperText id="goal-helper-text">
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
            />
            <FormHelperText id="schema-helper-text">
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
              onChange={(e) => setRewardInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  formik.setFieldValue("rewards", [
                    ...formik.values.rewards,
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
                    formik.setFieldValue("rewards", [
                      ...formik.values.rewards,
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
            <FormHelperText id="rewards-helper-text">
              {formik.touched.rewards && formik.errors.rewards}
            </FormHelperText>
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
            {formik.values.rewards.length > 0 &&
              formik.values.rewards.map(
                (reward: { label: string; id: number }) => (
                  <Chip
                    label={reward.label}
                    key={reward.id}
                    onDelete={() =>
                      formik.setFieldValue(
                        "rewards",
                        formik.values.rewards.filter(
                          (rewardToDelete: { id: number; label: string }) =>
                            rewardToDelete.id !== reward.id
                        )
                      )
                    }
                  />
                )
              )}
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
