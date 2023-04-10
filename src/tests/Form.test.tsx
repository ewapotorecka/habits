import { render, screen, fireEvent, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";
import { Provider } from "react-redux";
import Form from "../components/Pages/Form/Form";
import userEvent from "@testing-library/user-event";

test("renders habit form", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    </Provider>
  );

  const habitInput = screen.getByText(/Define your goal/i);
  const schemaInput = screen.getByText(/Define schema/i);
  const rewardsInput = screen.getByText(/Think about rewards/i);

  expect(habitInput).toBeInTheDocument();
  expect(schemaInput).toBeInTheDocument();
  expect(rewardsInput).toBeInTheDocument();
});

test("displays rewards list after adding reward in the form", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    </Provider>
  );

  const input: HTMLInputElement = screen.getByTestId("reward-input");
  const addButton = screen.getByTestId("add-reward");

  userEvent.type(input, "new reward");
  userEvent.click(addButton);

  const rewardsContainer = screen.getByTestId("rewards-container");

  expect(within(rewardsContainer).getByText(/new reward/i)).toBeInTheDocument();
});

test("validates all of the required fields in the form", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    </Provider>
  );

  const submit = screen.getByTestId("create-habit");

  fireEvent.click(submit);

  const goalHelperText = screen.getByTestId("goal-helper");
  const schemaHelperText = screen.getByTestId("schema-helper");
  const rewardsHelperText = screen.getByTestId("rewards-helper");

  expect(
    await within(goalHelperText).findByText(/Goal is required/i)
  ).toBeInTheDocument();
  expect(
    await within(schemaHelperText).findByText(/Schema is required/i)
  ).toBeInTheDocument();
  expect(
    await within(rewardsHelperText).findByText(/Add at least one reward/i)
  ).toBeInTheDocument();
});
