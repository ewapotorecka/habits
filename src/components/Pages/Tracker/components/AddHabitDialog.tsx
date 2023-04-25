import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as yup from "yup";
import { addHabitToTracker } from "../../../../app/features/habit/habitSlice";
import { useDispatch } from "react-redux";

const initialValues: {
  habit: string;
} = {
  habit: "",
};

const validationSchema = yup.object({
  habit: yup.string().required("Habit name is required"),
});

const AddHabitDialog = ({
  dialogVisible,
  setDialogVisible,
}: {
  dialogVisible: boolean;
  setDialogVisible: (dialogVisible: boolean) => void;
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(addHabitToTracker(values.habit));

      setDialogVisible(false);
    },
  });
  const dispatch = useDispatch();

  return (
    <Dialog
      open={dialogVisible}
      onClose={() => setDialogVisible(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ ".MuiPaper-root": { padding: "2rem 4rem" } }}
    >
      <DialogActions>
        <Button onClick={() => setDialogVisible(false)}>
          <CloseIcon />
        </Button>
      </DialogActions>

      <DialogContent
        sx={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <FormControl sx={{ minWidth: "24rem" }}>
            <InputLabel htmlFor="habit">Add a new habit to track</InputLabel>
            <Input
              id="habit"
              name="habit"
              aria-describedby="habit-helper-text"
              value={formik.values.habit}
              onChange={formik.handleChange}
              error={formik.touched.habit && Boolean(formik.errors.habit)}
              inputProps={{ "data-testid": "goal-input" }}
            />

            <FormHelperText id="habit-helper-text" data-testid="habit-helper">
              {!formik.errors.habit
                ? ""
                : formik.touched.habit && formik.errors.habit}
            </FormHelperText>
          </FormControl>

          <Button type="submit" color="primary">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHabitDialog;
