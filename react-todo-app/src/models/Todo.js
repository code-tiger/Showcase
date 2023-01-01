const { nanoid } = require("nanoid");

class Todo {
  constructor(title) {
    this.id = nanoid();
    this.title = title;
    this.completed = false;
  }
}

export default Todo;
