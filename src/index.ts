import express from "express";
import cors from "cors";
import todos from "./routes/todos";

const app = express();

const POST = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todos", todos);

app.listen(POST, () => {
  console.log(`Example app listening on port ${POST}`);
});
