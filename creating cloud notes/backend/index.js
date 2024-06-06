const ConnectToDb=require("./db");
const express = require('express');
const cors=require("cors");

const app = express()
ConnectToDb();
const port = 3000
app.use(express.json());
app.use(cors());

app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})