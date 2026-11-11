import { render, fireEvent, waitFor } from "@testing-library/react-native"; // Import `waitFor`
import App from "./App";

describe("App", () => {
  it("should render Add Task block correctly", () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    expect(getByText("Add Task")).toBeTruthy();
    expect(getByPlaceholderText("Enter task title")).toBeTruthy();
  });

  it("should add a new task", () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const newTaskInput = getByPlaceholderText("Enter task title");
    fireEvent.changeText(newTaskInput, "New Task");
    fireEvent.press(getByText("Add Task"));
    expect(getByText("New Task")).toBeTruthy();
  });

  it("should render a list of tasks correctly", () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const newTaskInput = getByPlaceholderText("Enter task title");
    fireEvent.changeText(newTaskInput, "New Task 1");
    fireEvent.press(getByText("Add Task"));
    fireEvent.changeText(newTaskInput, "New Task 2");
    fireEvent.press(getByText("Add Task"));
    expect(getByText("New Task 1")).toBeTruthy();
    expect(getByText("New Task 2")).toBeTruthy();
  });

  it("should edit one task from the list", () => {
    const { getByPlaceholderText, getByText, queryAllByText, queryByTestId } =
      render(<App />);
    const newTaskInput = getByPlaceholderText("Enter task title");
    fireEvent.changeText(newTaskInput, "New Task 1");
    fireEvent.press(getByText("Add Task"));
    fireEvent.changeText(newTaskInput, "New Task 2");
    fireEvent.press(getByText("Add Task"));
    fireEvent.press(queryAllByText("Edit")[0]);
    fireEvent.changeText(newTaskInput, "Edited task 1");
    fireEvent.press(getByText("Save"));
    expect(getByText("Edited task 1")).toBeTruthy();
    expect(getByText("New Task 2")).toBeTruthy();
    expect(getByText("Add Task")).toBeTruthy();
    expect(queryByTestId("date-picker")).toBeNull();
  });

  it("should delete the task", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<App />);
    fireEvent.changeText(getByPlaceholderText("Enter task title"), "Task 1");
    fireEvent.press(getByText("Add Task"));
    fireEvent.press(getByText("Delete"));
    await waitFor(() => {
      expect(queryByText("Task 1")).toBeNull();
    });
  });

  it("should delete onlt one task from list", async () => {
    const { getByText, getByPlaceholderText, queryAllByText } = render(<App />);
    fireEvent.changeText(getByPlaceholderText("Enter task title"), "Test task");
    fireEvent.press(getByText("Add Task"));
    fireEvent.changeText(getByPlaceholderText("Enter task title"), "Test task");
    fireEvent.press(getByText("Add Task"));
    fireEvent.changeText(getByPlaceholderText("Enter task title"), "Test task");
    fireEvent.press(getByText("Add Task"));
    const deleteButtons = queryAllByText("Delete");
    expect(deleteButtons.length).toBe(3);
    fireEvent.press(deleteButtons[0]);
    await waitFor(() => {
      expect(queryAllByText("Test task").length).toBe(2);
    });
  });
});
