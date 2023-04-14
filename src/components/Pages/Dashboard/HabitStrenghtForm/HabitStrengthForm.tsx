import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import {
  Field,
  FormikErrors,
  FormikProvider,
  FormikTouched,
  useFormik,
} from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { updateHabitStrength } from "../../../../app/features/habit/habitSlice";
import lightFormat from "date-fns/lightFormat";
import { options, questions } from "./questions";

const validationSchema = yup.object({
  q1: yup.string().required("Choose an option"),
  q2: yup.string().required("Choose an option"),
  q3: yup.string().required("Choose an option"),
  q4: yup.string().required("Choose an option"),
  q5: yup.string().required("Choose an option"),
  q6: yup.string().required("Choose an option"),
  q7: yup.string().required("Choose an option"),
  q8: yup.string().required("Choose an option"),
  q9: yup.string().required("Choose an option"),
  q10: yup.string().required("Choose an option"),
  q11: yup.string().required("Choose an option"),
  q12: yup.string().required("Choose an option"),
});

interface QuestionValues {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
  q11: string;
  q12: string;
}

const initialValues: QuestionValues = {
  q1: "",
  q2: "",
  q3: "",
  q4: "",
  q5: "",
  q6: "",
  q7: "",
  q8: "",
  q9: "",
  q10: "",
  q11: "",
  q12: "",
};

const HabitStrengthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const habitStrength = calculateHabitStrength(values);

      dispatch(
        updateHabitStrength({
          strength: habitStrength,
          date: lightFormat(new Date(), "yyyy-MM-dd"),
        })
      );
      navigate("/");
    },
  });

  return (
    <Box sx={{ padding: "4rem", maxWidth: "50%" }}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup sx={{ display: "flex", gap: "2rem" }}>
            {questions.map((question) => {
              return (
                <FormControl key={question.label}>
                  <FormLabel id={question.label}>{question.question}</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    {options.map((option) => (
                      <Field
                        key={option.value}
                        type="radio"
                        name={question.label}
                        as={FormControlLabel}
                        control={<Radio />}
                        label={option.label}
                        value={option.value.toString()}
                      />
                    ))}
                  </RadioGroup>
                  <FormHelperText id="q-helper-text" data-testid="q-helper">
                    {formik.touched[
                      question.label as keyof FormikTouched<QuestionValues>
                    ] &&
                      formik.errors[
                        question.label as keyof FormikErrors<QuestionValues>
                      ]}
                  </FormHelperText>
                </FormControl>
              );
            })}
          </FormGroup>
          <Button
            type="submit"
            variant="contained"
            data-testid="calculate-habit-strength"
          >
            Submit
          </Button>
        </form>
      </FormikProvider>
    </Box>
  );
};

export default HabitStrengthForm;

function calculateHabitStrength(values: QuestionValues) {
  const result =
    Object.values(values).reduce((a, b) => parseFloat(a) + parseFloat(b)) / 12;

  return result;
}
