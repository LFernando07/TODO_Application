import express from "express";


const app = express();
const PORT = process.env.PORT || 1234;

app.get("/", (req, res) => {
  res.send("Hello, TODO API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});