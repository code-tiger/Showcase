import Button from "components/Button";
import { useState } from "react";

function ListItem(props: {
  todo: Todo,
  updateTodo: (todo: {
    id: string,
    title?: string,
    completed?: boolean,
  }) => void,
  deleteTodo: (id: string) => void,
}) {
  const [newTitle, setNewTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { todo, updateTodo, deleteTodo } = props;

  function save() {
    if (newTitle) {
      updateTodo({
        id: todo.id,
        title: newTitle,
      });
    }
    setIsEditing(false);
    setNewTitle("");
  }

  return (
    <div className="flex flex-col mt-5 gap-y-5">
      {isEditing ? (
        <Edit
          todo={todo}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          updateTodo={updateTodo}
        />
      ) : (
        <Display todo={todo} updateTodo={updateTodo} />
      )}
      <div className="flex gap-x-2">
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "取消" : "編輯"}
        </Button>
        <Button
          variant="secondary"
          onClick={isEditing ? save : () => deleteTodo(todo.id)}
        >
          {isEditing ? "儲存" : "刪除"}
        </Button>
      </div>
    </div>
  );
}

function Display(props: {
  todo: Todo,
  updateTodo: (todo: {
    id: string,
    title?: string,
    completed?: boolean,
  }) => void,
}) {
  const { todo, updateTodo } = props;
  const { id, title, completed } = todo;

  return (
    <div className="flex items-center relative border-box min-h-[30px]">
      <input
        className="h-[30px] w-[30px] mr-2"
        type="checkbox"
        value={completed}
        checked={completed}
        onChange={(e) => updateTodo({ id, completed: !completed })}
      />
      <label className="text-[24px]">{title}</label>
    </div>
  );
}

function Edit(props: {
  newTitle: string,
  setNewTitle: (newTitle: string) => void,
}) {
  const { newTitle, setNewTitle } = props;

  return (
    <div className="flex flex-col">
      <input
        className="px-2 py-1 border border-black"
        type="text"
        placeholder="請輸入新的資訊"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
    </div>
  );
}

export default ListItem;
