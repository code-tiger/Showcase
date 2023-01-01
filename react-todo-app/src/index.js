/**
 * Our app's user stories
 * In software development, a user story is an actionable goal from the perspective of the user. Defining user stories before we begin our work will help us focus our work. Our app should fulfill the following stories:
 * As a user, I can
 * - read a list of tasks.
 * - add a task using the mouse or keyboard.
 * - mark any task as completed, using the mouse or keyboard.
 * - delete any task, using the mouse or keyboard.
 * - edit any task, using the mouse or keyboard.
 * - view a specific subset of tasks: All tasks, only the active task, or only the completed tasks.
 * We'll tackle these stories one-by-one.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
