import SeparationLine from "components/SeparationLine";
import Title from "components/Title";
import { STATUS } from "constant";
import Todo from "models/Todo";
import { useState } from "react";
import Input from "./Input";
import ListFilter from "./ListFilter";
import ListItem from "./ListItem";

const DEFAULT_TODO_ITEMS = [new Todo("吃飯")];

function TodoForm() {
  const [filterStatus, setFilterStatus] = useState(STATUS.all);
  const [todoItems, setTodoItems] = useState(DEFAULT_TODO_ITEMS);
  const filteredTodoItems = todoItems.filter((todo) => {
    if (filterStatus === STATUS.all) {
      return true;
    } else if (filterStatus === STATUS.active) {
      return !todo.completed;
    } else {
      return todo.completed;
    }
  });

  function createTodo(title: string) {
    const todo = new Todo(title);

    setTodoItems([...todoItems, todo]);
  }

  function updateTodo({
    id,
    title,
    completed,
  }: {
    id: string,
    title?: string,
    completed?: boolean,
  }) {
    const todo = todoItems.find((todo) => todo.id === id);

    if (todo) {
      todo.title = title ?? todo.title;
      todo.completed = completed !== undefined ? completed : todo.completed;
    }

    setTodoItems([...todoItems]);
  }

  function deleteTodo(id: string) {
    const todo = todoItems.find((todo) => todo.id === id);

    if (todo) {
      todoItems.splice(todoItems.indexOf(todo), 1);
    }

    setTodoItems([...todoItems]);
  }

  return (
    <div className="relative bg-white mx-0 mt-[2rem] mb-[2rem] p-[1rem]">
      <Title className="text-center">待辦事項</Title>
      <Input createTodo={createTodo} />
      <SeparationLine />
      <ListFilter
        setFilterStatus={setFilterStatus}
        filterStatus={filterStatus}
      />

      <div className="border-l border-r border-b border-black px-4 py-4">
        <Title className="py-2" fontSize={24}>
          {`${filteredTodoItems.length} 筆記錄`}
        </Title>
        {filteredTodoItems.map((todo) => (
          <ListItem
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoForm;
