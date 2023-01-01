import Button from "components/Button";
import { useState } from "react";

export default function Input(props: { createTodo: (title: string) => void }) {
  const { createTodo } = props;

  const [title, setTitle] = useState("");

  function onButtonClick() {
    if (title) {
      createTodo(title);
      setTitle("");
    }
  }

  return (
    <div>
      <textarea
        className={
          "w-full max-h-[200px] my-5 p-2 border border-gray-300 rounded-md " +
          "focus:border-blue-500 focus:outline-none"
        }
        rows={3}
        placeholder="有什麼需要完成的事？"
        autoComplete="off"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button className="w-full" onClick={onButtonClick}>
        新增
      </Button>
    </div>
  );
}
