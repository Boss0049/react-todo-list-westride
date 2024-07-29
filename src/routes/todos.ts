import express from "express";
const router = express.Router();
import {
  getTodos,
  postTodos,
  updateTodos,
  deleteTodos,
} from "../controllers/todos";

router.get("/", getTodos);

router.post("/", postTodos);

router.put("/:id", updateTodos);

router.delete("/:id", deleteTodos);

export default router;
