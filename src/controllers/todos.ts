import { Request, Response } from "express";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  deleted: boolean;
}

const todos: Todo[] = [];

const getTodos = (req: Request, res: Response) => {
  const { completed } = req.query;
  if (completed && typeof completed !== "boolean") {
    return res.status(400).json({ error: "Invalid completed value" });
  }
  const filteredTodos = completed
    ? todos.filter(
        (todo) => todo.completed === (completed as unknown as boolean)
      )
    : todos;
  res.json(filteredTodos);
};

const postTodos = (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "Invalid title" });
  }

  const newTodo: Todo = {
    id: todos.length + 1,
    title,
    completed: false,
    deleted: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

const updateTodos = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  if (title && typeof title !== "string") {
    return res.status(400).json({ error: "Invalid title" });
  }
  if (completed && typeof completed !== "boolean") {
    return res.status(400).json({ error: "Invalid completed value" });
  }

  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    if (title) {
      todo.title = title;
    }
    if (completed !== undefined) {
      todo.completed = completed;
    }
    res.json(todo);
  } else {
    return res.status(404).json({ error: "Todo not found" });
  }
};

const deleteTodos = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.deleted = true;
    res.sendStatus(204);
  } else {
    return res.status(404).json({ error: "Todo not found" });
  }
};

export { getTodos, postTodos, updateTodos, deleteTodos };
